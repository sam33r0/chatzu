import axios from 'axios';
import { useSelector } from 'react-redux';
import { Input } from './../../@/components/ui/input';
import { useForm } from 'react-hook-form';
import React, { useState, useRef, useEffect } from 'react';
import AuthorChat from './../ChatType/AuthorChat';
import RecieverChat from './../ChatType/RecieverChat';
import { ScrollArea } from './../../@/components/ui/scroll-area';
import { FaArrowAltCircleUp } from "react-icons/fa";
import { toast } from 'react-toastify';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../@/components/ui/avatar.jsx'
function ChatViewer({ currentChat, currentPageSet = 1, setRel }) {
  const [mess, setMess] = useState(null);
  const socket = useSelector((state) => state.auth.socket);
  const [currentPage, setCurrentPage] = useState(Number.parseInt(currentPageSet))
  const [totalPages, setTotalPages] = useState(1)
  const accessToken = useSelector((state) => state.auth.accessToken);
  const user = useSelector((state) => state.auth.userData);
  const { register, handleSubmit, reset } = useForm();
  const scrollAreaRef = useRef(null);
  const backendUri = import.meta.env.VITE_BACKEND_URI;
  const dummyDivRef = useRef(null);
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
  const messageHandle = async (data) => {
    reset();
    const response = await axios.post(backendUri + '/message/direct', {
      content: data.message,
      recieverId: currentChat._id
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      withCredentials: true
    });

    if (response) {
      socket.emit('new-direct-message', {
        response: response.data.data,
        sender: {
          _id: user._id,
          avatar: user.avatar,
          fullName: user.fullName
        },
        reciever: {
          _id: currentChat?._id,
          avatar: currentChat.avatar,
          fullName: currentChat.fullName
        },
      })
      mess.push({
        _id: new Date(),
        content: data.message,
        createdAt: new Date(),
        sender: {
          _id: user._id,
          avatar: user.avatar,
          fullName: user.fullName
        },
        reciever: {
          _id: currentChat?._id,
          avatar: currentChat.avatar,
          fullName: currentChat.fullName
        }
      })

      // setTimeout(
      //   () => scrollToBottom(), 500
      // )
      setRel(prev => !prev);
      scrollTimer();
    }
  }
  const gt = async () => {
    const response = await axios.post(backendUri + '/message', {
      rec: currentChat?._id,
      page: 1,
      limit: 15 * currentPage
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      withCredentials: true
    })
    // console.log(response, currentPage);
    setTotalPages(response.data.data.totalPages)
    setMess(response.data.data.messages.reverse())
    scrollTimer();
  }
  useEffect(() => {
    gt();
  }, [currentChat, currentPage])

  useEffect(() => {
    const handleNewMessage = (res) => {
      if (currentChat != "" && currentChat._id != res?.sender._id) {
        //give notifications
        // toast(<>
        //   <p>{res.content}</p>
        //   <div className='flex justify-end items-center'>
        //     <Avatar>
        //       <AvatarImage src={res.sender.avatar} alt="avatar" />
        //       <AvatarFallback>CN</AvatarFallback>
        //     </Avatar>
        //     <span>{res.sender.fullName}</span>
        //   </div>
        // </>);
        toast(`${res.sender.fullName} sent "${res.content}"`)
      }
      else {
        if (res && (!mess.length || mess[mess.length - 1].createdAt !== res.createdAt)) {
          setMess((prevMess) => [
            ...prevMess,
            {
              _id: res._id,
              content: res.content,
              createdAt: res.createdAt,
              sender: res.sender,
              reciever: res.reciever
            }
          ]);
          scrollTimer();
        }
      }
    };

    socket?.on('direct-message-arrived', handleNewMessage);

    // Clean up the event listener on component unmount
    return () => {
      socket?.off('direct-message-arrived', handleNewMessage);
    };
  }, [socket, mess, currentChat]);

  return (
    currentChat &&
    <>
      <div className='flex-1 overflow-y-auto p-4'>
        {/* {JSON.stringify(currentChat)}<br /> */}
        <ScrollArea ref={scrollAreaRef} className={`md:h-[calc(100vh-35vh)] h-[70vh] p-4 flex w-full`}>
          {totalPages > 1 && <div className='flex justify-center p-5 items-center'>
            <FaArrowAltCircleUp onClick={() => {
              setCurrentPage(prev => prev + 1);
            }} />
          </div>}
          {mess?.map(m =>
            <div key={m.createdAt} className='flex w-full flex-col-reverse '>
              {
                (m.sender._id == user._id)
                  ?
                  <AuthorChat message={m.content} createdAt={m.createdAt} />
                  :
                  <RecieverChat message={m.content} createdAt={m.createdAt} />
              }
              {/* {m.content}<br /> */}
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

export default ChatViewer