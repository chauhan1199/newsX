# ⚡ Flash News App

A real-time, AI-powered news aggregator that fetches global headlines using RSS feeds and generates human-like tweet reactions via Groq AI. The structured data is pushed live to a frontend client using WebSockets!

## 🚀 Setup Instructions

### 1. Install Dependencies
Open your terminal in the `news-app` directory and install the necessary packages:
```bash
npm install
```

### 2. Configure API Keys
Make sure you have your `.env` file set up in the root directory (`news-app/.env`). It must contain your Groq API Key to enable the AI smart replies:
```env
GROQ_API_KEY=your_groq_api_key_here
```

### 3. Start the Backend Server
Run the backend server. A Cron job will automatically fetch the latest RSS news every minute, batch-process them using Groq AI, and broadcast them via WebSockets:
```bash
node server/server.js
```
*You should see a success message that says "Server running on http://localhost:8080".*

### 4. Open the Client UI
You do not need a secondary frontend server. To view the app, simply open the `client/index.html` file in your preferred web browser. 

On your Linux terminal, you can do this easily by running:
```bash
xdg-open client/index.html
```

---
*Built using Node.js, Express, Socket.io, and Groq Open-Source Inference.*


https://console.groq.com register with google and create the apikey


FOR ENV create .env file

GROQ_API_KEY="gsk_eQkdiD50XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx"
