import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  LineChart,
  Wallet,
  Users,
  MessageSquare,
  UserCircle,
  Newspaper,
  BarChart,
  ClipboardList,
  Bell,
  Settings,
  Star,
  Menu,
  LogOut,
  X,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean; 
  onToggle: () => void; // Function to toggle the sidebar state
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(isOpen);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/trading', label: 'Trading', icon: LineChart },
    { path: '/portfolio', label: 'Portfolio', icon: Wallet },
    { path: '/social', label: 'Social Trading', icon: Users },
    { path: '/chat', label: 'Live Chat', icon: MessageSquare },
    { path: '/market-analysis', label: 'Market Analysis', icon: BarChart },
    { path: '/news', label: 'News & Research', icon: Newspaper },
    { path: '/orders', label: 'Orders', icon: ClipboardList },
    { path: '/watchlist', label: 'Watchlist', icon: Star },
    { path: '/notifications', label: 'Notifications', icon: Bell },
    { path: '/profile', label: 'Profile', icon: UserCircle },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  useEffect(() => {
    setIsSidebarOpen(isOpen);
  }, [isOpen]);

  useLayoutEffect(() => {
    setTimeout(() => setIsLoading(false), 1000); // Simulate loading delay
  }, []);

  const handleMenuItemClick = (path: string) => {
    navigate(path);
    if (window.innerWidth < 1024) {
      onToggle();
    } else {
      setIsSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 lg:hidden"
        onClick={() => {
          onToggle();
          setIsSidebarOpen(!isSidebarOpen);
        }}
      >
        {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Backdrop for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => {
            onToggle();
            setIsSidebarOpen(false);
          }}
        />
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white z-40 transition-transform duration-300 ease-in-out transform mt-16 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:w-64`}
      >
        <div className="flex flex-col h-full pt-6">
          {/* App Branding */}
          {/* <div className="p-4">
            <div className="flex items-center space-x-2 px-4 py-3">
              <LineChart className="h-8 w-8 text-indigo-500" />
              <span className="text-xl font-bold">StockVision</span>
            </div>
          </div> */}

          {/* Navigation Menu with Skeleton Loader */}
          <nav className="flex-1 px-2 py-4 space-y-1">
            {isLoading
              ? [...Array(6)].map((_, i) => (
                  <div key={i} className="h-10 w-full bg-gray-700 animate-pulse rounded-md"></div>
                ))
              : menuItems.map(({ path, label, icon: Icon }) => (
                  <NavLink
                    key={path}
                    to={path}
                    className={({ isActive }) =>
                      `w-full flex items-center space-x-2 px-4 py-3 rounded-md transition-colors ${
                        isActive ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-gray-800'
                      }`
                    }
                    onClick={() => handleMenuItemClick(path)}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{label}</span>
                  </NavLink>
                ))}
          </nav>

          {/* Market Status with Skeleton Loader */}
          <div className="p-4">
            {isLoading ? (
              <div className="w-full h-16 bg-gray-700 animate-pulse rounded-md"></div>
            ) : (
              <div className="px-4 py-3 bg-gray-800 rounded-md">
                <p className="text-sm text-gray-400">Market Status</p>
                <p className="text-sm font-medium text-green-500">Open</p>
                <div
                  className="mt-3 flex items-center space-x-2 py-3 rounded-md transition-colors text-gray-300 hover:bg-gray-800 cursor-pointer"
                  onClick={() => console.log('Logout clicked')}
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
