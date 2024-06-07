import React from 'react';
import TimeComponent from './TimeComponent';

function RecieverChat({ message, createdAt }) {
  return (
    <div className="flex w-full justify-start mb-4">
      <div className="max-w-xs md:max-w-md bg-gray-200 text-black rounded-lg p-4 shadow-md">
        <p className="mb-1">{message}</p>
        <TimeComponent dateStr={createdAt} className="text-xs text-gray-500" />
      </div>
    </div>
  );
}

export default RecieverChat;
