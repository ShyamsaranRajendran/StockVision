const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const ChatRoom = require("../models/chatroom.model");
const { io } = require("../server"); // Ensure io is correctly imported
const authenticate = require("../utils/authendicate");

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

        res.status(200).json(messages.reverse()); // Reverse for chronological order
    } catch (err) {
        console.error("Error fetching messages:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// Send a new message
router.post("/sendMessage", authenticate, upload.single("file"), async (req, res) => {
    try {
        console.log("Request body:", req.body);
        console.log("Decoded user:", req.user);

        const { chatRoomId, text } = req.body;
        const sender = req.user?._id; // Ensure sender is set properly

        if (!chatRoomId || !sender) {
            return res.status(400).json({ error: "Chat room ID and sender are required" });
        }

        // Prepare message data
        const newMessage = new ChatRoom({
            chatRoomId,
            sender,
            text: text || null,
            fileUrl: req.file ? `/uploads/${req.file.filename}` : null,
            fileType: req.file ? req.file.mimetype : null,
        });

        // Save message to the database
        await newMessage.save();

        // Ensure io is available before emitting
        if (io) {
            io.to(chatRoomId).emit("receiveMessage", newMessage);
        } else {
            console.error("Socket.io instance (io) is undefined.");
        }

        res.status(201).json(newMessage);
    } catch (err) {
        console.error("Error sending message:", err);
        res.status(500).json({ error: "Failed to send message" });
    }
});

module.exports = router;
