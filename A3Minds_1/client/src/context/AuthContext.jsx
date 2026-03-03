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

    console.log('AuthContext mount - token:', token)
    console.log('AuthContext mount - savedUser:', savedUser)

    if (token && savedUser) {
      setUser(JSON.parse(savedUser))
      setIsAuthenticated(true)
      console.log('AuthContext mount - authenticated from localStorage')
    }
    setLoading(false)
  }, [])

  /**
   * Login function
   */
  const login = async (email, password) => {
    try {
      console.log('AuthContext login attempt:', { email, password: '***' })
      const response = await authAPI.login(email, password)
      
      console.log('AuthContext login response:', response)
      
      if (response.success) {
        // Store token and user info
        localStorage.setItem('adminToken', response.token)
        localStorage.setItem('adminUser', JSON.stringify(response.user))
        
        setUser(response.user)
        setIsAuthenticated(true)
        
        console.log('AuthContext login successful')
        return { success: true, message: response.message }
      } else {
        console.log('AuthContext login failed:', response.message)
        return { success: false, message: response.message }
      }
    } catch (error) {
      console.error('AuthContext login error:', error)
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

  console.log('AuthContext state:', { user, isAuthenticated, loading })

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

