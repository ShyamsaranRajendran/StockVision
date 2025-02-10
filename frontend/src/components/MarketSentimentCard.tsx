
import { TrendingUp, TrendingDown, MinusCircle } from 'lucide-react';
import { MarketSentiment } from '../types';

interface Props {
  sentiment: MarketSentiment;
}

export const MarketSentimentCard: React.FC<Props> = ({ sentiment }) => {
  const getIcon = () => {
    switch (sentiment.trend) {
      case 'bullish':
        return <TrendingUp className="w-6 h-6 text-green-500" />;
      case 'bearish':
        return <TrendingDown className="w-6 h-6 text-red-500" />;
      default:
        return <MinusCircle className="w-6 h-6 text-gray-500" />;
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">Market Sentiment</h2>
        {getIcon()}
      </div>
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-300">Sentiment Score</span>
          <span className="text-lg font-semibold text-white">{sentiment.score}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full ${
              sentiment.score > 50 ? 'bg-green-500' : sentiment.score < 50 ? 'bg-red-500' : 'bg-yellow-500'
            }`}
            style={{ width: `${sentiment.score}%` }}
          ></div>
        </div>
      </div>
      <div className="space-y-3">
        {sentiment.factors.map((factor) => (
          <div key={factor.name} className="flex justify-between items-center">
            <span className="text-sm text-gray-400">{factor.name}</span>
            <span className={`text-sm font-medium ${
              factor.impact > 0 ? 'text-green-400' : factor.impact < 0 ? 'text-red-400' : 'text-gray-400'
            }`}>
              {factor.impact > 0 ? '+' : ''}{factor.impact}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};