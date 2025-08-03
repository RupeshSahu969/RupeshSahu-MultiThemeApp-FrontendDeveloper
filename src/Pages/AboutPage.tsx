// src/pages/AboutPage.tsx
import React, { useState } from 'react';
import { useTheme } from '../Contexts/ThemeContext';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
  const { theme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

  const pageClasses = {
    theme1: 'bg-theme1-bg text-theme1-text font-sans-theme1 min-h-screen p-8 pt-20 md:pt-8',
    theme2: 'bg-theme2-bg text-theme2-text font-serif-theme2 min-h-screen flex flex-col md:flex-row pt-16',
    theme3: 'bg-theme3-bg text-theme3-text font-google-theme3 min-h-screen p-8 pt-20 md:pt-8',
  };

  const contentClasses = {
    theme1: 'max-w-4xl mx-auto space-y-6',
    theme2: `flex-1 p-4 md:p-8 ${isSidebarOpen ? 'ml-[250px] md:ml-0' : 'md:ml-[250px]'}`,
    theme3: 'max-w-6xl mx-auto space-y-8',
  };

  return (
    <div className={`transition-all duration-500 ${pageClasses[theme]}`}>
      {theme === 'theme2' && (
        <>
          {/* Mobile Sidebar Toggle Button */}
          <button
            className="md:hidden fixed top-20 left-4 z-40 bg-gray-700 text-white p-2 rounded-full shadow-lg"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label="Toggle sidebar"
          >
            {isSidebarOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Mobile Sidebar Overlay */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            ></div>
          )}

          {/* Sidebar */}
          <aside
            className={`fixed md:static top-16 md:top-auto left-0 w-[250px] h-[calc(100vh-64px)] bg-gray-900 text-white p-4 shadow-xl transition-all duration-300 z-40
              ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
          >
            <h3 className="text-xl font-bold mb-4">About Sidebar</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="block hover:text-blue-400" onClick={() => setIsSidebarOpen(false)}>Our Mission</Link></li>
              <li><Link to="#" className="block hover:text-blue-400" onClick={() => setIsSidebarOpen(false)}>Our Team</Link></li>
            </ul>
          </aside>
        </>
      )}
      <div className={`${contentClasses[theme]} transition-all duration-300 pt-8`}>
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="mb-4">
          This is the about page. Our application demonstrates a robust theming system built with React, TypeScript, and Tailwind CSS.
        </p>
        <p>
          Each theme provides a unique visual experience, showcasing changes in colors, fonts, and layout, while maintaining responsiveness across devices.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;