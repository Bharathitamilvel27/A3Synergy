import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

/**
 * Admin Navigation Sidebar
 * Provides navigation for admin pages
 */
const AdminNavigation = () => {
  const location = useLocation()
  const { logout } = useAuth()

  const adminMenuItems = [
    { 
      name: '📊 Impact Analytics', 
      path: '/admin/impact-analytics',
      icon: '📈'
    },
    { 
      name: '📋 Event Management', 
      path: '/admin/events',
      icon: '📅'
    },
    { 
      name: '👥 Participants View', 
      path: '/admin/participants',
      icon: '👥'
    },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <div className="bg-white border-r border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-primary-200 bg-white shadow-sm">
            <img
              src="/pics/ANTONY-TRUST-LOGO.webp"
              alt="Admin"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Admin Panel</p>
            <p className="text-xs text-gray-600">A3 Minds</p>
          </div>
        </div>
      </div>

      <nav className="p-4 space-y-2">
        {adminMenuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
              isActive(item.path)
                ? 'bg-gradient-to-r from-primary-50 to-secondary-50 text-primary-700 border-l-4 border-primary-600'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.name}</span>
            {isActive(item.path) && (
              <span className="ml-auto">→</span>
            )}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200 mt-auto">
        <button
          onClick={() => {
            logout()
            window.location.href = '/admin/login'
          }}
          className="w-full px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          🚪 Logout
        </button>
      </div>
    </div>
  )
}

export default AdminNavigation
