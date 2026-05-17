const { io } = require("socket.io-client");

const TOTAL_CLIENTS = Number(process.env.MAX_CLIENTS) || 10;
const SERVER_URL = "http://localhost:3000";

for (let i = 1; i <= TOTAL_CLIENTS; i++) {
  const userId = `user-${i}`;

  const socket = io(SERVER_URL, {
    query: {
      userId
    }
  });

  socket.on("connect", () => {
    console.log(`${userId} connected with socket ${socket.id}`);
  });

  socket.on("notification", (notification) => {
    const receivedAt = Date.now();
    const latency = receivedAt - notification.createdAt;

    console.log(`${userId} received notification ${notification.id} latency=${latency}ms`);

    socket.emit("notification-ack", {
      notificationId: notification.id,
      userId,
      receivedAt
    });
  });

  socket.on("disconnect", () => {
    console.log(`${userId} disconnected`);
  });
}