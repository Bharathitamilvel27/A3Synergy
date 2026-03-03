import { useState, useEffect } from 'react'
import { eventsAPI } from '../../services/api'
import { useUserAuth } from '../../context/UserAuthContext'

/**
 * Volunteer Page
 * Information about volunteering and registration form
 * Content references information from a3minds.com
 */
const Volunteer = () => {
  const { user, isAuthenticated } = useUserAuth()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    interests: '',
    availability: '',
    event: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [events, setEvents] = useState([])
  const [loadingEvents, setLoadingEvents] = useState(true)
  const [successMessage, setSuccessMessage] = useState('')

  // Fetch upcoming events on component mount
  useEffect(() => {
    fetchUpcomingEvents()
  }, [])

  // Autofill form with user profile data when user is available
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData(prevData => ({
        ...prevData,
        name: user.name || prevData.name,
        email: user.email || prevData.email,
        phone: user.phone || prevData.phone,
        address: user.address || prevData.address,
      }))
    }
  }, [user, isAuthenticated])

  const fetchUpcomingEvents = async () => {
    try {
      setLoadingEvents(true)
      const response = await eventsAPI.getAll()
      if (response.success) {
        // Filter for upcoming events only
        const upcomingEvents = response.data.filter(event => event.status === 'upcoming')
        setEvents(upcomingEvents)
      }
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      setLoadingEvents(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    // In production, this would send data to the backend API
    console.log('Volunteer registration:', formData)
    setSuccessMessage('Thank you! Your volunteer registration has been submitted successfully.')
    setSubmitted(true)
    // Reset form after 4 seconds
    setTimeout(() => {
      setSubmitted(false)
      setSuccessMessage('')
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        interests: '',
        availability: '',
        event: '',
        message: '',
      })
      setLoading(false)
    }, 4000)
  }

  const benefits = [
    {
      title: 'Make a Difference',
      description: 'Contribute to meaningful causes and see the impact of your efforts.',
      icon: '💝',
      color: 'from-pink-100 to-red-100',
    },
    {
      title: 'Learn & Grow',
      description: 'Develop new skills, gain experience, and expand your network.',
      icon: '📚',
      color: 'from-blue-100 to-cyan-100',
    },
    {
      title: 'Community Connection',
      description: 'Connect with like-minded individuals and build lasting relationships.',
      icon: '🤝',
      color: 'from-green-100 to-emerald-100',
    },
    {
      title: 'Personal Fulfillment',
      description: 'Experience the joy and satisfaction that comes from helping others.',
      icon: '✨',
      color: 'from-purple-100 to-pink-100',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, #0ea5e9 0%, transparent 50%), radial-gradient(circle at 80% 80%, #d946ef 0%, transparent 50%)'
        }}></div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-1 h-6 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full"></div>
              <span className="text-sm font-semibold text-primary-600 uppercase tracking-widest">Join Our Community</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-6 leading-tight">
              Become a Volunteer
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
              Join our passionate team and help create lasting positive change in your community. Your contribution matters.
            </p>
          </div>
        </div>
      </section>

      {/* Why Volunteer Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Volunteer with A3 Minds?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the rewarding experience of making a meaningful impact
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="group">
                <div className={`bg-gradient-to-br ${benefit.color} rounded-2xl p-8 h-full transform transition-all duration-300 hover:scale-105 hover:shadow-lg`}>
                  <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{benefit.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Information Section */}
      <section className="section-padding bg-white/50 backdrop-blur-sm">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-10 items-start max-w-6xl mx-auto">
            <div className="lg:col-span-2">
              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 flex items-center justify-center bg-primary-100 rounded-lg text-primary-600 text-lg">✓</div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      What We Look For
                    </h2>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <span className="text-primary-500 font-bold mt-1">•</span>
                      <span className="text-gray-700">Passion for community service and social impact</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-500 font-bold mt-1">•</span>
                      <span className="text-gray-700">Commitment and reliability</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-500 font-bold mt-1">•</span>
                      <span className="text-gray-700">Willingness to learn and collaborate</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-500 font-bold mt-1">•</span>
                      <span className="text-gray-700">Respect for diversity and inclusion</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary-500 font-bold mt-1">•</span>
                      <span className="text-gray-700">Positive attitude and enthusiasm</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 flex items-center justify-center bg-secondary-100 rounded-lg text-secondary-600 text-lg">🎯</div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Opportunities
                    </h2>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <span className="text-secondary-500 font-bold mt-1">•</span>
                      <span className="text-gray-700">Event planning and coordination</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-secondary-500 font-bold mt-1">•</span>
                      <span className="text-gray-700">Workshop facilitation and teaching</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-secondary-500 font-bold mt-1">•</span>
                      <span className="text-gray-700">Community outreach and awareness</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-secondary-500 font-bold mt-1">•</span>
                      <span className="text-gray-700">Administrative support</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-secondary-500 font-bold mt-1">•</span>
                      <span className="text-gray-700">Content creation and social media</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-secondary-500 font-bold mt-1">•</span>
                      <span className="text-gray-700">Fundraising and donor relations</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-xl bg-gray-100">
                <img
                  src="/pics/pic6.webp"
                  alt="Volunteers working together at an A3 Minds event"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 mb-2">
                <div className="w-1 h-6 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full"></div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  Register as Volunteer
                </h2>
              </div>
              <p className="text-gray-600 mt-2">Fill out the form to join our volunteer team</p>
            </div>

            {/* Autofill Notification */}
            {isAuthenticated && (
              <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-blue-900">Profile Auto-filled</p>
                  <p className="text-sm text-blue-700">Your profile information has been automatically filled in for your convenience.</p>
                </div>
              </div>
            )}

            {submitted ? (
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg border border-green-200">
                <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-emerald-50"></div>
                <div className="relative p-10 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-green-900 mb-2">
                    Thank You!
                  </h3>
                  <p className="text-green-700 text-lg max-w-lg mx-auto">
                    {successMessage}
                  </p>
                  <p className="text-green-600 text-sm mt-4">
                    Our team will review your application and reach out to you soon.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg shadow-primary-100/20 overflow-hidden">
                <div className="p-8 space-y-8">
                  
                  {/* Section 1: Contact Information */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-6 flex items-center gap-2">
                      <span className="w-6 h-6 flex items-center justify-center bg-primary-100 text-primary-600 rounded-lg text-xs">📋</span>
                      Contact Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all duration-200 bg-white hover:border-gray-300"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all duration-200 bg-white hover:border-gray-300"
                        />
                      </div>
                    </div>
                    <div className="mt-6">
                      <label htmlFor="phone" className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all duration-200 bg-white hover:border-gray-300"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  {/* Section 2: Volunteer Details */}
                  <div className="border-t border-gray-100 pt-8">
                    <h3 className="text-sm font-semibold text-gray-900 mb-6 flex items-center gap-2">
                      <span className="w-6 h-6 flex items-center justify-center bg-secondary-100 text-secondary-600 rounded-lg text-xs">🎯</span>
                      Volunteer Details
                    </h3>
                    <div>
                      <label htmlFor="event" className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">
                        Select Event to Volunteer For
                      </label>
                      {loadingEvents ? (
                        <div className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500 text-sm">
                          Loading upcoming events...
                        </div>
                      ) : (
                        <select
                          id="event"
                          name="event"
                          value={formData.event}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all duration-200 bg-white hover:border-gray-300"
                        >
                          <option value="">-- Select an upcoming event --</option>
                          {events.length > 0 ? (
                            events.map((event) => (
                              <option key={event._id} value={event._id}>
                                {event.title} - {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </option>
                            ))
                          ) : (
                            <option value="" disabled>No upcoming events available</option>
                          )}
                        </select>
                      )}
                    </div>
                    <div className="mt-6">
                      <label htmlFor="interests" className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">
                        Areas of Interest
                      </label>
                      <input
                        type="text"
                        id="interests"
                        name="interests"
                        value={formData.interests}
                        onChange={handleChange}
                        placeholder="e.g., Education, Health, Environment"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all duration-200 bg-white hover:border-gray-300"
                      />
                    </div>
                  </div>

                  {/* Section 3: Availability & Location */}
                  <div className="border-t border-gray-100 pt-8">
                    <h3 className="text-sm font-semibold text-gray-900 mb-6 flex items-center gap-2">
                      <span className="w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-600 rounded-lg text-xs">📍</span>
                      Additional Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="availability" className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">
                          Availability
                        </label>
                        <select
                          id="availability"
                          name="availability"
                          value={formData.availability}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all duration-200 bg-white hover:border-gray-300"
                        >
                          <option value="">Select availability</option>
                          <option value="weekdays">Weekdays</option>
                          <option value="weekends">Weekends</option>
                          <option value="both">Both Weekdays & Weekends</option>
                          <option value="flexible">Flexible</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="address" className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">
                          Address
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="City, State"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all duration-200 bg-white hover:border-gray-300"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 4: Message */}
                  <div className="border-t border-gray-100 pt-8">
                    <h3 className="text-sm font-semibold text-gray-900 mb-6 flex items-center gap-2">
                      <span className="w-6 h-6 flex items-center justify-center bg-purple-100 text-purple-600 rounded-lg text-xs">💬</span>
                      Tell Us Your Story
                    </h3>
                    <label htmlFor="message" className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">
                      Why do you want to volunteer with A3 Minds?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Share your motivation and what you hope to contribute..."
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all duration-200 bg-white hover:border-gray-300 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="border-t border-gray-100 pt-8">
                    <button 
                      type="submit" 
                      disabled={loading} 
                      className="w-full px-6 py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg text-lg"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          ✓ Submit Registration
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Volunteer

