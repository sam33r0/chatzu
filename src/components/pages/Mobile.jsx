import React from 'react'
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
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

function Mobile({ room, setRoom, currentRoom, setCurrentRoom, setCurrentChat, currentChat, rel, setRel, roomRel, setRoomRel, }) {
    const navigate = useNavigate();
    const socket = useSelector((state) => state.auth.socket);
    useEffect(() => {
        if (!room) {
            const handleNewMessage = (res) => {
                console.log(currentRoom, res);
                toast(`${res.author.fullName} sent "${res.mess.content}"  in ${res.roomTitle}`)

            }
            socket?.on('new-room-messages-arrived', handleNewMessage);

            // Clean up the event listener on component unmount
            return () => {
                socket?.off('new-room-messages-arrived', handleNewMessage);
            };
        }
    }, [socket, currentRoom, room])
    useEffect(() => {
        if (room) {
            const handleNewMessage = (res) => {
                toast(`${res.sender.fullName} sent "${res.content}"`)
            }
            socket?.on('direct-message-arrived', handleNewMessage);

            // Clean up the event listener on component unmount
            return () => {
                socket?.off('direct-message-arrived', handleNewMessage);
            };
        }
    }, [socket, currentChat, room])
    // if room => show roomOpener section then  if currentRoom =>  show roomChatViewer section
    //  if not room =>  then show chatOpener section then => if currentChat then show chatViewer
    return (
        <div className='flex-1 flex flex-col'>

            <div className='chatsection w-full text-center heading p-4 justify-center flex items-center heading bg-gradient-to-r from-green-400 to-blue-500'>
                {
                    room
                        ?
                        currentRoom
                            ?
                            <>
                                <div className={`flex gap-4 w-full rounded-2xl  `} >
                                    <div className='flex justify-center gap-2 items-center'>
                                        <div onClick={() => setCurrentRoom("")}>
                                            Back
                                        </div>
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
                            <>
                                <div onClick={() => { setRoom(prev => !prev) }} className='w-full hover:cursor-alias text-white justify-center flex items-center'>
                                    Direct Messages &nbsp;<MdGroups />  &nbsp;<FaExchangeAlt />
                                </div>
                            </>
                        :
                        currentChat
                            ?
                            <div className={`flex gap-4 w-full rounded-2xl  `} >
                                <div className='flex justify-center gap-2 items-center'>
                                    <div onClick={() => setCurrentChat('')}>
                                        Back
                                    </div>
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
                                <div onClick={() => { setRoom(prev => !prev) }} className='w-full hover:cursor-alias text-white justify-center flex items-center'>
                                    Rooms &nbsp;<MdGroups />  &nbsp;<FaExchangeAlt />
                                </div>
                            </>}
            </div>
            {(!currentChat && !currentRoom) &&
                <div className='w-full flex items-center flex-col bg-gradient-to-r from-blue-500 to-purple-600'>
                    {
                        room
                            ?
                            <RoomOpener currentRoom={currentRoom} setCurrentRoom={setCurrentRoom} roomRel={roomRel} />
                            :
                            <ChatOpener currentChat={currentChat} setCurrentChat={setCurrentChat} reli={rel} />
                    }
                </div>
            }
            {
                <div className='w-full flex-1 flex flex-col bg-gradient-to-r from-blue-500 to-purple-600'>
                    {/* <div className='flex-1 overflow-y-auto p-4'>*/}
                    {room
                        ?
                        <RoomChatViewer currentRoom={currentRoom} setRoomRel={setRoomRel} />
                        :
                        <ChatViewer currentChat={currentChat} currentPageSet={1} setRel={setRel} />
                    }
                </div>
            }
        </div>
    )
}

export default Mobile