const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    chatRoomId: { type: String, required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String },
    fileUrl: { type: String },
    fileType: { type: String },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Message", MessageSchema);
