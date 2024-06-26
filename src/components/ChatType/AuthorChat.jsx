import React from 'react';
import TimeComponent from './../Utils/TimeComponent';

function AuthorChat({ message, createdAt }) {
  return (
    <div className="flex w-full justify-end mb-4">
      <div className="max-w-xs md:max-w-md bg-green-500 text-white rounded-lg p-4 shadow-md">
        <p className="mb-1">{message}</p>
        <TimeComponent dateStr={createdAt} className="text-xs text-gray-300" />
      </div>
    </div>
  );
}

export default AuthorChat;
