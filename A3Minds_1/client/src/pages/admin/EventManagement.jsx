import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { eventsAPI, registrationsAPI } from '../../services/api'
import { useNavigate } from 'react-router-dom'
import AdminLayout from '../../components/common/AdminLayout'

/**
 * Admin Event Management Page
 * Full CRUD operations for events (Create, Read, Update, Delete)
 */
const EventManagement = () => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    participants: '',
    beneficiaries: '',
  })
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [registrationsModal, setRegistrationsModal] = useState({ open: false, event: null, items: [] })

  const { logout } = useAuth()
  const navigate = useNavigate()

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    setLoading(true)
    try {
      const response = await eventsAPI.getAll()
      if (response.success) {
        setEvents(response.data)
      }
    } catch (err) {
      console.error('Error fetching events:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError('')
    setSuccess('')
  }

  const resetForm = () => {
    setFormData({
      title: '',
      date: '',
      location: '',
      description: '',
      participants: '',
      beneficiaries: '',
    })
    setEditingId(null)
  }

  const handleEdit = (event) => {
    // Format date for datetime-local input
    const eventDate = new Date(event.date)
    const year = eventDate.getFullYear()
    const month = String(eventDate.getMonth() + 1).padStart(2, '0')
    const day = String(eventDate.getDate()).padStart(2, '0')
    const hours = String(eventDate.getHours()).padStart(2, '0')
    const minutes = String(eventDate.getMinutes()).padStart(2, '0')
    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`

    setFormData({
      title: event.title,
      date: formattedDate,
      location: event.location,
      description: event.description,
      participants: event.participants.toString(),
      beneficiaries: event.beneficiaries.toString(),
    })
    setEditingId(event._id)
    setError('')
    setSuccess('')
    // Scroll to form
    document.getElementById('event-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setSubmitting(true)

    try {
      let response
      if (editingId) {
        // Update existing event
        response = await eventsAPI.update(editingId, formData)
        if (response.success) {
          setSuccess('Event updated successfully!')
        }
      } else {
        // Create new event
        response = await eventsAPI.create(formData)
        if (response.success) {
          setSuccess('Event created successfully!')
        }
      }

      if (response.success) {
        resetForm()
        fetchEvents()
        setTimeout(() => setSuccess(''), 5000)
      } else {
        setError(response.message || 'Failed to save event')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving event. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (eventId) => {
    try {
      const response = await eventsAPI.delete(eventId)
      if (response.success) {
        setSuccess('Event deleted successfully!')
        setDeleteConfirm(null)
        fetchEvents()
        setTimeout(() => setSuccess(''), 5000)
      } else {
        setError(response.message || 'Failed to delete event')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error deleting event. Please try again.')
    }
  }

  const viewRegistrations = async (eventId, eventTitle) => {
    try {
      const res = await registrationsAPI.getByEvent(eventId)
      if (res.success) {
        setRegistrationsModal({ open: true, event: eventTitle, items: res.registrations })
      } else {
        setError(res.message || 'Failed to load registrations')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error loading registrations')
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <AdminLayout>
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
              <h1 className="text-xl font-semibold text-gray-800">Event Management</h1>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="/admin/participants"
                className="text-gray-600 hover:text-primary-600 font-medium"
              >
                View Participants
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
        {/* Success/Error Messages */}
        {success && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            {success}
          </div>
        )}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Create/Edit Event Form */}
          <div id="event-form">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingId ? 'Edit Event' : 'Create New Event'}
                </h2>
                {editingId && (
                  <button
                    onClick={resetForm}
                    className="text-sm text-gray-600 hover:text-gray-800"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="e.g., Community Education Workshop"
                  />
                </div>

                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                    Event Date *
                  </label>
                  <input
                    type="datetime-local"
                    id="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="e.g., Chennai, Tamil Nadu"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Describe the event..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="participants" className="block text-sm font-medium text-gray-700 mb-2">
                      Participants *
                    </label>
                    <input
                      type="number"
                      id="participants"
                      name="participants"
                      required
                      min="0"
                      value={formData.participants}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label htmlFor="beneficiaries" className="block text-sm font-medium text-gray-700 mb-2">
                      Beneficiaries *
                    </label>
                    <input
                      type="number"
                      id="beneficiaries"
                      name="beneficiaries"
                      required
                      min="0"
                      value={formData.beneficiaries}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="0"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting
                    ? editingId
                      ? 'Updating Event...'
                      : 'Creating Event...'
                    : editingId
                    ? 'Update Event'
                    : 'Create Event'}
                </button>
              </form>
            </div>
          </div>

          {/* Events List */}
          <div>
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">All Events</h2>
                <button
                  onClick={fetchEvents}
                  disabled={loading}
                  className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                >
                  {loading ? 'Refreshing...' : 'Refresh'}
                </button>
              </div>

              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-2"></div>
                  <p className="text-gray-600">Loading events...</p>
                </div>
              ) : events.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No events created yet.</p>
                  <p className="text-sm mt-2">Create your first event using the form on the left.</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {events.map((event) => (
                    <div
                      key={event._id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-bold text-gray-900 flex-1">{event.title}</h3>
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ml-2 ${
                            event.status === 'upcoming'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {event.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">Date:</span> {formatDate(event.date)}
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">Location:</span> {event.location}
                      </p>
                      <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                        {event.description}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <span>
                          <span className="font-medium">Participants:</span> {event.participants}
                        </span>
                        <span>
                          <span className="font-medium">Beneficiaries:</span> {event.beneficiaries}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 pt-2 border-t">
                        <button
                          onClick={() => handleEdit(event)}
                          className="flex-1 px-3 py-2 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(event._id)}
                          className="flex-1 px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => viewRegistrations(event._id, event.title)}
                          className="flex-1 px-3 py-2 bg-secondary-600 text-white text-sm rounded-lg hover:bg-secondary-700 transition-colors"
                        >
                          Registrations
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Delete</h3>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this event? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Registrations Modal */}
      {registrationsModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Registrations - {registrationsModal.event}</h3>
              <button onClick={() => setRegistrationsModal({ open: false, event: null, items: [] })} className="text-gray-600">Close</button>
            </div>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {registrationsModal.items.length === 0 ? (
                <p className="text-sm text-gray-600">No registrations yet.</p>
              ) : (
                registrationsModal.items.map((r) => (
                  <div key={r._id} className="border p-3 rounded-lg flex items-center justify-between">
                    <div>
                      <div className="font-medium">{r.userId?.name || '—'}</div>
                      <div className="text-sm text-gray-600">{r.userId?.email}</div>
                      <div className="text-sm text-gray-500">{new Date(r.registrationDate).toLocaleString()}</div>
                    </div>
                    <div className="text-sm text-gray-700">{r.status}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
    </AdminLayout>
  )
}

export default EventManagement
