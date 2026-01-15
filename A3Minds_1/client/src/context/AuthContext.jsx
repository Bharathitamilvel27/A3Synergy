import { createContext, useContext, useState, useEffect } from 'react'
import { authAPI } from '../services/api'

/**
 * Authentication Context
 * Manages admin authentication state across the application
 */
const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    const savedUser = localStorage.getItem('adminUser')

    if (token && savedUser) {
      setUser(JSON.parse(savedUser))
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [])

  /**
   * Login function
   */
  const login = async (email, password) => {
    try {
      const response = await authAPI.login(email, password)
      
      if (response.success) {
        // Store token and user info
        localStorage.setItem('adminToken', response.token)
        localStorage.setItem('adminUser', JSON.stringify(response.user))
        
        setUser(response.user)
        setIsAuthenticated(true)
        
        return { success: true, message: response.message }
      } else {
        return { success: false, message: response.message }
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed. Please try again.',
      }
    }
  }

  /**
   * Logout function
   */
  const logout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
    setUser(null)
    setIsAuthenticated(false)
  }

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

