import ChatTab from './../ChatTab.jsx';
import React from 'react'
import { useSelector } from 'react-redux'
import { ScrollArea } from './../../@/components/ui/scroll-area';
function ChatOpener({ setCurrentChat }) {
  const contacts = useSelector((state) => state.auth.contacts)?.contacts;

  return (
    <>
      <div className='w-full flex flex-col gap-1'>
        <ScrollArea className=" flex w-full h-[500px] ">
          {
            contacts?.map((c) => {
              return <div className='hover:shadow-2xl cursor-pointer' onClick={() => setCurrentChat(c)} key={c._id}>  <ChatTab avatar={c.avatar} fullName={c.fullName} /></div>
            }
            )
          }
        </ScrollArea>
      </div>
    </>
  )
}

export default ChatOpener