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
    const { eventId, formData } = req.body
    const userId = req.user?.id

    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' })
    }
    if (!eventId || !formData) {
      return res.status(400).json({ success: false, message: 'Event ID and form data are required' })
    }

    // Validate required form fields
    const requiredFields = ['fullName', 'email', 'phone', 'age', 'city', 'occupation', 'reasonForParticipation']
    const missingFields = requiredFields.filter(field => !formData[field])
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: `Missing required fields: ${missingFields.join(', ')}` 
      })
    }

    const event = await Event.findById(eventId)
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' })
    }

    // Check if event is upcoming
    if (event.status !== 'upcoming') {
      return res.status(400).json({ success: false, message: 'Registration is only open for upcoming events' })
    }

    // Create registration with comprehensive form data
    try {
      const registration = await EventRegistration.create({
        userId,
        eventId,
        formData,
        status: 'registered',
      })

      // Populate for response
      await registration.populate('userId', 'name email')
      await registration.populate('eventId', 'title date location')

      return res.status(201).json({
        success: true,
        message: 'Registration successful',
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

    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized - no user found' })
    }

    // Only admin can view full registration lists
    // Admin tokens have role: 'admin' in the JWT payload
    const isAdmin = req.user && (req.user.role === 'admin' || req.user.email === 'admin123@gmail.com')
    
    if (!isAdmin) {
      console.error('Access denied - user role:', req.user.role, 'user email:', req.user.email)
      return res.status(403).json({ success: false, message: 'Forbidden - Admin access required' })
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

    const registrations = await EventRegistration.find({ userId })
      .populate('eventId', 'title date location status')
      .sort({ registrationDate: -1 })

    res.status(200).json({ 
      success: true, 
      registrations,
      count: registrations.length
    })
  } catch (error) {
    console.error('Error getting user registrations:', error)
    res.status(500).json({ success: false, message: 'Error fetching user registrations', error: error.message })
  }
}

/**
 * @desc    Get all registrations (admin only)
 * @route   GET /api/registrations
 * @access  Private (admin)
 */
export const getAllRegistrations = async (req, res) => {
  try {
    const { eventId, status } = req.query
    const filter = {}
    
    if (eventId) filter.eventId = eventId
    if (status) filter.status = status

    const registrations = await EventRegistration.find(filter)
      .populate('userId', 'name email phone')
      .populate('eventId', 'title date location')
      .sort({ registeredAt: -1 })

    res.status(200).json({
      success: true,
      count: registrations.length,
      registrations,
    })
  } catch (error) {
    console.error('Error fetching all registrations:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching registrations', 
      error: error.message 
    })
  }
}

/**
 * @desc    Export registrations as CSV (admin only)
 * @route   GET /api/registrations/export/:eventId
 * @access  Private (admin)
 */
export const exportRegistrationsCSV = async (req, res) => {
  try {
    const { eventId } = req.params

    // Check if user is authenticated and is admin
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized - no user found' })
    }

    const isAdmin = req.user && (req.user.role === 'admin' || req.user.email === 'admin123@gmail.com')
    if (!isAdmin) {
      return res.status(403).json({ success: false, message: 'Forbidden - Admin access required' })
    }

    // Check if event exists
    const event = await Event.findById(eventId)
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' })
    }

    const registrations = await EventRegistration.find({ eventId })
      .populate('userId', 'name email phone')
      .populate('eventId', 'title date location')
      .sort({ registeredAt: -1 })

    // Generate CSV content
    const csvHeaders = [
      'Registration ID',
      'Full Name',
      'Email',
      'Phone',
      'Age',
      'City',
      'Occupation',
      'Reason for Participation',
      'Registration Date',
      'Status'
    ]

    const csvRows = registrations.map(reg => [
      reg._id.toString(),
      reg.formData.fullName,
      reg.formData.email,
      reg.formData.phone,
      reg.formData.age,
      reg.formData.city,
      reg.formData.occupation,
      `"${reg.formData.reasonForParticipation.replace(/"/g, '""')}"`, // Escape quotes
      new Date(reg.registrationDate).toLocaleDateString(),
      reg.status
    ])

    const csvContent = [csvHeaders.join(','), ...csvRows.map(row => row.join(','))].join('\n')

    // Set response headers for CSV download
    res.setHeader('Content-Type', 'text/csv')
    res.setHeader('Content-Disposition', `attachment; filename="participants_${event.title.replace(/[^a-z0-9]/gi, '_')}_${new Date().toISOString().split('T')[0]}.csv"`)

    res.status(200).send(csvContent)
  } catch (error) {
    console.error('Error exporting registrations:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Error exporting registrations', 
      error: error.message 
    })
  }
}
