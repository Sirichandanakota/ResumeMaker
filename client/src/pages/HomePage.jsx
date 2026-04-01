import React from 'react';
import { FileText, LogOut, User } from 'lucide-react';

export default function HomePage({ userEmail, onLogout, onNavigate }) {
  const handleCreateCV = () => {
    if (userEmail) {
      onNavigate('templates');
    } else {
      onNavigate('login');
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <header className="flex justify-between items-center p-4 sm:p-6 bg-white border-b border-gray-100 z-20">
        <div className="flex items-center gap-2 text-blue-800 font-bold text-2xl tracking-tight cursor-pointer">
          <FileText size={28} className="text-blue-500" /> ResumeMaker
        </div>
        <div className="flex items-center gap-4">
          {userEmail ? (
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="hidden md:flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center border border-blue-200">
                  <User size={16} className="text-blue-600" />
                </div>
                <span className="text-sm font-bold text-gray-700">{userEmail}</span>
              </div>
              <button 
                onClick={onLogout} 
                className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm shadow-md"
              >
                <LogOut size={16} /> <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <button onClick={() => onNavigate('signup')} className="font-bold text-gray-700 hover:text-blue-600 transition-colors">Sign Up</button>
              <button onClick={() => onNavigate('login')} className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-700 transition-colors shadow-md">Sign In</button>
            </div>
          )}
        </div>
      </header>
      
      <main className="flex-1 flex flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto px-6 py-12 gap-16 overflow-hidden">
        <div className="lg:w-1/2 space-y-6 z-10 text-center lg:text-left">
          <h2 className="text-blue-700 font-bold text-xl tracking-wide uppercase">Fast. Easy. Effective.</h2>
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight">
            ResumeMaker. The Best CV Maker Online.
          </h1>
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
            Build a professional, eye-catching resume from scratch in minutes. Let ResumeMaker help you present your skills perfectly to land your dream job.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center lg:justify-start">
            <button 
              onClick={handleCreateCV} 
              className="bg-yellow-400 text-yellow-900 font-extrabold px-10 py-4 rounded-full hover:bg-yellow-500 shadow-lg text-lg transition-transform hover:scale-105 active:scale-95 text-center"
            >
              Create new CV
            </button>
          </div>
        </div>
        
        <div className="lg:w-1/2 relative w-full max-w-lg mt-12 lg:mt-0 h-[500px]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-100 rounded-full -z-10 blur-3xl opacity-60 translate-x-20 -translate-y-10"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-100 rounded-full -z-10 blur-3xl opacity-60 -translate-x-10 translate-y-20"></div>
          <div className="text-center text-gray-400">
            <p className="mt-64 text-lg font-semibold">Professional Resume Templates</p>
          </div>
        </div>
      </main>
    </div>
  );
}
