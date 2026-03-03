import { useState, useEffect } from 'react'
import { useUserAuth } from '../../context/UserAuthContext'

const Profile = () => {
  const { user, isAuthenticated, updateProfile } = useUserAuth()
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    age: '', 
    gender: 'prefer-not-to-say', 
    address: '', 
    avatar: '' 
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (user) {
      setForm({ 
        name: user.name || '', 
        email: user.email || '', 
        phone: user.phone || '', 
        age: user.age || '', 
        gender: user.gender || 'prefer-not-to-say', 
        address: user.address || '', 
        avatar: user.avatar || '' 
      })
    }
  }, [user])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setLoading(true)
    const res = await updateProfile(form)
    if (res.success) {
      setMessage('Profile updated')
    } else {
      setMessage(res.message || 'Update failed')
    }
    setLoading(false)
  }

  if (!isAuthenticated) return null

  return (
    <div className="bg-white min-h-screen">
      <section className="section-padding container-custom">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">My Profile</h2>
          {message && <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">{message}</div>}
          <form onSubmit={handleSubmit} className="space-y-6 card p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input 
                  name="name" 
                  value={form.name} 
                  onChange={handleChange} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input 
                  name="email" 
                  value={form.email} 
                  readOnly 
                  className="w-full px-4 py-2 border border-gray-200 bg-gray-50 rounded-lg text-gray-600" 
                />
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input 
                  name="phone" 
                  value={form.phone} 
                  onChange={handleChange} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" 
                  placeholder="+91 98765 43210"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <input 
                  type="number"
                  name="age" 
                  value={form.age} 
                  onChange={handleChange} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" 
                  min="1"
                  max="120"
                  placeholder="25"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <select 
                name="gender" 
                value={form.gender} 
                onChange={handleChange} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="prefer-not-to-say">Prefer not to say</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <textarea 
                name="address" 
                value={form.address} 
                onChange={handleChange} 
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" 
                placeholder="123 Main Street, City, State - 600001"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture URL</label>
              <input 
                name="avatar" 
                value={form.avatar} 
                onChange={handleChange} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" 
                placeholder="https://example.com/avatar.jpg"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="btn-primary w-full py-3 text-lg font-medium disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Profile

