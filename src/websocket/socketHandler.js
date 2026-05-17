const connectedUsers = new Map();

function setupSocket(io) {
  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    if (userId) {
      connectedUsers.set(userId, socket.id);
      console.log(`Client connected: ${userId}`);
    } else {
      console.log(`Client connected without userId: ${socket.id}`);
    }

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
      if (userId) {
        connectedUsers.delete(userId);
        console.log(`Client disconnected: ${userId}`);
      } else {
        console.log(`Client disconnected: ${socket.id}`);
      }
    });
  });
}

function getConnectedUsers() {
  return connectedUsers;
}

module.exports = {
  setupSocket,
  getConnectedUsers
};