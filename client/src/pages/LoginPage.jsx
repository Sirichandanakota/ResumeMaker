import React, { useState } from 'react';
import { Mail, Lock, User, ChevronRight, ArrowLeft, FileText, Award } from 'lucide-react';
import { authAPI } from '../services/api';

export default function LoginPage({ onLogin, onSwitchToSignUp, onBack }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // ✅ ONLY email + password required
      if (!email || !password) {
        setError('Please enter email and password');
        setLoading(false);
        return;
      }

      // 🔥 CHECK IF USER EXISTS (from signup/local)
      const storedUser = JSON.parse(localStorage.getItem('user'));

      if (!storedUser) {
        setError('You are not registered. Please signup first ❌');
        setLoading(false);
        return;
      }

      if (email !== storedUser.email) {
        setError('User not found ❌');
        setLoading(false);
        return;
      }

      if (password !== storedUser.password) {
        setError('Incorrect password ❌');
        setLoading(false);
        return;
      }

      // ✅ OPTIONAL: API CALL (keep if backend works)
      const response = await authAPI.login(email, password);

      if (!response.data || !response.data.token) {
        throw new Error("Invalid login");
      }

      // ✅ store token
      localStorage.setItem('token', response.data.token);

      // ✅ use stored user name (not input)
      onLogin(email, storedUser.name);

    } catch (err) {
      setError(err.response?.data?.error || 'Login failed ❌');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans bg-white relative">
      <button 
        onClick={onBack} 
        className="absolute top-6 left-6 flex items-center gap-2 text-slate-700 hover:text-blue-600 font-bold z-20 bg-white/80 px-4 py-2 rounded-full shadow-sm backdrop-blur transition-all"
      >
        <ArrowLeft size={18} /> Back to Home
      </button>

      <div className="hidden lg:flex w-1/2 bg-blue-600 items-center justify-center relative overflow-hidden">
        <div className="z-10 text-white text-center px-12">
          <FileText size={80} className="mx-auto mb-6 text-blue-200" />
          <h2 className="text-4xl font-extrabold mb-4">ResumeMaker</h2>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50">
        <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-100">

          <h1 className="text-3xl font-extrabold text-slate-900 mb-6 text-center">
            Welcome Back
          </h1>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* KEEP NAME FIELD UI BUT NOT USED */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
                Full Name (Optional)
              </label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="w-full p-3.5 border border-slate-300 rounded-xl"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
                Email Address
              </label>
              <input 
                type="email" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full p-3.5 border border-slate-300 rounded-xl"
                placeholder="username@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
                Password
              </label>
              <input 
                type="password" 
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full p-3.5 border border-slate-300 rounded-xl"
                placeholder="Enter Password"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 text-white py-4 rounded-xl flex items-center justify-center gap-2"
            >
              {loading ? 'Signing In...' : 'Sign In'} {!loading && <ChevronRight size={20} />}
            </button>

          </form>
          
          <div className="mt-6 text-center text-sm">
            Don't have an account? 
            <button onClick={onSwitchToSignUp} className="text-blue-600 ml-1 font-bold">
              Sign Up
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
