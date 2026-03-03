import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUserAuth } from '../../context/UserAuthContext'
import { feedbackAPI } from '../../services/api'

/**
 * Feedback Page
 * Collects feedback from event participants on a rating scale
 */
const Feedback = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useUserAuth()

  const [formData, setFormData] = useState({
    name: '',
    eventName: '',
    registrationId: '',
    eventId: '',
    overallExperience: 5,
    organizationQuality: 5,
    contentRelevance: 5,
    volunteerSupport: 5,
    wouldRecommend: 5,
    comments: '',
  })

  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [error, setError] = useState('')

  // Extract data from navigation state
  useEffect(() => {
    if (location.state) {
      const { userName, eventTitle, registration, event } = location.state
      setFormData(prev => ({
        ...prev,
        name: userName || user?.name || '',
        eventName: eventTitle || '',
        registrationId: registration?._id || '',
        eventId: event?._id || registration?.eventId || '',
      }))
    }
  }, [location.state, user])

  const questions = [
    {
      id: 'overallExperience',
      label: 'How would you rate your overall experience?',
      icon: '⭐'
    },
    {
      id: 'organizationQuality',
      label: 'How well was the event organized?',
      icon: '📋'
    },
    {
      id: 'contentRelevance',
      label: 'How relevant was the content to you?',
      icon: '📚'
    },
    {
      id: 'volunteerSupport',
      label: 'How helpful was the volunteer support?',
      icon: '🤝'
    },
    {
      id: 'wouldRecommend',
      label: 'Would you recommend this event to others?',
      icon: '👥'
    },
  ]

  const handleRatingChange = (questionId, value) => {
    setFormData(prev => ({
      ...prev,
      [questionId]: parseInt(value)
    }))
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    try {
      // Prepare feedback data for submission
      const feedbackData = {
        registrationId: formData.registrationId,
        eventId: formData.eventId,
        participantName: formData.name,
        eventName: formData.eventName,
        ratings: {
          overallExperience: formData.overallExperience,
          organizationQuality: formData.organizationQuality,
          contentRelevance: formData.contentRelevance,
          volunteerSupport: formData.volunteerSupport,
          wouldRecommend: formData.wouldRecommend,
        },
        comments: formData.comments,
      }

      // Validate required fields
      if (!formData.registrationId || !formData.eventId) {
        setError('Unable to submit feedback. Missing registration or event information.')
        setLoading(false)
        return
      }

      // Submit feedback to backend
      const response = await feedbackAPI.submit(feedbackData)
      
      if (response.success) {
        setSuccessMessage('Thank you for your valuable feedback! Your response helps us improve our events.')
        setSubmitted(true)
        
        setTimeout(() => {
          setSubmitted(false)
          navigate('/profile', { replace: true })
        }, 4000)
      } else {
        setError(response.message || 'Failed to submit feedback. Please try again.')
      }
    } catch (err) {
      console.error('Feedback submission error:', err)
      setError(err.response?.data?.message || err.message || 'Error submitting feedback. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getRatingColor = (value) => {
    if (value <= 2) return 'bg-red-100 text-red-700'
    if (value <= 3) return 'bg-orange-100 text-orange-700'
    if (value <= 4) return 'bg-yellow-100 text-yellow-700'
    return 'bg-green-100 text-green-700'
  }

  const getRatingLabel = (value) => {
    const labels = {
      1: 'Poor',
      2: 'Fair',
      3: 'Good',
      4: 'Very Good',
      5: 'Excellent'
    }
    return labels[value] || 'N/A'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-blue-50">
      <section className="section-padding container-custom">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button 
              onClick={() => navigate('/profile')}
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold mb-4 transition-colors"
            >
              <span>←</span> Back to Profile
            </button>
            <div className="inline-flex items-center gap-2 mb-2">
              <div className="w-1 h-6 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full"></div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Event Feedback
              </h1>
            </div>
            <p className="text-gray-600 mt-2">Help us improve by sharing your experience</p>
          </div>

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
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg shadow-primary-100/20 overflow-hidden">
              <div className="p-8 space-y-8">
                
                {/* Error Alert */}
                {error && (
                  <div className="p-4 rounded-xl bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 text-red-700">
                    <p className="font-medium text-sm">⚠️ {error}</p>
                  </div>
                )}
                
                {/* Section 1: Event & Participant Details */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <span className="w-6 h-6 flex items-center justify-center bg-primary-100 text-primary-600 rounded-lg text-xs">📋</span>
                    Event Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">Your Name</label>
                      <input 
                        name="name" 
                        value={formData.name} 
                        readOnly
                        className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl text-gray-600 cursor-not-allowed" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">Event Name</label>
                      <input 
                        name="eventName" 
                        value={formData.eventName} 
                        readOnly
                        className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-xl text-gray-600 cursor-not-allowed" 
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Rating Questions */}
                <div className="border-t border-gray-100 pt-8">
                  <h3 className="text-sm font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <span className="w-6 h-6 flex items-center justify-center bg-secondary-100 text-secondary-600 rounded-lg text-xs">⭐</span>
                    Rate Your Experience
                  </h3>
                  <p className="text-sm text-gray-600 mb-6">Please rate on a scale of 1 (Poor) to 5 (Excellent)</p>
                  
                  <div className="space-y-8">
                    {questions.map((question) => (
                      <div key={question.id}>
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-2xl">{question.icon}</span>
                          <label className="text-sm font-semibold text-gray-700">{question.label}</label>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          {[1, 2, 3, 4, 5].map((value) => (
                            <div key={value} className="flex flex-col items-center gap-2">
                              <label className="relative">
                                <input 
                                  type="radio"
                                  name={question.id}
                                  value={value}
                                  checked={formData[question.id] === value}
                                  onChange={() => handleRatingChange(question.id, value)}
                                  className="sr-only"
                                />
                                <div className={`w-12 h-12 rounded-full border-2 cursor-pointer transition-all duration-200 flex items-center justify-center font-bold text-lg ${
                                  formData[question.id] === value 
                                    ? `${getRatingColor(value)} border-current scale-110` 
                                    : 'border-gray-300 text-gray-600 hover:border-primary-400'
                                }`}>
                                  {value}
                                </div>
                              </label>
                              {formData[question.id] === value && (
                                <span className="text-xs font-semibold text-primary-600">{getRatingLabel(value)}</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 3: Comments */}
                <div className="border-t border-gray-100 pt-8">
                  <h3 className="text-sm font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <span className="w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-600 rounded-lg text-xs">💬</span>
                    Additional Comments
                  </h3>
                  <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">What did you like most? Any suggestions?</label>
                  <textarea 
                    name="comments" 
                    value={formData.comments} 
                    onChange={handleChange} 
                    rows="4"
                    placeholder="Share your thoughts, suggestions, or experiences from the event..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all duration-200 bg-white hover:border-gray-300 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="border-t border-gray-100 pt-8">
                  <button 
                    type="submit" 
                    disabled={loading} 
                    className="w-full px-6 py-4 bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg text-lg"
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
                        ✓ Submit Feedback
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}

export default Feedback
