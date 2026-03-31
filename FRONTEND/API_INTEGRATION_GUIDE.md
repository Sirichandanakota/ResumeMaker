# ResumeMaker Frontend - API Integration Summary

## ✅ What Changed

Your **LoginPage** and **SignUpPage** components now make real API calls to the backend instead of using fake authentication.

---

## 📡 API Integration

### LoginPage Component

**Before:**
```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  if (email && password && name) onLogin(email, name);
};
```

**After:** 
- Makes POST request to `http://localhost:5000/api/auth/login`
- Sends email and password
- Stores JWT token in localStorage
- Shows error messages if authentication fails
- Displays loading state during submission

**Error Messages Displayed:**
- "Invalid credentials" - Wrong email or password
- "Server error" - Backend not running
- Any custom error from backend

### SignUpPage Component

**Before:**
```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  if (email && password && name) onSignUp(email, name);
};
```

**After:**
- Makes POST request to `http://localhost:5000/api/auth/signup`
- Sends name, email, and password
- Stores JWT token in localStorage
- Shows error messages if signup fails
- Prevents duplicate account creation

**Error Messages Displayed:**
- "User already exists" - Email already registered
- "Server error" - Backend not running
- Validation errors from backend

---

## 🔑 localStorage Updates

When user logs in or signs up, these values are stored:
```javascript
localStorage.setItem('token', data.token);          // JWT token (7 days)
localStorage.setItem('userEmail', data.user.email); // User email
localStorage.setItem('userName', data.user.name);   // User full name
```

**To access later:**
```javascript
const token = localStorage.getItem('token');
const email = localStorage.getItem('userEmail');
const name = localStorage.getItem('userName');
```

---

## 🚀 How to Use

### 1. Start Backend
```bash
cd BACKEND
npm install
npm run dev
```

### 2. Start Frontend
```bash
npm start  # or npm run dev (depending on your setup)
```

### 3. Test Sign Up
- Visit your app
- Click "Sign Up"
- Fill in name, email, password
- Backend validates and stores in MongoDB
- User redirected to templates

### 4. Test Log In
- Click "Sign In"
- Enter email and password
- Backend verifies credentials
- JWT token stored and user logged in

---

## 🔧 Configuration

**Backend URL (Currently):**
```javascript
'http://localhost:5000/api/auth/...'
```

**To Change Port:**
1. Edit `BACKEND/.env`
2. Change `PORT=5000` to your port
3. Update all fetch URLs in resume.jsx

**For Production:**
Replace `http://localhost:5000` with your deployed backend URL:
```javascript
'https://your-api.com/api/auth/...'
```

---

## 📦 UI Improvements Added

✅ **Error Messages** - Red box shows specific errors
✅ **Loading State** - Button says "Signing In..." or "Creating Account..."
✅ **Disabled Inputs** - Cannot submit while loading
✅ **Better UX** - User knows something is happening

---

## 🧪 Manual Testing Checklist

### ✅ Sign Up Test
- [ ] Enter valid name, email, password
- [ ] Click Sign Up
- [ ] See "Creating Account..." on button
- [ ] No error - redirected to templates
- [ ] Check MongoDB: user should exist with hashed password

### ✅ Duplicate Email Test
- [ ] Try signing up with same email
- [ ] Should see "User already exists" error
- [ ] Cannot proceed

### ✅ Login Test
- [ ] Click Sign In
- [ ] Enter valid email and password
- [ ] Logged in and redirected

### ✅ Invalid Credentials Test
- [ ] Sign In with wrong password
- [ ] Should see "Invalid credentials" error

### ✅ Server Down Test
- [ ] Stop backend server
- [ ] Try to sign up/login
- [ ] Should see "Server error" message

---

## 💾 localStorage Utility Functions

Add these helpers to manage authentication:

```javascript
// Get auth token
function getAuthToken() {
  return localStorage.getItem('token');
}

// Check if user is authenticated
function isAuthenticated() {
  return !!localStorage.getItem('token');
}

// Get user info
function getUserInfo() {
  return {
    email: localStorage.getItem('userEmail'),
    name: localStorage.getItem('userName'),
    token: localStorage.getItem('token')
  };
}

// Clear auth on logout
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userName');
}
```

---

## 🔐 Security Notes

⚠️ **JWT Tokens:**
- Stored in localStorage (accessible but vulnerable to XSS)
- Expires in 7 days
- Should be sent with `Authorization: Bearer <token>` header for protected endpoints

⚠️ **Passwords:**
- Hashed with bcryptjs on backend
- Never stored in localStorage
- Never logged or exposed

✅ **CORS:**
- Backend allows requests from `localhost:3000`, `localhost:5173`
- Add your frontend URL to CORS in server.js for production

---

## 📞 Common Issues

**Problem:** "Failed to fetch - CORS error"
**Solution:** Backend not running or wrong URL

**Problem:** "User already exists" on first signup
**Solution:** Email already registered - use different email

**Problem:** "Invalid credentials" on login
**Solution:** Email/password mismatch - check spelling

**Problem:** Button keeps showing "Signing In..."
**Solution:** Backend error - check backend terminal logs

---

## 🎯 Next Steps

1. ✅ Install dependencies: `npm install` in BACKEND
2. ✅ Start backend: `npm run dev` in BACKEND
3. ✅ Start frontend: your existing command
4. ✅ Test sign up and login
5. ✅ Verify data in MongoDB Atlas
6. ✅ Add Protected Routes (optional)
7. ✅ Deploy both frontend and backend

---

**Made with ❤️ for ResumeMaker**
