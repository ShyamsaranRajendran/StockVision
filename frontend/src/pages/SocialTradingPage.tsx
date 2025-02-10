import { User, ThumbsUp, MessageCircle, Copy } from 'lucide-react';

export const SocialTradingPage: React.FC = () => {
  const traders = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      performance: '+32.5%',
      followers: 1234,
      description: 'Tech-focused value investor | 5+ years experience',
      portfolio: [
        { symbol: 'AAPL', allocation: 25 },
        { symbol: 'MSFT', allocation: 20 },
        { symbol: 'GOOGL', allocation: 15 },
      ],
    },
    {
      id: 2,
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      performance: '+28.7%',
      followers: 856,
      description: 'Dividend growth strategy | Risk-adjusted returns',
      portfolio: [
        { symbol: 'JNJ', allocation: 20 },
        { symbol: 'PG', allocation: 15 },
        { symbol: 'KO', allocation: 15 },
      ],
    },
  ];

  return (
    <div className="space-y-6 container mx-auto my-4 px-4 py-8">
      <div className="bg-gray-900 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Top Traders</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {traders.map((trader) => (
            <div key={trader.id} className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={trader.avatar}
                    alt={trader.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="text-lg font-medium text-white">
                      {trader.name}
                    </h3>
                    <p className="text-sm text-gray-400">{trader.description}</p>
                  </div>
                </div>
                <button className="flex items-center space-x-1 px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </button>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-gray-400">Performance</p>
                  <p className="text-lg font-semibold text-green-500">
                    {trader.performance}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Followers</p>
                  <p className="text-lg font-semibold text-white">
                    {trader.followers}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Risk Score</p>
                  <p className="text-lg font-semibold text-yellow-500">7.5/10</p>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-400 mb-2">
                  Portfolio Allocation
                </h4>
                <div className="space-y-2">
                  {trader.portfolio.map((item) => (
                    <div
                      key={item.symbol}
                      className="flex items-center justify-between"
                    >
                      <span className="text-white">{item.symbol}</span>
                      <span className="text-gray-400">{item.allocation}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center pt-4 border-t border-gray-700">
                <button className="flex items-center space-x-1 text-gray-400 hover:text-white">
                  <ThumbsUp className="w-4 h-4" />
                  <span>245</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-400 hover:text-white">
                  <MessageCircle className="w-4 h-4" />
                  <span>18</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-400 hover:text-white">
                  <User className="w-4 h-4" />
                  <span>Follow</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Trades */}
      <div className="bg-gray-900 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Recent Trades</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((trade) => (
            <div
              key={trade}
              className="flex items-center justify-between bg-gray-800 p-4 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    trade % 2 === 0 ? 'bg-green-500/20' : 'bg-red-500/20'
                  }`}
                >
                  <span
                    className={`text-sm font-medium ${
                      trade % 2 === 0 ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {trade % 2 === 0 ? 'BUY' : 'SELL'}
                  </span>
                </div>
                <div>
                  <p className="text-white font-medium">AAPL</p>
                  <p className="text-sm text-gray-400">2 mins ago</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white">100 shares</p>
                <p className="text-sm text-gray-400">@$175.50</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};