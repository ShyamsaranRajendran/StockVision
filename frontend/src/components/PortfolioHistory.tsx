import React from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { Portfolio } from '../types';
import { PortfolioView } from './Portfolio';

interface Props {
  portfolio: Portfolio;
}

Portfolio=

export const PortfolioHistory: React.FC<Props> = () => {
  return (
    <div className="bg-gray-900 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Portfolio</h2>
        <DollarSign className="w-6 h-6 text-green-500" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-gray-400 text-sm mb-1">Total Value</p>
          <p className="text-2xl font-bold text-white">
            ${portfolio.totalValue.toLocaleString()}
          </p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-gray-400 text-sm mb-1">Today's Change</p>
          <p className={`text-2xl font-bold ${
            portfolio.todayChange >= 0 ? 'text-green-500' : 'text-red-500'
          }`}>
            ${portfolio.todayChange.toLocaleString()}
          </p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-gray-400 text-sm mb-1">Change %</p>
          <p className={`text-2xl font-bold ${
            portfolio.todayChangePercent >= 0 ? 'text-green-500' : 'text-red-500'
          }`}>
            {portfolio.todayChangePercent > 0 ? '+' : ''}
            {portfolio.todayChangePercent.toFixed(2)}%
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-gray-400 text-sm">
              <th className="text-left pb-4">Stock</th>
              <th className="text-right pb-4">Quantity</th>
              <th className="text-right pb-4">Avg Price</th>
              <th className="text-right pb-4">Current</th>
              <th className="text-right pb-4">Value</th>
              <th className="text-right pb-4">P/L</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {portfolio.holdings.map((holding) => (
              <tr key={holding.symbol} className="text-sm">
                <td className="py-4 text-white">{holding.symbol}</td>
                <td className="py-4 text-right text-gray-300">
                  {holding.quantity}
                </td>
                <td className="py-4 text-right text-gray-300">
                  ${holding.avgPrice.toFixed(2)}
                </td>
                <td className="py-4 text-right text-gray-300">
                  ${holding.currentPrice.toFixed(2)}
                </td>
                <td className="py-4 text-right text-white">
                  ${holding.totalValue.toLocaleString()}
                </td>
                <td className={`py-4 text-right ${
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
  );
};