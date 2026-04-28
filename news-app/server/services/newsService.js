const Parser = require("rss-parser");
const parser = new Parser();
const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const feeds = [
  "https://feeds.bbci.co.uk/news/rss.xml",
  "https://feeds.feedburner.com/ndtvnews-top-stories",
  "https://timesofindia.indiatimes.com/rssfeedstopstories.cms"
];

let cachedNews = [];

async function fetchAllNews() {
  try {
    const allFeeds = await Promise.all(
      feeds.map(url => parser.parseURL(url))
    );

    let articles = [];

    allFeeds.forEach(feed => {
      feed.items.forEach(item => {
        articles.push({
          title: item.title,
          link: item.link,
          source: feed.title,
          pubDate: item.pubDate
        });
      });
    });

    // Remove duplicates
    const unique = Array.from(
      new Map(articles.map(a => [a.title, a])).values()
    );

    // Sort latest first
    unique.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

    const topItems = unique.slice(0, 50);

    // Call Groq to generate comments for the first 15 items
    let aiComments = [];
    if (process.env.GROQ_API_KEY) {
      try {
        const top15 = topItems.slice(0, 15);
        const titlesList = top15.map((item, i) => `${i + 1}. ${item.title}`).join('\n');
        
        const chatCompletion = await groq.chat.completions.create({
          messages: [{ role: 'user', content: `I need short, engaging, 1 sentence Twitter comments for the following news headlines. The comment should sound like a human reacting to the news.
          Do NOT include the actual headline in your response, just the reaction comment.
          Return ONLY a raw JSON array of strings, with exactly ${top15.length} strings corresponding to the titles in order. No Markdown formatting or markdown ticks, just raw JSON.
          
          Headlines:
          ${titlesList}` }],
          model: 'openai/gpt-oss-120b',
          temperature: 0.7,
        });

        const rawJsonText = chatCompletion.choices[0]?.message?.content.replace(/```json/g, '').replace(/```/g, '').trim();
        aiComments = JSON.parse(rawJsonText);
      } catch (err) {
        console.error("Groq AI Error:", err.message);
      }
    }

    cachedNews = topItems.map((item, index) => ({
      ...item,
      aiComment: aiComments[index] || "Check out this latest news: " // Fallback
    }));

    return cachedNews;
  } catch (err) {
    console.error("Error fetching news:", err);
  }
}

function getNews() {
  return cachedNews;
}

module.exports = { fetchAllNews, getNews };
