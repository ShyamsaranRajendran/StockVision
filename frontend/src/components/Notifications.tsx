import React from 'react';
import { Bell, AlertCircle, CheckCircle, TrendingUp, DollarSign, FileText } from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const notifications = [
    {
      id: 1,
      type: 'price_alert',
      title: 'Price Alert: AAPL',
      message: 'Apple Inc. has reached your target price of $180',
      time: '2 minutes ago',
      read: false,
      icon: AlertCircle,
      category: 'alert',
    },
    {
      id: 2,
      type: 'order',
      title: 'Order Executed',
      message: 'Your buy order for 10 shares of GOOGL has been executed',
      time: '15 minutes ago',
      read: false,
      icon: CheckCircle,
      category: 'success',
    },
    {
      id: 3,
      type: 'market',
      title: 'Market Update',
      message: 'NASDAQ is up by 2.5% today',
      time: '1 hour ago',
      read: true,
      icon: TrendingUp,
      category: 'info',
    },
    {
      id: 4,
      type: 'dividend',
      title: 'Dividend Payment',
      message: 'You have received a dividend payment of $45.50 from MSFT',
      time: '2 hours ago',
      read: true,
      icon: DollarSign,
      category: 'success',
    },
    {
      id: 5,
      type: 'report',
      title: 'New Research Report',
      message: 'A new research report for Tesla (TSLA) is available',
      time: '3 hours ago',
      read: true,
      icon: FileText,
      category: 'info',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Notifications Header */}
      <div className="bg-gray-900 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Bell className="w-6 h-6 text-indigo-400" />
            <h2 className="text-xl font-semibold text-white">Notifications</h2>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-sm text-indigo-400 hover:text-indigo-300">
              Mark all as read
            </button>
            <button className="text-sm text-indigo-400 hover:text-indigo-300">
              Clear all
            </button>
          </div>
        </div>

        {/* Notification Filters */}
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md">
            All
          </button>
          <button className="px-4 py-2 bg-gray-800 text-gray-400 hover:bg-gray-700 rounded-md">
            Unread
          </button>
          <button className="px-4 py-2 bg-gray-800 text-gray-400 hover:bg-gray-700 rounded-md">
            Alerts
          </button>
          <button className="px-4 py-2 bg-gray-800 text-gray-400 hover:bg-gray-700 rounded-md">
            Orders
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-gray-900 rounded-lg">
        <div className="divide-y divide-gray-800">
          {notifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <div
                key={notification.id}
                className={`p-6 flex items-start space-x-4 ${
                  notification.read ? 'opacity-75' : ''
                }`}
              >
                <div className={`p-2 rounded-full ${
                  notification.category === 'alert' ? 'bg-red-500/20' :
                  notification.category === 'success' ? 'bg-green-500/20' :
                  'bg-blue-500/20'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    notification.category === 'alert' ? 'text-red-500' :
                    notification.category === 'success' ? 'text-green-500' :
                    'text-blue-500'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-white">
                      {notification.title}
                    </h3>
                    <span className="text-sm text-gray-400">{notification.time}</span>
                  </div>
                  <p className="mt-1 text-gray-300">{notification.message}</p>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-gray-900 rounded-lg p-6">
        <h3 className="text-lg font-medium text-white mb-4">Notification Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Price Alerts</p>
              <p className="text-sm text-gray-400">Get notified when stocks hit your target price</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Order Updates</p>
              <p className="text-sm text-gray-400">Notifications about your order status</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Market Updates</p>
              <p className="text-sm text-gray-400">Daily market summaries and important news</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};