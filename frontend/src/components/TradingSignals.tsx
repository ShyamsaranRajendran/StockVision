
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { TradingSignal } from '../types';

interface Props {
  signals: TradingSignal[];
}

export const TradingSignals: React.FC<Props> = ({ signals }) => {
  return (
    <div className="bg-gray-900 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Trading Signals</h2>
      <div className="space-y-4">
        {signals.map((signal) => (
          <div key={`${signal.symbol}-${signal.timestamp}`} className="flex items-start space-x-4 p-4 bg-gray-800 rounded-lg">
            {signal.type === 'buy' ? (
              <ArrowUpCircle className="w-8 h-8 text-green-500 flex-shrink-0" />
            ) : (
              <ArrowDownCircle className="w-8 h-8 text-red-500 flex-shrink-0" />
            )}
            <div className="flex-grow">
              <div className="flex justify-between items-center mb-1">
                <span className="text-lg font-semibold text-white">{signal.symbol}</span>
                <span className={`text-sm font-medium ${
                  signal.type === 'buy' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {signal.type.toUpperCase()} @ ${signal.price}
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-2">{signal.reason}</p>
              <div className="flex items-center">
                <div className="flex-grow">
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div
                      className={`h-2 rounded-full ${
                        signal.type === 'buy' ? 'bg-green-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${signal.confidence * 100}%` }}
                    ></div>
                  </div>
                </div>
                <span className="ml-2 text-sm text-gray-400">
                  {Math.round(signal.confidence * 100)}% confidence
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};