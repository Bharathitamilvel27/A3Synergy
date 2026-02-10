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
import MyRegistrations from './pages/public/MyRegistrations'
import Profile from './pages/public/Profile'

// Admin Pages
import AdminLogin from './pages/admin/Login'
import EventManagement from './pages/admin/EventManagement'

/**
 * Main App Component
 * Sets up routing for all public and admin pages
 * Wraps all pages with Header and Footer
 */
function App() {
  return (
    <AuthProvider>
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

          {/* Public Routes (with Header/Footer) */}
          <Route
            path="/*"
            element={
              <UserAuthProvider>
                <div className="min-h-screen flex flex-col">
                  <Header />
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/vision-mission" element={<VisionMission />} />
                      <Route path="/events" element={<Events />} />
                      <Route path="/my-registrations" element={<MyRegistrations />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/volunteer" element={<Volunteer />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </UserAuthProvider>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App

