import  { useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import niftyIcon from "../assets/Icon - ADA.svg";
import sensexIcon from "../assets/Icon - BTC.svg";
import nasdaqIcon from "../assets/Icon - ETH.svg";
import dowjonesIcon from "../assets/Icon - SOL.svg";
import niftyGraph from "../assets/niftygraph.svg";
import sensexGraph from "../assets/sensexgraph.svg";
import nasdaqGraph from "../assets/nasdaqgraph.svg";
import dowjonesGraph from "../assets/dowjonesgraph.svg";
import { MarketIndex } from "../types";

const sampleData = [
  { timestamp: 1691032800000, close: 1512 },
  { timestamp: 1691040000000, close: 1525 },
  { timestamp: 1691047200000, close: 1498 },
  { timestamp: 1691054400000, close: 1532 },
  { timestamp: 1691061600000, close: 1550 },
];

const iconMap: Record<string, string> = {
  "NIFTY 50": niftyIcon,
  SENSEX: sensexIcon,
  NASDAQ: nasdaqIcon,
  "DOW JONES": dowjonesIcon,
};

const graphMap: Record<string, string> = {
  "NIFTY 50": niftyGraph,
  SENSEX: sensexGraph,
  NASDAQ: nasdaqGraph,
  "DOW JONES": dowjonesGraph,
};

interface Props {
  indices: MarketIndex[];
}

export const MarketOverview: React.FC<Props> = ({ indices }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1D");
  const formatDate = (timestamp: number) => new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-gray-800 text-gray-100 rounded-lg p-5 flex flex-col justify-between shadow-md">
      <div className="flex flex-row items-center justify-between">
      <div className="flex  flex-col justify-start">
       <h2 className="text-xl font-semibold">Assets</h2>
        <p className="text-3xl font-bold text-blue-400 mt-1">$25,901.41</p>
        <p className="text-sm text-green-400 mt-1">+810% (Growth)</p>
       </div>
        <div className="mt-4">
          <p className="text-sm text-gray-400">NYSE</p>
          <p className="text-lg font-semibold text-gray-200">$1,521.4</p>
          <p className="text-sm text-red-400">-15.78%</p>
        </div>
      </div>
        <div className="mt-4 bg-gray-900 rounded-lg p-3">
          <h3 className="text-white text-lg font-semibold mb-2">Price Chart</h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sampleData}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                <XAxis dataKey="timestamp" tickFormatter={formatDate} stroke="#9CA3AF" />
                <YAxis domain={['auto', 'auto']} tickFormatter={formatPrice} stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: "#1E293B", border: "none", borderRadius: "0.5rem", color: "#F3F4F6" }} labelFormatter={formatDate} formatter={(value: number) => [formatPrice(value), "Price"]} />
                <Area type="monotone" dataKey="close" stroke="#3B82F6" fill="url(#colorPrice)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="mt-4 flex space-x-2">
          {['30m', '1H', '4H', '1D', '7D'].map((time) => (
            <button key={time} className={`text-xs font-medium px-3 py-1 rounded-md transition-all ${selectedTimeframe === time ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700"}`} onClick={() => setSelectedTimeframe(time)}>
              {time}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {indices.map((index) => {
          const isPositive = index.changePercent >= 0;
          return (
            <div key={index.name} className="bg-gray-800 text-gray-100 rounded-lg p-4 shadow-md hover:shadow-lg transition-all m-2 p-2">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <img src={iconMap[index.name]} alt={index.name} className="w-6 h-6" />
                  <h3 className="text-lg font-semibold">{index.name}</h3>
                </div>
                {isPositive ? <TrendingUp className="w-5 h-5 text-green-400" /> : <TrendingDown className="w-5 h-5 text-red-400" />}
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{index.value.toLocaleString()}</p>
                  <p className={`text-sm ${isPositive ? "text-green-400" : "text-red-400"}`}>
                    {index.change > 0 ? "+" : ""}{index.change.toFixed(2)} ({index.changePercent.toFixed(2)}%)
                  </p>
                </div>
                <div className="bg-gray-700 rounded-lg p-2">
                  <img src={graphMap[index.name]} alt={`${index.name} graph`} className="w-24 h-16 object-contain" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
