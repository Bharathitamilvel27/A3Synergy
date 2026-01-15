import { useState } from 'react'

/**
 * Volunteer Page
 * Information about volunteering and registration form
 * Content references information from a3minds.com
 */
const Volunteer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    interests: '',
    availability: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In production, this would send data to the backend API
    console.log('Volunteer registration:', formData)
    setSubmitted(true)
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        interests: '',
        availability: '',
        message: '',
      })
    }, 3000)
  }

  const benefits = [
    {
      title: 'Make a Difference',
      description: 'Contribute to meaningful causes and see the impact of your efforts.',
      icon: '💝',
    },
    {
      title: 'Learn & Grow',
      description: 'Develop new skills, gain experience, and expand your network.',
      icon: '📚',
    },
    {
      title: 'Community Connection',
      description: 'Connect with like-minded individuals and build lasting relationships.',
      icon: '🤝',
    },
    {
      title: 'Personal Fulfillment',
      description: 'Experience the joy and satisfaction that comes from helping others.',
      icon: '✨',
    },
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Become a Volunteer</h1>
            <p className="text-xl text-primary-100">
              Join our team and help make a positive impact in your community
            </p>
          </div>
        </div>
      </section>

      {/* Why Volunteer Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Volunteer with A3 Minds?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Volunteering with A3 Minds offers numerous benefits and opportunities
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="card text-center">
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Information Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-10 items-start max-w-6xl mx-auto">
            <div className="lg:col-span-2">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    What We Look For
                  </h2>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-3 font-bold">✓</span>
                      <span>Passion for community service and social impact</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-3 font-bold">✓</span>
                      <span>Commitment and reliability</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-3 font-bold">✓</span>
                      <span>Willingness to learn and collaborate</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-3 font-bold">✓</span>
                      <span>Respect for diversity and inclusion</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-3 font-bold">✓</span>
                      <span>Positive attitude and enthusiasm</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Volunteer Opportunities
                  </h2>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-3 font-bold">•</span>
                      <span>Event planning and coordination</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-3 font-bold">•</span>
                      <span>Workshop facilitation and teaching</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-3 font-bold">•</span>
                      <span>Community outreach and awareness</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-3 font-bold">•</span>
                      <span>Administrative support</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-3 font-bold">•</span>
                      <span>Content creation and social media</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-3 font-bold">•</span>
                      <span>Fundraising and donor relations</span>
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
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Volunteer Registration
              </h2>
              <p className="text-lg text-gray-600">
                Fill out the form below to join our volunteer team
              </p>
            </div>

            {submitted ? (
              <div className="card bg-green-50 border-2 border-green-500 text-center">
                <div className="text-5xl mb-4">✓</div>
                <h3 className="text-2xl font-bold text-green-800 mb-2">
                  Thank You!
                </h3>
                <p className="text-green-700">
                  Your volunteer registration has been submitted successfully. 
                  We'll get back to you soon!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    rows="2"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label htmlFor="interests" className="block text-sm font-medium text-gray-700 mb-2">
                    Areas of Interest
                  </label>
                  <input
                    type="text"
                    id="interests"
                    name="interests"
                    value={formData.interests}
                    onChange={handleChange}
                    placeholder="e.g., Education, Health, Environment"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-2">
                    Availability
                  </label>
                  <select
                    id="availability"
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">Select availability</option>
                    <option value="weekdays">Weekdays</option>
                    <option value="weekends">Weekends</option>
                    <option value="both">Both</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Why do you want to volunteer with A3 Minds?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <button type="submit" className="btn-primary w-full">
                  Submit Registration
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Volunteer

