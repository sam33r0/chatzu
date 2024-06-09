import axios from 'axios';
import { useSelector } from 'react-redux';
import { Input } from './../../@/components/ui/input';
import { useForm } from 'react-hook-form';
import React, { useState, useRef, useEffect } from 'react';
import AuthorChat from './../AuthorChat';
import RecieverChat from './../RecieverChat';
import { ScrollArea } from './../../@/components/ui/scroll-area';
import { FaArrowAltCircleUp } from "react-icons/fa";

function RoomChatViewer({ currentRoom, currentPageSet = 1, setRoomRel }) {
  const [mess, setMess] = useState(null);
  const [currentPage, setCurrentPage] = useState(Number.parseInt(currentPageSet))
  const [totalPages, setTotalPages] = useState(1)
  // console.log("from current room ", currentRoom);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const user = useSelector((state) => state.auth.userData);
  const { register, handleSubmit, reset } = useForm();
  const scrollAreaRef = useRef(null);
  const backendUri = import.meta.env.VITE_BACKEND_URI;
  const dummyDivRef = useRef(null);
  const messageHandle = async (data) => {
    const response = await axios.post(backendUri + `/message/room-message`, {
      roomID: currentRoom._id,
      content: data.message,
      roomName: currentRoom.title
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      withCredentials: true
    });
    // console.log("message handle= \t", response);

    if (response) {
      mess.push({
        _id: new Date(),
        content: data.message,
        createdAt: new Date(),
        author: user._id,
        authorName: {
          _id: user._id,
          avatar: user.avatar,
          fullName: user.fullName
        },
        reciever: {
          _id: currentRoom._id,
          avatar: currentRoom.avatar,
          fullName: currentRoom.title
        }
      })
      setRoomRel(prev => !prev)
      reset();
      // setTimeout(
      //   () => scrollToBottom(), 500
      // )
      scrollTimer();
    }
  }
  const scrollToBottom = () => {
    if (dummyDivRef.current) {
      dummyDivRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const scrollTimer = () => {
    setTimeout(
      () => scrollToBottom(), 500
    )
  }
  useEffect(() => {
    const gt = async () => {
      const response = await axios.post(backendUri + `/message/room`, {
        roomId: currentRoom._id,
        page: 1,
        limit: 10 * currentPage
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        withCredentials: true
      })
      setTotalPages(response.data.data.totalPages)
      setMess(response.data.data.messages.reverse())
      scrollTimer();
    }
    gt();

  }, [currentRoom, totalPages, currentPage])
  return (
    currentRoom &&
    <>
      <div className='flex-1 overflow-y-auto p-4'>
        {/* {JSON.stringify(currentChat)}<br /> */}
        <ScrollArea ref={scrollAreaRef} className="h-[400px] p-4 flex w-full ">
          {totalPages > 1 && <div className='flex justify-center p-5 items-center'>
            <FaArrowAltCircleUp onClick={() => {
              setCurrentPage(prev => prev + 1);
            }} />
          </div>}
          {mess?.map(m =>
            <div key={m.createdAt} className='flex w-full flex-col-reverse '>

              {
                (m.author == user._id)
                  ?
                  <AuthorChat message={m.content} createdAt={m.createdAt} />
                  :
                  <RecieverChat fullName={m.authorName?.fullName} avatar={m.authorName?.avatar} message={m.content} createdAt={m.createdAt} />
              }

            </div>)}
          <div ref={dummyDivRef}></div>
        </ScrollArea>
      </div>
      <div className='sticky bottom-0 p-4 bg-gradient-to-r from-blue-500 to-purple-700'>
        <form onSubmit={handleSubmit(messageHandle)}>
          <Input autoComplete="off" {...register("message", { required: true })} className='w-full' placeholder='Enter your message' />
        </form>
      </div>
    </>
  )
}

export default RoomChatViewer