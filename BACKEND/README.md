# ResumeMaker Authentication System - Setup Guide

**Status:** ✅ Backend & Frontend authentication system ready for deployment

---

## 📋 What Was Built

### Backend (Node.js + Express)
- ✅ User authentication system with MongoDB
- ✅ Password hashing with bcryptjs
- ✅ JWT token generation (7 days expiry)
- ✅ Signup & Login API routes
- ✅ Error handling for duplicate emails, invalid credentials

### Frontend (React)
- ✅ LoginPage component updated with API integration
- ✅ SignUpPage component updated with API integration
- ✅ JWT token stored in localStorage
- ✅ Real-time error messaging
- ✅ Loading states while authenticating

### Database (MongoDB Atlas)
- ✅ User schema with name, email (unique), hashed password
- ✅ MongoDB URI configured and tested

---

## 🚀 Quick Start

### Step 1: Install Backend Dependencies

```bash
cd "c:\RESUME MAKER\BACKEND"
npm install
```

**Expected Output:**
```
added XX packages in Xs
```

### Step 2: Start the Backend Server

```bash
npm run dev
```

**Expected Output:**
```
🚀 ResumeMaker Backend running on http://localhost:5000
📊 MongoDB: resumemaker.myex2ke.mongodb.net
🔐 JWT Secret configured

✓ MongoDB connected successfully
```

✅ **Backend is now running!**

### Step 3: Start Your Frontend

In a new terminal, run your existing React frontend (e.g., `npm start` or `npm run dev`)

---

## 🧪 Testing the Authentication

### Test Signup:
1. Go to your app and click **"Sign Up"**
2. Fill in:
   - **Name:** John Doe
   - **Email:** john@example.com
   - **Password:** password123
3. Click **"Sign Up"**
4. Check terminal for logs

**Expected Response:**
```json
{
  "message": "User created successfully",
  "token": "eyJhbGci...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Test Login:
1. Click **"Sign In"**
2. Fill in:
   - **Name:** John Doe
   - **Email:** john@example.com
   - **Password:** password123
3. Click **"Sign In"**

**Expected:** You should be logged in and redirected to the templates page.

### Test Error Handling:
- **Try duplicate email:** Sign up with same email → Should see "User already exists"
- **Try wrong password:** Sign up, then try to login with wrong password → Should see "Invalid credentials"
- **Try invalid email:** Leave email blank → Should see validation error

---

## 📁 Project Structure

```
RESUME MAKER/
├── FRONTEND/
│   └── resume.jsx (Updated with API calls)
│
└── BACKEND/
    ├── server.js (Express server setup)
    ├── .env (Configuration file)
    ├── package.json
    ├── models/
    │   └── User.js (Mongoose schema)
    ├── routes/
    │   └── auth.js (Signup & Login endpoints)
    └── middleware/
        └── auth.js (JWT verification)
```

---

## 🔐 API Endpoints

### Signup
```
POST http://localhost:5000/api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (201):**
```json
{
  "message": "User created successfully",
  "token": "JWT_TOKEN_HERE",
  "user": { "id": "...", "name": "...", "email": "..." }
}
```

**Error Responses:**
- `400` - Missing fields or validation error
- `409` - User already exists
- `500` - Server error

### Login
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "message": "Login successful",
  "token": "JWT_TOKEN_HERE",
  "user": { "id": "...", "name": "...", "email": "..." }
}
```

**Error Responses:**
- `400` - Missing email or password
- `401` - Invalid credentials
- `500` - Server error

---

## 🗂️ MongoDB Atlas Setup (Already Configured)

**Connected Database:** `resumemaker`
**MongoDB URI:** `mongodb+srv://kotasirichandana7:...@resumemaker.myex2ke.mongodb.net/resumemaker`

**Collections Created Automatically:**
- `users` - Stores user accounts with hashed passwords

---

## 🛡️ Security Features

✅ **Password Hashing:** Using bcryptjs (salt rounds: 10)
✅ **JWT Tokens:** 7-day expiration
✅ **Unique Emails:** Cannot duplicate email addresses
✅ **CORS Enabled:** Frontend can communicate with backend
✅ **Password Not Stored:** Passwords excluded from default queries
✅ **Error Handling:** Generic error messages to prevent info leakage

---

## 📝 Environment Variables (.env)

```env
MONGODB_URI=mongodb+srv://kotasirichandana7:chandana2082@resumemaker.myex2ke.mongodb.net/resumemaker
JWT_SECRET=your_jwt_secret_key_change_this_in_production_12345
PORT=5000
NODE_ENV=development
```

**⚠️ For Production:**
1. Change `JWT_SECRET` to a strong random string
2. Set `NODE_ENV=production`
3. Update CORS origins to your deployed frontend URL

---

## 🚀 Deployment Instructions

### Deploy Backend (Example: Heroku/Railway/Vercel)

1. **Update .env for production:**
   ```env
   NODE_ENV=production
   JWT_SECRET=$(openssl rand -hex 32)
   ```

2. **Update frontend API URL:**
   In `resume.jsx`, replace:
   ```javascript
   fetch('http://localhost:5000/api/auth/...')
   ```
   With:
   ```javascript
   fetch('https://your-deployed-backend.com/api/auth/...')
   ```

3. **Deploy backend:**
   ```bash
   # Using Heroku
   heroku create
   heroku config:set JWT_SECRET="your-random-secret"
   git push heroku main
   ```

4. **Deploy frontend:**
   - Build: `npm run build`
   - Deploy to Vercel, Netlify, or your hosting provider

---

## 🐛 Troubleshooting

### Issue: "Cannot find module 'express'"
**Solution:**
```bash
cd BACKEND
npm install
```

### Issue: "MongoDB connection failed"
**Causes:**
- Network not available
- Wrong MongoDB URI
- IP not whitelisted in MongoDB Atlas

**Solution:**
1. Verify internet connection
2. Check .env file has correct URI
3. Go to MongoDB Atlas → Network Access → Allow All (0.0.0.0/0)

### Issue: "Port 5000 already in use"
**Solution:**
```bash
# Kill process on port 5000
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or use different port in .env:
PORT=5001
```

### Issue: "CORS error in frontend"
**Solution:**
Ensure server.js has CORS configured for your frontend URL:
```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'], // Add your URLs
  credentials: true
}));
```

---

## ✅ Checklist Before Going Live

- [ ] Backend server running without errors
- [ ] Frontend connects to backend at port 5000
- [ ] Signup creates new user in MongoDB
- [ ] JWT token stored in localStorage
- [ ] Login retrieves correct user
- [ ] Error messages display properly
- [ ] Passwords are hashed (check MongoDB document)
- [ ] Changed JWT_SECRET for production
- [ ] Updated CORS origins
- [ ] Tested all error scenarios

---

## 📞 Support

If you encounter any issues:
1. Check browser console for error messages
2. Check backend terminal for logs
3. Verify MongoDB connection in .env
4. Ensure backend is running before testing

---

**Created:** March 2026
**Version:** 1.0.0 - Production Ready
