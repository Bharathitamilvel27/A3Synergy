import express from 'express'
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from '../controllers/eventController.js'
import { authenticate } from '../middlewares/auth.js'

const router = express.Router()

/**
 * Event Routes
 * All routes are prefixed with /api/events
 */

// GET /api/events - Get all events (public)
router.get('/', getEvents)

// GET /api/events/:id - Get single event (public)
router.get('/:id', getEventById)

// POST /api/events - Create new event (admin only)
router.post('/', authenticate, createEvent)

// PUT /api/events/:id - Update event (admin only)
router.put('/:id', authenticate, updateEvent)

// DELETE /api/events/:id - Delete event (admin only)
router.delete('/:id', authenticate, deleteEvent)

export default router

