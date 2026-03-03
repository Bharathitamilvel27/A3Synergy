import Feedback from '../models/Feedback.js'
import Event from '../models/Event.js'
import Registration from '../models/Registration.js'

/**
 * Feedback Controller
 * Handles all feedback-related operations
 */

/**
 * @desc    Submit feedback for an event
 * @route   POST /api/feedback
 * @access  Private (Authenticated users only)
 */
export const submitFeedback = async (req, res) => {
  try {
    const {
      registrationId,
      eventId,
      participantName,
      eventName,
      ratings,
      comments,
    } = req.body

    // Validate required fields
    if (!registrationId || !eventId || !participantName || !eventName || !ratings) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      })
    }

    // Validate all ratings are present
    if (
      !ratings.overallExperience ||
      !ratings.organizationQuality ||
      !ratings.contentRelevance ||
      !ratings.volunteerSupport ||
      !ratings.wouldRecommend
    ) {
      return res.status(400).json({
        success: false,
        message: 'All rating fields are required',
      })
    }

    // Check if feedback already exists for this registration
    const existingFeedback = await Feedback.findOne({ registrationId })
    if (existingFeedback) {
      return res.status(400).json({
        success: false,
        message: 'Feedback already submitted for this event registration',
      })
    }

    // Create feedback
    const feedback = await Feedback.create({
      registrationId,
      eventId,
      userId: req.user._id || req.user.id,
      participantName,
      eventName,
      ratings,
      comments,
    })

    res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully',
      data: feedback,
    })
  } catch (error) {
    console.error('Error submitting feedback:', error)
    res.status(500).json({
      success: false,
      message: 'Error submitting feedback',
      error: error.message,
    })
  }
}

/**
 * @desc    Get all feedback for an event
 * @route   GET /api/feedback/event/:eventId
 * @access  Private (Admin only - to be implemented)
 */
export const getFeedbackByEvent = async (req, res) => {
  try {
    const { eventId } = req.params
    const { status, sentiment } = req.query

    // Build query
    const query = { eventId }
    if (status) query.status = status
    if (sentiment) query.sentiment = sentiment

    const feedback = await Feedback.find(query)
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })

    // Calculate analytics
    const totalFeedback = feedback.length
    const averageOverallRating =
      feedback.length > 0
        ? (
            feedback.reduce((sum, f) => sum + f.ratings.overallExperience, 0) /
            feedback.length
          ).toFixed(2)
        : 0

    const sentimentCount = {
      positive: feedback.filter((f) => f.sentiment === 'positive').length,
      neutral: feedback.filter((f) => f.sentiment === 'neutral').length,
      negative: feedback.filter((f) => f.sentiment === 'negative').length,
    }

    const averageRatings = {
      overallExperience: (
        feedback.reduce((sum, f) => sum + f.ratings.overallExperience, 0) /
        (feedback.length || 1)
      ).toFixed(2),
      organizationQuality: (
        feedback.reduce((sum, f) => sum + f.ratings.organizationQuality, 0) /
        (feedback.length || 1)
      ).toFixed(2),
      contentRelevance: (
        feedback.reduce((sum, f) => sum + f.ratings.contentRelevance, 0) /
        (feedback.length || 1)
      ).toFixed(2),
      volunteerSupport: (
        feedback.reduce((sum, f) => sum + f.ratings.volunteerSupport, 0) /
        (feedback.length || 1)
      ).toFixed(2),
      wouldRecommend: (
        feedback.reduce((sum, f) => sum + f.ratings.wouldRecommend, 0) /
        (feedback.length || 1)
      ).toFixed(2),
    }

    res.status(200).json({
      success: true,
      count: totalFeedback,
      data: feedback,
      analytics: {
        totalFeedback,
        averageOverallRating,
        sentimentCount,
        averageRatings,
      },
    })
  } catch (error) {
    console.error('Error fetching event feedback:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching feedback',
      error: error.message,
    })
  }
}

/**
 * @desc    Get all feedback submitted by current user
 * @route   GET /api/feedback/my-feedback
 * @access  Private
 */
export const getMyFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find({ userId: req.user._id || req.user.id })
      .populate('eventId', 'title date location')
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: feedback.length,
      data: feedback,
    })
  } catch (error) {
    console.error('Error fetching user feedback:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching feedback',
      error: error.message,
    })
  }
}

/**
 * @desc    Get feedback summary for dashboard
 * @route   GET /api/feedback/summary
 * @access  Private (Admin only - to be implemented)
 */
export const getFeedbackSummary = async (req, res) => {
  try {
    const totalFeedback = await Feedback.countDocuments()
    const averageRating = await Feedback.aggregate([
      {
        $group: {
          _id: null,
          avgRating: { $avg: '$averageRating' },
          positiveCount: {
            $sum: { $cond: [{ $eq: ['$sentiment', 'positive'] }, 1, 0] },
          },
          neutralCount: {
            $sum: { $cond: [{ $eq: ['$sentiment', 'neutral'] }, 1, 0] },
          },
          negativeCount: {
            $sum: { $cond: [{ $eq: ['$sentiment', 'negative'] }, 1, 0] },
          },
        },
      },
    ])

    const feedbackByMonth = await Feedback.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          count: { $sum: 1 },
          avgRating: { $avg: '$averageRating' },
        },
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 12 },
    ])

    res.status(200).json({
      success: true,
      data: {
        totalFeedback,
        summary: averageRating[0] || {
          avgRating: 0,
          positiveCount: 0,
          neutralCount: 0,
          negativeCount: 0,
        },
        feedbackByMonth,
      },
    })
  } catch (error) {
    console.error('Error fetching feedback summary:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching summary',
      error: error.message,
    })
  }
}

/**
 * @desc    Update feedback status
 * @route   PUT /api/feedback/:id
 * @access  Private (Admin only - to be implemented)
 */
export const updateFeedbackStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body

    if (!['submitted', 'reviewed', 'archived'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status',
      })
    }

    const feedback = await Feedback.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    )

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found',
      })
    }

    res.status(200).json({
      success: true,
      message: 'Feedback status updated',
      data: feedback,
    })
  } catch (error) {
    console.error('Error updating feedback:', error)
    res.status(500).json({
      success: false,
      message: 'Error updating feedback',
      error: error.message,
    })
  }
}
