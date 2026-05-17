const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Real-Time Notification System running"
  });
});

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  console.log(`Client connected: ${userId || socket.id}`);

  socket.emit("notification", {
    id: "test-1",
    category: "machine-failure",
    message: "Test notification from server",
    createdAt: Date.now()
  });

  socket.on("notification-ack", (data) => {
    console.log("Notification acknowledged:", data);
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${userId || socket.id}`);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});