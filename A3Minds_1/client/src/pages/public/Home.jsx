import { Link } from 'react-router-dom'

/**
 * Home Page
 * Main landing page with hero section, highlights, and call-to-action
 * Content references information from a3minds.com
 */
const Home = () => {
  const stats = [
    { number: '58 Lakh+', label: 'People Served' },
    { number: '230+', label: 'Associates Working Together' },
    { number: '3.68 Crore+', label: 'People Reached' },
    { number: '460+', label: 'Activities Across India' },
  ]

  const highlights = [
    {
      title: 'Education',
      description:
        'Empowering individuals through quality education, training programs, and skill development initiatives.',
      icon: '📚',
    },
    {
      title: 'Healthcare',
      description:
        'Providing free health screening camps, medical services, and healthcare infrastructure to underprivileged communities.',
      icon: '🏥',
    },
    {
      title: 'Environmental Sustainability',
      description:
        'Creating awareness and implementing projects for water conservation and environmental protection.',
      icon: '🌱',
    },
    {
      title: 'Community Service',
      description:
        'Dedicated to serving communities through various programs, activities, and support initiatives.',
      icon: '🤝',
    },
  ]

  const highlightImages = {
    Education: '/pics/pic2.webp',
    Healthcare: '/pics/pic3.webp',
    'Environmental Sustainability': '/pics/pic4.webp',
    'Community Service': '/pics/pic5.webp',
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container-custom section-padding">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Antony Charitable Trust
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-primary-100">
                "Life is a gift and it offers us the privilege, opportunity and responsibility to give something back"
              </p>
              <p className="text-lg mb-10 text-primary-200">
                Since 2010, we have been dedicated to empowering communities through Education, Healthcare, 
                Environmental Sustainability, and Community Service. Based in Chennai, Tamil Nadu.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-start">
                <Link to="/volunteer" className="btn-secondary">
                  Become a Volunteer
                </Link>
                <Link
                  to="/events"
                  className="btn-outline border-white text-white hover:bg-white hover:text-primary-600"
                >
                  View Events
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-primary-900/20">
                <img
                  src="/pics/pic.webp"
                  alt="A3 Minds training session with students"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden sm:block absolute -bottom-6 -left-4 w-28 h-28 rounded-xl overflow-hidden shadow-lg ring-4 ring-white bg-white">
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

      {/* Statistics Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand & Identity Row */}
      <section className="pb-10 -mt-4">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-primary-200 bg-white">
                <img
                  src="/pics/ANTONY-TRUST-LOGO.webp"
                  alt="Antony Charitable Trust logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-sm text-gray-600">
                An initiative of <span className="font-semibold text-gray-800">Antony Charitable Trust</span>
              </span>
            </div>
            <span className="text-xs uppercase tracking-[0.2em] text-primary-600">
              Since 2010 • Service • Education • Awareness
            </span>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Focus Areas
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We are dedicated to focusing on four key sectors that drive our mission forward: 
              Education, Healthcare, Environmental Sustainability, and Community Service.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((highlight, index) => (
              <div key={index} className="card text-center flex flex-col">
                <div className="mb-4">
                  <div className="aspect-[4/3] w-full overflow-hidden rounded-xl mb-3 bg-gray-100">
                    <img
                      src={highlightImages[highlight.title]}
                      alt={highlight.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-3xl">{highlight.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {highlight.title}
                </h3>
                <p className="text-gray-600 flex-1">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* From the Field - Media Strip */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                From the Field
              </h2>
              <p className="text-gray-600 max-w-xl">
                Glimpses from our education, healthcare and awareness programs
                conducted across Tamil Nadu.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-sm bg-gray-100">
              <img
                src="/pics/pic3.webp"
                alt="Community outreach program"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-sm bg-gray-100">
              <img
                src="/pics/pic4.webp"
                alt="Student workshop"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-sm bg-gray-100">
              <img
                src="/pics/pic5.webp"
                alt="Healthcare camp"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-sm bg-gray-100">
              <img
                src="/pics/pic6.webp"
                alt="Awareness session"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="section-padding bg-primary-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Join Us in Making a Difference
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Whether you want to volunteer, participate in events, or support our mission, 
              there are many ways to get involved with Antony Charitable Trust. Together, we can 
              create a better future for disadvantaged individuals and communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/volunteer" className="btn-primary">
                Get Involved
              </Link>
              <Link to="/contact" className="btn-outline">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

