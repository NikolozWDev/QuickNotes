import React from 'react'
import Loading from './Loading'

const LoadingOverlay = ({ message = "Loading..." }) => {
    return (
        <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
            <Loading />
            <p className="mt-4 text-white font-semibold">{message}</p>
        </div>
    )
}
export default LoadingOverlay