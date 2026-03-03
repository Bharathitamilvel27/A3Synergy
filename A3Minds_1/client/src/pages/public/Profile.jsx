import { useState, useEffect } from 'react'
import { useUserAuth } from '../../context/UserAuthContext'
import { useNavigate } from 'react-router-dom'
import { registrationsAPI } from '../../services/api'

const Profile = () => {
  const { user, isAuthenticated, updateProfile } = useUserAuth()
  const navigate = useNavigate()
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
  const [messageType, setMessageType] = useState('success')
  const [avatarPreview, setAvatarPreview] = useState('')
  const [registrations, setRegistrations] = useState([])
  const [loadingRegistrations, setLoadingRegistrations] = useState(false)

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
      setAvatarPreview(user.avatar || '')
    }
  }, [user])

  // Fetch user's event registrations
  useEffect(() => {
    if (isAuthenticated) {
      fetchRegistrations()
    }
  }, [isAuthenticated])

  const fetchRegistrations = async () => {
    try {
      setLoadingRegistrations(true)
      const response = await registrationsAPI.getMyRegistrations()
      if (response.success) {
        console.log('Registrations fetched:', response.registrations)
        setRegistrations(response.registrations || [])
      }
    } catch (error) {
      console.error('Error fetching registrations:', error)
    } finally {
      setLoadingRegistrations(false)
    }
  }

  const getStatusInfo = (status) => {
    const statusMap = {
      registered: { label: 'Registered', color: 'bg-blue-100 text-blue-700', icon: '📋' },
      confirmed: { label: 'Confirmed', color: 'bg-green-100 text-green-700', icon: '✓' },
      attended: { label: 'Attended', color: 'bg-emerald-100 text-emerald-700', icon: '🎉' },
      cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-700', icon: '✕' },
    }
    return statusMap[status] || { label: status, color: 'bg-gray-100 text-gray-700', icon: '○' }
  }

  const getProgressPercentage = (status) => {
    const progressMap = {
      registered: 25,
      confirmed: 50,
      attended: 100,
      cancelled: 0,
    }
    return progressMap[status] || 0
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return 'N/A'
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    } catch (error) {
      return 'N/A'
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    if (name === 'avatar') {
      setAvatarPreview(value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setLoading(true)
    const res = await updateProfile(form)
    if (res.success) {
      setMessage('✓ Profile updated successfully!')
      setMessageType('success')
    } else {
      setMessage(res.message || '✕ Update failed. Please try again.')
      setMessageType('error')
    }
    setLoading(false)
    setTimeout(() => setMessage(''), 5000)
  }

  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-blue-50">
      <section className="section-padding container-custom">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 mb-2">
              <div className="w-1 h-6 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full"></div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                My Profile
              </h1>
            </div>
            <p className="text-gray-600 mt-2">Manage your personal information and settings</p>
          </div>

          {/* Alert Message */}
          {message && (
            <div className={`mb-6 p-4 rounded-xl transition-all duration-300 ${
              messageType === 'success' 
                ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-700' 
                : 'bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 text-red-700'
            }`}>
              <p className="font-medium text-sm">{message}</p>
            </div>
          )}

          {/* Main Form Card */}
          <div className="bg-white rounded-2xl shadow-lg shadow-primary-100/20 overflow-hidden">
            
            {/* Profile Header Section */}
            <div className="relative h-32 bg-gradient-to-r from-primary-500/10 via-primary-300/10 to-secondary-500/10">
              <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: 'radial-gradient(circle at 20% 50%, #0ea5e9 0%, transparent 50%), radial-gradient(circle at 80% 80%, #d946ef 0%, transparent 50%)'
              }}></div>
            </div>

            {/* Avatar Section - Positioned over header */}
            <div className="px-6 pb-6">
              <div className="flex flex-col items-center -mt-20 mb-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary-100 to-secondary-100 border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
                    {avatarPreview ? (
                      <img 
                        src={avatarPreview} 
                        alt="Profile" 
                        className="w-full h-full object-cover" 
                        onError={() => (
                          <div className="w-full h-full flex items-center justify-center text-4xl text-primary-300">👤</div>
                        )}
                      />
                    ) : (
                      <div className="text-5xl text-primary-400">👤</div>
                    )}
                  </div>
                  <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
                </div>
                <h2 className="mt-4 text-2xl font-bold text-gray-900">{form.name || 'Your Name'}</h2>
                <p className="text-sm text-gray-600 mt-1">{form.email}</p>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Section 1: Contact Information */}
                <div className="border-t border-gray-100 pt-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 flex items-center justify-center bg-primary-100 text-primary-600 rounded-lg text-xs">📋</span>
                    Contact Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">Full Name</label>
                      <input 
                        name="name" 
                        value={form.name} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all duration-200 bg-white hover:border-gray-300" 
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">Email Address</label>
                      <input 
                        name="email" 
                        value={form.email} 
                        readOnly 
                        className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl text-gray-600 cursor-not-allowed" 
                      />
                      <p className="text-xs text-gray-500 mt-1.5">Cannot be changed</p>
                    </div>
                  </div>
                </div>

                {/* Section 2: Personal Information */}
                <div className="border-t border-gray-100 pt-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 flex items-center justify-center bg-secondary-100 text-secondary-600 rounded-lg text-xs">👤</span>
                    Personal Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">Phone Number</label>
                      <input 
                        name="phone" 
                        value={form.phone} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all duration-200 bg-white hover:border-gray-300" 
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">Age</label>
                      <input 
                        type="number"
                        name="age" 
                        value={form.age} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all duration-200 bg-white hover:border-gray-300" 
                        min="1"
                        max="120"
                        placeholder="25"
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">Gender</label>
                    <select 
                      name="gender" 
                      value={form.gender} 
                      onChange={handleChange} 
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all duration-200 bg-white hover:border-gray-300"
                    >
                      <option value="prefer-not-to-say">Prefer not to say</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Section 3: Address & Image */}
                <div className="border-t border-gray-100 pt-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-600 rounded-lg text-xs">📍</span>
                    Additional Information
                  </h3>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">Address</label>
                    <textarea 
                      name="address" 
                      value={form.address} 
                      onChange={handleChange} 
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all duration-200 bg-white hover:border-gray-300 resize-none" 
                      placeholder="123 Main Street, City, State - 600001"
                    />
                  </div>
                  <div className="mt-6">
                    <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">Profile Picture URL</label>
                    <input 
                      name="avatar" 
                      value={form.avatar} 
                      onChange={handleChange} 
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all duration-200 bg-white hover:border-gray-300" 
                      placeholder="https://example.com/avatar.jpg"
                    />
                    <p className="text-xs text-gray-500 mt-1.5">Enter a URL to your profile picture</p>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="border-t border-gray-100 pt-6">
                  <button 
                    type="submit" 
                    disabled={loading} 
                    className="w-full px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving Changes...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        ✓ Save Changes
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Activities & Events Section */}
      <section className="section-padding bg-white/50 backdrop-blur-sm">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 mb-2">
                <div className="w-1 h-6 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full"></div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  Your Activities
                </h2>
              </div>
              <p className="text-gray-600 mt-2">Track your event participation and volunteer contributions</p>
            </div>

            {loadingRegistrations ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <svg className="animate-spin h-12 w-12 text-primary-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className="text-gray-600">Loading your activities...</p>
                </div>
              </div>
            ) : registrations && registrations.length > 0 ? (
              <div className="space-y-6">
                {registrations.map((registration, index) => {
                  const event = registration.eventId || {}
                  const statusInfo = getStatusInfo(registration.status)
                  const progress = getProgressPercentage(registration.status)
                  const isCompleted = registration.status === 'attended'
                  
                  // Get event data with fallbacks
                  const eventTitle = event?.title || event?.name || 'Event'
                  const eventDate = event?.date || null
                  const eventLocation = event?.location || 'Location TBA'
                  const eventParticipants = event?.participants ?? 0
                  const eventBeneficiaries = event?.beneficiaries ?? 0
                  const registeredDate = registration.registeredAt || registration.createdAt || new Date().toISOString()

                  return (
                    <div key={index} className="bg-white rounded-2xl shadow-md shadow-primary-100/20 overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                          <div className="flex-1">
                            <div className="flex items-start gap-3 mb-2">
                              <span className="text-3xl">{eventTitle?.toLowerCase().includes('education') ? '📚' : eventTitle?.toLowerCase().includes('health') ? '🏥' : eventTitle?.toLowerCase().includes('environment') ? '🌱' : '🎯'}</span>
                              <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-900">{eventTitle}</h3>
                                <p className="text-sm text-gray-600 mt-1">
                                  📅 {formatDate(eventDate)} • 📍 {eventLocation}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 ${statusInfo.color} flex-shrink-0`}>
                            <span>{statusInfo.icon}</span>
                            <span>{statusInfo.label}</span>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-6">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold text-gray-700">Event Progress</span>
                            <span className="text-xs font-bold text-primary-600">{progress}%</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                isCompleted
                                  ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                                  : 'bg-gradient-to-r from-primary-400 to-primary-600'
                              }`}
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Event Details */}
                        <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-gray-100 mb-4">
                          <div>
                            <p className="text-xs text-gray-600 uppercase tracking-wider font-semibold mb-1">Event Date</p>
                            <p className="text-lg font-bold text-gray-900">{formatDate(eventDate)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 uppercase tracking-wider font-semibold mb-1">Registered On</p>
                            <p className="text-lg font-bold text-gray-900">{formatDate(registeredDate)}</p>
                          </div>
                        </div>

                        {/* Feedback Button */}
                        <button 
                          onClick={() => navigate('/feedback', { 
                            state: { 
                              registration,
                              event,
                              eventTitle,
                              userName: form.name 
                            } 
                          })}
                          className="w-full px-4 py-3 bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                        >
                          <span>💬</span>
                          Share Feedback
                        </button>

                      
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📭</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Activities Yet</h3>
                <p className="text-gray-600 mb-6">Start volunteering and participating in events to see your progress here.</p>
                <a href="/volunteer" className="inline-block px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg">
                  🙋 Become a Volunteer
                </a>
              </div>
            )}

            {/* Stats Summary */}
            {registrations && registrations.length > 0 && (
              <div className="grid md:grid-cols-3 gap-6 mt-12 pt-12 border-t border-gray-200">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 font-semibold mb-1">Total Events</p>
                      <p className="text-4xl font-bold text-primary-600">{registrations?.length || 0}</p>
                    </div>
                    <span className="text-4xl">📊</span>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 font-semibold mb-1">Completed</p>
                      <p className="text-4xl font-bold text-green-600">{registrations?.filter(r => r.status === 'attended')?.length || 0}</p>
                    </div>
                    <span className="text-4xl">✓</span>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 font-semibold mb-1">In Progress</p>
                      <p className="text-4xl font-bold text-purple-600">{registrations?.filter(r => r.status !== 'attended' && r.status !== 'cancelled')?.length || 0}</p>
                    </div>
                    <span className="text-4xl">🔄</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Profile

