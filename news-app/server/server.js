const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");
const initSocket = require("./sockets/newsSocket");
const startNewsCron = require("./cron/newsCron");
const { fetchAllNews } = require("./services/newsService");

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Init socket
initSocket(io);

// Start cron
startNewsCron();

// Initial fetch
fetchAllNews();

server.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});
