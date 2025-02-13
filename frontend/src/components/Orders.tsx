import React, { useState } from 'react';
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export const OrdersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'open' | 'completed' | 'cancelled'>('open');

  const orders = {
    open: [
      {
        id: 'ORD001',
        symbol: 'AAPL',
        type: 'buy',
        orderType: 'limit',
        quantity: 10,
        price: 175.50,
        status: 'pending',
        time: '2024-03-15 10:30:00',
      },
      {
        id: 'ORD002',
        symbol: 'GOOGL',
        type: 'sell',
        orderType: 'market',
        quantity: 5,
        price: 141.80,
        status: 'processing',
        time: '2024-03-15 10:35:00',
      },
    ],
    completed: [
      {
        id: 'ORD003',
        symbol: 'MSFT',
        type: 'buy',
        orderType: 'market',
        quantity: 15,
        price: 378.92,
        status: 'completed',
        time: '2024-03-15 09:45:00',
      },
    ],
    cancelled: [
      {
        id: 'ORD004',
        symbol: 'TSLA',
        type: 'sell',
        orderType: 'limit',
        quantity: 8,
        price: 180.25,
        status: 'cancelled',
        time: '2024-03-15 09:30:00',
      },
    ],
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-500 animate-spin" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Order Summary */}
      <div className="bg-gray-900 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Orders Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">Total Orders</p>
            <p className="text-2xl font-bold text-white">125</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">Open Orders</p>
            <p className="text-2xl font-bold text-yellow-500">8</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">Completed</p>
            <p className="text-2xl font-bold text-green-500">112</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">Cancelled</p>
            <p className="text-2xl font-bold text-red-500">5</p>
          </div>
        </div>
      </div>

      {/* Order List */}
      <div className="bg-gray-900 rounded-lg p-6">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('open')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'open'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Open Orders
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'completed'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setActiveTab('cancelled')}
            className={`px-4 py-2 rounded-md ${
              activeTab === 'cancelled'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Cancelled
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="text-left text-gray-400 text-sm">
                <th className="pb-4">Order ID</th>
                <th className="pb-4">Symbol</th>
                <th className="pb-4">Type</th>
                <th className="pb-4">Order Type</th>
                <th className="pb-4">Quantity</th>
                <th className="pb-4">Price</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Time</th>
                <th className="pb-4">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {orders[activeTab].map((order) => (
                <tr key={order.id} className="border-t border-gray-800">
                  <td className="py-4 text-white">{order.id}</td>
                  <td className="py-4 text-white">{order.symbol}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      order.type === 'buy' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {order.type.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 text-gray-300">{order.orderType}</td>
                  <td className="py-4 text-gray-300">{order.quantity}</td>
                  <td className="py-4 text-gray-300">${order.price}</td>
                  <td className="py-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(order.status)}
                      <span className="text-gray-300 capitalize">{order.status}</span>
                    </div>
                  </td>
                  <td className="py-4 text-gray-300">{order.time}</td>
                  <td className="py-4">
                    {order.status === 'pending' && (
                      <button className="text-red-400 hover:text-red-300">
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};