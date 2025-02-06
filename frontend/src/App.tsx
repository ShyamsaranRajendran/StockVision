import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Bell, User } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import  Dashboard  from './pages/Dashboard';
import { TradingPage } from './pages/TradingPage';
import { SocialTradingPage } from './pages/SocialTradingPage';
import { ChatPage } from './pages/ChatPage';
import { ProfilePage } from './pages/ProfilePage';
import  Trading  from './components/Trading';
import  PortfolioHistory  from './components/PortfolioHistory';
import  SocialTrading  from './components/SocialTrading';
import  LiveChat  from './components/LiveChat';
import  MarketAnalysis  from './components/MarketAnalysis';
import  News  from './components/News';
import  Orders  from './components/Orders';
import  Watchlist  from './components/Watchlist';
import  Notifications  from './components/Notifications';
import  Settings  from './components/Settings';

import { Outlet } from 'react-router-dom';
function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state

  // Function to toggle sidebar open/close
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };
  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar} // Toggle function to manage sidebar visibility
      />

      {/* Main Content */}
      <div className="flex-1 p-6 lg:p-8">
        <Outlet />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end items-center py-4">
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-300">
                <Bell className="h-6 w-6" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-300">
                <User className="h-6 w-6" />
              </button>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/trading" element={<TradingPage />} />
          <Route path="/social" element={<SocialTradingPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/profile" element={<ProfilePage />} />
  <Route path="/trading" element={<Trading />} />
  <Route path="/portfolio" element={<PortfolioHistory />} />
  <Route path="/social" element={<SocialTrading />} />
  <Route path="/chat" element={<LiveChat />} />
  <Route path="/market-analysis" element={<MarketAnalysis />} />
  <Route path="/news" element={<News />} />
  <Route path="/orders" element={<Orders />} />
  <Route path="/watchlist" element={<Watchlist />} />
  <Route path="/notifications" element={<Notifications />} />
  <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
