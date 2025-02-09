const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    chatRoomId: { type: String, required: true, index: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, default: "" },
    fileUrl: { type: String, default: null },
    fileType: { type: String, default: "unknown" },
}, { timestamps: true });

module.exports = mongoose.model("ChatRoom", messageSchema);
