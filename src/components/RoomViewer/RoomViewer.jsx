import React, { useState } from 'react';

function RoomViewer({ currentRoom }) {
  const [expandedImage, setExpandedImage] = useState(null);

  if (!currentRoom) {
    return <div>No room selected</div>;
  }

  const { title, avatar, update, memberDetails } = currentRoom;

  const handleImageClick = (imageSrc) => {
    setExpandedImage(imageSrc);
  };

  const handleBackgroundClick = () => {
    setExpandedImage(null);
  };

  return (
    <div>
      {expandedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={handleBackgroundClick}
        >
          <img src={expandedImage} alt="Expanded Avatar" className="max-w-full max-h-full rounded-full shadow-lg" />
        </div>
      )}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-8 px-4 md:px-8 shadow-lg">
        <div className="container mx-auto">
          <div className="flex flex-col items-center mb-6 text-center">
            <img
              src={avatar}
              alt="Room Avatar"
              className="w-24 h-24 md:w-32 md:h-32 rounded-full shadow-lg mb-4 cursor-pointer border-2 border-gray-300"
              onClick={() => handleImageClick(avatar)}
            />
            <div>
              <h2 className="text-2xl font-extrabold mb-2">{title}</h2>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Members</h3>
            <div className="space-y-4">
              {memberDetails.map((member) => (
                <div key={member._id} className="flex items-center border-b border-gray-400 pb-3">
                  <img
                    src={member.avatar}
                    alt={`${member.fullName}'s avatar`}
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full mr-3 shadow-md cursor-pointer border-2 border-gray-400"
                    onClick={() => handleImageClick(member.avatar)}
                  />
                  <div className="flex-1 border border-gray-400 p-3 rounded-lg bg-gray-800 bg-opacity-50">
                    <p className="font-medium ">{member.fullName}</p>
                    <p className="text-gray-300 text-sm">{member.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RoomViewer;
