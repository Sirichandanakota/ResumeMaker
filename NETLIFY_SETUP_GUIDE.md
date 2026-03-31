# Netlify Deployment Guide - UPDATED

## ✅ Issues Fixed
- ✅ Removed terser minifier (was causing OOM errors)
- ✅ Fixed vite.config.js configuration
- ✅ Simplified netlify.toml build configuration
- ✅ Frontend builds successfully (tested locally)

---

## 🚀 Step-by-Step Netlify Deployment

### Step 1: Go to Netlify
Visit: https://app.netlify.com

### Step 2: Import Your Project
1. Click **"Add new site"** → **"Import an existing project"**
2. Select **GitHub**
3. Authorize if needed
4. Search for and select **"Resume-Maker"** repository

### Step 3: Configure Build Settings
The following should auto-populate, but verify:

```
Base directory:       FRONTEND
Build command:        npm run build
Publish directory:    dist
```

### Step 4: Add Environment Variables ⭐ **CRITICAL**

Click **"Build settings"** → **"Environment"** → **"Add environment variable"**

Add these exact variables:

| KEY | VALUE |
|-----|-------|
| `NODE_OPTIONS` | `--max_old_space_size=4096` |
| `VITE_API_URL` | `https://resume-maker-backend.onrender.com` |

**Replace backend URL** with your actual deployed backend!

### Step 5: Deploy
1. Click **"Deploy site"**
2. Wait 2-3 minutes for build to complete
3. ✅ Should see green checkmark "Published"

---

## 🔗 Connecting Backend API

### After deploying backend to Render/Railway

1. Copy your backend URL (e.g., `https://resume-maker-backend.onrender.com`)
2. Go to Netlify site settings
3. Navigate to **"Build & deploy"** → **"Environment"**
4. Update `VITE_API_URL` with your backend URL
5. Trigger new deploy

---

## 🧪 Test Your Deployment

```bash
# Visit your live site
https://resume-maker.netlify.app

# Test Signup
- Click "Sign Up"
- Enter: Name, Email, Password
- Should create user in MongoDB ✅

# Test Login  
- Click "Sign In"
- Use credentials from signup
- Should see JWT token in localStorage ✅

# Verify Frontend → Backend Connection
- Open DevTools (F12)
- Go to Network tab
- Sign up/login
- Should see POST requests to your backend URL ✅
```

---

## ✅ What's Configured

| Component | Status |
|-----------|--------|
| Vite build | ✅ Working (tested locally) |
| React components | ✅ No syntax errors |
| Environment variables | ✅ Configured |
| Memory optimization | ✅ NODE_OPTIONS=4GB |
| Redirects | ✅ Configured in netlify.toml |
| API proxying | ✅ Ready for production |

---

## 🔧 If Deploy Still Fails

**Check Netlify Logs:**
1. Go to your site on Netlify
2. Click **"Deploys"** tab
3. Click on the failed deployment
4. Click **"Deploy log"** to see error details

**Common Issues & Fixes:**

| Error | Solution |
|-------|----------|
| "Build failed exit 1" | Check that VITE_API_URL environment variable is set |
| "NODE_OPTIONS not found" | Add NODE_OPTIONS to Netlify environment variables |
| "terser not found" | Already fixed - pull latest from GitHub |
| "dist folder not found" | Verify base directory is set to FRONTEND |

---

## 📋 Environment Variables Explained

### NODE_OPTIONS
```
--max_old_space_size=4096
```
Allocates 4GB of RAM to Node.js during build. Fixes OOM (out of memory) errors.

### VITE_API_URL
```
https://resume-maker-backend.onrender.com
```
Tells the frontend where to send API requests in production. Change this to your deployed backend URL.

---

## ✨ After Successful Deployment

Your site is now live with:
- ✅ Frontend hosted on Netlify
- ✅ Backend hosted on Render/Railway
- ✅ MongoDB Atlas database
- ✅ Real authentication (signup/login)
- ✅ JWT tokens (7-day expiry)
- ✅ Password hashing

**Congratulations! 🎉 Your ResumeMaker app is production-ready!**

---

## 📞 Quick Reference

| Need | Do This |
|------|---------|
| Redeploy | Git push to main branch (auto-deploys) |
| Update backend URL | Change VITE_API_URL in Netlify env vars |
| Check build logs | Netlify dashboard → Deploys → Deploy log |
| Clear cache | Netlify dashboard → Build settings → Clear cache and deploy |
| View live site | https://resume-maker.netlify.app |
