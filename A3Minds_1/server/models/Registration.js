import mongoose from 'mongoose'

/**
 * Registration Schema
 * Stores event registrations with comprehensive NGO form data
 */
const registrationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required'],
    },
    formData: {
      fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true,
        maxlength: [120, 'Full name cannot exceed 120 characters'],
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
      },
      phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true,
      },
      age: {
        type: Number,
        required: [true, 'Age is required'],
        min: [1, 'Age must be at least 1'],
        max: [120, 'Age cannot exceed 120'],
      },
      city: {
        type: String,
        required: [true, 'City is required'],
        trim: true,
        maxlength: [100, 'City cannot exceed 100 characters'],
      },
      occupation: {
        type: String,
        required: [true, 'Occupation is required'],
        trim: true,
        maxlength: [100, 'Occupation cannot exceed 100 characters'],
      },
      reasonForParticipation: {
        type: String,
        required: [true, 'Reason for participation is required'],
        trim: true,
        maxlength: [500, 'Reason cannot exceed 500 characters'],
      },
    },
    status: {
      type: String,
      enum: ['registered', 'confirmed', 'cancelled', 'attended'],
      default: 'registered',
    },
    registeredAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
)

// Compound index to prevent duplicate registrations
registrationSchema.index({ userId: 1, eventId: 1 }, { unique: true })

// Index for efficient queries
registrationSchema.index({ eventId: 1 })
registrationSchema.index({ status: 1 })
registrationSchema.index({ registeredAt: 1 })

const Registration = mongoose.model('Registration', registrationSchema)

export default Registration
