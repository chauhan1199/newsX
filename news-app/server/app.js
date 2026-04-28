const express = require("express");
const cors = require("cors");
const { getNews } = require("./services/newsService");

const path = require("path");

const app = express();
app.use(cors());

// Serve static frontend files
app.use(express.static(path.join(__dirname, "../client")));

// REST API
app.get("/api/news", (req, res) => {
  res.json({ success: true, data: getNews() });
});

module.exports = app;
