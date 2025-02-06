import React, { useState } from 'react';
import { StockChart } from '../components/StockChart';
import { mockChartData, mockStocks } from '../data/mockData';

export const TradingPage: React.FC = () => {
  const [orderType, setOrderType] = useState<'market' | 'limit' | 'stop'>('market');
  const [selectedStock] = useState(mockStocks[0]);
  const [quantity, setQuantity] = useState('1');
  const [limitPrice, setLimitPrice] = useState('');
  const [stopPrice, setStopPrice] = useState('');

  const handleSubmit = (e: React.FormEvent, action: 'buy' | 'sell') => {
    e.preventDefault();
    console.log('Order placed:', {
      action,
      type: orderType,
      stock: selectedStock.symbol,
      quantity,
      limitPrice,
      stopPrice,
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-2">
          <StockChart data={mockChartData} symbol={selectedStock.symbol} />
          
          {/* Time Frame Selector */}
          <div className="mt-4 flex space-x-2">
            {['1m', '5m', '15m', '1h', '1D', '1W', '1M'].map((timeframe) => (
              <button
                key={timeframe}
                className="px-3 py-1 text-sm rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700"
              >
                {timeframe}
              </button>
            ))}
          </div>
        </div>

        {/* Order Form */}
        <div className="bg-gray-900 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Place Order</h2>
          
          {/* Order Type Selector */}
          <div className="flex space-x-2 mb-6">
            {(['market', 'limit', 'stop'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setOrderType(type)}
                className={`flex-1 px-4 py-2 rounded-md capitalize ${
                  orderType === type
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <form className="space-y-4">
            {/* Quantity Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Quantity
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Limit Price */}
            {orderType === 'limit' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Limit Price
                </label>
                <input
                  type="number"
                  value={limitPrice}
                  onChange={(e) => setLimitPrice(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            )}

            {/* Stop Price */}
            {orderType === 'stop' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Stop Price
                </label>
                <input
                  type="number"
                  value={stopPrice}
                  onChange={(e) => setStopPrice(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            )}

            {/* Order Summary */}
            <div className="bg-gray-800 rounded-md p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Market Price</span>
                <span className="text-white">${selectedStock.price}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Total Value</span>
                <span className="text-white">
                  ${(parseFloat(quantity) * selectedStock.price).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={(e) => handleSubmit(e, 'buy')}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Buy
              </button>
              <button
                onClick={(e) => handleSubmit(e, 'sell')}
                className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Sell
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Market Depth */}
      <div className="bg-gray-900 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Market Depth</h2>
        <div className="grid grid-cols-2 gap-8">
          {/* Bids */}
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Bids</h3>
            <div className="space-y-2">
              {selectedStock.marketDepth?.bids.map((bid, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-green-500">${bid.price}</span>
                  <span className="text-gray-300">{bid.quantity}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Asks */}
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">Asks</h3>
            <div className="space-y-2">
              {selectedStock.marketDepth?.asks.map((ask, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-red-500">${ask.price}</span>
                  <span className="text-gray-300">{ask.quantity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};