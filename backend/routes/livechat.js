const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const ChatRoom = require("../models/chatroom.model");
const authenticate = require("../utils/authenticate");

const router = express.Router();

// Ensure upload directory exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// Fetch messages for a specific chat room
router.get("/:chatRoomId", async (req, res) => {
    try {
        const messages = await ChatRoom.find({ chatRoomId: req.params.chatRoomId })
            .sort({ createdAt: -1 })
            .limit(50)
            .populate("sender", "username avatarImage");

        res.status(200).json(messages.reverse());
    } catch (err) {
        console.error("Error fetching messages:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// Send a new message
router.post("/sendMessage", authenticate, async (req, res) => {
    try {
        console.log("🔹 Request body:", req.body);
        console.log("🔹 Decoded user:", req.user);

        const { chatRoomId, text } = req.body;
        console.log(req.body);
        const senderId = req.user?._id;

        if (!chatRoomId || !senderId) {
            console.error("❌ Chat room ID and sender ID are required");
            console.log("Chat room ID:", chatRoomId);
            console.log("Sender ID:", senderId);
            return res.status(400).json({ error: "Chat room ID and sender ID are required" });
        }

        if (!text || typeof text !== "string" || text.trim().length === 0) {
            return res.status(400).json({ error: "Message text cannot be empty" });
        }

        // Get io instance from app
        const io = req.app.get("io");
        if (!io) {
            console.error("❌ Socket.io instance (io) is unavailable.");
            return res.status(500).json({ error: "Socket.io not initialized" });
        }

        // Create new message
        const newMessage = {
            chatRoomId,
            senderId,
            text: text.trim(), // Trim message text
            createdAt: new Date(),
        };

        // Emit the message in real-time
        io.to(chatRoomId).emit("receiveMessage", newMessage);
        console.log(`⚡ Message emitted to room: ${chatRoomId}`, newMessage);

        res.status(201).json(newMessage);
    } catch (err) {
        console.error("❌ Error sending message:", err);
        res.status(500).json({ error: "Failed to send message" });
    }
});



module.exports = router;
