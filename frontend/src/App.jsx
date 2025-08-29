import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import AuthProvider from './AuthProvider'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import NotFoundPage from './pages/NotFoundPage'
import Navbar from './components/Navbar'
import AboutPage from './pages/AboutPage'

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}
function RegisterAndLogout() {
  localStorage.clear()
  return <Navigate to="/register" />
}

const App = () => {
  return (
    <>
    <Router>
      <AuthProvider>
        <Navbar />
        <div className="px-[20px] bg-[url(../public/assets/picture1.jpg)] bg-no-repeat bg-center bg-cover bg-fixed min-h-screen w-screen">
          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <HomePage />
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