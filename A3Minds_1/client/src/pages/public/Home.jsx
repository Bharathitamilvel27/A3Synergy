import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

/**
 * Home Page
 * Modern, elegant landing page with smooth animations and gradient design
 * Antony Charitable Trust - A3 Minds Volunteer Platform
 */
const Home = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const stats = [
    { number: '58', suffix: 'M+', label: 'People Served', icon: '👥', color: 'from-blue-400 to-cyan-500' },
    { number: '230', suffix: '+', label: 'Associates', icon: '🤝', color: 'from-purple-400 to-pink-500' },
    { number: '368', suffix: 'M+', label: 'Reached', icon: '🌍', color: 'from-green-400 to-emerald-500' },
    { number: '460', suffix: '+', label: 'Activities', icon: '🎯', color: 'from-orange-400 to-red-500' },
  ]

  const highlights = [
    {
      title: 'Education',
      description: 'Empowering through quality education, training programs, and skill development.',
      icon: '📚',
      color: 'from-blue-500/10 to-cyan-500/10',
      borderColor: 'border-blue-200',
      image: '/pics/pic2.webp',
    },
    {
      title: 'Healthcare',
      description: 'Providing free health screening camps and medical services to communities.',
      icon: '🏥',
      color: 'from-red-500/10 to-pink-500/10',
      borderColor: 'border-red-200',
      image: '/pics/pic3.webp',
    },
    {
      title: 'Sustainability',
      description: 'Environmental conservation through water projects and awareness initiatives.',
      icon: '🌱',
      color: 'from-green-500/10 to-emerald-500/10',
      borderColor: 'border-green-200',
      image: '/pics/pic4.webp',
    },
    {
      title: 'Community',
      description: 'Serving communities through various programs and dedicated support.',
      icon: '🤲',
      color: 'from-purple-500/10 to-pink-500/10',
      borderColor: 'border-purple-200',
      image: '/pics/pic5.webp',
    },
  ]

  return (
    <div className="bg-white overflow-hidden">
      {/* Animated Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Dynamic Background Gradient */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-full blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-gradient-to-br from-emerald-200 to-cyan-200 rounded-full blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/pics/pic3.webp"
            alt="hero"
            className="w-full h-full object-cover opacity-10"
          />
        </div>

        {/* Content */}
        <div className="container-custom section-padding relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
             
              

              {/* Main Heading */}
              <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6 bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-600 bg-clip-text text-transparent animate-fadeIn">
                Empower Communities, Transform Lives
              </h1>

              {/* Subtitle */}
              <p className="text-lg text-gray-600 mb-2 font-medium">
                Since 2010, creating measurable impact through:
              </p>
              <div className="flex flex-col gap-2 mb-8">
                <div className="flex items-center gap-3 text-gray-700">
                  <span className="text-2xl">📚</span>
                  <span>Education & Skill Development</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <span className="text-2xl">🏥</span>
                  <span>Healthcare Services</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <span className="text-2xl">🌱</span>
                  <span>Environmental Sustainability</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to="/register" className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transform transition-all hover:scale-105 hover:-translate-y-1">
                  Get Started
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </Link>
                <Link to="/events" className="inline-flex items-center justify-center px-8 py-4 bg-white/80 backdrop-blur-sm text-primary-600 rounded-lg font-semibold border-2 border-primary-200 hover:border-primary-400 hover:bg-white shadow-md transition-all">
                  Explore Events
                </Link>
              </div>

              {/* Stats Highlight */}
              <div className="flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[5, 4, 3].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 border-2 border-white shadow-md"></div>
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">58M+</span> people already benefited
                </p>
              </div>
            </div>

            {/* Right Visual */}
            <div className={`relative group transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              {/* Floating Cards */}
              <div className="relative h-96 md:h-[500px]">
                {/* Main Image */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                  <img src="/pics/pic.webp" alt="hero" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-600/20 to-transparent"></div>
                </div>

                {/* Floating Badge */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 animate-bounce">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600">230+</div>
                    <div className="text-sm text-gray-600">Active Associates</div>
                  </div>
                </div>

                {/* Floating Card */}
                <div className="absolute -top-6 -right-6 bg-gradient-to-br from-secondary-400 to-pink-400 rounded-2xl shadow-xl p-4 animate-pulse">
                  <div className="text-white text-center">
                    <div className="text-2xl mb-1">🎯</div>
                    <div className="text-xs font-semibold">460+ Activities</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Stats Section */}
      <section className="relative section-padding bg-gradient-to-br from-slate-50 via-primary-50 to-secondary-50 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary-200/30 rounded-full blur-3xl -z-10"></div>

        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Our Impact by the Numbers
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Seven years of dedicated service reaching across Tamil Nadu
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-lg border border-white/50 p-6 shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-2 hover:bg-white`}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                {/* Content */}
                <div className="relative z-10 text-center">
                  <div className="text-4xl mb-2">{stat.icon}</div>
                  <div className="flex items-baseline justify-center gap-1 mb-2">
                    <div className="text-4xl font-black text-gray-900">{stat.number}</div>
                    <div className="text-lg font-bold text-primary-600">{stat.suffix}</div>
                  </div>
                  <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                </div>

                {/* Animated Border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary-300 transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Focus Areas - Animated Cards */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-sm font-bold uppercase tracking-widest text-primary-600 bg-primary-50 px-4 py-2 rounded-full">Our Mission</span>
            </div>
            <h2 className="text-5xl font-bold mb-6 text-gray-900">
              We Focus On Four Key Areas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Through education, healthcare, environmental sustainability, and community service, 
              we create lasting impact in the lives of thousands
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:border-gray-200`}
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
              >
                {/* Image Container */}
                <div className="overflow-hidden h-48 relative">
                  <img
                    src={highlight.image}
                    alt={highlight.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                  {/* Icon Overlay */}
                  <div className={`absolute inset-0 flex items-center justify-center text-6xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/20 backdrop-blur-sm`}>
                    {highlight.icon}
                  </div>
                </div>

                {/* Content */}
                <div className={`p-6 bg-gradient-to-br ${highlight.color}`}>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {highlight.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {highlight.description}
                  </p>

                  {/* Link Arrow */}
                  <div className="mt-4 inline-block text-primary-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    Learn more →
                  </div>
                </div>

                {/* Animated Border */}
                <div className={`absolute inset-0 rounded-2xl border-2 ${highlight.borderColor} group-hover:border-opacity-100 border-opacity-0 transition-all duration-500`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Showcase */}
      <section className="section-padding bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-primary-500 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-secondary-500 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Glimpses from the Field
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              See the real-world impact of our education, healthcare, and awareness programs
            </p>
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              '/pics/pic3.webp',
              '/pics/pic4.webp',
              '/pics/pic5.webp',
              '/pics/pic6.webp',
            ].map((img, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-xl aspect-square shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:scale-105"
              >
                <img
                  src={img}
                  alt="gallery"
                  className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                  <span className="text-white text-sm font-semibold">View Story</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Animated */}
      <section className="section-padding relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-50 via-secondary-50 to-primary-50"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-200/40 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-200/40 rounded-full blur-3xl -z-10"></div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-primary-600 bg-clip-text text-transparent">
                Ready to Make an Impact?
              </h2>
              <p className="text-xl text-gray-600 mb-4">
                Join thousands of volunteers making a real difference in communities across Tamil Nadu
              </p>
              <p className="text-lg text-gray-500">
                Whether you have an hour or a day, your contribution matters
              </p>
            </div>

            {/* action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/volunteer" className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl font-bold shadow-lg hover:shadow-2xl transform transition-all hover:scale-105 hover:-translate-y-1">
                Volunteer Now
                <span className="ml-2 group-hover:translate-x-1 transition-transform">✨</span>
              </Link>
              <Link to="/events" className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-primary-200 text-primary-600 rounded-xl font-bold hover:border-primary-400 hover:bg-primary-50 shadow-md transition-all">
                Explore Events
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-white/60 backdrop-blur-sm border-2 border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-white transition-all">
                Get in Touch
              </Link>
            </div>

            {/* Trust Badge */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">✓</span>
                <span className="text-gray-700 font-semibold">Trusted by 230+ organizations</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                <span className="text-gray-700 font-semibold">Impacting 58 Million+ lives</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Brand Section */}
      <section className="border-t border-gray-200 py-8">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary-200 bg-white">
                <img src="/pics/ANTONY-TRUST-LOGO.webp" alt="Antony Trust" className="w-full h-full object-contain" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Antony Charitable Trust</p>
                <p className="text-xs text-gray-600">A3 Minds • Since 2010</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 text-center md:text-right">
              <span className="font-semibold">Empowering communities</span> through education, health, and awareness
            </p>
          </div>
        </div>
      </section>

      {/* CSS Animations */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
      `}</style>
    </div>
  )
}

export default Home

