import React, { useEffect, useState } from 'react'

const Toast = ({ message, type = 'error', onClose }) => {
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false)
            onClose?.()
        }, 4000)
        return () => clearTimeout(timer)
    }, [onClose])

    if (!visible) return null

    const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500'

    return (
        <div className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 z-[300] px-6 py-3 rounded-lg text-white font-semibold shadow-lg ${bgColor} animate-slideUp`}>
            {message}
        </div>
    )
}
export default Toast