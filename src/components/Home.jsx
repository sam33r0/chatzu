import { useNavigate } from 'react-router-dom'
import React from 'react'
import { useSelector } from 'react-redux'
function Home() {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate();
    if (authStatus)
        navigate('/dashboard')
    return (
        <>
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-12 px-6 md:px-12 shadow-lg">
                <h2 className="text-5xl font-extrabold text-center mb-8">Please login to use the application </h2>
            </div>
        </>
    )
}

export default Home