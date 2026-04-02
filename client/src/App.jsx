import React from 'react';
import ResumeEditor from './pages/ResumeEditor';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* MAIN EDITOR */}
      <div className="flex-grow">
        <ResumeEditor />
      </div>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}
