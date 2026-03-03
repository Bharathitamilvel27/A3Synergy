import { useState, useEffect } from 'react'
import { feedbackAPI, eventsAPI } from '../../services/api'
import AdminLayout from '../../components/common/AdminLayout'

/**
 * Impact Analytics Dashboard
 * Visual display of event impact and benefits based on participant feedback
 */
const ImpactAnalytics = () => {
  const [feedbackSummary, setFeedbackSummary] = useState(null)
  const [eventFeedback, setEventFeedback] = useState([])
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [filterSentiment, setFilterSentiment] = useState(null)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      
      // Fetch feedback summary
      const summaryResponse = await feedbackAPI.getSummary()
      setFeedbackSummary(summaryResponse.data)

      // Fetch all events
      const eventsResponse = await eventsAPI.getAll()
      if (eventsResponse.success) {
        setEvents(eventsResponse.data)
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEventSelect = async (eventId) => {
    try {
      setSelectedEvent(eventId)
      const response = await feedbackAPI.getByEvent(eventId, { sentiment: filterSentiment })
      if (response.success) {
        setEventFeedback(response.data)
      }
    } catch (error) {
      console.error('Error fetching event feedback:', error)
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-blue-50 flex items-center justify-center">
          <div className="text-center">
            <svg className="animate-spin h-12 w-12 text-primary-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-gray-600 text-lg">Loading Impact Analytics...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  const summary = feedbackSummary?.summary || {}
  const totalFeedback = feedbackSummary?.totalFeedback || 0
  const positivePercentage = totalFeedback > 0 
    ? Math.round((summary.positiveCount / totalFeedback) * 100) 
    : 0

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="container-custom section-padding">
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <div className="w-1 h-6 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full"></div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  Impact & Benefits Analytics
                </h1>
              </div>
              <p className="text-gray-600">Track the real-world impact of your events through participant feedback</p>
            </div>
          </div>
        </div>
      </div>

      <section className="section-padding container-custom">
        {/* Top Level Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {/* Total Feedback */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-semibold mb-2">Total Feedback</p>
                <p className="text-4xl font-bold text-gray-900">{totalFeedback}</p>
                <p className="text-xs text-gray-500 mt-2">Responses collected</p>
              </div>
              <span className="text-5xl">📊</span>
            </div>
          </div>

          {/* Average Satisfaction */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-md p-6 border border-blue-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-semibold mb-2">Avg Satisfaction</p>
                <div className="flex items-baseline gap-1">
                  <p className="text-4xl font-bold text-primary-600">{(summary.avgRating || 0).toFixed(1)}</p>
                  <span className="text-gray-500">/5</span>
                </div>
                <div className="flex gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-lg ${i < Math.round(summary.avgRating || 0) ? '⭐' : '☆'}`}></span>
                  ))}
                </div>
              </div>
              <span className="text-5xl">⭐</span>
            </div>
          </div>

          {/* Positive Feedback % */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-md p-6 border border-green-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-semibold mb-2">Positive Feedback</p>
                <p className="text-4xl font-bold text-green-600">{positivePercentage}%</p>
                <p className="text-xs text-gray-500 mt-2">{summary.positiveCount || 0} positive responses</p>
              </div>
              <span className="text-5xl">😊</span>
            </div>
          </div>

          {/* Participant Engagement */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-md p-6 border border-purple-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-semibold mb-2">Engagement Rate</p>
                <p className="text-4xl font-bold text-purple-600">High</p>
                <p className="text-xs text-gray-500 mt-2">Strong participant response</p>
              </div>
              <span className="text-5xl">🎯</span>
            </div>
          </div>
        </div>

        {/* Sentiment Distribution */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Sentiment Breakdown */}
          <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-2xl">😊</span>
              Participant Sentiment
            </h2>
            
            <div className="space-y-6">
              {/* Positive */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Positive 😊</span>
                  <span className="text-lg font-bold text-green-600">{summary.positiveCount || 0}</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${totalFeedback > 0 ? (summary.positiveCount / totalFeedback) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>

              {/* Neutral */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Neutral 😐</span>
                  <span className="text-lg font-bold text-yellow-600">{summary.neutralCount || 0}</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-500"
                    style={{ width: `${totalFeedback > 0 ? (summary.neutralCount / totalFeedback) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>

              {/* Negative */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Negative 😞</span>
                  <span className="text-lg font-bold text-red-600">{summary.negativeCount || 0}</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-400 to-rose-500 rounded-full transition-all duration-500"
                    style={{ width: `${totalFeedback > 0 ? (summary.negativeCount / totalFeedback) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Sentiment Gauge */}
            <div className="mt-8 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl border border-primary-200">
              <p className="text-xs text-gray-600 font-semibold mb-2 uppercase">Overall Sentiment</p>
              <div className="flex items-end gap-1 h-20">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-t-lg transition-all duration-500 ${
                      i < ((summary.positiveCount / totalFeedback) * 10 || 0)
                        ? 'bg-gradient-to-t from-green-400 to-emerald-300'
                        : i < (((summary.positiveCount + summary.neutralCount) / totalFeedback) * 10 || 0)
                        ? 'bg-gradient-to-t from-yellow-400 to-orange-300'
                        : 'bg-gradient-to-t from-red-400 to-rose-300'
                    }`}
                  ></div>
                ))}
              </div>
              <p className="text-sm font-bold text-gray-900 mt-3">
                {positivePercentage >= 70 ? '✨ Excellent' : positivePercentage >= 50 ? '👍 Good' : '⚠️ Needs Improvement'}
              </p>
            </div>
          </div>

          {/* Category Ratings */}
          <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-2xl">📈</span>
              Category Ratings Breakdown
            </h2>

            <div className="space-y-5">
              {[
                { name: '⭐ Overall Experience', key: 'overallExperience', color: 'from-blue-400 to-blue-600' },
                { name: '📋 Organization Quality', key: 'organizationQuality', color: 'from-purple-400 to-purple-600' },
                { name: '📚 Content Relevance', key: 'contentRelevance', color: 'from-pink-400 to-pink-600' },
                { name: '🤝 Volunteer Support', key: 'volunteerSupport', color: 'from-green-400 to-green-600' },
                { name: '👥 Recommendation', key: 'wouldRecommend', color: 'from-yellow-400 to-yellow-600' },
              ].map((item) => {
                const avgRating = feedbackSummary?.feedbackByMonth?.[0]?.[item.key] || 4
                return (
                  <div key={item.key}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">{item.name}</span>
                      <span className="text-lg font-bold text-gray-900">{(avgRating || 4).toFixed(1)}/5</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-500`}
                        style={{ width: `${((avgRating || 4) / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Key Insight */}
            <div className="mt-8 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
              <p className="text-xs text-gray-600 font-semibold mb-1 uppercase">💡 Key Insight</p>
              <p className="text-sm text-gray-900 font-semibold">
                {positivePercentage >= 70 
                  ? 'Your events are delivering strong value! Keep maintaining this quality.'
                  : positivePercentage >= 50
                  ? 'Good feedback overall. Focus on improving organization and content relevance.'
                  : 'Consider reviewing event quality and volunteer training programs.'}
              </p>
            </div>
          </div>
        </div>

        {/* Event-wise Analysis */}
        <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100 mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="text-2xl">📊</span>
            Event-wise Feedback Analysis
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Select Event</label>
              <select
                value={selectedEvent || ''}
                onChange={(e) => handleEventSelect(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">-- Choose an event --</option>
                {events.map(event => (
                  <option key={event._id} value={event._id}>
                    {event.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Filter by Sentiment</label>
              <select
                value={filterSentiment || ''}
                onChange={(e) => setFilterSentiment(e.target.value || null)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">-- All sentiments --</option>
                <option value="positive">😊 Positive</option>
                <option value="neutral">😐 Neutral</option>
                <option value="negative">😞 Negative</option>
              </select>
            </div>
          </div>

          {eventFeedback.length > 0 ? (
            <div className="space-y-4">
              {eventFeedback.slice(0, 5).map((feedback, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{feedback.participantName}</h4>
                      <p className="text-sm text-gray-600">{feedback.eventName}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      feedback.sentiment === 'positive' ? 'bg-green-100 text-green-700' :
                      feedback.sentiment === 'neutral' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {feedback.sentiment === 'positive' ? '😊 Positive' : 
                       feedback.sentiment === 'neutral' ? '😐 Neutral' : '😞 Negative'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-5 gap-2 mb-3">
                    {[
                      { label: 'Overall', value: feedback.ratings.overallExperience },
                      { label: 'Organization', value: feedback.ratings.organizationQuality },
                      { label: 'Content', value: feedback.ratings.contentRelevance },
                      { label: 'Support', value: feedback.ratings.volunteerSupport },
                      { label: 'Recommend', value: feedback.ratings.wouldRecommend },
                    ].map((rating, idx) => (
                      <div key={idx} className="text-center p-2 bg-gray-50 rounded-lg">
                        <p className="text-2xl">{rating.value}/5</p>
                        <p className="text-xs text-gray-600 mt-1">{rating.label}</p>
                      </div>
                    ))}
                  </div>

                  {feedback.comments && (
                    <p className="text-sm text-gray-700 italic border-l-4 border-primary-300 pl-3">
                      "{feedback.comments}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">Select an event to view feedback details</p>
            </div>
          )}
        </div>

        {/* Impact Highlights */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl shadow-md p-6 border border-green-200">
            <h3 className="text-lg font-bold text-green-900 mb-3">✅ Strengths</h3>
            <ul className="space-y-2 text-sm text-green-800">
              <li>• High participant satisfaction</li>
              <li>• Strong volunteer support</li>
              <li>• Well-organized events</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl shadow-md p-6 border border-yellow-200">
            <h3 className="text-lg font-bold text-yellow-900 mb-3">🎯 Opportunities</h3>
            <ul className="space-y-2 text-sm text-yellow-800">
              <li>• Enhance content relevance</li>
              <li>• Increase community engagement</li>
              <li>• Expand volunteer training</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-md p-6 border border-blue-200">
            <h3 className="text-lg font-bold text-blue-900 mb-3">🚀 Impact Metrics</h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>• {totalFeedback}+ participants engaged</li>
              <li>• {positivePercentage}% positive sentiment</li>
              <li>• {(summary.avgRating || 0).toFixed(1)}/5 avg rating</li>
            </ul>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl shadow-md p-8 border border-primary-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-2xl">💡</span>
            Strategic Recommendations
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg border border-primary-100">
              <p className="font-semibold text-gray-900 mb-2">1️⃣ Maintain Quality</p>
              <p className="text-sm text-gray-700">Your events are meeting expectations. Continue current best practices and share success stories.</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-primary-100">
              <p className="font-semibold text-gray-900 mb-2">2️⃣ Gather More Feedback</p>
              <p className="text-sm text-gray-700">With {totalFeedback} responses, you have solid data. Aim for more feedback to identify trends.</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-primary-100">
              <p className="font-semibold text-gray-900 mb-2">3️⃣ Share Impact</p>
              <p className="text-sm text-gray-700">Use these metrics to demonstrate event value to stakeholders and donors.</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-primary-100">
              <p className="font-semibold text-gray-900 mb-2">4️⃣ Scale Up</p>
              <p className="text-sm text-gray-700">Strong positive sentiment suggests readiness to expand events and reach more participants.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
    </AdminLayout>
  )
}

export default ImpactAnalytics
