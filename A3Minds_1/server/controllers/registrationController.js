import Event from '../models/Event.js'
import EventRegistration from '../models/EventRegistration.js'
import User from '../models/User.js'

/**
 * Register a user for an event
 * POST /api/registrations/register
 * Protected route (user)
 */
export const registerForEvent = async (req, res) => {
  try {
    const { eventId } = req.body
    const userId = req.user?.id

    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' })
    }
    if (!eventId) {
      return res.status(400).json({ success: false, message: 'eventId is required' })
    }

    const event = await Event.findById(eventId)
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' })
    }

    // Create registration, unique index prevents duplicates
    try {
      const registration = await EventRegistration.create({
        userId,
        eventId,
      })

      return res.status(201).json({
        success: true,
        message: 'Registered successfully',
        registration,
      })
    } catch (err) {
      // Duplicate key error
      if (err.code === 11000) {
        return res.status(409).json({ success: false, message: 'You have already registered for this event' })
      }
      throw err
    }
  } catch (error) {
    console.error('Error in registerForEvent:', error)
    res.status(500).json({ success: false, message: 'Error registering for event', error: error.message })
  }
}

/**
 * Get registrations for a specific event (admin or privileged)
 * GET /api/registrations/event/:eventId
 * Protected (admin)
 */
export const getRegistrationsByEvent = async (req, res) => {
  try {
    const { eventId } = req.params
    if (!eventId) {
      return res.status(400).json({ success: false, message: 'eventId is required' })
    }

    // Only admin can view full registration lists
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Forbidden' })
    }

    const registrations = await EventRegistration.find({ eventId })
      .populate('userId', 'name email phone')
      .sort({ createdAt: -1 })

    const count = await EventRegistration.countDocuments({ eventId })

    res.status(200).json({ success: true, count, registrations })
  } catch (error) {
    console.error('Error getting registrations:', error)
    res.status(500).json({ success: false, message: 'Error fetching registrations', error: error.message })
  }
}

/**
 * Get registrations for current user
 * GET /api/registrations/me
 * Protected (user)
 */
export const getUserRegistrations = async (req, res) => {
  try {
    const userId = req.user?.id
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' })
    }

    const registrations = await EventRegistration.find({ userId }).populate('eventId')
    res.status(200).json({ success: true, registrations })
  } catch (error) {
    console.error('Error getting user registrations:', error)
    res.status(500).json({ success: false, message: 'Error fetching user registrations', error: error.message })
  }
}

