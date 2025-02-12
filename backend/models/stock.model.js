const mongoose = require("mongoose");

const StockSchema = new mongoose.Schema({
  symbol: { type: String, required: true, unique: true },
  data: { type: Object, required: true },
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Stock", StockSchema);
