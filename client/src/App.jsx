import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import TemplatesPage from './pages/TemplatesPage';
import ResumeEditor from './pages/ResumeEditor';
import Footer from './components/Footer';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [template, setTemplate] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [userFullName, setUserFullName] = useState('');
  const [userToken, setUserToken] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUserToken(token);
      // Could verify token with API here if needed
      // For now, we just check if token exists
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (email, fullName) => {
    setUserEmail(email);
    setUserFullName(fullName);
    setCurrentPage('templates');
  };

  const handleSignUp = (email, fullName) => {
    setUserEmail(email);
    setUserFullName(fullName);
    setCurrentPage('templates');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserEmail('');
    setUserFullName('');
    setUserToken('');
    setCurrentPage('home');
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const isAuthenticated = !!localStorage.getItem('token');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (currentPage === 'login') {
    return (
      <LoginPage 
        onLogin={handleLogin}
        onSwitchToSignUp={() => setCurrentPage('signup')}
        onBack={() => setCurrentPage('home')}
      />
    );
  }

  if (currentPage === 'signup') {
    return (
      <SignUpPage 
        onSignUp={handleSignUp}
        onSwitchToLogin={() => setCurrentPage('login')}
        onBack={() => setCurrentPage('home')}
      />
    );
  }

  if (currentPage === 'templates') {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <TemplatesPage 
            userEmail={userEmail}
            userName={userFullName ? userFullName.split(' ')[0] : userEmail?.split('@')[0] || 'User'}
            onSelect={(tmpl) => {
              setTemplate(tmpl);
              setCurrentPage('editor');
            }}
            onLogout={handleLogout}
            onBack={() => setCurrentPage('home')}
          />
        </div>
        <Footer />
      </div>
    );
  }

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

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <HomePage 
          userEmail={userEmail}
          onLogout={handleLogout}
          onNavigate={handleNavigate}
        />
      </div>
      <Footer />
    </div>
  );
}
