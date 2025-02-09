import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import Header from './components/Header';
import Sign from './pages/Sign';
import { Outlet } from 'react-router-dom';
import ChatBot from './pages/ChatBot';
import {toast, ToastContainer} from 'react-toastify';
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
      <ToastContainer/>
    </div>
  );
}

function App() {
  return (
    <Router>
       <Header />
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
        <Route path="/sign-in" element={<Sign/>} />
      </Routes>
      <ChatBot />
    </Router>
  );
}

export default App;
