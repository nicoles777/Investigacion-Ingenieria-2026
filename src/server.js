const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

require("dotenv").config();


const { setupSocket } = require("./websocket/socketHandler");
const subscriptionRoutes = require("./routes/subscriptionRoutes");

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

app.use("/subscriptions", subscriptionRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Real-Time Notification System running"
  });
});

setupSocket(io);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//creado con IA