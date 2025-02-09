const mongoose = require("mongoose");

const chatMessageSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Associate messages with a user
  role: { type: String, enum: ["user", "model"], required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const ChatMessage = mongoose.model("GeminiMessage", chatMessageSchema);

module.exports = ChatMessage;
