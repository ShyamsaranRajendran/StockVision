const express = require("express");
const mongoose = require("mongoose");
const dbConfig = require("./config/database.config.js");
const http = require("http");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

// Create HTTP server
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*", credentials: true },
});

// Attach io to app to avoid circular dependency
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

// Import Routes AFTER setting io
const users = require("./routes/user.js");
const products = require("./routes/products.js");
const livechat = require("./routes/livechat.js");

app.use("/auth", users);
app.use("/products", products);
app.use("/livechat", livechat);

// Socket.io Connection
io.on("connection", (socket) => {
    console.log(`🔵 User connected: ${socket.id}`);

    socket.on("joinRoom", (chatRoomId) => {
        socket.join(chatRoomId);
        console.log(`📢 User joined room: ${chatRoomId}`);
    });

    socket.on("sendMessage", async (messageData) => {
        io.to(messageData.chatRoomId).emit("receiveMessage", messageData);
    });

    socket.on("disconnect", () => {
        console.log(`🔴 User disconnected: ${socket.id}`);
    });
});

// Start Server
server.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});
