import React from 'react'
import { MarketOverview } from '../components/MarketOverview';
import { StockList } from '../components/StockList';
import { NewsSection } from '../components/NewsSection';
import { MarketSentimentCard } from '../components/MarketSentimentCard';
import { TradingSignals } from '../components/TradingSignals';
import { PortfolioView } from '../components/Portfolio';
import { StockChart } from '../components/StockChart';

import {
    mockStocks,
    mockIndices,
    mockNews,
    mockMarketSentiment,
    mockTradingSignals,
    mockPortfolio,
    mockChartData
  } from '../data/mockData';
function Dashboard() {
  return (
     <div className="container mx-auto my-4 px-4 py-8">
                <MarketOverview indices={mockIndices} />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                  <div className="lg:col-span-2">
                    <StockChart data={mockChartData} symbol="AAPL" />
                  </div>
                  <div>
                    <MarketSentimentCard sentiment={mockMarketSentiment} />
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                  <div className="lg:col-span-2">
                    <div className="mb-4">
                      <h2 className="text-xl font-semibold text-white mb-4">Top Stocks</h2>
                      <StockList
                        stocks={mockStocks}
                        onAddToWatchlist={(stock) => console.log('Added to watchlist:', stock)}
                      />
                    </div>
                  </div>
                  <div>
                    <TradingSignals signals={mockTradingSignals} />
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <PortfolioView portfolio={mockPortfolio} />
      </div>
      <div>
        <NewsSection news={mockNews} />
      </div>
    </div>
    
              </div>
  )
}

export default Dashboard