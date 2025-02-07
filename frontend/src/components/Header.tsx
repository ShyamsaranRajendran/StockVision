import React, { useEffect, useState } from 'react';
import { Bell, BellDot, User } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hasNotification, setHasNotification] = useState(true); // Change to `true` when there's a notification

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full transition-all border-b border-gray-700 ${
        isScrolled ? 'backdrop-blur-md bg-gray-800 bg-opacity-80' : 'bg-gray-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end items-center py-4">
          <div className="flex items-center space-x-4">
            {/* Notification Bell */}
            <button className="relative p-2 text-gray-400 hover:text-gray-300">
  <Bell className="h-6 w-6" />
  {hasNotification && (
    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
  )}
  {hasNotification && (
    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full" />
  )}
</button>


            {/* User Icon */}
            <button className="p-2 text-gray-400 hover:text-gray-300">
              <User className="h-6 w-6" />
            </button>

            {/* Sign In Button */}
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
