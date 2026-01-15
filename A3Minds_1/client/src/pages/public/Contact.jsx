import { useState } from 'react'

/**
 * Contact Page
 * Contact form and organization contact information
 * Content references information from a3minds.com
 */
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
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
    console.log('Contact form submission:', formData)
    setSubmitted(true)
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      })
    }, 3000)
  }

  const contactInfo = [
    {
      title: 'Address',
      content: '38/1, AVM Avenue, 1st Street, Virugambakkam, Chennai - 600092, Tamil Nadu, India',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      title: 'Email',
      content: 'antony@antonygroup.com',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'Phone',
      content: '+91 9962055455',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
    },
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-primary-100">
              Get in touch with us - we'd love to hear from you
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {contactInfo.map((info, index) => (
              <div key={index} className="card text-center">
                <div className="text-primary-600 mb-4 flex justify-center">
                  {info.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {info.title}
                </h3>
                <p className="text-gray-600">{info.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Send Us a Message
              </h2>
              <p className="text-lg text-gray-600">
                Have a question or want to get involved? Fill out the form below and we'll get back to you.
              </p>
            </div>

            {submitted ? (
              <div className="card bg-green-50 border-2 border-green-500 text-center">
                <div className="text-5xl mb-4">✓</div>
                <h3 className="text-2xl font-bold text-green-800 mb-2">
                  Message Sent!
                </h3>
                <p className="text-green-700">
                  Thank you for contacting us. We'll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
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
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <button type="submit" className="btn-primary w-full">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Additional Information Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="card">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Other Ways to Connect
              </h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>For General Inquiries:</strong> Use the contact form above or email us at{' '}
                  <a href="mailto:info@a3minds.com" className="text-primary-600 hover:underline">
                    info@a3minds.com
                  </a>
                </p>
                <p>
                  <strong>For Volunteer Opportunities:</strong> Visit our{' '}
                  <a href="/volunteer" className="text-primary-600 hover:underline">
                    Volunteer page
                  </a>{' '}
                  to learn more and register.
                </p>
                <p>
                  <strong>For Event Information:</strong> Check out our{' '}
                  <a href="/events" className="text-primary-600 hover:underline">
                    Events page
                  </a>{' '}
                  for upcoming activities and programs.
                </p>
                <p>
                  <strong>Follow Us:</strong> Stay connected with us on social media for updates, 
                  news, and community stories.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact

