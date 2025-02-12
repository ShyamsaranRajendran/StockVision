import React, { useEffect, useState, useRef } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { createChart, IChartApi, ISeriesApi, CandlestickData } from 'lightweight-charts';
import { TrendingUp, TrendingDown, Activity, DollarSign, BarChart2 } from 'lucide-react';

interface MarketAnalysisProps {
  symbol: string;
}

const MarketAnalysis: React.FC<MarketAnalysisProps> = ({ symbol }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        console.log(`Fetching data for symbol: ${symbol}`);
        const response = await fetch(`http://localhost:5000/stocks/${symbol}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const result = await response.json();
        console.log('Fetched data:', result);
        setData(result);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
  }, [symbol]);

  useEffect(() => {
    if (!data || !chartContainerRef.current) return;

    // Remove old chart before creating a new one
    if (chartRef.current) {
      chartRef.current.remove();
    }

    // Create new chart
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 300,
      layout: { background: { color: '#ffffff' }, textColor: '#333' },
      grid: { vertLines: { color: '#f0f0f0' }, horzLines: { color: '#f0f0f0' } },
    });

    // Create candlestick series
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#4caf50',
      downColor: '#f44336',
      borderDownColor: '#f44336',
      borderUpColor: '#4caf50',
      wickDownColor: '#f44336',
      wickUpColor: '#4caf50',
    });

    candlestickSeries.setData(
      data.candlestickData.map((d: any) => ({
        time: Math.floor(new Date(d.timestamp).getTime() / 1000),
        open: d.open,
        high: d.high,
        low: d.low,
        close: d.close,
      }))
    );

    // Store references
    chartRef.current = chart;
    candlestickSeriesRef.current = candlestickSeries;

    // Cleanup function
    return () => {
      chart.remove();
    };
  }, [data]);

  if (loading) return <p>Loading market data...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!data) return <p>No data available</p>;

  const { candlestickData, volumeData, priceMovement, technicalIndicators } = data;
  const priceColor = priceMovement?.overallChange >= 0 ? 'text-green-600' : 'text-red-600';

  return (
    <div className="p-6 py-20 bg-white rounded-lg shadow-lg">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{symbol} Stock Analysis</h1>
        <p className="text-gray-600">Last Updated: {format(new Date(candlestickData[0].timestamp), 'PPpp')}</p>
      </div>

      {/* Price Movement Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            {priceMovement.overallChange >= 0 ? <TrendingUp className="text-green-600" /> : <TrendingDown className="text-red-600" />}
            <h3 className="ml-2 font-semibold">Price Change</h3>
          </div>
          <p className={`text-2xl ${priceColor}`}>
            ${priceMovement.overallChange.toFixed(2)} ({priceMovement.percentageChange.toFixed(2)}%)
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Activity />
            <h3 className="ml-2 font-semibold">Volatility</h3>
          </div>
          <p className="text-2xl">{(technicalIndicators.volatility * 100).toFixed(2)}%</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <DollarSign />
            <h3 className="ml-2 font-semibold">Trading Range</h3>
          </div>
          <p className="text-2xl">${(priceMovement.highestPrice - priceMovement.lowestPrice).toFixed(2)}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <BarChart2 />
            <h3 className="ml-2 font-semibold">RSI</h3>
          </div>
          <p className="text-2xl">{technicalIndicators.rsi.toFixed(2)}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Candlestick Chart */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Price Action</h3>
          <div ref={chartContainerRef} className="w-full h-[300px]"></div>
        </div>

        {/* Volume Chart */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Trading Volume</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={volumeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" tickFormatter={(value) => format(new Date(value), 'HH:mm')} />
              <YAxis />
              <Tooltip labelFormatter={(value) => format(new Date(value), 'PPpp')} formatter={(value: any) => [new Intl.NumberFormat().format(value), 'Volume']} />
              <Bar dataKey="volume" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MarketAnalysis;
