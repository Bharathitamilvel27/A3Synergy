import express from 'express'
import { registerForEvent, getRegistrationsByEvent, getUserRegistrations } from '../controllers/registrationController.js'
import { authenticate } from '../middlewares/auth.js'

const router = express.Router()

/**
 * Registration Routes
 * All routes prefixed with /api/registrations
 */

// POST /api/registrations/register - register current user for an event
router.post('/register', authenticate, registerForEvent)

// GET /api/registrations/event/:eventId - list registrations (admin)
router.get('/event/:eventId', authenticate, getRegistrationsByEvent)

// GET /api/registrations/me - current user's registrations
router.get('/me', authenticate, getUserRegistrations)

export default router

