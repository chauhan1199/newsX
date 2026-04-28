const express = require("express");
const cors = require("cors");
const { getNews } = require("./services/newsService");

const app = express();
app.use(cors());

// REST API
app.get("/api/news", (req, res) => {
  res.json({ success: true, data: getNews() });
});

module.exports = app;
