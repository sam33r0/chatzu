import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import ChatViewer from './../../components/ChatViewer/ChatViewer.jsx';
import ChatOpener from '../ChatOpener/ChatOpener.jsx';
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

function Laptop({ room, setRoom, currentRoom, setCurrentRoom, setCurrentChat, currentChat, rel, setRel, roomRel, setRoomRel, }) {
    const navigate = useNavigate();
    return (
        <div className='flex-1 hidden md:flex flex-col '>
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
                                            <div onClick={() => {
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
                    {room ? <RoomChatViewer currentRoom={currentRoom} setRoomRel={setRoomRel} /> : <ChatViewer currentChat={currentChat} currentPageSet={1} setRel={setRel} />}
                    {/* </div>
          <div className='sticky bottom-0 p-4 bg-gradient-to-r from-blue-500 to-purple-700'>
            <Input className='w-full' placeholder='Enter your message' />
          </div> */}
                </div>
            </div>
        </div>
    )
}

export default Laptop