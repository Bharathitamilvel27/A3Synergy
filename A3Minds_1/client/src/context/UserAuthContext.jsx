import { createContext, useContext, useState, useEffect } from 'react'
import { userAuthAPI } from '../services/api'

const UserAuthContext = createContext()

export const useUserAuth = () => {
  const context = useContext(UserAuthContext)
  if (!context) {
    throw new Error('useUserAuth must be used within UserAuthProvider')
  }
  return context
}

export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const savedUser = localStorage.getItem('authUser')
    if (token && savedUser) {
      setUser(JSON.parse(savedUser))
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [])

  const register = async (payload) => {
    try {
      const res = await userAuthAPI.register(payload)
      if (res.success) {
        localStorage.setItem('token', res.token)
        localStorage.setItem('authUser', JSON.stringify(res.user))
        setUser(res.user)
        setIsAuthenticated(true)
      }
      return res
    } catch (err) {
      return { success: false, message: err.response?.data?.message || err.message }
    }
  }

  const login = async (email, password) => {
    try {
      const res = await userAuthAPI.login(email, password)
      if (res.success) {
        localStorage.setItem('token', res.token)
        localStorage.setItem('authUser', JSON.stringify(res.user))
        setUser(res.user)
        setIsAuthenticated(true)
      }
      return res
    } catch (err) {
      return { success: false, message: err.response?.data?.message || err.message }
    }
  }

  const updateProfile = async (payload) => {
    try {
      const res = await userAuthAPI.updateProfile(payload)
      if (res.success) {
        // refresh local user
        localStorage.setItem('authUser', JSON.stringify(res.user))
        setUser(res.user)
      }
      return res
    } catch (err) {
      return { success: false, message: err.response?.data?.message || err.message }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('authUser')
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <UserAuthContext.Provider value={{ user, loading, isAuthenticated, register, login, logout, updateProfile }}>
      {children}
    </UserAuthContext.Provider>
  )
}

