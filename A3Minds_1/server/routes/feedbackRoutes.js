import express from 'express'
import {
  submitFeedback,
  getFeedbackByEvent,
  getMyFeedback,
  getFeedbackSummary,
  updateFeedbackStatus,
} from '../controllers/feedbackController.js'
import { authenticate } from '../middlewares/auth.js'

const router = express.Router()

/**
 * Feedback Routes
 * All routes prefixed with /api/feedback
 */

// POST /api/feedback - Submit feedback
router.post('/', authenticate, submitFeedback)

// GET /api/feedback/event/:eventId - Get feedback for specific event
router.get('/event/:eventId', getFeedbackByEvent)

// GET /api/feedback/my-feedback - Get current user's feedback
router.get('/my-feedback', authenticate, getMyFeedback)

// GET /api/feedback/summary - Get feedback analytics summary
router.get('/summary', getFeedbackSummary)

// PUT /api/feedback/:id - Update feedback status
router.put('/:id', authenticate, updateFeedbackStatus)

export default router
