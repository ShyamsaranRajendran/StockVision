import  { useState, useRef, useLayoutEffect } from "react";
import { MarketOverview } from "../components/MarketOverview";
import { StockList } from "../components/StockList";
import { NewsSection } from "../components/NewsSection";
import { MarketSentimentCard } from "../components/MarketSentimentCard";
import { TradingSignals } from "../components/TradingSignals";
import { PortfolioView } from "../components/Portfolio";
import { StockChart } from "../components/StockChart";
import { motion } from "framer-motion";

// Mock Data
import {
  mockStocks,
  mockIndices,
  mockNews,
  mockMarketSentiment,
  mockTradingSignals,
  mockPortfolio,
  mockChartData,
} from "../data/mockData";

// Skeleton Loader Component
const SkeletonLoader = ({ height = "h-6", width = "w-full" }) => (
  <div className={`bg-gray-700 animate-pulse rounded ${height} ${width}`} />
);

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    // Simulate a delay to show the skeleton effect
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="container mx-auto my-4 px-4 py-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {loading ? (
        // Skeleton Loader
        <div>
          <SkeletonLoader height="h-10" width="w-1/3 mb-4" />
          <SkeletonLoader height="h-48" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
            <SkeletonLoader height="h-48 lg:col-span-2" />
            <SkeletonLoader height="h-48" />
          </div>
        </div>
      ) : (
        // Actual Content
        <>
          <MarketOverview indices={mockIndices} />

          {/* Stock Chart and Market Sentiment */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <StockChart data={mockChartData} symbol="AAPL" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <MarketSentimentCard sentiment={mockMarketSentiment} />
            </motion.div>
          </div>

          {/* Top Stocks and Trading Signals */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-xl font-semibold text-white mb-4">Top Stocks</h2>
              <StockList
                stocks={mockStocks}
                onAddToWatchlist={(stock) => console.log("Added to watchlist:", stock)}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <TradingSignals signals={mockTradingSignals} />
            </motion.div>
          </div>

          {/* Portfolio and News Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <PortfolioView portfolio={mockPortfolio} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <NewsSection news={mockNews} />
            </motion.div>
          </div>
        </>
      )}
    </motion.div>
  );
}

export default Dashboard;
