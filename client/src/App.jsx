import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import TemplatesPage from './pages/TemplatesPage';
import ResumeEditor from './pages/ResumeEditor';
import Footer from './components/Footer';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [template, setTemplate] = useState(null);

  // LANDING PAGE (YOUR SCREENSHOT UI)
  if (currentPage === 'landing') {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-white">
        
        {/* NAVBAR */}
        <header className="flex justify-between items-center px-10 py-6">
          <h1 className="text-xl font-bold text-blue-700">ResumeMaker</h1>
          <div className="space-x-4">
            <button onClick={() => setCurrentPage('signup')} className="text-gray-600 font-semibold">
              Sign Up
            </button>
            <button onClick={() => setCurrentPage('login')} className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold">
              Sign In
            </button>
          </div>
        </header>

        {/* HERO */}
        <div className="flex flex-col md:flex-row items-center justify-between px-10 py-16">
          
          <div className="max-w-xl">
            <p className="text-blue-600 font-bold mb-3">
              FAST. EASY. EFFECTIVE.
            </p>

            <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
              ResumeMaker. The Best CV Maker Online.
            </h1>

            <p className="text-gray-600 mb-8">
              Create your Resume in 5min, and download in Word DOC.
            </p>

            <button
              onClick={() => setCurrentPage('templates')}
              className="bg-yellow-400 hover:bg-yellow-500 px-8 py-4 rounded-full font-bold shadow-md"
            >
              Create new CV
            </button>
          </div>

          <img
            src="https://images.unsplash.com/photo-1586281380349-632531db7ed4"
            className="w-[400px] mt-10 md:mt-0"
          />
        </div>

        <Footer />
      </div>
    );
  }

  // LOGIN
  if (currentPage === 'login') {
    return (
      <LoginPage
        onLogin={() => setCurrentPage('templates')}
        onSwitchToSignUp={() => setCurrentPage('signup')}
      />
    );
  }

  // SIGNUP
  if (currentPage === 'signup') {
    return (
      <SignUpPage
        onSignUp={() => setCurrentPage('templates')}
        onSwitchToLogin={() => setCurrentPage('login')}
      />
    );
  }

  // TEMPLATES
  if (currentPage === 'templates') {
    return (
      <TemplatesPage
        onSelect={(tmpl) => {
          setTemplate(tmpl);
          setCurrentPage('editor');
        }}
      />
    );
  }

  // EDITOR
  if (currentPage === 'editor') {
    return (
      <ResumeEditor
        template={template}
        onBack={() => setCurrentPage('templates')}
      />
    );
  }

  return null;
}
