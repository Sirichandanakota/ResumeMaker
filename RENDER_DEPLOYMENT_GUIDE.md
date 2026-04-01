# 🚀 Render Backend Deployment - Complete Step-by-Step Guide

## ⚠️ Pre-Deployment Checklist (COMPLETED ✓)
- ✅ Node.js version specified (v22.22.0 in .nvmrc)
- ✅ npm forced (legacy-peer-deps in .npmrc)
- ✅ render.yaml configured with production settings
- ✅ PORT environment variable configured
- ✅ NODE_ENV set to production
- ✅ MongoDB URI ready to be set in Render
- ✅ JWT_SECRET ready to be set in Render
- ✅ CORS configured for frontend origin
- ✅ GitHub repository synchronized

---

## 📋 STEP 1: Prepare GitHub Repository (5 minutes)

### 1.1 Verify GitHub is synced
```powershell
cd "c:\RESUME MAKER"
git status
git log --oneline -5
```
**Expected:** Everything committed and pushed to https://github.com/Siri-2256/Resume-Maker

### 1.2 Verify critical files exist
- ✅ `render.yaml` - Deployment configuration
- ✅ `BACKEND/package.json` - Dependencies
- ✅ `BACKEND/server.js` - Main app file
- ✅ `BACKEND/.npmrc` - Package manager config
- ✅ `.nvmrc` - Node version specification
- ✅ `BACKEND/.env.example` - Environment template

**If any are missing, run:**
```powershell
cd "c:\RESUME MAKER" && git push origin main
```

---

## 🌐 STEP 2: Create Render Account & Web Service (5 minutes)

### 2.1 Go to Render Dashboard
- Navigate to https://dashboard.render.com
- Sign up with GitHub account (recommended)
- Click "Connect GitHub" if needed
- Authorize Render to access your GitHub repositories

### 2.2 Create a New Web Service
1. Click **"+ New +"** button in top-right
2. Select **"Web Service"**
3. Look for **"Resume-Maker"** repository (or your fork name)
4. Click **"Connect"**

**IMPORTANT:** Make sure you're connected to your GitHub account at: https://github.com/Siri-2256/Resume-Maker

---

## ⚙️ STEP 3: Configure Web Service Settings (10 minutes)

### 3.1 Name & Basic Settings
| Setting | Value |
|---------|-------|
| **Name** | `resume-maker-backend` |
| **Environment** | `Node` |
| **Region** | `Oregon` (or closest to you) |
| **Branch** | `main` |

### 3.2 Build & Start Commands
| Setting | Value |
|---------|-------|
| **Root Directory** | `BACKEND` |
| **Build Command** | `npm ci --legacy-peer-deps` |
| **Start Command** | `npm start` |

> ⚠️ **DO NOT use custom build script - use exact values above!**

### 3.3 Environment Variables
Click **"Advanced"** → **"Add Environment Variable"** and set these **one by one**:

| Key | Value | Notes |
|-----|-------|-------|
| `NODE_ENV` | `production` | **Required** |
| `PORT` | `5000` | **Required** |
| `MONGODB_URI` | `mongodb+srv://kotasirichandana7:chandana2082@resumemaker.myex2ke.mongodb.net/resumemaker` | Copy exactly |
| `JWT_SECRET` | `your-secure-jwt-secret-key-min-32-chars-recommended` | **Change this!** Use a strong 32+ char string |
| `FRONTEND_URL` | *(Leave blank for now)* | Add later after Vercel deploys |

### 3.4 Plan Settings
- **Plan:** Free (select "Free" tier)
- **Auto-deploy:** On (enabled by default)

---

## 🚀 STEP 4: Deploy & Verify (3-5 minutes)

### 4.1 Deploy
Click **"Create Web Service"** at the bottom

