import dotenv from "dotenv";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";

import app from "./src/index.js";

dotenv.config();

// --------------------
// Create HTTP Server
// --------------------
const server = http.createServer(app);

// --------------------
// Socket.IO Setup
// --------------------
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH"],
  },
});

io.on("connection", (socket) => {
  console.log("✅ Socket Connected:", socket.id);
  socket.on("joinOrderRoom", (orderId) => {
    socket.join(orderId);
    console.log(`✅ Joined room: ${orderId}`);
  });
  socket.on("disconnect", () => {
    console.log("❌ Socket Disconnected:", socket.id);
  });
});

// --------------------
// MongoDB Connection
// --------------------
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Error:", error.message);
    process.exit(1);
  }
};

// --------------------
// Start Server
// --------------------
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
