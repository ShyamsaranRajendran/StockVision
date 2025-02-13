const express = require("express");
const mongoose = require("mongoose");
const dbConfig = require("./config/database.config.js");
const http = require("http");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 5000;

// Import Google Generative AI SDK
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini AI
// const genAI = new GoogleGenerativeAI("AIzaSyCLGe_eCqmehLVBjPusXtTxtJXCqOJX2xI");
const genAI = new GoogleGenerativeAI("AIzaSyBazYvOQVz-GbRkAfIN1AWwP1q3UwAr7tE");
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*", credentials: true },
});

// Attach io to app
app.set("io", io);

app.use((req, res, next) => {
    req.io = io; // Attach Socket.io to `req`
    next();
  });
  
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
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
  
    socket.on("joinRoom", (chatRoomId) => {
      socket.join(chatRoomId);
      console.log(`User joined chatRoomId: ${chatRoomId}`);
    });
  
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
// Import Routes
const users = require("./routes/user.js");
const products = require("./routes/products.js");
const livechat = require("./routes/livechat.js");
const stockRoutes = require("./routes/stocks.data.js");
const news = require("./routes/news.js");
app.use("/auth", users);
app.use("/products", products);
app.use("/livechat", livechat);
app.use("/stocks", stockRoutes);
app.use("/news", news);



// Start Server
server.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});



// ✅ Define the /gemini route
app.post("/gemini", async (req, res) => {
    try {
        const { history = [], message } = req.body;

        if (!message || typeof message !== "string") {
            return res.status(400).json({ error: "Message is required and must be a string" });
        }

        // Ensure history is formatted correctly
        const formattedHistory = history.map(entry => ({
            role: entry.role,  // "user" or "model"
            parts: [{ text: entry.parts.replace("**You:** ", "").replace("**Bot:** ", "") }]  
        }));

        // Initialize Gemini AI model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const chat = model.startChat({ history: formattedHistory });

        // Ensure message is sent in the correct format (send string, not object)
        console.log("Sending request:", message);

        const result = await chat.sendMessage(message);  // ✅ Send as a string

        // Extract and send back response
        const response = result.response;
        const text = response.text();

        res.json({ reply: text });
    } catch (error) {
        console.error("Error in /gemini:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});