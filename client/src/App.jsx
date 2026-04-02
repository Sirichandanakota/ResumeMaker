import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import TemplatesPage from './pages/TemplatesPage';
import ResumeEditor from './pages/ResumeEditor';

export default function App() {
  const [currentPage, setCurrentPage] = useState('editor'); // direct editor
  const [template, setTemplate] = useState(null);

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

  // RESUME EDITOR (MAIN UI)
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
