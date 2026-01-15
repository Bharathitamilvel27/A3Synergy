import express from 'express'
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from '../controllers/eventController.js'

const router = express.Router()

/**
 * Event Routes
 * All routes are prefixed with /api/events
 */

// GET /api/events - Get all events
router.get('/', getEvents)

// GET /api/events/:id - Get single event
router.get('/:id', getEventById)

// POST /api/events - Create new event
// Note: In production, add auth middleware here
router.post('/', createEvent)

// PUT /api/events/:id - Update event
// Note: In production, add auth middleware here
router.put('/:id', updateEvent)

// DELETE /api/events/:id - Delete event
// Note: In production, add auth middleware here
router.delete('/:id', deleteEvent)

export default router

