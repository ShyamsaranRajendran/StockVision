import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Select from "react-select";

interface MarketAnalysisProps {
  symbol: string;
}

const MarketAnalysis: React.FC<MarketAnalysisProps> = ({ symbol }) => {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<string>("all");
  const [dataType, setDataType] = useState<string>("close");

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        console.log(`Fetching data for symbol: ${symbol}`);
        const response = await fetch(`http://localhost:5000/stocks/${symbol}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const result = await response.json();
        console.log("Fetched data:", result);

        const timeSeries = result?.["Time Series (5min)"];
        if (!timeSeries) {
          throw new Error("Invalid API response format: Missing 'Time Series (5min)'");
        }

        const formattedData = Object.entries(timeSeries).map(([timestamp, values]) => ({
          time: timestamp,
          open: parseFloat((values as any)["1. open"]),
          high: parseFloat((values as any)["2. high"]),
          low: parseFloat((values as any)["3. low"]),
          close: parseFloat((values as any)["4. close"]),
          volume: parseInt((values as any)["5. volume"], 10),
        }));

        formattedData.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

        console.log("Formatted Data:", formattedData);
        setData(formattedData);
        setFilteredData(formattedData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
  }, [symbol]);

  useEffect(() => {
    let filtered = [...data];

    if (timeRange === "30min") {
      filtered = data.slice(-6);
    } else if (timeRange === "1hour") {
      filtered = data.slice(-12);
    }

    setFilteredData(filtered);
  }, [timeRange, data]);

  if (loading) return <p>Loading market data...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!data.length) return <p>No data available</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg w-full">
      <h2 className="text-xl font-bold mb-4">Market Data for {symbol}</h2>

      {/* Filters Section */}
      <div className="flex gap-4 mb-6">
        {/* Time Range Filter */}
        <Select
          options={[
            { value: "30min", label: "Last 30 Minutes" },
            { value: "1hour", label: "Last 1 Hour" },
            { value: "all", label: "All Data" },
          ]}
          defaultValue={{ value: "all", label: "All Data" }}
          onChange={(selected) => setTimeRange(selected?.value || "all")}
        />

        {/* Data Type Filter */}
        <Select
          options={[
            { value: "open", label: "Open Price" },
            { value: "close", label: "Close Price" },
            { value: "high", label: "High Price" },
            { value: "low", label: "Low Price" },
            { value: "volume", label: "Volume" },
          ]}
          defaultValue={{ value: "close", label: "Close Price" }}
          onChange={(selected) => setDataType(selected?.value || "close")}
        />
      </div>

      {/* Line Chart */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Stock Price Movement</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={filteredData} margin={{ right: 50 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              tickFormatter={(tick) => tick.slice(11, 16)}
              minTickGap={20}
              interval="preserveStartEnd"
            />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip />
            <Line type="monotone" dataKey={dataType} stroke="#82ca9d" name={dataType} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Volume Bar Chart */}
      {dataType === "volume" && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Trading Volume</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" tickFormatter={(tick) => tick.slice(11, 16)} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="volume" fill="#8884d8" name="Volume" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default MarketAnalysis;
