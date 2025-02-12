import { TimeSeriesData, StockData, ProcessedData } from '../../types';

export const processTimeSeriesData = (data: Record<string, TimeSeriesData>): ProcessedData => {
  const candlestickData: StockData[] = Object.entries(data).map(([timestamp, values]) => ({
    timestamp,
    open: parseFloat(values['1. open']),
    high: parseFloat(values['2. high']),
    low: parseFloat(values['3. low']),
    close: parseFloat(values['4. close']),
    volume: parseInt(values['5. volume'])
  })).reverse();

  const closes = candlestickData.map(d => d.close);
  const volumes = candlestickData.map(d => d.volume);

  // Calculate price movement
  const firstPrice = closes[0];
  const lastPrice = closes[closes.length - 1];
  const overallChange = lastPrice - firstPrice;
  const percentageChange = (overallChange / firstPrice) * 100;

  // Calculate SMA-20
  const sma20 = calculateSMA(closes, 20);

  // Calculate RSI
  const rsi = calculateRSI(closes);

  // Calculate volatility (standard deviation of price changes)
  const volatility = calculateVolatility(closes);

  return {
    candlestickData,
    volumeData: candlestickData.map(d => ({
      timestamp: d.timestamp,
      volume: d.volume
    })),
    priceMovement: {
      overallChange,
      percentageChange,
      highestPrice: Math.max(...closes),
      lowestPrice: Math.min(...closes)
    },
    volumeAnalysis: {
      averageVolume: volumes.reduce((a, b) => a + b, 0) / volumes.length,
      highestVolume: Math.max(...volumes),
      lowestVolume: Math.min(...volumes)
    },
    technicalIndicators: {
      sma20,
      rsi,
      volatility
    }
  };
};

const calculateSMA = (data: number[], period: number): number => {
  if (data.length < period) return 0;
  const sum = data.slice(-period).reduce((a, b) => a + b, 0);
  return sum / period;
};

const calculateRSI = (prices: number[], period: number = 14): number => {
  if (prices.length < period + 1) return 0;

  const changes = [];
  for (let i = 1; i < prices.length; i++) {
    changes.push(prices[i] - prices[i - 1]);
  }

  let gains = changes.map(change => change > 0 ? change : 0);
  let losses = changes.map(change => change < 0 ? -change : 0);

  const avgGain = gains.slice(-period).reduce((a, b) => a + b, 0) / period;
  const avgLoss = losses.slice(-period).reduce((a, b) => a + b, 0) / period;

  if (avgLoss === 0) return 100;
  const rs = avgGain / avgLoss;
  return 100 - (100 / (1 + rs));
};

const calculateVolatility = (prices: number[]): number => {
  const returns = [];
  for (let i = 1; i < prices.length; i++) {
    returns.push((prices[i] - prices[i - 1]) / prices[i - 1]);
  }

  const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
  const squaredDiffs = returns.map(r => Math.pow(r - mean, 2));
  const variance = squaredDiffs.reduce((a, b) => a + b, 0) / returns.length;
  return Math.sqrt(variance);
};