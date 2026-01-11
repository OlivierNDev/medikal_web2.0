# Quick Start Guide - Medikal Project

## ✅ Git Repository Setup Complete

**Repository:** https://github.com/OlivierNDev/medikal_web2.0.git

All nested git repositories have been removed. Everything is now in the main repository.

## 🚀 Running Locally

### Landing Site (Currently Running)

The landing site is running at: **http://localhost:8080**

To start it manually:
```powershell
cd landing-site
python -m http.server 8080
```

Or use the npm script:
```powershell
cd landing-site
npm start
```

### Backend API

```powershell
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

### Frontend React App

```powershell
cd frontend
npm install
npm start
```

## 🔄 Auto-Push Setup

### Automatic Push (Git Hook)

The post-commit hook is configured. Every time you commit, it will automatically push to GitHub.

### Manual Push

```powershell
git add .
git commit -m "Your message"
git push origin main
```

### Watch Mode (PowerShell Script)

```powershell
.\auto-push.ps1 -Watch -CommitMessage "Auto-commit: Update files"
```

This will watch for file changes and automatically commit and push every 10 seconds.

## 📁 Project Structure

```
Medikal1.0/
├── landing-site/          # Static landing page (HTML/CSS/JS)
├── frontend/              # React application
├── backend/               # FastAPI backend
├── auto-push.ps1          # Auto-push script
└── README-GIT.md          # Detailed git documentation
```

## 🔗 Important Links

- **GitHub Repo:** https://github.com/OlivierNDev/medikal_web2.0.git
- **Landing Site:** http://localhost:8080 (when running)
- **Backend API:** http://localhost:8001 (when running)
- **Frontend App:** http://localhost:3000 (when running)

## ⚠️ Notes

- All nested git repos have been removed
- Auto-push is enabled via git hook
- Landing site uses static HTML (no build required)
- Backend requires MongoDB running locally
- Frontend requires Node.js and npm
