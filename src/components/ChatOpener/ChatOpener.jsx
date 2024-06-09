import ChatTab from './../ChatTab.jsx';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ScrollArea } from './../../@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { login } from './../../components/store/authSlice.js';
import { useState } from 'react';
function ChatOpener({ setCurrentChat, reli }) {
  const contacts = useSelector((state) => state.auth.contacts)?.contacts;
  const backendUri = import.meta.env.VITE_BACKEND_URI;
  const accessToken = useSelector((state) => state.auth.accessToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
            const roomList = contactResponse.data.data.roomList;
            // console.log(roomList);
            dispatch(login({ user, accessToken, contacts, roomList }))
          }
        } catch (error) {
          console.log(error);
          // navigate('/login')
        }
      })()
    }, [navigate, dispatch, backendUri, reli]
  )
  return (
    <>
      <div className='w-full flex flex-col gap-1'>
        <ScrollArea className=" flex w-full h-[500px] ">
          {
            contacts?.map((c) => {
              return <div className='hover:shadow-2xl cursor-pointer' onClick={() => setCurrentChat(c)} key={c._id}>  <ChatTab avatar={c.avatar} fullName={c.fullName} /></div>
            }
            )
          }
        </ScrollArea>
      </div>
    </>
  )
}

export default ChatOpener