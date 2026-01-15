import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

/**
 * Header Component
 * Main navigation header for the public website
 * Features responsive mobile menu and active route highlighting
 */
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Vision & Mission', path: '/vision-mission' },
    { name: 'Events', path: '/events' },
    { name: 'Volunteer', path: '/volunteer' },
    { name: 'Contact', path: '/contact' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-primary-200 bg-white shadow-sm">
              <img
                src="/pics/ANTONY-TRUST-LOGO.webp"
                alt="Antony Charitable Trust logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-xs uppercase tracking-[0.18em] text-primary-600">
                Antony Charitable Trust
              </span>
              <span className="text-xl font-bold text-gray-900">
                A3 Minds
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/admin/login"
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Admin Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 text-base font-medium ${
                  isActive(item.path)
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/admin/login"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 mt-2"
            >
              Admin Login
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header

