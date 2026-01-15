import mongoose from 'mongoose'

/**
 * Event Schema
 * Defines the structure for event documents in MongoDB
 */
const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    date: {
      type: Date,
      required: [true, 'Event date is required'],
    },
    location: {
      type: String,
      required: [true, 'Event location is required'],
      trim: true,
      maxlength: [200, 'Location cannot exceed 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Event description is required'],
      trim: true,
    },
    participants: {
      type: Number,
      required: [true, 'Number of participants is required'],
      min: [0, 'Participants cannot be negative'],
    },
    beneficiaries: {
      type: Number,
      required: [true, 'Number of beneficiaries is required'],
      min: [0, 'Beneficiaries cannot be negative'],
    },
    status: {
      type: String,
      enum: ['upcoming', 'past', 'cancelled'],
      default: 'upcoming',
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
)

// Index for efficient queries
eventSchema.index({ date: 1 })
eventSchema.index({ status: 1 })

const Event = mongoose.model('Event', eventSchema)

export default Event

