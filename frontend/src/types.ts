export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  high52Week: number;
  low52Week: number;
  pe: number;
  marketDepth?: {
    bids: Array<{ price: number; quantity: number }>;
    asks: Array<{ price: number; quantity: number }>;
  };
}

export interface TimeSeriesData {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. volume": string;
}

export interface StockData {
  timestamp: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface ProcessedData {
  candlestickData: StockData[];
  volumeData: { timestamp: string; volume: number }[];
  priceMovement: {
    overallChange: number;
    percentageChange: number;
    highestPrice: number;
    lowestPrice: number;
  };
  volumeAnalysis: {
    averageVolume: number;
    highestVolume: number;
    lowestVolume: number;
  };
  technicalIndicators: {
    sma20: number;
    rsi: number;
    volatility: number;
  };
}
export interface StockChart {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface MarketIndex {
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  source: string;
  timestamp: number;
  url: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
}

export interface WatchlistItem extends Stock {
  addedAt: number;
  alerts?: StockAlert[];
}

export interface StockAlert {
  id: string;
  type: 'price' | 'volume' | 'change';
  condition: 'above' | 'below';
  value: number;
  active: boolean;
}

export interface MarketSentiment {
  score: number; // -100 to 100
  trend: 'bullish' | 'bearish' | 'neutral';
  factors: Array<{
    name: string;
    impact: number; // -100 to 100
  }>;
}

export interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  message: string;
  timestamp: number;
  likes: number;
}

export interface TradingSignal {
  symbol: string;
  type: 'buy' | 'sell';
  price: number;
  confidence: number;
  reason: string;
  timestamp: number;
}

export interface Portfolio {
  totalValue: number;
  todayChange: number;
  todayChangePercent: number;
  holdings: Array<{
    symbol: string;
    quantity: number;
    avgPrice: number;
    currentPrice: number;
    totalValue: number;
    profitLoss: number;
    profitLossPercent: number;
  }>;
}