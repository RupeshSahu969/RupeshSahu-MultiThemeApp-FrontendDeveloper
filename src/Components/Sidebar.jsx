import React from 'react';
import { FaTachometerAlt, FaRegFileAlt, FaSignOutAlt } from 'react-icons/fa';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Header from './Header';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <div
        className={`fixed inset-0 z-10 bg-black bg-opacity-50 lg:hidden ${isOpen ? 'block' : 'hidden'}`}
        onClick={toggleSidebar}
      ></div>
      <div
        className={`fixed z-20 top-0 left-0 h-full bg-gray-800 text-white p-5 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:w-64`}
      >
        <h2 className="text-2xl font-bold text-center hidden sm:block mb-8">
          Admin Panel
        </h2>


        <ul className="space-y-4">
          <li className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-gray-700 rounded">
            <FaTachometerAlt className="text-xl" />
            <Link to="/dashboard">
              Dashboard
            </Link>
          </li>
          <li className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-gray-700 rounded">
            <FaRegFileAlt className="text-xl" />
            <Link to="/form">
              Forms
            </Link>
          </li>
          <li className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-gray-700 rounded" onClick={handleLogout}>
            <FaSignOutAlt className="text-xl" />
            <span>Logout</span>
          </li>
        </ul>
      </div>

      <div className="flex-1 ml-0 lg:ml-64 p-4">
        <Outlet />
      </div>
    </>
  );
};

export default Sidebar;
