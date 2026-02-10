import mongoose from 'mongoose'

/**
 * EventRegistration Schema
 * Links users to events with registration metadata
 */
const eventRegistrationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    registrationDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['registered', 'attended', 'cancelled'],
      default: 'registered',
    },
  },
  {
    timestamps: true,
  }
)

// Prevent duplicate registration per user/event at DB level
eventRegistrationSchema.index({ userId: 1, eventId: 1 }, { unique: true })

const EventRegistration = mongoose.model('EventRegistration', eventRegistrationSchema)

export default EventRegistration

