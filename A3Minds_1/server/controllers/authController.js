import jwt from 'jsonwebtoken'

/**
 * Authentication Controller
 * Handles admin login and authentication
 */

// Predefined admin credentials
const ADMIN_EMAIL = 'admin123@gmail.com'
const ADMIN_PASSWORD = 'a3admin@123'

/**
 * @desc    Admin login
 * @route   POST /api/auth/login
 * @access  Public
 */
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      })
    }

    // Check credentials
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Generate JWT token
      const token = jwt.sign(
        { email: ADMIN_EMAIL, role: 'admin' },
        process.env.JWT_SECRET,
        { expiresIn: '7d' } // Token expires in 7 days
      )

      res.status(200).json({
        success: true,
        message: 'Login successful',
        token,
        user: {
          email: ADMIN_EMAIL,
          role: 'admin',
        },
      })
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      })
    }
  } catch (error) {
    console.error('Error in admin login:', error)
    res.status(500).json({
      success: false,
      message: 'Error during login',
      error: error.message,
    })
  }
}

/**
 * @desc    Verify token and get current user
 * @route   GET /api/auth/me
 * @access  Private
 */
export const getCurrentUser = async (req, res) => {
  try {
    // User is already attached by auth middleware
    res.status(200).json({
      success: true,
      user: req.user,
    })
  } catch (error) {
    console.error('Error getting current user:', error)
    res.status(500).json({
      success: false,
      message: 'Error getting user information',
      error: error.message,
    })
  }
}

