import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, PieChart, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockPortfolio, mockChartData } from '../data/mockData';

const performanceData = mockChartData.map(data => ({
  timestamp: data.timestamp,
  value: data.close * 100, // Simulated portfolio value
}));

export const PortfolioPage: React.FC = () => {
  const totalValue = mockPortfolio.totalValue;
  const todayChange = mockPortfolio.todayChange;
  const todayChangePercent = mockPortfolio.todayChangePercent;

  const assetAllocation = [
    { type: 'Stocks', value: 65, color: '#4F46E5' },
    { type: 'ETFs', value: 20, color: '#10B981' },
    { type: 'Crypto', value: 10, color: '#F59E0B' },
    { type: 'Cash', value: 5, color: '#6B7280' },
  ];

  return (
    <div className="space-y-6 py-20">
      {/* Portfolio Overview */}
      <div className="bg-gray-900 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <DollarSign className="w-8 h-8 text-indigo-500" />
            <div>
              <h2 className="text-2xl font-bold text-white">Portfolio Overview</h2>
              <p className="text-gray-400">Your investment summary</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            Add Funds
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <p className="text-gray-400 mb-2">Total Value</p>
            <p className="text-3xl font-bold text-white">${totalValue.toLocaleString()}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6">
            <p className="text-gray-400 mb-2">Today's Change</p>
            <div className="flex items-center space-x-2">
              {todayChange >= 0 ? (
                <ArrowUpRight className="w-6 h-6 text-green-500" />
              ) : (
                <ArrowDownRight className="w-6 h-6 text-red-500" />
              )}
              <p className={`text-3xl font-bold ${
                todayChange >= 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                ${Math.abs(todayChange).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6">
            <p className="text-gray-400 mb-2">Percent Change</p>
            <p className={`text-3xl font-bold ${
              todayChangePercent >= 0 ? 'text-green-500' : 'text-red-500'
            }`}>
              {todayChangePercent > 0 ? '+' : ''}{todayChangePercent.toFixed(2)}%
            </p>
          </div>
        </div>

        {/* Portfolio Performance Chart */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Portfolio Performance</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={(timestamp) => new Date(timestamp).toLocaleDateString()}
                  stroke="#9CA3AF"
                />
                <YAxis
                  tickFormatter={(value) => `$${value.toLocaleString()}`}
                  stroke="#9CA3AF"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: '#F3F4F6'
                  }}
                  labelFormatter={(timestamp) => new Date(timestamp).toLocaleString()}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Portfolio Value']}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#4F46E5"
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Holdings and Asset Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Holdings */}
        <div className="lg:col-span-2 bg-gray-900 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Your Holdings</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="text-left text-sm text-gray-400">
                  <th className="pb-4">Symbol</th>
                  <th className="pb-4">Quantity</th>
                  <th className="pb-4">Avg Price</th>
                  <th className="pb-4">Current</th>
                  <th className="pb-4">Value</th>
                  <th className="pb-4">P/L</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {mockPortfolio.holdings.map((holding) => (
                  <tr key={holding.symbol} className="text-sm">
                    <td className="py-4 text-white">{holding.symbol}</td>
                    <td className="py-4 text-gray-300">{holding.quantity}</td>
                    <td className="py-4 text-gray-300">${holding.avgPrice.toFixed(2)}</td>
                    <td className="py-4 text-gray-300">${holding.currentPrice.toFixed(2)}</td>
                    <td className="py-4 text-white">${holding.totalValue.toLocaleString()}</td>
                    <td className={`py-4 ${
                      holding.profitLoss >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      ${holding.profitLoss.toLocaleString()} ({holding.profitLossPercent.toFixed(2)}%)
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Asset Allocation */}
        <div className="bg-gray-900 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Asset Allocation</h3>
          <div className="space-y-4">
            {assetAllocation.map((asset) => (
              <div key={asset.type} className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white">{asset.type}</span>
                  <span className="text-gray-400">{asset.value}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${asset.value}%`,
                      backgroundColor: asset.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Investment Metrics */}
      <div className="bg-gray-900 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Investment Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Annual Return</p>
                <p className="text-2xl font-bold text-green-500">+18.5%</p>
              </div>
              <Activity className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Risk Level</p>
                <p className="text-2xl font-bold text-yellow-500">Moderate</p>
              </div>
              <PieChart className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Dividend Yield</p>
                <p className="text-2xl font-bold text-blue-500">2.8%</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};