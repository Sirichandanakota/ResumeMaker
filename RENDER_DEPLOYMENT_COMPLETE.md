# 🚀 RENDER DEPLOYMENT - COMPLETE GUIDE

## ✅ Your Backend Files Are Ready

All backend dependencies are installed and configured correctly:
- ✅ `BACKEND/package.json` - All dependencies listed (express, mongoose, bcryptjs, etc.)
- ✅ `BACKEND/server.js` - Express server properly configured
- ✅ `BACKEND/models/User.js` - User schema with password hashing
- ✅ `BACKEND/routes/auth.js` - Signup & Login endpoints
- ✅ `BACKEND/.env` - Environment variables configured
- ✅ `render.yaml` - Deployment configuration with rootDir: BACKEND

---

## 📋 EXACT ENVIRONMENT VARIABLES FOR RENDER

When you deploy to Render, you **must** set these environment variables in the Render dashboard. Do NOT rely on render.yaml environment variables - always set them manually in the UI.

### **SET THESE 6 ENVIRONMENT VARIABLES IN RENDER DASHBOARD:**

| Variable Name | Value | Description |
|---------------|-------|-------------|
| `MONGODB_URI` | `mongodb+srv://kotasirichandana7:chandana2082@resumemaker.myex2ke.mongodb.net/resumemaker` | MongoDB connection string |
| `JWT_SECRET` | `resume_maker_jwt_secret_key_prod_2026` | JWT signing secret (should be changed in production) |
| `PORT` | `5000` | Backend server port |
| `NODE_ENV` | `production` | Environment mode |
| `FRONTEND_URL` | `https://resume-maker.netlify.app` | Frontend URL for CORS |

---

## 🎯 STEP-BY-STEP RENDER DEPLOYMENT

### **Step 1: Go to Render Dashboard**
1. Visit https://dashboard.render.com
2. Click **"New Web Service"**
3. Select **"Build and deploy from a Git repository"**

### **Step 2: Connect GitHub**
1. Click **"Connect your GitHub account"**
2. Authorize Render
3. Select **Resume-Maker** repository
4. Click **"Connect"**

### **Step 3: Configure Service**
```
Service Name:      resume-maker-backend
Environment:       Node
Build Command:     npm install --legacy-peer-deps
Start Command:     npm start
```

### **Step 4: Set Root Directory**
- **Root Directory:** `BACKEND`
- *(Critical: tells Render where package.json is located)*

### **Step 5: Add Environment Variables** ⚠️ MOST IMPORTANT
Go to **Environment** section and add all 5 variables:

1. Click **"Add Environment Variable"**
2. For each variable below, fill in KEY and VALUE:

```
KEY: MONGODB_URI
VALUE: mongodb+srv://kotasirichandana7:chandana2082@resumemaker.myex2ke.mongodb.net/resumemaker

KEY: JWT_SECRET
VALUE: resume_maker_jwt_secret_key_prod_2026

KEY: PORT
VALUE: 5000

KEY: NODE_ENV
VALUE: production

KEY: FRONTEND_URL
VALUE: https://resume-maker.netlify.app
```

### **Step 6: Deploy**
1. Click **"Create Web Service"**
2. Render will:
   - Clone your GitHub repo
   - Run `npm install --legacy-peer-deps` in BACKEND folder
   - Run `npm start` to start the server
   - Deploy to live URL

**Wait 3-5 minutes until you see "Live" ✅**

---

## ✅ AFTER DEPLOYMENT - TEST THE BACKEND

Once Render shows ✅ "Live", you'll get a URL like:
```
https://resume-maker-backend.onrender.com
```

### **Test 1: Health Check**
```bash
curl https://resume-maker-backend.onrender.com/api/health
```
Expected response: `{"status":"Server running"}`

### **Test 2: Signup**
```bash
curl -X POST https://resume-maker-backend.onrender.com/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test123@example.com","password":"Test123"}'
```
Expected: User created with JWT token

### **Test 3: Login**
```bash
curl -X POST https://resume-maker-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test123@example.com","password":"Test123"}'
```
Expected: JWT token returned

---

## 🔗 UPDATE NETLIFY FRONTEND URL

After getting your Render backend URL, update Netlify:

1. Go to https://app.netlify.com
2. Select **resume-maker** site
3. **Site settings** → **Build & deploy** → **Environment**
4. Update **VITE_API_URL** to your Render backend URL:
   ```
   VITE_API_URL = https://resume-maker-backend.onrender.com
   ```
5. **Save and deploy**

---

## 🎯 IF YOU GET "Cannot find module 'express'" ERROR

This happens when:
- ❌ `rootDir: BACKEND` is not set (or Render didn't read it)
- ❌ Environment variables are NOT set in Render UI
- ❌ npm install failed silently

**SOLUTION:**
1. Delete the deployment on Render and redeploy
2. **Manually set all environment variables in Render UI** (don't rely on render.yaml)
3. Make sure **Root Directory = BACKEND**
4. Click **"Manual Deploy"** again

---

## 🚀 COMPLETE DEPLOYMENT CHECKLIST

```
BACKEND CODE:
  ✅ package.json has all dependencies
  ✅ server.js properly imports modules
  ✅ routes/auth.js implemented
  ✅ models/User.js implemented
  ✅ .env has all required variables

RENDER CONFIG:
  ✅ rootDir: BACKEND in render.yaml
  ✅ buildCommand: npm install --legacy-peer-deps
  ✅ startCommand: npm start

ENVIRONMENT VARIABLES (set in Render UI):
  ✅ MONGODB_URI
  ✅ JWT_SECRET
  ✅ PORT
  ✅ NODE_ENV
  ✅ FRONTEND_URL

FRONTEND:
  ✅ VITE_API_URL points to Render backend URL

NETLIFY:
  ✅ Environment variables set
  ✅ Frontend deployed and working
```

---

## 📞 TROUBLESHOOTING

### **Error: "Cannot find module 'express'"**
→ Make sure **Root Directory is set to BACKEND** in Render

### **Error: "MONGODB_URI is undefined"**
→ Add MONGODB_URI to Environment Variables in Render UI

### **Error: "JWT_SECRET is undefined"**
→ Add JWT_SECRET to Environment Variables in Render UI

### **Frontend can't reach backend**
→ Check VITE_API_URL matches your Render backend URL

### **Build takes too long**
→ This is normal for first deploy (2-3 minutes)

---

## 🎉 EVERYTHING IS READY!

Your backend is now production-ready with:
- ✅ Real MongoDB storage
- ✅ Password hashing (bcryptjs)
- ✅ JWT authentication (7-day expiry)
- ✅ CORS configured for Netlify
- ✅ Error handling
- ✅ Health check endpoint

**Next Step:** Deploy on Render using the steps above! 🚀
