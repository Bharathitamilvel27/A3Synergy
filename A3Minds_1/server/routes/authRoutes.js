import express from 'express'
import { adminLogin, getCurrentUser } from '../controllers/authController.js'
import { authenticate } from '../middlewares/auth.js'

const router = express.Router()

/**
 * Authentication Routes
 * All routes are prefixed with /api/auth
 */

// POST /api/auth/login - Admin login
router.post('/login', adminLogin)

// GET /api/auth/me - Get current user (protected)
router.get('/me', authenticate, getCurrentUser)

export default router

