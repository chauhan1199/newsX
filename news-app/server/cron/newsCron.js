const cron = require("node-cron");
const { fetchAllNews } = require("../services/newsService");

function startNewsCron() {
  cron.schedule("*/1 * * * *", async () => {
    console.log("Fetching latest news...");
    await fetchAllNews();
  });
}

module.exports = startNewsCron;
