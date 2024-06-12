import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Input } from './../../@/components/ui/input';  // Ensure this is the correct path to your Input component
import AuthorChat from './../ChatType/AuthorChat';
import RecieverChat from './../ChatType/RecieverChat';
import { ScrollArea } from './../../@/components/ui/scroll-area';
import { FaArrowAltCircleUp } from "react-icons/fa";
import { toast } from 'react-toastify';
function RoomChatViewer({ currentRoom, currentPageSet = 1, setRoomRel }) {
  const [mess, setMess] = useState([]);
  const socket = useSelector((state) => state.auth.socket);
  const [currentPage, setCurrentPage] = useState(Number.parseInt(currentPageSet));
  const [totalPages, setTotalPages] = useState(1);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const user = useSelector((state) => state.auth.userData);
  const { register, handleSubmit, reset } = useForm();
  const scrollAreaRef = useRef(null);
  const backendUri = import.meta.env.VITE_BACKEND_URI;
  const dummyDivRef = useRef(null);

  const gt = async () => {
    try {
      const response = await axios.post(backendUri + `/message/room`, {
        roomId: currentRoom?._id,
        page: 1,
        limit: 10 * currentPage
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        withCredentials: true
      });
      setTotalPages(response.data.data.totalPages);
      setMess(response.data.data.messages.reverse());
      scrollTimer();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    gt();
  }, [currentRoom, currentPage]);

  useEffect(() => {
    const handleNewMessage = (res) => {
      if (currentRoom!='' && currentRoom._id != res?.currentRoom) {
        //give notifications
        console.log(res);
        toast(`${res.author.fullName} sent "${res.mess.content}"  in ${res.roomTitle}`)
      }
      else {
        if (res && (!mess.length || mess[mess.length - 1].createdAt !== res.mess.createdAt)) {
          setMess((prevMess) => [
            ...prevMess,
            {
              _id: res.mess._id,
              content: res.mess.content,
              createdAt: res.mess.createdAt,
              author: res.mess.author,
              authorName: {
                _id: res.author._id,
                avatar: res.author.avatar,
                fullName: res.author.fullName
              }
            }
          ]);
          scrollTimer();
        }
      }
    };

    socket?.on('new-room-messages-arrived', handleNewMessage);

    // Clean up the event listener on component unmount
    return () => {
      socket?.off('new-room-messages-arrived', handleNewMessage);
    };
  }, [socket, mess, currentRoom]);

  const messageHandle = async (data) => {
    const response = await axios.post(backendUri + `/message/room-message`, {
      roomID: currentRoom?._id,
      content: data.message,
      roomName: currentRoom?.title
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      withCredentials: true
    });

    socket.emit('new-room-message', { currentRoom, res: response.data.data, author: user });

    if (response) {
      setMess((prevMess) => [
        ...prevMess,
        {
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
            _id: currentRoom?._id,
            avatar: currentRoom?.avatar,
            fullName: currentRoom?.title
          }
        }
      ]);
      setRoomRel((prev) => !prev);
      reset();
      scrollTimer();
    }
  };

  const scrollToBottom = () => {
    if (dummyDivRef.current) {
      dummyDivRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollTimer = () => {
    setTimeout(() => scrollToBottom(), 500);
  };

  return (
    currentRoom &&
    <>
      <div className='flex-1 overflow-y-auto p-4'>
        <ScrollArea ref={scrollAreaRef} className={`md:h-[calc(100vh-35vh)] h-[70vh] p-4 flex w-full`}>
          {totalPages > 1 && (
            <div className='flex justify-center p-5 items-center'>
              <FaArrowAltCircleUp onClick={() => {
                setCurrentPage((prev) => prev + 1);
              }} />
            </div>
          )}
          {mess?.map((m, i) => (
            <div key={`m._id` + i} className='flex w-full flex-col-reverse'>
              {m.author === user._id
                ? <AuthorChat message={m.content} createdAt={m.createdAt} />
                : <RecieverChat fullName={m.authorName?.fullName} avatar={m.authorName?.avatar} message={m.content} createdAt={m.createdAt} />}
            </div>
          ))}
          <div ref={dummyDivRef}></div>
        </ScrollArea>
      </div>
      <div className='sticky bottom-0 p-4 bg-gradient-to-r from-blue-500 to-purple-700'>
        <form onSubmit={handleSubmit(messageHandle)}>
          <Input autoComplete="off" {...register("message", { required: true })} className='w-full' placeholder='Enter your message' />
        </form>
      </div>
    </>
  );
}

export default RoomChatViewer;
