import axios from 'axios';
import { useSelector } from 'react-redux';
import { Input } from './../../@/components/ui/input';
import { useForm } from 'react-hook-form';
import React, { useState, useRef, useEffect } from 'react';
import AuthorChat from './../AuthorChat';
import RecieverChat from './../RecieverChat';
import { ScrollArea } from './../../@/components/ui/scroll-area';

function ChatViewer({ currentChat }) {
  const [mess, setMess] = useState(null);
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
          _id: currentChat._id,
          avatar: currentChat.avatar,
          fullName: currentChat.fullName
        }
      })
      reset();
      // setTimeout(
      //   () => scrollToBottom(), 500
      // )
      scrollTimer();
    }
  }

  useEffect(() => {
    const gt = async () => {
      const response = await axios.post(backendUri + '/message', {
        rec: currentChat._id,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        withCredentials: true
      })
      // console.log(response.data.data);
      setMess(response.data.data)
      scrollTimer();
    }
    gt();

  }, [currentChat])
  return (
    currentChat &&
    <>
      <div className='flex-1 overflow-y-auto p-4'>
        {/* {JSON.stringify(currentChat)}<br /> */}
        <ScrollArea ref={scrollAreaRef} className="h-[400px] flex w-full  rounded-md border">
          {mess.map(m =>
            <div key={m.createdAt} className='flex w-full flex-wrap-reverse'>
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
          <Input {...register("message", { required: true })} className='w-full' placeholder='Enter your message' />
        </form>
      </div>
    </>
  )
}

export default ChatViewer