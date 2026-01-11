# Git Setup and Auto-Push Guide

## Repository Configuration

This repository is configured to push to: **https://github.com/OlivierNDev/medikal_web2.0.git**

## Auto-Push Setup

### Option 1: PowerShell Script (Recommended for Windows)

Use the `auto-push.ps1` script:

```powershell
# Single push
.\auto-push.ps1 -CommitMessage "Your commit message"

# Watch mode (automatically pushes when files change)
.\auto-push.ps1 -Watch -CommitMessage "Auto-commit: Update files"
```

### Option 2: Manual Push

```powershell
git add .
git commit -m "Your commit message"
git push origin main
```

### Option 3: Git Hook (Unix/Linux/Mac)

The post-commit hook will automatically push after each commit:
- Location: `.git/hooks/post-commit`
- Make it executable: `chmod +x .git/hooks/post-commit`

## Running Locally

### Landing Site

The landing site is a static HTML site. Simply open `landing-site/index.html` in a browser, or use a local server:

```powershell
# Using Python
cd landing-site
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server landing-site -p 8000
```

Then open: http://localhost:8000

### Backend (FastAPI)

```powershell
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

### Frontend (React)

```powershell
cd frontend
npm install
npm start
```

## Notes

- The nested git repository in `medikal-website-new` has been removed to avoid conflicts
- All files are now tracked in the main repository
- The remote repository has been updated to point to `medikal_web2.0.git`
