# Vercel Deployment Guide for Medikal React App

## Quick Answer
**You can update your existing Vercel project** - no need to delete and create a new one! Just update the configuration.

## Option 1: Update Existing Vercel Project (Recommended)

### Steps:

1. **Push your code to GitHub/GitLab/Bitbucket** (if not already done)
   ```bash
   git add .
   git commit -m "Update to React app"
   git push
   ```

2. **Go to Vercel Dashboard**
   - Visit https://vercel.com/dashboard
   - Select your existing project

3. **Update Project Settings**
   - Go to **Settings** → **General**
   - Update these settings:
     - **Root Directory**: Leave empty (or set to `.` if required)
     - **Build Command**: `cd frontend && npm install && npm run build`
     - **Output Directory**: `frontend/build`
     - **Install Command**: `cd frontend && npm install`
     - **Framework Preset**: `Create React App`

4. **Deploy**
   - Go to **Deployments** tab
   - Click **Redeploy** on the latest deployment, OR
   - Push a new commit to trigger automatic deployment

## Option 2: Create New Vercel Project

If you prefer to keep the old site separate:

1. **Create New Project in Vercel**
   - Click "Add New Project"
   - Import your repository
   - Configure:
     - Framework: Create React App
     - Root Directory: `.` (root)
     - Build Command: `cd frontend && npm install && npm run build`
     - Output Directory: `frontend/build`

2. **Deploy**

## Configuration Details

The `vercel.json` file has been updated with:
- ✅ Build command pointing to React app
- ✅ Output directory set to `frontend/build`
- ✅ React Router rewrites for SPA routing
- ✅ Security headers
- ✅ Cache headers for static assets

## Environment Variables (if needed)

If you have any environment variables:
1. Go to **Settings** → **Environment Variables**
2. Add any required variables (e.g., API keys, endpoints)

## Testing the Deployment

After deployment:
1. Visit your Vercel URL
2. Test all routes:
   - `/` (Home)
   - `/platform`
   - `/amr`
   - `/research`
   - `/team`
   - `/how-it-works`
   - `/request-demo`
   - `/privacy`
   - `/terms`
   - `/security`

## Troubleshooting

### Build Fails
- Check that `frontend/package.json` exists
- Verify Node.js version (Vercel uses Node 18.x by default)
- Check build logs in Vercel dashboard

### Routes Not Working (404)
- Ensure `rewrites` in `vercel.json` is configured correctly
- React Router needs all routes to serve `index.html`

### Assets Not Loading
- Check that assets are in `frontend/public/assets/`
- Verify paths in components use relative paths

## Current Configuration

- **Framework**: Create React App
- **Build Command**: `cd frontend && npm install && npm run build`
- **Output**: `frontend/build`
- **Node Version**: 18.x (Vercel default)
