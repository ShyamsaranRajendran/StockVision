import React from 'react';
import { TrendingUp, TrendingDown, BarChart2, Activity, DollarSign } from 'lucide-react';
import { StockChart } from '../components/StockChart';
import { mockChartData, mockStocks } from '../data/mockData';

export const MarketAnalysisPage: React.FC = () => {
  const sectors = [
    { name: 'Technology', change: 2.5, marketCap: '2.8T', volume: '125M' },
    { name: 'Healthcare', change: -1.2, marketCap: '1.5T', volume: '89M' },
    { name: 'Finance', change: 0.8, marketCap: '2.1T', volume: '156M' },
    { name: 'Energy', change: 3.2, marketCap: '980B', volume: '92M' },
    { name: 'Consumer', change: -0.5, marketCap: '1.2T', volume: '78M' },
  ];

  const technicalIndicators = [
    { name: 'RSI', value: 65, signal: 'Overbought' },
    { name: 'MACD', value: 0.25, signal: 'Bullish' },
    { name: 'Bollinger Bands', value: '±2SD', signal: 'Neutral' },
    { name: 'Moving Average (50)', value: 158.45, signal: 'Above' },
    { name: 'Volume Profile', value: '125M', signal: 'High' },
  ];

  return (
    <div className="space-y-6">
      {/* Market Overview */}
      <div className="bg-gray-900 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Market Analysis</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart */}
          <div>
            <StockChart data={mockChartData} symbol="NIFTY" />
          </div>
          
          {/* Technical Indicators */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Technical Indicators</h3>
            <div className="grid gap-4">
              {technicalIndicators.map((indicator) => (
                <div key={indicator.name} className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">{indicator.name}</span>
                    <span className="text-white font-medium">{indicator.value}</span>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-sm text-gray-500">Signal</span>
                    <span className={`text-sm font-medium ${
                      indicator.signal === 'Bullish' ? 'text-green-500' :
                      indicator.signal === 'Bearish' ? 'text-red-500' :
                      'text-yellow-500'
                    }`}>{indicator.signal}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sector Performance */}
      <div className="bg-gray-900 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Sector Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sectors.map((sector) => (
            <div key={sector.name} className="bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">{sector.name}</span>
                {sector.change >= 0 ? (
                  <TrendingUp className="w-5 h-5 text-green-500" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-500" />
                )}
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <p className="text-xs text-gray-400">Change</p>
                  <p className={`text-sm font-medium ${
                    sector.change >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {sector.change > 0 ? '+' : ''}{sector.change}%
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Market Cap</p>
                  <p className="text-sm font-medium text-white">{sector.marketCap}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Volume</p>
                  <p className="text-sm font-medium text-white">{sector.volume}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Breadth */}
      <div className="bg-gray-900 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Market Breadth</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-white mb-2">Advance/Decline</h3>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-400">Advancing</p>
                <p className="text-2xl font-bold text-green-500">1,245</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Declining</p>
                <p className="text-2xl font-bold text-red-500">876</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-white mb-2">New Highs/Lows</h3>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-400">52W High</p>
                <p className="text-2xl font-bold text-green-500">45</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">52W Low</p>
                <p className="text-2xl font-bold text-red-500">23</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-white mb-2">Volume Analysis</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Volume</span>
                <span className="text-white font-medium">3.2B</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Avg. Volume</span>
                <span className="text-white font-medium">2.8B</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};