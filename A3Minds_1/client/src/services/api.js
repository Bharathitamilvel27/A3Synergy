import axios from 'axios'

/**
 * API Service
 * Centralized configuration for API calls
 */

// Base URL for backend API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token (supports adminToken and user token)
api.interceptors.request.use(
  (config) => {
    const adminToken = localStorage.getItem('adminToken')
    const token = localStorage.getItem('token')
    const authToken = adminToken || token
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle connection errors
    if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
      const customError = new Error('Cannot connect to server. Please ensure the backend server is running on port 5000.')
      customError.isConnectionError = true
      return Promise.reject(customError)
    }

    if (error.response?.status === 401) {
      // Token expired or invalid - clear tokens and redirect appropriately
      const adminToken = localStorage.getItem('adminToken')
      if (adminToken) {
        localStorage.removeItem('adminToken')
        localStorage.removeItem('adminUser')
        window.location.href = '/admin/login'
      } else {
        localStorage.removeItem('token')
        localStorage.removeItem('authUser')
        // If on admin area, redirect to admin login; otherwise go to user login
        if (window.location.pathname.startsWith('/admin')) {
          window.location.href = '/admin/login'
        } else {
          window.location.href = '/login'
        }
      }
    }
    return Promise.reject(error)
  }
)

/**
 * Auth API
 */
export const authAPI = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  },
  getCurrentUser: async () => {
    const response = await api.get('/auth/me')
    return response.data
  },
}

export const userAuthAPI = {
  register: async (payload) => {
    const response = await api.post('/auth/register', payload)
    return response.data
  },
  login: async (email, password) => {
    const response = await api.post('/auth/login-user', { email, password })
    return response.data
  },
  getCurrentUser: async () => {
    const response = await api.get('/auth/me')
    return response.data
  },
  updateProfile: async (payload) => {
    const response = await api.put('/auth/me', payload)
    return response.data
  },
}

export const registrationsAPI = {
  registerForEvent: async (eventId, data = {}) => {
    const response = await api.post('/registrations/register', { eventId, ...data })
    return response.data
  },
  getByEvent: async (eventId) => {
    const response = await api.get(`/registrations/event/${eventId}`)
    return response.data
  },
  getMyRegistrations: async () => {
    const response = await api.get('/registrations/me')
    return response.data
  },
  exportToCSV: async (eventId) => {
    const response = await api.get(`/registrations/export/${eventId}`, {
      responseType: 'blob'
    })
    return response.data
  },
}

/**
 * Events API
 */
export const eventsAPI = {
  getAll: async (status) => {
    const params = status ? { status } : {}
    const response = await api.get('/events', { params })
    return response.data
  },
  getById: async (id) => {
    const response = await api.get(`/events/${id}`)
    return response.data
  },
  create: async (eventData) => {
    const response = await api.post('/events', eventData)
    return response.data
  },
  update: async (id, eventData) => {
    const response = await api.put(`/events/${id}`, eventData)
    return response.data
  },
  delete: async (id) => {
    const response = await api.delete(`/events/${id}`)
    return response.data
  },
}

export default api

