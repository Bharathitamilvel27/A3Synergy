import { useState, useEffect } from 'react'
import { eventsAPI, registrationsAPI } from '../../services/api'
import { useNavigate } from 'react-router-dom'

/**
 * Admin Participants View Component
 * Allows admin to view participants per event and export as CSV
 */
const ParticipantsView = () => {
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState('')
  const [participants, setParticipants] = useState([])
  const [loading, setLoading] = useState(false)
  const [exporting, setExporting] = useState(false)
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/admin/login')
  }

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents()
  }, [])

  // Fetch participants when event is selected
  useEffect(() => {
    if (selectedEvent) {
      fetchParticipants(selectedEvent)
    } else {
      setParticipants([])
    }
  }, [selectedEvent])

  const fetchEvents = async () => {
    try {
      const response = await eventsAPI.getAll()
      if (response.success) {
        setEvents(response.data)
      }
    } catch (err) {
      setError('Error fetching events')
    }
  }

  const fetchParticipants = async (eventId) => {
    setLoading(true)
    setError('')
    try {
      const response = await registrationsAPI.getByEvent(eventId)
      if (response.success) {
        setParticipants(response.registrations || [])
      } else {
        setError(response.message || 'Error fetching participants')
      }
    } catch (err) {
      setError('Error fetching participants')
    } finally {
      setLoading(false)
    }
  }

  const handleExportCSV = async () => {
    if (!selectedEvent) return

    setExporting(true)
    try {
      const blob = await registrationsAPI.exportToCSV(selectedEvent)
      
      // Create download link
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      
      // Get event title for filename
      const event = events.find(e => e._id === selectedEvent)
      const filename = `participants_${event?.title?.replace(/[^a-z0-9]/gi, '_')}_${new Date().toISOString().split('T')[0]}.csv`
      
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (err) {
      setError('Error exporting CSV')
    } finally {
      setExporting(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const selectedEventData = events.find(e => e._id === selectedEvent)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="bg-primary-600 text-white px-3 py-1 rounded-lg font-bold">
                  A3
                </div>
                <span className="text-xl font-bold text-gray-800">Minds Admin</span>
              </div>
              <span className="text-gray-500">|</span>
              <h1 className="text-xl font-semibold text-gray-800">Event Participants</h1>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="/admin/events"
                className="text-gray-600 hover:text-primary-600 font-medium"
              >
                Event Management
              </a>
              <a
                href="/"
                className="text-gray-600 hover:text-primary-600 font-medium"
              >
                View Public Site
              </a>
              <button
                onClick={handleLogout}
                className="btn-outline text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom section-padding">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Event Participants</h1>
        <p className="text-gray-600">View and export participant lists for your events</p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Event Selection */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid md:grid-cols-3 gap-4 items-end">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Event
            </label>
            <select
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Choose an event...</option>
              {events.map((event) => (
                <option key={event._id} value={event._id}>
                  {event.title} - {formatDate(event.date)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button
              onClick={handleExportCSV}
              disabled={!selectedEvent || exporting || loading}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {exporting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Exporting...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Export CSV
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Event Details */}
      {selectedEventData && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Event Details</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-gray-500">Event Title:</span>
              <p className="font-medium text-gray-900">{selectedEventData.title}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Date:</span>
              <p className="font-medium text-gray-900">{formatDate(selectedEventData.date)}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Location:</span>
              <p className="font-medium text-gray-900">{selectedEventData.location}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Total Participants:</span>
              <p className="font-medium text-gray-900">{participants.length}</p>
            </div>
          </div>
        </div>
      )}

      {/* Participants Table */}
      {selectedEvent && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Participants ({participants.length})
            </h2>
          </div>
          
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading participants...</p>
            </div>
          ) : participants.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Age
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      City
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Occupation
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Registration Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {participants.map((participant) => (
                    <tr key={participant._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {participant.formData?.fullName || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {participant.formData?.email || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {participant.formData?.phone || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {participant.formData?.age || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {participant.formData?.city || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {participant.formData?.occupation || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(participant.registrationDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          participant.status === 'registered' 
                            ? 'bg-blue-100 text-blue-800'
                            : participant.status === 'confirmed'
                            ? 'bg-green-100 text-green-800'
                            : participant.status === 'attended'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {participant.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center">
              <div className="text-gray-400 mb-2">
                <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No participants yet</h3>
              <p className="text-gray-500">Participants will appear here once they register for this event.</p>
            </div>
          )}
        </div>
      )}

      {!selectedEvent && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">Select an event</h3>
          <p className="text-gray-500">Choose an event to view its participants and export data.</p>
        </div>
      )}
      </div>
    </div>
  )
}

export default ParticipantsView
