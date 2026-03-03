import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useUserAuth } from '../../context/UserAuthContext'

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
  const { user, isAuthenticated, logout } = useUserAuth()

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
            {!isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Register
                </Link>
                {/* Admin login intentionally hidden from public header for security */}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/my-registrations" className="text-sm text-gray-700 hover:text-primary-600">
                  My Registrations
                </Link>
                <Link to="/profile" className="text-sm text-gray-700 hover:text-primary-600">
                  Profile
                </Link>
                <Link to="/profile" className="flex items-center gap-2 p-1 rounded-md hover:bg-gray-50">
                  <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200 bg-white">
                    <img
                      src="/pics/ANTONY-TRUST-LOGO.webp"
                      alt="profile"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-sm text-gray-800">{user?.name || user?.email}</div>
                </Link>
                <button
                  onClick={() => {
                    logout()
                    window.location.href = '/'
                  }}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600"
                >
                  Logout
                </button>
              </div>
            )}
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
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 mt-2"
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 mt-2"
            >
              Register
            </Link>
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

