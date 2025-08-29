import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {


    return (
        <div className="py-[120px] flex flex-col justify-center items-center gap-[20px]">
            <p className="text-red-500 font-bold text-[50px]">404 ERROR</p>
            <p className="text-gray-900 font-bold text-[18px]">Page not found. return to main page:</p>
            <Link to="/" className="text-blue-500 font-bold text-[16px] cursor-pointer hover:text-gray-500 transition-all duration-[0.3s]">Home page</Link>
        </div>
    )
}
export default NotFoundPage