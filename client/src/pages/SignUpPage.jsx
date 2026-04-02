import React, { useState } from 'react';
import { User, ChevronRight, ArrowLeft, Award } from 'lucide-react';
import { authAPI } from '../services/api';

export default function SignUpPage({ onSignUp, onSwitchToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Fill all fields");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      const res = await authAPI.signup(name, email, password);

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify({ name, email }));

      onSignUp(email, name);

    } catch (err) {
      alert(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-96">

        <div className="flex items-center justify-between mb-6">
          <button type="button" onClick={onSwitchToLogin}>
            <ArrowLeft />
          </button>
          <Award className="text-blue-600" />
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <div className="relative mb-4">
          <User className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Full Name"
            className="w-full pl-10 p-3 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-600 text-white py-3 rounded flex items-center justify-center gap-2">
          Sign Up <ChevronRight size={18} />
        </button>

      </form>

    </div>
  );
}
