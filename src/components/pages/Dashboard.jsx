import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { login, setGoogle } from '../store/authSlice.js';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Laptop from './Laptop.jsx';
import Mobile from './Mobile.jsx';

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
  const mobileFrag= <Mobile room={room} setRoom={setRoom} currentRoom={currentRoom} setCurrentRoom={setCurrentRoom} setCurrentChat={setCurrentChat} currentChat={currentChat} rel={rel} setRel={setRel} roomRel={roomRel} setRoomRel={setRoomRel} />
  const laptopFrag = < Laptop room={room} setRoom={setRoom} currentRoom={currentRoom} setCurrentRoom={setCurrentRoom} setCurrentChat={setCurrentChat} currentChat={currentChat} rel={rel} setRel={setRel} roomRel={roomRel} setRoomRel={setRoomRel} />
  return (
    <>
    {laptopFrag}
    {mobileFrag}
    </>
  )
}

export default Dashboard