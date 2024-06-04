import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { login, setGoogle } from './store/authSlice.js';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Input } from './../@/components/ui/input.jsx';

function Dashboard() {
  const { param } = useParams();
  const backendUri = import.meta.env.VITE_BACKEND_URI;
  const accessToken = useSelector((state) => state.auth.accessToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if (param != "oo")
    dispatch(setGoogle({ authGoogle: param }))
  useEffect(
    () => {
      (async () => {
        try {
          const contactResponse = await axios.get((backendUri + "/contact"), {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${accessToken}`
            },
            withCredentials: true
          })
          if (contactResponse) {
            const user = contactResponse.data.data.user;
            const contacts = contactResponse.data.data.connections;
            dispatch(login({ user, accessToken, contacts }))
          }
        } catch (error) {
          navigate('/login')
        }
      })()
    }
  )
  // const f = async () => {
  //   window.open((backendUri + '/user/Glogout'), "_self")
  //   console.log(response);
  // }
  return (
    <div className='min-h-screen flex flex-col'>
      <header className="shadow sticky z-50 top-16 text-white">
        <div className='h-14 flex items-center'>
          <div className='outlet h-full w-1/3 justify-center flex items-center heading bg-gradient-to-r from-green-400 to-blue-500'>
            left column
          </div>
          <div className='chatsection w-2/3 text-center heading h-full justify-center flex items-center heading bg-gradient-to-r from-green-400 to-blue-500'>
            chat section
          </div>
        </div>
      </header>
      <div className='flex flex-1'>
        <div className='w-1/3 h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600'>
          left column
        </div>
        <div className='w-2/3 h-screen flex flex-col bg-gradient-to-r from-blue-500 to-purple-600'>
          <div className='flex-1 overflow-y-auto p-4'>
            chat section
          </div>
          <div className='sticky bottom-0 p-4 bg-gradient-to-r from-blue-500 to-purple-700'>
            <Input className='w-full' placeholder='Enter your message'/>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Dashboard