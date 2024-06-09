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
import { MdGroups } from "react-icons/md";
import { FaMessage } from "react-icons/fa6";
import { FaExchangeAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import RoomOpener from './../../components/RoomOpener/RoomOpener.jsx';
import RoomChatViewer from './../../components/RoomChatViewer/RoomChatViewer.jsx';

function Dashboard() {
  const { param } = useParams();
  const [rel, setRel] = useState(true);
  const [roomRel, setRoomRel] = useState(true);
  const [currentChat, setCurrentChat] = useState("")
  const [room, setRoom] = useState(false);
  const [currentRoom, setCurrentRoom] = useState("")

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
            const roomList = contactResponse.data.data.roomList;
            // console.log(roomList);
            dispatch(login({ user, accessToken, contacts, roomList }))
          }
        } catch (error) {
          navigate('/login')
        }
      })()
    }, [navigate, dispatch, backendUri]
  )
  return (
    <div className='flex-1 flex flex-col'>
      <header className="shadow sticky z-50 top-16 text-white">
        <div className='h-14 flex items-center'>
          <div className='outlet h-full w-1/3 justify-center flex items-center heading bg-gradient-to-r from-green-400 to-blue-500'>
            <div onClick={() => setRoom(prev => !prev)} className='w-full text-white flex justify-center cursor-alias	 items-center'>
              {room ? <>Direct Messages &nbsp; <FaMessage /> </> : <>Rooms &nbsp;<MdGroups /></>}
              &nbsp;<FaExchangeAlt />
            </div>
          </div>
          <div className='chatsection w-2/3 text-center heading h-full justify-center flex items-center heading bg-gradient-to-r from-green-400 to-blue-500'>
            {
              room
                ?
                currentRoom
                  ?
                  <>
                    <div className={`flex gap-4 w-full rounded-2xl p-2 mt-2`} >
                      <div className='flex justify-center items-center'>
                        <Avatar>
                          <AvatarImage src={currentRoom.avatar} alt="avatar" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </div>
                      <div className='w-full text-white flex justify-center items-center'>
                        {currentRoom.title}
                      </div>
                      <div onClick={()=>{
                        navigate(`/room/addMember/${currentRoom._id}`)
                      }} className='w-fit hover:text-orange-300 hover:cursor-pointer text-white flex justify-center items-center'>
                        Add<FaPlus />
                      </div>
                    </div>
                  </>
                  :
                  <>Room Chat</>
                :
                currentChat
                  ?
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
                  <>
                    Direct Messages
                  </>}
          </div>
        </div>
      </header>
      <div className='flex flex-1'>
        <div className='w-1/3 flex items-center flex-col bg-gradient-to-r from-blue-500 to-purple-600'>
          {
            room ? <RoomOpener setCurrentRoom={setCurrentRoom} roomRel={roomRel} /> : <ChatOpener setCurrentChat={setCurrentChat} reli={rel} />
          }
        </div>
        <div className='w-2/3 flex-1 flex flex-col bg-gradient-to-r from-blue-500 to-purple-600'>
          {/* <div className='flex-1 overflow-y-auto p-4'>*/}
          {room ? <RoomChatViewer currentRoom={currentRoom} setRoomRel={setRoomRel}/> : <ChatViewer currentChat={currentChat} currentPageSet={1} setRel={setRel} />}
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