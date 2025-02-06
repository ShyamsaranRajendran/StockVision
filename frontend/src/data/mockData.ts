import { 
  Stock, 
  MarketIndex, 
  NewsItem, 
  MarketSentiment, 
  ChatMessage, 
  TradingSignal,
  Portfolio,
  StockChart
} from '../types';

export const mockStocks: Stock[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 173.45,
    change: 2.34,
    changePercent: 1.37,
    volume: 52436789,
    marketCap: 2800000000000,
    high52Week: 198.23,
    low52Week: 143.90,
    pe: 28.5,
    marketDepth: {
      bids: [
        { price: 173.44, quantity: 100 },
        { price: 173.43, quantity: 250 },
        { price: 173.42, quantity: 500 },
      ],
      asks: [
        { price: 173.46, quantity: 150 },
        { price: 173.47, quantity: 300 },
        { price: 173.48, quantity: 450 },
      ],
    },
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 141.80,
    change: -1.20,
    changePercent: -0.84,
    volume: 23456789,
    marketCap: 1800000000000,
    high52Week: 153.78,
    low52Week: 102.21,
    pe: 24.8,
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 378.92,
    change: 4.56,
    changePercent: 1.22,
    volume: 34567890,
    marketCap: 2900000000000,
    high52Week: 420.82,
    low52Week: 275.37,
    pe: 35.2,
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    price: 174.42,
    change: -2.18,
    changePercent: -1.23,
    volume: 45678901,
    marketCap: 1700000000000,
    high52Week: 185.10,
    low52Week: 101.15,
    pe: 59.8,
  },
];

export const mockIndices: MarketIndex[] = [
  {
    name: 'NIFTY 50',
    value: 22021.34,
    change: 115.23,
    changePercent: 0.53,
  },
  {
    name: 'SENSEX',
    value: 72562.45,
    change: 378.12,
    changePercent: 0.50,
  },
  {
    name: 'NASDAQ',
    value: 15829.45,
    change: 78.12,
    changePercent: 0.50,
  },
  {
    name: 'DOW JONES',
    value: 38654.12,
    change: -45.67,
    changePercent: -0.12,
  },
];

export const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'Fed Signals Potential Rate Cuts Later This Year',
    description: 'Federal Reserve officials indicated they expect to cut interest rates later this year but want more confidence inflation is under control.',
    source: 'Wall Street Journal',
    timestamp: Date.now() - 3600000,
    url: '#',
    sentiment: 'positive',
  },
  {
    id: '2',
    title: 'Apple Announces New AI Features for iPhone',
    description: 'Tech giant reveals plans to integrate advanced AI capabilities in upcoming iOS update.',
    source: 'Bloomberg',
    timestamp: Date.now() - 7200000,
    url: '#',
    sentiment: 'positive',
  },
  {
    id: '3',
    title: 'Tesla Expands Production in Asian Markets',
    description: 'Electric vehicle maker announces new factory locations in Asia to meet growing demand.',
    source: 'Reuters',
    timestamp: Date.now() - 10800000,
    url: '#',
    sentiment: 'neutral',
  },
];

export const mockMarketSentiment: MarketSentiment = {
  score: 65,
  trend: 'bullish',
  factors: [
    { name: 'Technical Indicators', impact: 75 },
    { name: 'News Sentiment', impact: 60 },
    { name: 'Social Media', impact: 55 },
    { name: 'Market Momentum', impact: 70 },
  ],
};

export const mockChatMessages: ChatMessage[] = [
  {
    id: '1',
    userId: 'user1',
    username: 'TradeMaster',
    message: 'AAPL looking strong after the AI announcement',
    timestamp: Date.now() - 300000,
    likes: 5,
  },
  {
    id: '2',
    userId: 'user2',
    username: 'InvestorPro',
    message: 'Anyone watching the Fed meeting today?',
    timestamp: Date.now() - 600000,
    likes: 3,
  },
];

export const mockTradingSignals: TradingSignal[] = [
  {
    symbol: 'AAPL',
    type: 'buy',
    price: 173.45,
    confidence: 0.85,
    reason: 'Strong momentum and positive news sentiment',
    timestamp: Date.now(),
  },
  {
    symbol: 'GOOGL',
    type: 'sell',
    price: 141.80,
    confidence: 0.75,
    reason: 'Technical resistance and overbought conditions',
    timestamp: Date.now(),
  },
];

export const mockPortfolio: Portfolio = {
  totalValue: 125000,
  todayChange: 1250,
  todayChangePercent: 1.01,
  holdings: [
    {
      symbol: 'AAPL',
      quantity: 100,
      avgPrice: 150.00,
      currentPrice: 173.45,
      totalValue: 17345,
      profitLoss: 2345,
      profitLossPercent: 15.63,
    },
    {
      symbol: 'MSFT',
      quantity: 50,
      avgPrice: 350.00,
      currentPrice: 378.92,
      totalValue: 18946,
      profitLoss: 1446,
      profitLossPercent: 8.26,
    },
  ],
};

export const mockChartData: StockChart[] = Array.from({ length: 100 }, (_, i) => {
  const basePrice = 170;
  const volatility = 5;
  const time = Date.now() - (100 - i) * 3600000;
  const open = basePrice + Math.random() * volatility - volatility / 2;
  const close = basePrice + Math.random() * volatility - volatility / 2;
  const high = Math.max(open, close) + Math.random() * 2;
  const low = Math.min(open, close) - Math.random() * 2;
  
  return {
    timestamp: time,
    open,
    high,
    low,
    close,
    volume: Math.floor(Math.random() * 1000000) + 500000,
  };
});