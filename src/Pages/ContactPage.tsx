import React, { useState } from 'react';
import { useTheme } from '../Contexts/ThemeContext';

const ContactPage: React.FC = () => {
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

  const formInputClasses = {
    theme1: 'w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-theme1-primary',
    theme2: 'w-full p-3 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-theme2-primary',
    theme3: 'w-full p-3 bg-white text-gray-800 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-theme3-primary',
  };

  const buttonClasses = {
    theme1: 'bg-theme1-primary text-white py-3 px-6 rounded hover:bg-blue-600 transition-colors duration-300',
    theme2: 'bg-theme2-primary text-theme2-text py-3 px-6 rounded hover:bg-blue-700 transition-colors duration-300',
    theme3: 'bg-theme3-primary text-white py-3 px-6 rounded-full hover:bg-pink-700 transition-colors duration-300',
  };

  return (
    <div className={`transition-all duration-500 ${pageClasses[theme]}`}>
      {theme === 'theme2' && (
        <>
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
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            ></div>
          )}
          <aside
            className={`fixed md:static top-16 md:top-auto left-0 w-[250px] h-[calc(100vh-64px)] bg-gray-900 text-white p-4 shadow-xl transition-all duration-300 z-40
              ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
          >
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: hr@hipster-inc.com</li>
              <li>Phone: +6582314107</li>
              <li>Address: # 01-04, 75 Ayer Rajah Crescent, 139953, Singapore</li>
            </ul>
          </aside>
        </>
      )}

      <div className={`${contentClasses[theme]} transition-all duration-300 pt-8`}>
        <h1 className={`text-4xl font-bold mb-6 ${theme === 'theme3' ? 'text-center' : ''}`}>
          Contact Us
        </h1>
        <p className="mb-8 leading-relaxed">
          Have questions or feedback? Feel free to reach out to us using the form below. We'd love to hear from you!
        </p>

        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-lg font-medium mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={formInputClasses[theme]}
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-lg font-medium mb-2">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={formInputClasses[theme]}
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-lg font-medium mb-2">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className={formInputClasses[theme]}
              placeholder="Type your message here..."
            ></textarea>
          </div>
          <button
            type="submit"
            className={buttonClasses[theme]}
          >
            Send Message
          </button>
        </form>

        {theme !== 'theme2' && (
          <div className="mt-12 p-6 rounded-lg shadow-inner"
            style={{
              backgroundColor: theme === 'theme1' ? '#E0F2F7' : (theme === 'theme3' ? '#FEE4E9' : ''),
              color: theme === 'theme1' ? '#007bff' : (theme === 'theme3' ? '#E91E63' : '')
            }}>
            <h2 className="text-2xl font-bold mb-4">Our Contact Details</h2>
            <p className="mb-2">Email: hr@hipster-inc.com</p>
            <p className="mb-2">Phone: +6582314107</p>
            <p>Address: # 01-04, 75 Ayer Rajah Crescent, 139953, Singapore</p>
            <p className="mt-4">Web: www.hipster-inc.com</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactPage;