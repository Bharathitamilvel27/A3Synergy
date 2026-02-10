import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useUserAuth } from '../../context/UserAuthContext'
import { registrationsAPI } from '../../services/api'

const MyRegistrations = () => {
  const { isAuthenticated } = useUserAuth()
  const [registrations, setRegistrations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const res = await registrationsAPI.getMyRegistrations()
        if (res.success) {
          setRegistrations(res.registrations || [])
        } else {
          setError(res.message || 'Failed to load registrations')
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Error loading')
      } finally {
        setLoading(false)
      }
    }

    if (isAuthenticated) load()
  }, [isAuthenticated])

  if (!isAuthenticated) return <Navigate to="/login" replace />

  return (
    <div className="bg-white min-h-screen">
      <section className="section-padding container-custom">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">My Registrations</h2>
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : error ? (
            <div className="text-red-600">{error}</div>
          ) : registrations.length === 0 ? (
            <div className="text-gray-600">You have not registered for any events yet.</div>
          ) : (
            <div className="space-y-4">
              {registrations.map((r) => (
                <div key={r._id} className="card p-4 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-lg">{r.eventId?.title || 'Event'}</div>
                    <div className="text-sm text-gray-600">{new Date(r.eventId?.date).toLocaleString()}</div>
                    <div className="text-sm text-gray-600">{r.eventId?.location}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Status</div>
                    <div className="font-medium">{r.status}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default MyRegistrations

