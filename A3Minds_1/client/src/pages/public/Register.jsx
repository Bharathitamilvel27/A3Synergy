import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserAuth } from '../../context/UserAuthContext'

const Register = () => {
  const navigate = useNavigate()
  const { register } = useUserAuth()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill name, email and password')
      setLoading(false)
      return
    }
    try {
      const res = await register(formData)
      if (res.success) {
        navigate('/events', { replace: true })
      } else {
        setError(res.message)
      }
    } catch (err) {
      setError(err.message || 'Registration failed')
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
            <h2 className="text-2xl font-bold text-gray-900">Create an account</h2>
            <p className="mt-2 text-sm text-gray-600">Register to join events and activities</p>
          </div>

          {error && <div className="mb-4 text-red-600">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <button type="submit" disabled={loading} className="w-full btn-primary">
              {loading ? 'Registering...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-4 text-sm text-center">
            Already have an account? <a href="/login" className="text-primary-600">Sign in</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register

