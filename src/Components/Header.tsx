// src/components/Header.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme, ThemeName } from '../Contexts/ThemeContext';

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event.target.value as ThemeName);
  };

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const headerClasses = {
    theme1: 'bg-theme1-primary text-white shadow-md',
    theme2: 'bg-theme2-primary text-theme2-text shadow-lg',
    theme3: 'bg-theme3-primary text-white shadow-xl',
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 p-4 flex flex-col md:flex-row justify-between items-center z-50 transition-colors duration-300 ${headerClasses[theme]}`}
    >
    {/* Top Row: Logo + Hamburger */}
      <div className="flex items-center justify-between w-full">
        {/* name */}
        <Link to="/" className="text-2xl md:text-3xl font-bold text-center md:text-left w-full md:w-auto">
          My Multi-Theme App
        </Link>

        {/* Hamburger Icon (visible on mobile only) */}
        <div className="md:hidden z-50">
          <button
            onClick={toggleMenu}
            aria-label="Toggle navigation"
            className="text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Overlay Background for Mobile Menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={toggleMenu}
        ></div>
      )}

      {/* Mobile/Responsive Navigation & Theme Selector */}
      <nav
        className={`${
          isMenuOpen
            ? 'absolute left-0 top-full mt-0 bg-gray-200 text-black shadow-lg p-4 rounded-md z-40 w-full' // Full width mobile menu
            : 'hidden'
        } md:flex md:space-x-4 md:static md:bg-transparent md:shadow-none md:p-0 md:z-auto md:w-auto mt-4 md:mt-0`}
      >
        <ul className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4 text-left text-sm md:text-base w-full md:w-auto">
          <li>
            <Link
              to="/"
              className="hover:underline hover:text-gray-500 transition-all duration-200 block py-2" // Added block and padding for touch
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="hover:underline hover:text-gray-500 transition-all duration-200 block py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="hover:underline hover:text-gray-500 transition-all duration-200 block py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Theme Selector */}
        <div className="mt-4 md:mt-0 md:ml-4 w-full md:w-auto">
          <select
            id="theme-switcher"
            value={theme}
            onChange={handleThemeChange}
            className="p-2 mt-4 rounded bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base" // Full width for mobile select
          >
            <option value="theme1">Theme 1</option>
            <option value="theme2">Theme 2</option>
            <option value="theme3">Theme 3</option>
          </select>
        </div>
      </nav>
    </header>
  );
};

export default Header;