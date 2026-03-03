import Event from '../models/Event.js'

/**
 * Event Controller
 * Handles all event-related operations
 */

/**
 * @desc    Create a new event
 * @route   POST /api/events
 * @access  Private (Admin only)
 */
export const createEvent = async (req, res) => {
  try {
    // Check if admin
    const isAdmin = req.user && (req.user.role === 'admin' || req.user.email === 'admin123@gmail.com')
    if (!isAdmin) {
      return res.status(403).json({ success: false, message: 'Forbidden - Admin access required' })
    }

    const { title, date, location, description, participants, beneficiaries } = req.body

    // Validate required fields
    if (!title || !date || !location || !description || participants === undefined || beneficiaries === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: title, date, location, description, participants, beneficiaries',
      })
    }

    // Create event
    const event = await Event.create({
      title,
      date: new Date(date),
      location,
      description,
      participants: parseInt(participants),
      beneficiaries: parseInt(beneficiaries),
      // Set status based on date
      status: new Date(date) > new Date() ? 'upcoming' : 'past',
    })

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: event,
    })
  } catch (error) {
    console.error('Error creating event:', error)
    res.status(500).json({
      success: false,
      message: 'Error creating event',
      error: error.message,
    })
  }
}

/**
 * @desc    Get all events
 * @route   GET /api/events
 * @access  Public
 */
export const getEvents = async (req, res) => {
  try {
    const { status } = req.query

    // Build query
    const query = status ? { status } : {}

    // Fetch events, sorted by date (newest first)
    const events = await Event.find(query).sort({ date: -1 })

    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    })
  } catch (error) {
    console.error('Error fetching events:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching events',
      error: error.message,
    })
  }
}

/**
 * @desc    Get single event by ID
 * @route   GET /api/events/:id
 * @access  Public
 */
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      })
    }

    res.status(200).json({
      success: true,
      data: event,
    })
  } catch (error) {
    console.error('Error fetching event:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching event',
      error: error.message,
    })
  }
}

/**
 * @desc    Update an event
 * @route   PUT /api/events/:id
 * @access  Private (Admin only)
 */
export const updateEvent = async (req, res) => {
  try {
    const { title, date, location, description, participants, beneficiaries } = req.body

    // Find event
    let event = await Event.findById(req.params.id)

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      })
    }

    // Update fields
    if (title !== undefined) event.title = title
    if (date !== undefined) {
      event.date = new Date(date)
      // Update status based on new date
      event.status = new Date(date) > new Date() ? 'upcoming' : 'past'
    }
    if (location !== undefined) event.location = location
    if (description !== undefined) event.description = description
    if (participants !== undefined) event.participants = parseInt(participants)
    if (beneficiaries !== undefined) event.beneficiaries = parseInt(beneficiaries)

    // Save updated event
    await event.save()

    res.status(200).json({
      success: true,
      message: 'Event updated successfully',
      data: event,
    })
  } catch (error) {
    console.error('Error updating event:', error)
    res.status(500).json({
      success: false,
      message: 'Error updating event',
      error: error.message,
    })
  }
}

/**
 * @desc    Delete an event
 * @route   DELETE /api/events/:id
 * @access  Private (Admin only)
 */
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      })
    }

    await Event.findByIdAndDelete(req.params.id)

    res.status(200).json({
      success: true,
      message: 'Event deleted successfully',
      data: {},
    })
  } catch (error) {
    console.error('Error deleting event:', error)
    res.status(500).json({
      success: false,
      message: 'Error deleting event',
      error: error.message,
    })
  }
}

