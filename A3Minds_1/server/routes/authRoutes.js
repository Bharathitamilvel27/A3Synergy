import express from 'express'
import { adminLogin, getCurrentUser, registerUser, loginUser, updateProfile } from '../controllers/authController.js'
import { authenticate } from '../middlewares/auth.js'

const router = express.Router()

/**
 * Authentication Routes
 * All routes are prefixed with /api/auth
 */

// POST /api/auth/login - Admin login
router.post('/login', adminLogin)

// POST /api/auth/register - User registration
router.post('/register', registerUser)

// POST /api/auth/login-user - User login
router.post('/login-user', loginUser)

// GET /api/auth/me - Get current user (protected)
router.get('/me', authenticate, getCurrentUser)
// PUT /api/auth/me - Update current user profile
router.put('/me', authenticate, updateProfile)

export default router

