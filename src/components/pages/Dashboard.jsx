import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { login, setGoogle } from '../store/authSlice.js';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ChatViewer from './../../components/ChatViewer/ChatViewer.jsx';
import ChatOpener from '../ChatOpener/ChatOpener.jsx';
import { useState } from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from './../../@/components/ui/avatar.jsx'
function Dashboard() {
  const { param } = useParams();
  const [currentChat, setCurrentChat] = useState("")
  const backendUri = import.meta.env.VITE_BACKEND_URI;
  const accessToken = useSelector((state) => state.auth.accessToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if ((param == "jwt" || param == "google"))
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
            const contacts = contactResponse.data.data.connections[0];
            dispatch(login({ user, accessToken, contacts }))
          }
        } catch (error) {
          navigate('/login')
        }
      })()
    }, [navigate, dispatch, backendUri]
  )
  // const f = async () => {
  //   window.open((backendUri + '/user/Glogout'), "_self")
  //   console.log(response);
  // }
  return (
    <div className='flex-1 flex flex-col'>
      <header className="shadow sticky z-50 top-16 text-white">
        <div className='h-14 flex items-center'>
          <div className='outlet h-full w-1/3 justify-center flex items-center heading bg-gradient-to-r from-green-400 to-blue-500'>
            left column
          </div>
          <div className='chatsection w-2/3 text-center heading h-full justify-center flex items-center heading bg-gradient-to-r from-green-400 to-blue-500'>
            {currentChat ?
              <div className={`flex gap-4 w-full rounded-2xl p-2 mt-2`} >
                <div className='flex justify-center items-center'>
                  <Avatar>
                    <AvatarImage src={currentChat.avatar} alt="avatar" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                <div className='w-full text-white flex justify-center items-center'>
                  {currentChat.fullName}
                </div>
              </div>
              :
              "chat section"}
          </div>
        </div>
      </header>
      <div className='flex flex-1'>
        <div className='w-1/3 flex items-center flex-col bg-gradient-to-r from-blue-500 to-purple-600'>
          <ChatOpener setCurrentChat={setCurrentChat} />
        </div>
        <div className='w-2/3 flex-1 flex flex-col bg-gradient-to-r from-blue-500 to-purple-600'>
          {/* <div className='flex-1 overflow-y-auto p-4'>*/}
            <ChatViewer currentChat={currentChat} /> 
          {/* </div>
          <div className='sticky bottom-0 p-4 bg-gradient-to-r from-blue-500 to-purple-700'>
            <Input className='w-full' placeholder='Enter your message' />
          </div> */}
        </div>
      </div>
    </div>
  );

}

export default Dashboard