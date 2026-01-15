import { useState, useEffect } from 'react'
import { eventsAPI } from '../../services/api'

/**
 * Events & Activities Page
 * Displays upcoming and past events organized by A3 Minds
 * Fetches data from backend API
 */
const Events = () => {
  const [activeTab, setActiveTab] = useState('upcoming')
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const getEventImage = (event, isPastTab) => {
    const title = (event?.title || '').toLowerCase()

    if (isPastTab) {
      if (title.includes('drug')) {
        return '/pics/drug.webp'
      }
      if (title.includes('governor') || title.includes('rn ravi')) {
        return '/pics/rn ravi.webp'
      }
      if (title.includes('awareness')) {
        return '/pics/pic6.webp'
      }
      return '/pics/pic3.webp'
    }

    // generic upcoming image
    return '/pics/pic4.webp'
  }

  // Fetch events from API
  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await eventsAPI.getAll()
      if (response.success) {
        setEvents(response.data)
      } else {
        setError('Failed to load events')
      }
    } catch (err) {
      console.error('Error fetching events:', err)
      setError('Error loading events. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // Filter events based on active tab
  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (activeTab === 'upcoming') {
      return eventDate >= today && event.status === 'upcoming'
    } else {
      return eventDate < today || event.status === 'past'
    }
  })

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Events & Activities</h1>
              <p className="text-xl text-primary-100 mb-4">
                Join us in our upcoming events and explore the impact created through our past activities.
              </p>
              <p className="text-base text-primary-100/90">
                From awareness campaigns to student workshops and community outreach, Antony Charitable Trust
                and A3 Minds organize programs across Tamil Nadu focusing on education, health and social impact.
              </p>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-primary-900/20">
                <img
                  src="/pics/pic3.webp"
                  alt="Public awareness event organized by Antony Charitable Trust"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Logo badge */}
              <div className="hidden sm:block absolute -bottom-6 -left-4 w-24 h-24 rounded-xl overflow-hidden shadow-lg ring-4 ring-white bg-white">
                <img
                  src="/pics/ANTONY-TRUST-LOGO.webp"
                  alt="Antony Charitable Trust logo"
                  className="w-full h-full object-contain bg-white"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-white rounded-lg p-1 shadow-md">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'upcoming'
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Upcoming Events
              </button>
              <button
                onClick={() => setActiveTab('past')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'past'
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Past Events
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center">
              {error}
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading events...</p>
            </div>
          ) : filteredEvents.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <div key={event._id} className="card overflow-hidden flex flex-col">
                  <div className="relative mb-4">
                    <div className="aspect-[16/9] w-full overflow-hidden rounded-xl bg-gray-100">
                      <img
                        src={getEventImage(event, activeTab === 'past')}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute top-3 left-3 max-w-[70%]">
                      <div className="inline-block bg-black/60 text-white text-xs font-semibold px-3 py-1 rounded-full mb-2">
                        {formatDate(event.date)}
                      </div>
                      <div className="hidden sm:block bg-black/50 text-white text-sm font-medium px-3 py-1 rounded-lg">
                        {event.title}
                      </div>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold shadow-md ${
                          event.status === 'upcoming'
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-700 text-white'
                        }`}
                      >
                        {event.status}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {event.title}
                  </h3>
                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {formatDate(event.date)}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {event.location}
                  </div>
                  <p className="text-gray-600 mb-3 line-clamp-3">{event.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3 pb-3 border-b">
                    <span>
                      <span className="font-medium">Participants:</span> {event.participants}
                    </span>
                    <span>
                      <span className="font-medium">Beneficiaries:</span> {event.beneficiaries}
                    </span>
                  </div>

                  {/* Organized by / logo strip */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full overflow-hidden border border-gray-200 bg-white">
                        <img
                          src="/pics/ANTONY-TRUST-LOGO.webp"
                          alt="Antony Charitable Trust logo"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="text-xs text-gray-500">
                        Organized by <span className="font-semibold text-gray-700">Antony Charitable Trust</span>
                      </span>
                    </div>
                    {activeTab === 'past' && (
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                        Completed
                      </span>
                    )}
                  </div>

                  {activeTab === 'upcoming' && (
                    <button className="btn-primary w-full">
                      Register Now
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12">
              <div className="max-w-xl mx-auto card text-center">
                <div className="w-full flex justify-center mb-6">
                  <div className="w-40 h-24 rounded-2xl overflow-hidden bg-gray-100 shadow-inner border border-gray-200">
                    <img
                      src={activeTab === 'past' ? '/pics/drug.webp' : '/pics/pic4.webp'}
                      alt={
                        activeTab === 'past'
                          ? 'Past awareness program by Antony Charitable Trust'
                          : 'Students and volunteers preparing for upcoming events'
                      }
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex justify-center mb-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 bg-white">
                    <img
                      src="/pics/ANTONY-TRUST-LOGO.webp"
                      alt="Antony Charitable Trust logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  No {activeTab === 'upcoming' ? 'Upcoming' : 'Past'} Events Right Now
                </h3>
                <p className="text-gray-600 mb-3">
                  We are continuously planning impactful programs and activities.
                </p>
                <p className="text-gray-500 text-sm">
                  Please check back soon or follow our updates to know about the next
                  awareness campaign, workshop or training session.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Visual Highlights from Our Events */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Highlights from Our Events
              </h2>
              <p className="text-gray-600 max-w-xl">
                A glimpse of the awareness programs, student sessions and public events
                conducted by Antony Charitable Trust and A3 Minds.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 bg-white">
                <img
                  src="/pics/ANTONY-TRUST-LOGO.webp"
                  alt="Antony Charitable Trust logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs uppercase tracking-[0.18em] text-primary-600">
                Antony Charitable Trust
              </span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-sm bg-gray-100">
              <img
                src="/pics/drug.webp"
                alt="Drug abuse awareness program"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-sm bg-gray-100">
              <img
                src="/pics/nayanthara.webp"
                alt="Awareness event with special guests"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-sm bg-gray-100">
              <img
                src="/pics/rn ravi.webp"
                alt="Event with Hon'ble Governor of Tamil Nadu"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-sm bg-gray-100">
              <img
                src="/pics/pic6.webp"
                alt="Volunteers coordinating a community program"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-primary-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Want to Stay Updated?
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Follow us on social media or contact us to receive updates about our upcoming events.
            </p>
            <a href="/contact" className="btn-primary">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Events

