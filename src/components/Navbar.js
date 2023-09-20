import React from 'react';

const Navbar = ({ user }) => {
  return (
    <div className="flex items-center bg-black bg-opacity-85 p-4">
      <div className="flex items-center">
        {user && user.photoURL && (
          <img src={user.photoURL} alt="Avatar" className="w-12 h-12 rounded-full mr-2" />
        )}
        {user && (
          <div>
            <div className="font-montserrat font-bold text-white">{user.displayName}</div>
            <div className="text-xs text-white">EMG Monitoring</div>
          </div>
        )}
      </div>
      <div className="flex-grow"></div>
      <button className="ml-4 bg-red-500 hover:bg-red-700 text-white font-montserrat py-2 px-4 rounded-full transition duration-300">Connected</button>
    </div>
  );
};

export default Navbar;