### 4.2 Monitor Deployment
1. Wait for deployment to start (page will refresh)
2. You'll see a **"Building..."** status
3. Watch the real-time logs at the bottom:
   - ✅ Looks for `npm ci` installation
   - ✅ Looks for dependency resolution
   - ✅ Looks for `npm start` command
   - ✅ Looks for `✓ MongoDB connected`
   - ✅ Looks for `🚀 Server running on port`

### 4.3 Wait for Success
**Expected time:** 2-5 minutes

When successful, you'll see:
```
✓ MongoDB connected successfully
🚀 Server running on port 5000
Environment: production
```

---

## 🔗 STEP 5: Get Your Backend URL (1 minute)

### 5.1 Find the URL
1. Once deployment succeeds, look at the top of the Render page
2. You'll see a URL like: **`https://resume-maker-backend.onrender.com`**
3. **Copy this URL** (you'll need it for frontend)

### 5.2 Test the Backend
Open in your browser:
```
https://resume-maker-backend.onrender.com/api/health
```

**Expected response:**
```json
{"status":"Server running"}
```

---

## ✅ STEP 6: Verify API Endpoints (5 minutes)

Test using the Render-generated URL:

### Test 1: Health Check
```bash
curl https://resume-maker-backend.onrender.com/api/health
```

### Test 2: Signup
```bash
curl -X POST https://resume-maker-backend.onrender.com/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "testrender@example.com",
    "password": "password123"
  }'
```

**Expected Response:**
```json
{
  "message": "User created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "email": "testrender@example.com",
    "name": "Test User"
  }
}
```

### Test 3: Login
```bash
curl -X POST https://resume-maker-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testrender@example.com",
    "password": "password123"
  }'
```

**Expected Response:** Same structure as signup with JWT token

---

## 🚨 TROUBLESHOOTING

### Issue: Deployment fails during build
**Solution:**
1. Go to Render Dashboard
2. Click on your web service
3. Look at the build logs (red text)
4. Common issues:
   - Missing `MONGODB_URI` → Check environment variables
   - Missing `JWT_SECRET` → Add to environment variables
   - Package conflicts → Delete `package-lock.json` locally, commit, push

### Issue: "MongoDB connection failed" error
**Solution:**
1. Check `MONGODB_URI` value is correct (copy-paste from above)
2. Verify MongoDB Atlas allows Render IP (it should - it's set to allow all IPs)
3. Wait 2 minutes and redeploy (Render → Settings → "Redeploy latest commit")

### Issue: "Cannot connect to backend" from frontend
**Solution:**
1. Check health endpoint works: `https://your-url/api/health`
2. Verify `FRONTEND_URL` environment variable is set in Render (for CORS)
3. Wait for both frontend and backend code to be updated

### Issue: Logs show "Port already in use"
**Solution:**
1. Render automatically assigns ports - no action needed
2. The PORT env var is just a reference
3. Check the actual runtime port assignment in logs

---

## 📌 NEXT STEPS

After successful Render deployment:

1. **Get Your Backend URL** from Render (e.g., `https://resume-maker-backend.onrender.com`)
2. **Update Frontend** with backend URL
3. **Deploy Frontend to Vercel** using this backend URL
4. **Test full integration** (signup → login → create resume)

---

## 💾 Quick Reference URLs

| Service | Status | URL |
|---------|--------|-----|
| **GitHub** | ✅ Deployed | https://github.com/Siri-2256/Resume-Maker |
| **MongoDB** | ✅ Connected | Atlas cluster (internal) |
| **Render Backend** | 🔄 Deploying | `https://resume-maker-backend.onrender.com` |
| **Vercel Frontend** | ⏳ Next | TBD after backend URL confirmed |

---

## 🎯 Success Criteria

✅ Backend running on Render  
✅ All 3 API tests passing (health, signup, login)  
✅ MongoDB successfully connected  
✅ No error logs in Render dashboard  
✅ JWT tokens being generated successfully  

**Once all above are confirmed, frontend deployment will be straight-forward!**
