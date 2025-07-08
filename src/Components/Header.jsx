import React, { useState, useEffect } from 'react';
import { FaBars, FaSignOutAlt } from 'react-icons/fa';

const Header = ({ toggleSidebar }) => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const userEmail = localStorage.getItem('email');
    if (userEmail) {
      setEmail(userEmail);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    window.location.href = '/'; 
  };

  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <button className="lg:hidden" onClick={toggleSidebar}>
        <FaBars className="text-2xl" />
      </button>
      <h1 className="text-xl font-bold hidden sm:block">Admin Panel</h1>
      {email && (
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-300">{email}</span>
          <button onClick={handleLogout} className="bg-red-600 px-2 py-1 rounded hover:bg-red-700">
            <FaSignOutAlt className="text-white" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
