import mongoose from 'mongoose'

/**
 * Feedback Schema
 * Stores participant feedback for events with detailed ratings for analytics
 */
const feedbackSchema = new mongoose.Schema(
  {
    registrationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Registration',
      required: [true, 'Registration ID is required'],
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required'],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    participantName: {
      type: String,
      required: [true, 'Participant name is required'],
      trim: true,
      maxlength: [120, 'Name cannot exceed 120 characters'],
    },
    eventName: {
      type: String,
      required: [true, 'Event name is required'],
      trim: true,
      maxlength: [200, 'Event name cannot exceed 200 characters'],
    },
    ratings: {
      overallExperience: {
        type: Number,
        required: [true, 'Overall experience rating is required'],
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating cannot exceed 5'],
      },
      organizationQuality: {
        type: Number,
        required: [true, 'Organization quality rating is required'],
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating cannot exceed 5'],
      },
      contentRelevance: {
        type: Number,
        required: [true, 'Content relevance rating is required'],
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating cannot exceed 5'],
      },
      volunteerSupport: {
        type: Number,
        required: [true, 'Volunteer support rating is required'],
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating cannot exceed 5'],
      },
      wouldRecommend: {
        type: Number,
        required: [true, 'Recommendation rating is required'],
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating cannot exceed 5'],
      },
    },
    averageRating: {
      type: Number,
      min: 1,
      max: 5,
    },
    comments: {
      type: String,
      trim: true,
      maxlength: [1000, 'Comments cannot exceed 1000 characters'],
    },
    sentiment: {
      type: String,
      enum: ['positive', 'neutral', 'negative'],
      default: 'neutral',
    },
    status: {
      type: String,
      enum: ['submitted', 'reviewed', 'archived'],
      default: 'submitted',
    },
  },
  {
    timestamps: true,
  }
)

// Index for efficient queries
feedbackSchema.index({ eventId: 1, createdAt: -1 })
feedbackSchema.index({ userId: 1, createdAt: -1 })
feedbackSchema.index({ registrationId: 1 })

// Calculate average rating before saving
feedbackSchema.pre('save', function (next) {
  if (this.ratings) {
    const ratings = [
      this.ratings.overallExperience,
      this.ratings.organizationQuality,
      this.ratings.contentRelevance,
      this.ratings.volunteerSupport,
      this.ratings.wouldRecommend,
    ]
    this.averageRating = (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2)

    // Simple sentiment analysis based on average rating
    if (this.averageRating >= 4) {
      this.sentiment = 'positive'
    } else if (this.averageRating >= 3) {
      this.sentiment = 'neutral'
    } else {
      this.sentiment = 'negative'
    }
  }
  next()
})

const Feedback = mongoose.model('Feedback', feedbackSchema)

export default Feedback
