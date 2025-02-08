const express = require("express");
const mongoose = require("mongoose");
const dbConfig = require("./config/database.config.js");
const http = require("http");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");
const Message = require("./models/chatroom.model.js");

const app = express();
const port = 5000;

// Create HTTP server
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*", credentials: true },
});

// Attach io to app for global access
app.set("io", io);

// Connect to MongoDB
mongoose.connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ Successfully connected to the database"))
    .catch((err) => {
        console.error("❌ Could not connect to the database. Exiting now...", err);
        process.exit(1);
    });

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

// Import Routes
const users = require("./routes/user.js");
const products = require("./routes/products.js");
const livechat = require("./routes/livechat.js");

app.use("/auth", users);
app.use("/products", products);
app.use("/livechat", livechat);

// Live Socket Communication
io.on("connection", (socket) => {
    console.log(`🔵 User connected: ${socket.id}`);

    socket.on("joinRoom", (chatRoomId) => {
        socket.join(chatRoomId);
        console.log(`📢 User joined room: ${chatRoomId}`);
    });

    socket.on("sendMessage", async ({ chatRoomId, sender, text, fileUrl, fileType }) => {
        if (!chatRoomId || !sender) {
            console.error("❌ Missing required fields: chatRoomId or sender.");
            return;
        }

        try {
            const messageData = { chatRoomId, sender, text: text || "" };

            if (fileUrl) {
                messageData.fileUrl = fileUrl;
                messageData.fileType = fileType || "unknown";
            }

            const message = new Message(messageData);
            await message.save();

            console.log(`📩 Message sent to room ${chatRoomId}: ${message.text}`);

            io.to(chatRoomId).emit("receiveMessage", message.toObject()); // Convert to plain object
        } catch (error) {
            console.error("❌ Error saving message:", error);
        }
    });

    socket.on("disconnect", () => {
        console.log(`🔴 User disconnected: ${socket.id}`);
    });
});

// Export server and io instance
module.exports = { server, io };

// Start Server
server.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});
