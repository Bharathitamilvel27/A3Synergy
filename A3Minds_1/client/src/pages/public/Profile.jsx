import { useState, useEffect } from 'react'
import { useUserAuth } from '../../context/UserAuthContext'

const Profile = () => {
  const { user, isAuthenticated, updateProfile } = useUserAuth()
  const [form, setForm] = useState({ name: '', phone: '', avatar: '' })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (user) {
      setForm({ name: user.name || '', phone: user.phone || '', avatar: user.avatar || '' })
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
        <div className="max-w-lg mx-auto">
          <h2 className="text-2xl font-bold mb-4">Profile</h2>
          {message && <div className="mb-4 text-sm text-green-600">{message}</div>}
          <form onSubmit={handleSubmit} className="space-y-4 card p-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
              <input name="name" value={form.name} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Avatar URL</label>
              <input name="avatar" value={form.avatar} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? 'Saving...' : 'Save changes'}
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Profile

