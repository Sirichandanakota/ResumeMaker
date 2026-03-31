# 🚀 DEPLOYMENT SECRETS & ENVIRONMENT VARIABLES

This document explains what environment variables to set on each deployment platform.

---

## 📋 RENDER.COM (BACKEND DEPLOYMENT)

### What to Set on Render:

Go to **Render Dashboard** → Your Service → **Environment**

| Variable | Value | Notes |
|----------|-------|-------|
| `MONGODB_URI` | `mongodb+srv://kotasirichandana7:chandana2082@resumemaker.myex2ke.mongodb.net/resumemaker` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | Generate a random string (e.g., `abc123xyz789...`) | **IMPORTANT: Change this in production** |
| `PORT` | `5000` | Render will override this automatically |
| `NODE_ENV` | `production` | Tells Node.js to run in production mode |
| `FRONTEND_URL` | `https://resume-maker.netlify.app` | Your Netlify frontend URL (for CORS) |

### After Setting Variables:
1. Click "Save"
2. Render will auto-deploy with new variables
3. Backend should be running at: `https://resume-maker-backend.onrender.com`
4. Copy this URL for Netlify deployment

---

## 🌐 NETLIFY.COM (FRONTEND DEPLOYMENT)

### What to Set on Netlify:

Go to **Netlify Dashboard** → Your Site → **Site settings** → **Build & deploy** → **Environment**

| Variable | Value | Notes |
|----------|-------|-------|
| `NODE_OPTIONS` | `--max_old_space_size=4096` | Fixes OOM build errors |
| `NODE_ENV` | `production` | Production build |
| `VITE_API_URL` | `https://resume-maker-backend.onrender.com` | Your Render backend URL |

### Settings to Check:

- **Base directory:** `FRONTEND`
- **Build command:** `npm run build`
- **Publish directory:** `dist`

### After Setting Variables:
1. Click "Save"
2. Netlify triggers automatic rebuild
3. Wait 2-3 minutes for deployment
4. Frontend should be live at: `https://resume-maker.netlify.app`

---

## 🔐 MONGODB ATLAS (DATABASE)

### Current Setup:
```
URI: mongodb+srv://kotasirichandana7:chandana2082@resumemaker.myex2ke.mongodb.net/resumemaker
Status: ✅ Already configured
Collections: users (auto-created on first signup)
```

### To Grant Access:
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click **Network Access**
3. Whitelist IP: `0.0.0.0/0` (allows all IPs - use specific IP in production)
4. Database User: `kotasirichandana7` (password: `chandana2082`)

---

## 🎯 LOCAL DEVELOPMENT

### Backend (.env in BACKEND folder):
```
MONGODB_URI=mongodb+srv://kotasirichandana7:chandana2082@resumemaker.myex2ke.mongodb.net/resumemaker
JWT_SECRET=dev_secret_key
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local in FRONTEND folder):
```
VITE_API_URL=http://localhost:5000
```

---

## ✅ DEPLOYMENT CHECKLIST

### Before Pushing to GitHub:
- [ ] `.env` files are in `.gitignore` (not committed)
- [ ] `.env.example` files exist (documentation only)
- [ ] `netlify.toml` has all environment variables
- [ ] `render.yaml` has all environment variables

### On Render:
- [ ] Service created and connected to GitHub
- [ ] All 5 environment variables added
- [ ] Auto-deploy enabled
- [ ] Service is running (green status)
- [ ] `/api/health` returns status ✅

### On Netlify:
- [ ] Site connected to GitHub Resume-Maker repo
- [ ] Base directory set to `FRONTEND`
- [ ] All 3 environment variables added
- [ ] Build passes (no exit code 137)
- [ ] Site is deployed (green status)

### Test:
- [ ] Navigate to frontend URL
- [ ] Sign up creates user in MongoDB ✅
- [ ] Sign in returns JWT token ✅
- [ ] localStorage shows token & user data ✅

---

## 🔑 IMPORTANT SECURITY NOTES

### Production Use:
1. **Change JWT_SECRET** - Generate a long random string (minimum 32 characters)
   ```bash
   # On Windows PowerShell
   [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((New-Guid).ToString())) | % {$_.Substring(0, 32)}
   ```

2. **Restrict MongoDB Access** - Use specific IP addresses instead of `0.0.0.0/0`

3. **Use HTTPS** - Both Render and Netlify provide free HTTPS automatically

4. **Sensitive Data** - Never commit `.env` files to GitHub

---

## 🆘 TROUBLESHOOTING

### "Module not found" error on Render:
- Check `.gitignore` - is `node_modules` ignored?
- Run `npm install` locally to ensure `package-lock.json` exists
- Commit `package-lock.json` to GitHub

### "Exit code 137" on Netlify:
- Already fixed in `netlify.toml` with `NODE_OPTIONS`
- If still failing, check FRONTEND folder structure exists

### "CORS error" when signing up/logging in:
- Check `FRONTEND_URL` on Render matches your Netlify URL
- Check `VITE_API_URL` on Netlify matches your Render URL

### MongoDB connection fails:
- Verify Montreal IP is whitelisted in MongoDB Atlas
- Check connection string is correct (copy from MongoDB Atlas)
- Ensure database user has correct permissions

---

## 📞 HELP

If deployment fails:
1. Check the **Build Logs** on Render/Netlify
2. Look for specific error messages
3. Update environment variables if URL changed
4. Commit changes and re-trigger deploy

**Last Updated:** March 31, 2026
