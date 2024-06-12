import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { login, setGoogle } from '../store/authSlice.js';
import { useNavigate } from 'react-router-dom';
import Laptop from './Laptop.jsx';
import Mobile from './Mobile.jsx';
import { useMediaQuery } from 'react-responsive';

function Dashboard({ param }) {
  const [showRoom, setShowRoom] = useState(false);
  const [rel, setRel] = useState(true);
  const [roomRel, setRoomRel] = useState(true);
  const [currentChat, setCurrentChat] = useState("");
  const [room, setRoom] = useState(false);
  const [currentRoom, setCurrentRoom] = useState("");

  const backendUri = import.meta.env.VITE_BACKEND_URI;
  const accessToken = useSelector((state) => state.auth.accessToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (param === "jwt" || param === "google") {
    dispatch(setGoogle({ authGoogle: param }));
  }
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 720px)'
  });
  const isTabletOrMobile = useMediaQuery({
    query: '(max-width: 720px)'
  });
  const fetchData = useCallback(async () => {
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
        const contacts = contactResponse.data.data.connections[0];
        const roomList = contactResponse.data.data.roomList;
        dispatch(login({ user, accessToken, contacts, roomList }));
      }
    } catch (error) {
      navigate('/login');
    }
  }, [backendUri, accessToken, dispatch, navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const mobileFrag = (
    <Mobile
      room={room}
      setRoom={setRoom}
      currentRoom={currentRoom}
      setCurrentRoom={setCurrentRoom}
      setCurrentChat={setCurrentChat}
      currentChat={currentChat}
      rel={rel}
      setRel={setRel}
      roomRel={roomRel}
      setRoomRel={setRoomRel}
      showRoom={showRoom}
      setShowRoom={setShowRoom}
    />
  );

  const laptopFrag = (
    <Laptop
      room={room}
      setRoom={setRoom}
      currentRoom={currentRoom}
      setCurrentRoom={setCurrentRoom}
      setCurrentChat={setCurrentChat}
      currentChat={currentChat}
      rel={rel}
      setRel={setRel}
      roomRel={roomRel}
      setRoomRel={setRoomRel}
      showRoom={showRoom}
      setShowRoom={setShowRoom}
    />
  );

  return (
    <>
      {isDesktopOrLaptop && laptopFrag}
      {isTabletOrMobile && mobileFrag}
    </>
  );
}

export default Dashboard;
