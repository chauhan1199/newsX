const { getNews } = require("../services/newsService");

function initSocket(io) {
  io.on("connection", (socket) => {
    console.log("User connected");

    // Send every 5 sec
    const interval = setInterval(() => {
      socket.emit("flash-news", getNews());
    }, 5000);

    socket.on("disconnect", () => {
      clearInterval(interval);
    });
  });
}

module.exports = initSocket;
