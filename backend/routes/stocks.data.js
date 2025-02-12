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
router.get("/:symbol", async (req, res) => {
    console.log("GET /stocks/:symbol");
  const { symbol } = req.params;

  try {
    let stock = await Stock.findOne({ symbol });

    // If stock data exists and is fresh (less than 5 minutes old), return it
    if (stock && (Date.now() - stock.lastUpdated.getTime()) < 5 * 60 * 1000) {
      return res.json(stock.data);
    }

    // Otherwise, fetch new data
    const stockData = await fetchStockData(symbol);

    // Save/update in DB
    if (stock) {
      stock.data = stockData;
      stock.lastUpdated = Date.now();
      await stock.save();
    } else {
      stock = new Stock({ symbol, data: stockData });
      await stock.save();
    }

    res.json(stockData);
  } catch (error) {
    console.error("Error fetching stock data:", error);
    res.status(500).json({ error: "Failed to fetch stock data" });
  }
});

module.exports = router;
