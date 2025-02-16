import  { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import  Dashboard  from './pages/Dashboard';
import { TradingPage } from './pages/TradingPage';
import { SocialTradingPage } from './pages/SocialTradingPage';
import { ChatPage } from './pages/ChatPage';
import { ProfilePage } from './pages/ProfilePage';
import { WatchlistPage } from './pages/WatchlistPage';
import  Trading  from './components/Trading';
import  {PortfolioPage}  from './pages/PortfolioPage';
import  SocialTrading  from './components/SocialTrading';
import  LiveChat  from './components/LiveChat';
import { MarketAnalysisPage } from './components/MarketPage';
import NewsResearchPage from './components/News';
import { OrdersPage } from './components/Orders';
import { NotificationsPage } from './pages/Notifications';
import { SettingsPage } from './components/Settings';
import Header from './components/Header';
import {Course} from './components/Course.tsx';
import {CourseDetails} from './components/CourseDetails.tsx';
import Sign from './pages/Sign';
import { Outlet } from 'react-router-dom';
import ChatBot from './pages/ChatBot';
import { ToastContainer} from 'react-toastify';
import Footer from './components/Footer';
import { LearningPage } from './pages/Learning';
function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state

  // Function to toggle sidebar open/close
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <div className="bg-gray-900 flex py-20">
      {/* Sidebar - Fixed Position */}
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />

      {/* Main Content - Scrollable Without Scrollbar */}
      <div className="flex-1 h-screen overflow-y-auto p-3 lg:p-4 scrollbar-hide">
        <Outlet />
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
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
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/social" element={<SocialTrading />} />
          <Route path="/chat" element={<LiveChat />} />
          <Route path="/market-analysis" element={<MarketAnalysisPage/>} />
          <Route path="/learning" element={<LearningPage />}/> 
          <Route path="/learning/courses" element={<Course />} />
          <Route path="/learning/course/:id" element={<CourseDetails />} />

          <Route path="/news" element={<NewsResearchPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path ="/watchlist" element={<WatchlistPage/>}/>
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
        <Route path="/sign-in" element={<Sign/>} />
      </Routes>
      <ChatBot />
      <Footer />
    </Router>
  );
}

export default App;
