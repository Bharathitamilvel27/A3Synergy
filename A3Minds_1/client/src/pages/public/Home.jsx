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
      {/* Hero Section - Animated Landing */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/pics/pic3.webp"
            alt="hero background"
            className="w-full h-full object-cover opacity-40 blur-sm"
          />
        </div>
        <div className="container-custom section-padding relative z-10">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-white/30 bg-white/80">
                  <img src="/pics/ANTONY-TRUST-LOGO.webp" alt="logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                    Antony Charitable Trust
                  </h1>
                  <p className="text-xs text-white/90 uppercase tracking-wider">A3 Minds • Community Impact</p>
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 animate-pulse">
                Empowering communities through education, health and sustainability
              </h2>

              <p className="text-white/90 mb-6 max-w-xl">
                Since 2010, we have delivered impactful programs across Tamil Nadu — workshops,
                awareness campaigns, and community outreach. Join us to make a measurable difference.
              </p>

              <div className="flex gap-4">
                <Link to="/register" className="btn-primary">
                  Get Started
                </Link>
                <Link to="/events" className="btn-outline text-white border-white">
                  Explore Events
                </Link>
              </div>
            </div>

            <div className="relative text-center">
              <div className="mx-auto w-full max-w-md rounded-2xl overflow-hidden shadow-2xl transform transition-transform duration-700 hover:scale-105">
                <img src="/pics/pic.webp" alt="training" className="w-full h-64 object-cover" />
              </div>
              <div className="mt-4 flex justify-center gap-3">
                <img src="/pics/pic4.webp" alt="" className="w-20 h-14 object-cover rounded-lg shadow-md" />
                <img src="/pics/pic5.webp" alt="" className="w-20 h-14 object-cover rounded-lg shadow-md" />
                <img src="/pics/pic6.webp" alt="" className="w-20 h-14 object-cover rounded-lg shadow-md" />
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

