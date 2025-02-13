import React, { useState, useEffect } from "react";
import axios from "axios";

interface NewsArticle {
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
}

const NewsResearchPage = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNews, setFilteredNews] = useState<NewsArticle[]>([]);
  const [activeTab, setActiveTab] = useState("stock-news");

  useEffect(() => {
    fetchStockNews();
  }, []);

  // Fetch stock news from the backend
  const fetchStockNews = async () => {
    try {
      const response = await axios.get("http://localhost:5000/news/stock-news");
      setNews(response.data as NewsArticle[]);
      setFilteredNews(response.data as NewsArticle[]);
    } catch (error) {
      console.error("Error fetching stock news:", error);
    }
  };

  // Search stock news
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setFilteredNews(news);
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/news/search-stock-news?q=${searchQuery}`
      );
      setFilteredNews(response.data as NewsArticle[]);
    } catch (error) {
      console.error("Error searching stock news:", error);
    }
  };

  // Fetch other categories like stock-market calendar & research reports
  const fetchOtherNews = async (type: string) => {
    try {
      const response = await axios.get(`http://localhost:5000/news/${type}`);
      setFilteredNews(response.data as NewsArticle[]);
      setActiveTab(type);
    } catch (error) {
      console.error(`Error fetching ${type} news:`, error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Stock News</h1>

      {/* Search Bar */}
      <div className="flex items-center justify-center mb-4">
        <input
          type="text"
          placeholder="Search news..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded-md w-80"
        />
        <button
          onClick={handleSearch}
          className="ml-2 p-2 bg-blue-500 text-white rounded-md"
        >
          Search
        </button>
      </div>

      {/* Tabs for different categories */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          className={`p-2 ${
            activeTab === "stock-news" ? "bg-blue-600 text-white" : "bg-gray-200"
          } rounded-md`}
          onClick={fetchStockNews}
        >
          Stock News
        </button>
        <button
          className={`p-2 ${
            activeTab === "stock-market-calendar"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          } rounded-md`}
          onClick={() => fetchOtherNews("stock-market-calendar")}
        >
          Stock Market Calendar
        </button>
        <button
          className={`p-2 ${
            activeTab === "research-reports"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          } rounded-md`}
          onClick={() => fetchOtherNews("research-reports")}
        >
          Research Reports
        </button>
      </div>

      {/* Display News Articles */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.length > 0 ? (
          filteredNews.map((article, index) => (
            <div key={index} className="border p-4 rounded-md shadow-md">
              <img
                src={article.urlToImage || "https://via.placeholder.com/150"}
                alt="news"
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <h2 className="text-md font-bold">{article.title}</h2>
              <p className="text-gray-700">{article.description}</p>
              <p className="text-sm text-gray-500">By {article.author || "Unknown"}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-3 text-blue-500"
              >
                Read More
              </a>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No news found.</p>
        )}
      </div>
    </div>
  );
};

export default NewsResearchPage;
