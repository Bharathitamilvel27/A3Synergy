import AdminNavigation from './AdminNavigation'

/**
 * Admin Layout
 * Wraps admin pages with navigation sidebar
 */
const AdminLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 overflow-y-auto border-r border-gray-200">
        <AdminNavigation />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  )
}

export default AdminLayout
