import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-teal-800 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-white text-xl font-semibold">
          Job Portal
        </Link>
        <div className="hidden md:flex space-x-8">
          <Link
            to="/"
            className="text-white hover:bg-gray-700 px-3 py-2 rounded-md"
          >
            Home
          </Link>
          <Link
            to="/admin"
            className="text-white hover:bg-gray-700 px-3 py-2 rounded-md"
          >
            Admin
          </Link>
        </div>
        <div className="md:hidden flex items-center">
          <button
            className="text-white p-2"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden">
          <div className="flex flex-col items-center bg-teal-500 py-2 space-y-4">
            <Link
              to="/"
              className="text-white hover:bg-gray-700 px-3 py-2 rounded-md"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            
            <Link
              to="/admin"
              className="text-white hover:bg-gray-700 px-3 py-2 rounded-md"
              onClick={() => setMenuOpen(false)}
            >
              Admin
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
