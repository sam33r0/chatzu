import React from 'react';
import TimeComponent from './../Utils/TimeComponent';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from './../../@/components/ui/avatar.jsx'
function RecieverChat({ message, createdAt, avatar, fullName }) {
  return (
    <div className="flex gap-2 w-full justify-start mb-4">
      {avatar && <>
        <Avatar>
          <AvatarImage src={avatar} alt="avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar></>}
      <div className="max-w-xs md:max-w-md bg-gray-200 text-black rounded-lg p-3 shadow-md">
        {fullName &&  <p className='text-xs'>{fullName}</p>}
        <p className="mb-1">{message}</p>
        <TimeComponent dateStr={createdAt} className="text-xs text-gray-500" />
      </div>

    </div>
  );
}

export default RecieverChat;
