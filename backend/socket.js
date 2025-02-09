const { Server } = require("socket.io");

let io;

function initializeSocket(server) {
    io = new Server(server, {
        cors: {
            origin: "*", // Allow all origins (modify this for production)
        },
    });

    io.on("connection", (socket) => {
        console.log("🔵 User connected:", socket.id);

        socket.on("joinRoom", (chatRoomId) => {
            socket.join(chatRoomId);
            console.log(`User joined room: ${chatRoomId}`);
        });

        socket.on("disconnect", () => {
            console.log("🔴 User disconnected:", socket.id);
        });
    });
}

function getIo() {
    if (!io) {
        throw new Error("Socket.io is not initialized!");
    }
    return io;
}

module.exports = { initializeSocket, getIo };
