# 🚀 Medikal Healthcare System - Setup Guide

This guide will help you set up the Medikal Healthcare System in a new repository.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.11+** - [Download Python](https://www.python.org/downloads/)
- **Node.js 18+** - [Download Node.js](https://nodejs.org/)
- **MongoDB 6.0+** - [Download MongoDB](https://www.mongodb.com/try/download/community)
- **Git** - [Download Git](https://git-scm.com/downloads)
- **Yarn** (optional, npm can be used) - [Install Yarn](https://yarnpkg.com/getting-started/install)

## 🏗️ System Architecture

```
Frontend (React) → Backend (FastAPI) → MongoDB
                          ↓
                   AI Services (Optional)
```

### Technology Stack
- **Frontend**: React 18, Tailwind CSS, Context API
- **Backend**: FastAPI (Python), MongoDB (Motor), JWT Authentication
- **AI**: OpenRouter API (Optional - fallback system available)

## 📦 Installation Steps

### Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd medikal
```

### Step 2: Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create a virtual environment:**
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables:**
   ```bash
   # Copy the example file
   cp .env.example .env

   # Edit .env file with your configuration
   # Required variables:
   #   - MONGO_URL: MongoDB connection string
   #   - SECRET_KEY: JWT secret key (generate a secure random string)
   # Optional variables:
   #   - OPENROUTER_API_KEY: AI service API key (leave empty for fallback mode)
   ```

   **Generate a secure SECRET_KEY:**
   ```bash
   # Python
   python -c "import secrets; print(secrets.token_urlsafe(32))"

   # Or use openssl
   openssl rand -hex 32
   ```

5. **Start MongoDB:**
   ```bash
   # Windows (run as Administrator)
   net start MongoDB

   # macOS
   brew services start mongodb-community

   # Linux
   sudo systemctl start mongod
   ```

6. **Setup demo data (for testing):**
   ```bash
   python setup_demo_data.py
   ```
   This creates test users. See `DEMO_CREDENTIALS.md` for login details.

7. **Start the backend server:**
   ```bash
   uvicorn server:app --host 0.0.0.0 --port 8001 --reload
   ```

   The backend will be available at `http://localhost:8001`

### Step 3: Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   # Using Yarn (recommended)
   yarn install

   # Or using npm
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   # Copy the example file
   cp .env.example .env

   # Edit .env if you need to change the backend URL
   # Default: REACT_APP_BACKEND_URL=http://localhost:8001
   ```

4. **Start the frontend development server:**
   ```bash
   # Using Yarn
   yarn start

   # Or using npm
   npm start
   ```

   The frontend will be available at `http://localhost:3000`

### Step 4: Verify Installation

1. Open your browser and navigate to `http://localhost:3000`
2. You should see the login page
3. Use demo credentials from `DEMO_CREDENTIALS.md` to test:
   - Admin: `admin1` / `admin123`
   - Doctor: `doctor1` / `doctor123`
   - Patient: `patient1` / `patient123`

## 🔐 Environment Variables

### Backend (.env)

| Variable | Required | Description | Default |
|----------|----------|-------------|---------|
| `MONGO_URL` | Yes | MongoDB connection string | `mongodb://localhost:27017/medikal` |
| `SECRET_KEY` | Yes | JWT secret key (change in production!) | `your-secret-key-here` |
| `ALGORITHM` | No | JWT algorithm | `HS256` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | No | Token expiration time | `30` |
| `ENVIRONMENT` | No | Environment (development/production) | `development` |
| `OPENROUTER_API_KEY` | No | AI service API key (optional) | Empty (uses fallback) |
| `CORS_ORIGINS` | No | Allowed CORS origins (comma-separated, production only) | `*` |

### Frontend (.env)

| Variable | Required | Description | Default |
|----------|----------|-------------|---------|
| `REACT_APP_BACKEND_URL` | No | Backend API URL | `http://localhost:8001` |

## 🧪 Testing

### Backend Tests

```bash
cd backend
python backend_test.py
```

### Frontend Tests

```bash
cd frontend
yarn test
# or
npm test
```

## 🚨 Security Checklist

Before deploying to production:

- [ ] Change `SECRET_KEY` to a secure random string
- [ ] Set `ENVIRONMENT=production` in backend `.env`
- [ ] Configure `CORS_ORIGINS` with specific allowed origins
- [ ] Use strong passwords for all user accounts
- [ ] Remove or secure demo/test accounts
- [ ] Enable MongoDB authentication
- [ ] Use HTTPS in production
- [ ] Configure proper firewall rules
- [ ] Set up database backups
- [ ] Review and update all default credentials

## 📝 Development Workflow

1. **Make changes to code**
2. **Backend auto-reloads** (when using `--reload` flag)
3. **Frontend auto-reloads** (React development server)
4. **Test changes** using demo accounts
5. **Commit changes** to Git

## 🐛 Troubleshooting

### Backend Issues

**MongoDB Connection Error:**
- Ensure MongoDB is running
- Check `MONGO_URL` in `.env` file
- Verify MongoDB port (default: 27017)

**Module Not Found:**
- Activate virtual environment
- Run `pip install -r requirements.txt`

**Port Already in Use:**
- Change port in `uvicorn` command: `--port 8002`
- Update `REACT_APP_BACKEND_URL` in frontend `.env`

### Frontend Issues

**Cannot Connect to Backend:**
- Verify backend is running on correct port
- Check `REACT_APP_BACKEND_URL` in `.env`
- Check browser console for CORS errors

**Dependencies Issues:**
- Delete `node_modules` and `package-lock.json`
- Run `yarn install` or `npm install` again

### Database Issues

**No Demo Data:**
- Run `python backend/setup_demo_data.py`
- Check MongoDB connection
- Verify database name in `MONGO_URL`

## 📚 Additional Resources

- **API Documentation**: Available at `http://localhost:8001/docs` (Swagger UI)
- **Demo Credentials**: See `DEMO_CREDENTIALS.md`
- **Developer Documentation**: See `README-dev.md`
- **Project Overview**: See `README.md`

## 🆘 Getting Help

If you encounter issues:

1. Check the troubleshooting section above
2. Review error logs in the console
3. Check GitHub issues (if applicable)
4. Consult the documentation files

## ✅ Next Steps

After setup:

1. Review the system architecture in `README.md`
2. Explore the API endpoints at `http://localhost:8001/docs`
3. Test all user roles using demo credentials
4. Customize configuration for your environment
5. Review security settings before production deployment

---

**Happy Coding! 🎉**
