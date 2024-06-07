import { useNavigate } from 'react-router-dom'
import React from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { login, setGoogle } from './store/authSlice.js';
import { useEffect } from 'react'
function Home() {
    const backendUri = import.meta.env.VITE_BACKEND_URI;
    const accessToken = useSelector((state) => state.auth.accessToken);
    const dispatch = useDispatch();
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate();

    const param = useSelector((state) => state.auth.authGoogle)
    useEffect(() => {
        if (authStatus) {
            navigate('/dashboard/' + param);
        }
    }, [authStatus, navigate, param]);

    useEffect(() => {
        (async () => {
            try {
                const contactResponse = await axios.get(`${backendUri}/contact`, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${accessToken}`
                    },
                    withCredentials: true
                });
                if (contactResponse) {
                    const user = contactResponse.data.data.user;
                    const contacts = contactResponse.data.data.connections;
                    dispatch(login({ user, accessToken, contacts }));
                    if(accessToken==null)
                    navigate('/dashboard/google');
                    else
                    navigate('/dashboard/jwt');
                }
            } catch (error) {
                navigate('/login');
            }
        })()
    }, [accessToken, backendUri, dispatch, navigate]);

    return (
        <>
            {/* <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-12 px-6 md:px-12 shadow-lg h-96 flex justify-center items-center">
                <div><h2 className="text-5xl font-extrabold text-center mb-8">Please login to use ChatZu </h2>
                    <div className='w-full flex justify-end'>
                        <button className="w-28 mt-6 py-2 bg-green-400 text-white rounded hover:bg-blue-700" onClick={() => navigate('/login')}>Sign in </button>
                    </div>
                </div>
            </div> */}
        </>
    )
}

export default Home