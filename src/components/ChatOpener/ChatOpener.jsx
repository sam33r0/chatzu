import ChatTab from './../Utils/ChatTab';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ScrollArea } from './../../@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { login } from './../../components/store/authSlice.js';
import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../@/components/ui/avatar.jsx'
function ChatOpener({ currentChat, setCurrentChat, reli }) {

  const socket = useSelector((state) => state.auth.socket);
  const contacts = useSelector((state) => state.auth.contacts)?.contacts;
  const backendUri = import.meta.env.VITE_BACKEND_URI;
  const accessToken = useSelector((state) => state.auth.accessToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const handleNewMessage = (res) => {

      if (currentChat == "") {
        // toast(
        //   // <div>
        //   //   <p>{res.content}</p>
        //   //   <div className='flex justify-end items-center'>
        //   //     <Avatar>
        //   //       <AvatarImage src={res.sender.avatar} alt="avatar" />
        //   //       <AvatarFallback>CN</AvatarFallback>
        //   //     </Avatar>
        //   //     <span>{res.sender.fullName}</span>
        //   //   </div>
        //   // </div>
        //   `${res.content}`
        // );
        toast(`${res.sender.fullName} sent "${res.content}"`)
      }
    }
    socket?.on('direct-message-arrived', handleNewMessage);

    // Clean up the event listener on component unmount
    return () => {
      socket?.off('direct-message-arrived', handleNewMessage);
    };
  }, [socket, currentChat])

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
              return <div className='hover:shadow-2xl cursor-pointer'
                onClick={() => {
                  socket.emit('join-direct-chat', c);
                  setCurrentChat(c)
                }} key={c._id}>  <ChatTab avatar={c.avatar} fullName={c.fullName} /></div>
            }
            )
          }
        </ScrollArea>
      </div>
    </>
  )
}

export default ChatOpener