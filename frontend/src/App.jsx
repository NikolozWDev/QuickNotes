import React, { useState, useCallback } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ACCESS_TOKEN } from './constants'
import AuthProvider, { useAuth } from './AuthProvider'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import NotFoundPage from './pages/NotFoundPage'
import Navbar from './components/Navbar'
import AboutPage from './pages/AboutPage'
import LoadingOverlay from './components/LoadingOverlay'
import Toast from './components/Toast'

function Logout() {
    localStorage.removeItem(ACCESS_TOKEN)
    return <Navigate to="/login" />
}

const App = () => {
    const [loading, setLoading] = useState(false)
    const [loadingMessage, setLoadingMessage] = useState("Loading...")
    const [toast, setToast] = useState(null)

    const showToast = useCallback((message, type = 'error') => {
        setToast({ message, type })
    }, [])

    const startLoading = useCallback((msg = "Loading...") => {
        setLoadingMessage(msg)
        setLoading(true)
    }, [])

    const stopLoading = useCallback(() => {
        setLoading(false)
    }, [])

    return (
        <Router>
            <AuthProvider>
                <Navbar startLoading={startLoading} stopLoading={stopLoading} showToast={showToast} />
                <div className="main-container px-[20px] bg-[url(../public/assets/picture1.jpg)] bg-no-repeat bg-center bg-cover bg-fixed min-h-screen w-screen">
                    <Routes>
                        <Route path="/" element={
                            <ProtectedRoute>
                                <HomePage startLoading={startLoading} stopLoading={stopLoading} showToast={showToast} />
                            </ProtectedRoute>
                        } />
                        <Route path="/register" element={<RegisterPage startLoading={startLoading} stopLoading={stopLoading} showToast={showToast} />} />
                        <Route path="/login" element={<LoginPage startLoading={startLoading} stopLoading={stopLoading} showToast={showToast} />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </div>
                {loading && <LoadingOverlay message={loadingMessage} />}
                {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            </AuthProvider>
        </Router>
    )
}
export default App