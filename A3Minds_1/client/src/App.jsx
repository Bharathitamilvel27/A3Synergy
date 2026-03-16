import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { UserAuthProvider } from './context/UserAuthContext'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import ProtectedRoute from './components/common/ProtectedRoute'

// Public Pages
import Home from './pages/public/Home'
import About from './pages/public/About'
import VisionMission from './pages/public/VisionMission'
import Events from './pages/public/Events'
import Volunteer from './pages/public/Volunteer'
import Contact from './pages/public/Contact'
import Login from './pages/public/Login'
import Register from './pages/public/Register'

import Profile from './pages/public/Profile'
import Feedback from './pages/public/Feedback'

// Admin Pages
import AdminLogin from './pages/admin/Login'
import EventManagement from './pages/admin/EventManagement'
import ParticipantsView from './pages/admin/ParticipantsView'
import ImpactAnalytics from './pages/admin/ImpactAnalytics'

/**
 * Main App Component
 * Sets up routing for all public and admin pages
 * Wraps all pages with Header and Footer
 */

// Layout component for public pages
const PublicLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-grow">{children}</main>
    <Footer />
  </div>
)

function App() {
  return (
    <AuthProvider>
      <UserAuthProvider>
        <Router
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <Routes>
            {/* Admin Routes (without Header/Footer) */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/events"
              element={
                <ProtectedRoute>
                  <EventManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/participants"
              element={
                <ProtectedRoute>
                  <ParticipantsView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/impact-analytics"
              element={
                <ProtectedRoute>
                  <ImpactAnalytics />
                </ProtectedRoute>
              }
            />

            {/* Public Routes (with Header/Footer Layout) */}
            <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
            <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
            <Route path="/vision-mission" element={<PublicLayout><VisionMission /></PublicLayout>} />
            <Route path="/events" element={<PublicLayout><Events /></PublicLayout>} />
            <Route path="/profile" element={<PublicLayout><Profile /></PublicLayout>} />
            <Route path="/feedback" element={<PublicLayout><Feedback /></PublicLayout>} />
            <Route path="/volunteer" element={<PublicLayout><Volunteer /></PublicLayout>} />
            <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
            <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
            <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />
          </Routes>
        </Router>
      </UserAuthProvider>
    </AuthProvider>
  )
}

export default App

