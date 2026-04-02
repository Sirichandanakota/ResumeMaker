import React, { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import TemplatesPage from './pages/TemplatesPage';
import ResumeEditor from './pages/ResumeEditor';
import Footer from './components/Footer';

export default function App() {
  const [currentPage, setCurrentPage] = useState('login'); // ✅ start with login
  const [template, setTemplate] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [userFullName, setUserFullName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Check login from localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const name = localStorage.getItem('name');

    if (token) {
      setUserEmail(email || '');
      setUserFullName(name || '');
      setCurrentPage('templates'); // skip login
    }

    setIsLoading(false);
  }, []);

  // ✅ LOGIN
  const handleLogin = (email, fullName) => {
    localStorage.setItem('token', 'user-token');
    localStorage.setItem('email', email);
    localStorage.setItem('name', fullName);

    setUserEmail(email);
    setUserFullName(fullName);
    setCurrentPage('templates');
  };

  // ✅ SIGNUP
  const handleSignUp = (email, fullName) => {
    localStorage.setItem('token', 'user-token');
    localStorage.setItem('email', email);
    localStorage.setItem('name', fullName);

    setUserEmail(email);
    setUserFullName(fullName);
    setCurrentPage('templates');
  };

  // ✅ LOGOUT
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('name');

    setUserEmail('');
    setUserFullName('');
    setCurrentPage('login');
  };

  // ✅ LOADING SCREEN
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // ✅ LOGIN PAGE
  if (currentPage === 'login') {
    return (
      <LoginPage
        onLogin={handleLogin}
        onSwitchToSignUp={() => setCurrentPage('signup')}
      />
    );
  }

  // ✅ SIGNUP PAGE
  if (currentPage === 'signup') {
    return (
      <SignUpPage
        onSignUp={handleSignUp}
        onSwitchToLogin={() => setCurrentPage('login')}
      />
    );
  }

  // ✅ TEMPLATE PAGE
  if (currentPage === 'templates') {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <TemplatesPage
            userEmail={userEmail}
            userName={
              userFullName
                ? userFullName.split(' ')[0]
                : userEmail?.split('@')[0] || 'User'
            }
            onSelect={(tmpl) => {
              setTemplate(tmpl);
              setCurrentPage('editor');
            }}
            onLogout={handleLogout}
          />
        </div>
        <Footer />
      </div>
    );
  }

  // ✅ EDITOR PAGE
  if (currentPage === 'editor') {
    return (
      <ResumeEditor
        key={template}
        template={template}
        userFullName={userFullName}
        userEmail={userEmail}
        onBack={() => setCurrentPage('templates')}
      />
    );
  }

  // ✅ FALLBACK (never blank)
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1>Loading...</h1>
    </div>
  );
}
