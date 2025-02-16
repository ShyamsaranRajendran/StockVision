import React, { useState } from 'react';
import { Star, Plus, Bell, MoreVertical, TrendingUp, TrendingDown } from 'lucide-react';
import { mockStocks } from '../data/mockData';

export const WatchlistPage: React.FC = () => {
  const [activeWatchlist, setActiveWatchlist] = useState('Default');
  
  const watchlists = [
    { id: 'default', name: 'Default', stocks: mockStocks },
    { id: 'tech', name: 'Tech Stocks', stocks: mockStocks.filter(s => s.name.includes('Inc.')) },
    { id: 'finance', name: 'Finance', stocks: [] },
  ];

  return (
    <div className="space-y-6 py-20">
      {/* Watchlist Header */}
      <div className="bg-gray-900 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Star className="w-6 h-6 text-yellow-500" />
            <h2 className="text-xl font-semibold text-white">Watchlists</h2>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            <Plus className="w-4 h-4" />
            <span>New Watchlist</span>
          </button>
        </div>

        {/* Watchlist Tabs */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {watchlists.map((list) => (
            <button
              key={list.id}
              onClick={() => setActiveWatchlist(list.name)}
              className={`px-4 py-2 rounded-md whitespace-nowrap ${
                activeWatchlist === list.name
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {list.name}
              <span className="ml-2 text-sm">({list.stocks.length})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Watchlist Content */}
      <div className="bg-gray-900 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Symbol</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Last Price</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Change</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Volume</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Market Cap</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {watchlists.find(w => w.name === activeWatchlist)?.stocks.map((stock) => (
                <tr key={stock.symbol} className="hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-white font-medium">{stock.symbol}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">{stock.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-white">
                    ${stock.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end space-x-1">
                      {stock.changePercent >= 0 ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                      <span className={stock.changePercent >= 0 ? 'text-green-500' : 'text-red-500'}>
                        {stock.changePercent > 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-gray-300">
                    {stock.volume.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-gray-300">
                    ${(stock.marketCap / 1e9).toFixed(2)}B
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-1 text-gray-400 hover:text-white">
                        <Bell className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-white">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Price Alerts */}
      <div className="bg-gray-900 rounded-lg p-6">
        <h3 className="text-lg font-medium text-white mb-4">Active Price Alerts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { symbol: 'AAPL', condition: 'above', price: 180.00 },
            { symbol: 'GOOGL', condition: 'below', price: 140.00 },
            { symbol: 'MSFT', condition: 'above', price: 380.00 },
          ].map((alert, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">{alert.symbol}</span>
                <Bell className="w-4 h-4 text-yellow-500" />
              </div>
              <div className="text-sm text-gray-400">
                Alert when price is {alert.condition} ${alert.price}
              </div>
              <button className="mt-2 text-red-400 text-sm hover:text-red-300">
                Remove Alert
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};