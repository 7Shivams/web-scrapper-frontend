# 🌐 Web Scraping Dashboard

A simple React app that scrapes news headlines and displays them in a clean dashboard. Built as a fresher's project to learn React, OAuth, and web scraping.

## ✨ What it does

- **Login with Google** - Secure OAuth 2.0 authentication
- **Scrape headlines** - Fetches news data from public websites
- **Clean dashboard** - Shows scraped data in organized cards
- **Real-time updates** - Refresh button to get latest data

## 🚀 Quick Start

### Prerequisites
- Node.js (version 14 or higher)
- Google OAuth credentials

### Frontend Setup
```bash
git clone <your-repo-url>
cd frontend
npm install

npm start
```

### Env
REACT_APP_CLIENT_ID=your google client ID

### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add your client ID in `src/App.js`

## 🛠️ Tech Stack

- **Frontend**: React, Material-UI (MUI)
- **Authentication**: Google OAuth 2.0
- **Backend**: Python Flask
- **Scraping**: BeautifulSoup, Requests
- **Styling**: MUI components with custom theme

## 🚨 Important Notes

- Make sure your backend server is running on `http://127.0.0.1:8080`