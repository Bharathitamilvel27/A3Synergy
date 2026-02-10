import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserAuth } from '../../context/UserAuthContext'

const Login = () => {
  const { login } = useUserAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await login(formData.email, formData.password)
      if (res.success) {
        navigate('/events', { replace: true })
      } else {
        setError(res.message)
      }
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-6">
            <div className="mx-auto w-20 h-20 rounded-lg overflow-hidden mb-4">
              <img src="/pics/ANTONY-TRUST-LOGO.webp" alt="logo" className="w-full h-full object-contain" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Sign in</h2>
            <p className="mt-2 text-sm text-gray-600">Login to register for events</p>
          </div>

          {error && <div className="mb-4 text-red-600">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>

            <button type="submit" disabled={loading} className="w-full btn-primary">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-4 text-sm text-center">
            Don't have an account? <a href="/register" className="text-primary-600">Create one</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

