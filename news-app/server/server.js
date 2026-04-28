const path = require("path");
const { exec } = require("child_process");
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

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
  // Conditionally open browser only if running locally and not hosted on Render/etc.
  if (!process.env.PORT) {
    const url = `http://localhost:${PORT}`;
    const op = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
    exec(`${op} ${url}`);
  }
});
