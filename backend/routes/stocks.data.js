const express = require("express");
const router = express.Router();
const axios = require("axios");
const Stock = require("../models/stock.model.js");
require("dotenv").config();

// Fetch stock data from Alpha Vantage
const fetchStockData = async (symbol) => {
  const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`;

  const response = await axios.get(url);
  return response.data;
};

// GET stock data
router.get("/data/AAPL", async (req, res) => {
  const data= await Stock.find({symbol: "AAPL"});
  console.log(data[0].data);
  res.json(data[0].data);
});

router.get("/:symbol", async (req, res) => {
  console.log("GET /stocks/:symbol");
  const { symbol } = req.params;

  try {
      let stock = await Stock.findOne({ symbol: symbol }); // Use findOne instead of find

      // Check if stock exists before accessing its properties
      if (stock && stock.lastUpdated && (Date.now() - new Date(stock.lastUpdated).getTime()) < 5 * 60 * 1000) {
          return res.json(stock.data);
      }

      // Fetch new stock data if not found or outdated
      const stockData = await fetchStockData(symbol);

      if (stock) {
          stock.data = stockData;
          stock.lastUpdated = new Date(); // Ensure lastUpdated is a Date object
          await stock.save();
      } else {
          stock = new Stock({ symbol, data: stockData, lastUpdated: new Date() }); // Include lastUpdated
          await stock.save();
      }

      res.json(stockData);
  } catch (error) {
      console.error("Error fetching stock data:", error);
      res.status(500).json({ error: "Failed to fetch stock data" });
  }
});


module.exports = router;
