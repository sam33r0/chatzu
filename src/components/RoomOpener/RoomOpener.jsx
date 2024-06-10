import { useDispatch, useSelector } from 'react-redux'
import { ScrollArea } from './../../@/components/ui/scroll-area'
import React from 'react'
import ChatTab from './../../components/Utils/ChatTab';
import { useEffect } from 'react';
import { login } from './../../components/store/authSlice';
import axios from 'axios';
function RoomOpener({setCurrentRoom, roomRel}) {
    const roomList= useSelector((state)=> state.auth)?.roomList;
    const dispatch=useDispatch();
    const accessToken= useSelector((state) => state.auth.accessToken);
    const backendUri= import.meta.env.VITE_BACKEND_URI;
    useEffect(
      () => {
        (async () => {
          try {
            // console.log("run run ");
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
              dispatch(login({ user, accessToken, contacts, roomList }))
            }
          } catch (error) {
            console.log(error);
            // navigate('/login')
          }
        })()
      }, [ dispatch, backendUri, roomRel]
    )
    return (
        <>
          <div className='w-full flex flex-col gap-1'>
            <ScrollArea className=" flex w-full h-[500px] ">
              {
                roomList?.map((c) => {
                  return <div className='hover:shadow-2xl cursor-pointer w-full' onClick={() => setCurrentRoom(c)} key={c._id}>  <ChatTab avatar={c.avatar} fullName={c.title} /></div>
                }
                )
              }
            </ScrollArea>
          </div>
        </>
      )
}

export default RoomOpener