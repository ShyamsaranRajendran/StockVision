import React from 'react';
import { TrendingUp, TrendingDown, BarChart2 } from 'lucide-react';
import { MarketIndex } from '../types';

interface Props {
  indices: MarketIndex[];
}

export const MarketOverview: React.FC<Props> = ({ indices }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {indices.map((index) => (
        <div key={index.name} className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <BarChart2 className="w-5 h-5 text-gray-600 mr-2" />
              <h3 className="text-lg font-semibold">{index.name}</h3>
            </div>
            {index.changePercent >= 0 ? (
              <TrendingUp className="w-5 h-5 text-green-500" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-500" />
            )}
          </div>
          <div className="mt-2">
            <p className="text-2xl font-bold">{index.value.toLocaleString()}</p>
            <p className={`text-sm ${index.changePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {index.change > 0 ? '+' : ''}{index.change.toFixed(2)} ({index.changePercent.toFixed(2)}%)
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};