# ResumeMaker Deployment Guide

## Overview
This guide covers deploying ResumeMaker to production with:
- **Frontend**: Netlify
- **Backend**: Render.com (or Heroku)
- **Database**: MongoDB Atlas (already configured)

---

## Prerequisites
- GitHub account
- Netlify account (netlify.com)
- Render.com account (render.com) OR Heroku account
- All code pushed to GitHub

---

## Step 1: Push Code to GitHub

### 1.1 Initialize Git (if not already done)
```bash
cd "c:\RESUME MAKER"
git init
git add .
git commit -m "Initial commit: ResumeMaker with MongoDB authentication"
```

### 1.2 Add Remote and Push
```bash
git remote add origin https://github.com/Sirichandanakota/resume-maker.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy Backend to Render.com

### 2.1 Create Render Account & App
1. Go to **render.com** → Sign up (free tier available)
2. Click "New" → "Web Service"
3. Connect your GitHub repo (Sirichandanakota/resume-maker)
4. Choose: Publish directory: `BACKEND` (or configure build command)

### 2.2 Configure Backend
```
Name: resume-maker-backend
Environment: Node
Build Command: npm install
Start Command: npm start
```

### 2.3 Set Environment Variables
In Render dashboard → "Environment":
```
MONGODB_URI=mongodb+srv://kotasirichandana7:chandana2082@resumemaker.myex2ke.mongodb.net/resumemaker
JWT_SECRET=your-super-secret-key-change-this!
NODE_ENV=production
```

### 2.4 Deploy
- Click "Deploy"
- Wait 5-10 minutes
- Get your URL: `https://resume-maker-backend.onrender.com`

---

## Step 3: Deploy Frontend to Netlify

### 3.1 Create Netlify Account & App
1. Go to **netlify.com** → Sign up
2. Click "Add new site" → "Import an existing project"
3. Connect GitHub → Select `Sirichandanakota/resume-maker`

### 3.2 Configure Build
```
Build Command: cd FRONTEND && npm run build
Publish Directory: FRONTEND/dist
```

### 3.3 Set Environment Variables
In Netlify dashboard → "Site settings" → "Build & deploy" → "Environment":
```
VITE_API_URL=https://resume-maker-backend.onrender.com
```

### 3.4 Deploy
- Netlify auto-deploys on push to `main`
- Get your URL: `https://resume-maker.netlify.app` (or custom domain)

---

## Step 4: Verify Deployment

### 4.1 Test Backend Health
```bash
curl https://resume-maker-backend.onrender.com/api/health
# Should return: {"status":"Server running"}
```

### 4.2 Test Signup (from Frontend)
1. Open **https://resume-maker.netlify.app**
2. Click "Sign Up"
3. Enter: Name, Email, Password
4. Should see: "Signup successful" ✅

### 4.3 Test Login
1. Click "Sign In"
2. Enter same email & password
3. Should redirect to templates ✅
4. JWT token stored in localStorage

---

## Step 5: Update CORS in Backend

If you get CORS errors:

### 5.1 Update `BACKEND/server.js`
```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://resume-maker.netlify.app',
    'https://your-custom-domain.com'
  ],
  credentials: true
}));
```

### 5.2 Deploy
```bash
git add .
git commit -m "Update CORS for production"
git push
```

---

## Step 6: Troubleshooting

### Issue: "Failed to fetch" on signup/login
**Solution:**
- Check backend URL in `FRONTEND/resume.jsx` OR use env variable
- Verify backend is running: `https://resume-maker-backend.onrender.com/api/health`
- Check CORS origins in `BACKEND/server.js`

### Issue: MongoDB connection failed
**Solution:**
- Verify `MONGODB_URI` in Render environment variables
- Check MongoDB Atlas IP whitelist (add 0.0.0.0/0 for Render)
- Test connection: Use MongoDB Compass with same URI

### Issue: JWT token not working
**Solution:**
- JWT_SECRET must be same on all instances
- Check localStorage in browser DevTools
- Token expires in 7 days

---

## Step 7: Custom Domain (Optional)

### 7.1 Netlify Custom Domain
1. Netlify dashboard → "Domain settings"
2. Add custom domain (e.g., resumemaker.io)
3. Update DNS records as instructed

### 7.2 Update Backend CORS
```javascript
'https://resumemaker.io'
```

---

## Production Checklist

- [ ] GitHub repo created and code pushed
- [ ] Backend deployed to Render (or Heroku)
- [ ] Frontend deployed to Netlify
- [ ] Environment variables configured
- [ ] MongoDB Atlas working
- [ ] CORS configured for production URLs
- [ ] Signup tested and working
- [ ] Login tested and working
- [ ] JWT tokens stored in localStorage
- [ ] Custom domain (optional)

---

## MongoDB Connection Details

**Current Setup:**
- **Host**: resumemaker.myex2ke.mongodb.net
- **Database**: resumemaker
- **User**: kotasirichandana7
- **Status**: ✅ Active & Connected

No additional setup needed! Your MongoDB Atlas already has:
- ✅ User collection
- ✅ Password hashing
- ✅ Indexes for email uniqueness
- ✅ Proper security rules

---

## API Endpoints (Deployed)

```
Signup: POST https://resume-maker-backend.onrender.com/api/auth/signup
Login: POST https://resume-maker-backend.onrender.com/api/auth/login
Health: GET https://resume-maker-backend.onrender.com/api/health
```

---

## Next Steps

After deployment:
1. Share **https://resume-maker.netlify.app** with others
2. Users can sign up and create resumes
3. All data stored in MongoDB Atlas
4. Consider adding:
   - Password reset functionality
   - Email verification
   - User profiles
   - Resume storage & export

---

## Support

For issues:
1. Check deployment logs (Netlify & Render dashboards)
2. Verify environment variables
3. Test API endpoints with curl/Postman
4. Check browser console for frontend errors
5. Verify MongoDB Atlas connection status

