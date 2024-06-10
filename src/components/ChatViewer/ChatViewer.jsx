import axios from 'axios';
import { useSelector } from 'react-redux';
import { Input } from './../../@/components/ui/input';
import { useForm } from 'react-hook-form';
import React, { useState, useRef, useEffect } from 'react';
import AuthorChat from './../ChatType/AuthorChat';
import RecieverChat from './../ChatType/RecieverChat';
import { ScrollArea } from './../../@/components/ui/scroll-area';
import { FaArrowAltCircleUp } from "react-icons/fa";


function ChatViewer({ currentChat, currentPageSet = 1, setRel }) {
  const [mess, setMess] = useState(null);
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
      reset();
      // setTimeout(
      //   () => scrollToBottom(), 500
      // )
      setRel(prev => !prev);
      scrollTimer();
    }
  }
  useEffect(() => {
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
    gt();

  }, [currentChat, totalPages, currentPage, setCurrentPage, setTotalPages, setMess, axios])
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