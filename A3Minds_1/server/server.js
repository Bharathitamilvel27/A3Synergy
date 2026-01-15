import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/database.js'

// Import routes
import eventRoutes from './routes/eventRoutes.js'
import authRoutes from './routes/authRoutes.js'

// Load environment variables
dotenv.config()

// Connect to database
connectDB()

// Initialize Express app
const app = express()

// Middleware
app.use(cors()) // Enable CORS for frontend
app.use(express.json()) // Parse JSON bodies
app.use(express.urlencoded({ extended: true })) // Parse URL-encoded bodies

// Routes
app.use('/api/events', eventRoutes)
app.use('/api/auth', authRoutes)

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  })
})

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'A3 Minds API Server',
    version: '1.0.0',
  })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  })
})

// Start server
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`)
})

