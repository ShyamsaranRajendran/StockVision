const express = require("express");
const ChatMessage = require("../models/chatroom.model");
const authenticate = require("../utils/authenticate");

const router = express.Router();

// Get messages for a chat room
router.get("/:chatRoomId", authenticate, async (req, res) => {
    try {
        const messages = await ChatMessage.find({ chatRoomId: req.params.chatRoomId })
            .populate("sender", "username avatarUrl")
            .sort({ createdAt: 1 });

        res.json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Send a message
router.post("/sendMessage", authenticate, async (req, res) => {
    try {
        const { chatRoomId, text } = req.body;
        if (!text.trim()) return res.status(400).json({ message: "Message cannot be empty" });

        const newMessage = new ChatMessage({
            chatRoomId,
            sender: req.user._id, // Extracted from JWT
            text,
        });

        await newMessage.save();

        // Emit message via Socket.io
        req.io.to(chatRoomId).emit("receiveMessage", {
            _id: newMessage._id,
            sender: { username: req.user.username, avatarUrl: req.user.avatarUrl },
            text: newMessage.text,
        });

        res.json(newMessage);
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
