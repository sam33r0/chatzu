import React from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '../@/components/ui/avatar.jsx'
function ChatTab({ avatar, fullName }) {
    return (
        <div className={`flex gap-4 w-full border-2 rounded-2xl p-2 mt-2`} >
            <div className='flex justify-center items-center'>
                <Avatar>
                    <AvatarImage src={avatar} alt="avatar" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
            <div className='w-full text-white flex justify-center items-center'>
                {fullName}
            </div>
        </div>
    )
}

export default ChatTab