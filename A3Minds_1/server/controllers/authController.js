import jwt from 'jsonwebtoken'
import User from '../models/User.js'

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

    console.log('Login attempt:', { email, password: '***' })

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      })
    }

    // Check credentials
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      console.log('Credentials match - generating token')
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
      console.log('Credentials mismatch:', { 
        inputEmail: email, 
        expectedEmail: ADMIN_EMAIL,
        passwordsMatch: password === ADMIN_PASSWORD
      })
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
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email and password are required' })
    }

    const existing = await User.findOne({ email: email.toLowerCase() })
    if (existing) {
      return res.status(409).json({ success: false, message: 'Email already registered' })
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      phone,
    })

    const token = jwt.sign({ id: user._id, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '7d' })

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    })
  } catch (error) {
    console.error('Error in user registration:', error)
    res.status(500).json({ success: false, message: 'Error registering user', error: error.message })
  }
}

/**
 * @desc    User login
 * @route   POST /api/auth/login-user
 * @access  Public
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' })
    }

    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' })
    }

    const isMatch = await user.matchPassword(password)
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' })
    }

    const token = jwt.sign({ id: user._id, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '7d' })

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    })
  } catch (error) {
    console.error('Error in user login:', error)
    res.status(500).json({ success: false, message: 'Error during login', error: error.message })
  }
}
/**
 * @desc    Verify token and get current user
 * @route   GET /api/auth/me
 * @access  Private
 */
export const getCurrentUser = async (req, res) => {
  try {
    // If this is a user token (includes id), fetch user from DB for full profile
    if (req.user && req.user.role === 'user' && req.user.id) {
      const user = await User.findById(req.user.id).select('-password')
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' })
      }
      return res.status(200).json({ success: true, user })
    }

    // For admin tokens or generic tokens, return decoded payload
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

/**
 * @desc    Update current user's profile
 * @route   PUT /api/auth/me
 * @access  Private (user)
 */
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user?.id
    if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' })

    const { name, phone, age, gender, address, avatar } = req.body

    const user = await User.findById(userId)
    if (!user) return res.status(404).json({ success: false, message: 'User not found' })

    if (name) user.name = name
    if (phone) user.phone = phone
    if (age !== undefined) user.age = age
    if (gender) user.gender = gender
    if (address) user.address = address
    if (avatar) user.avatar = avatar

    await user.save()

    res.status(200).json({ success: true, message: 'Profile updated', user: { id: user._id, name: user.name, email: user.email, phone: user.phone, age: user.age, gender: user.gender, address: user.address, avatar: user.avatar } })
  } catch (error) {
    console.error('Error updating profile:', error)
    res.status(500).json({ success: false, message: 'Error updating profile', error: error.message })
  }
}
