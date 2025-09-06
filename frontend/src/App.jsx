import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ACCESS_TOKEN } from './constants'
import AuthProvider from './AuthProvider'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import NotFoundPage from './pages/NotFoundPage'
import Navbar from './components/Navbar'
import AboutPage from './pages/AboutPage'

function Logout() {
localStorage.removeItem(ACCESS_TOKEN)
  return <Navigate to="/login" />
}
function RegisterAndLogout() {
  localStorage.removeItem(ACCESS_TOKEN)
  return <Navigate to="/register" />
}

const App = () => {
  const [loading, setLoading] = React.useState(false)
  return (
    <>
    <Router>
      <AuthProvider>
        <Navbar loading={loading} setLoading={setLoading} />
        <div className="main-container px-[20px] bg-[url(../public/assets/picture1.jpg)] bg-no-repeat bg-center bg-cover bg-fixed min-h-screen w-screen">
          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <HomePage setLoading={setLoading} />
              </ProtectedRoute>
            } />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
    </>
  )
}
export default App