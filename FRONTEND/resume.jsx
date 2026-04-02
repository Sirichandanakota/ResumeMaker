import React, { useState, useEffect, useRef } from 'react';
import { User, Briefcase, Code, Mail, Phone, MapPin, Link2, Award, CheckCircle, Plus, Trash2, FileText, ArrowLeft, Image as ImageIcon, Download, Lock, ChevronRight, GripVertical, Eye, EyeOff, AlertTriangle, LogOut, Undo2, Redo2, X } from 'lucide-react';
 
export default function App() {
  const [authState, setAuthState] = useState('home'); // 'home', 'login', 'signup', 'templates', 'editor'
  const [template, setTemplate] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [userFullName, setUserFullName] = useState('');
  const [userName, setUserName] = useState('');

  if (authState === 'login') {
    return <LoginPage 
      onLogin={(email, fullName) => {
        setUserEmail(email);
        setUserFullName(fullName);
        setUserName(fullName ? fullName.split(' ')[0] : email.split('@')[0]);
        setAuthState('templates'); 
      }} 
      onSwitchToSignUp={() => setAuthState('signup')}
      onBack={() => setAuthState('home')}
    />;
  }

  if (authState === 'signup') {
    return <SignUpPage 
      onSignUp={(email, fullName) => {
        setUserEmail(email);
        setUserFullName(fullName);
        setUserName(fullName ? fullName.split(' ')[0] : email.split('@')[0]);
        setAuthState('templates'); 
      }} 
      onSwitchToLogin={() => setAuthState('login')}
      onBack={() => setAuthState('home')}
    />;
  }

  if (authState === 'home') {
    return <HomePage 
      userEmail={userEmail}
      onLogout={() => {
        setUserEmail('');
        setUserFullName('');
        setUserName('');
        setAuthState('home');
      }}
      onNavigate={(path) => setAuthState(path)}
    />;
  }

  if (authState === 'templates') {
    return <TemplatesPage 
      userEmail={userEmail}
      userName={userName}
      onLogout={() => {
        setUserEmail('');
        setUserFullName('');
        setUserName('');
        setAuthState('login');
      }}
      onSelect={(tmpl) => {
        setTemplate(tmpl);
        setAuthState('editor');
      }} 
      onBack={() => setAuthState('home')}
    />;
  }

  return <ResumeEditor 
    key={template}
    template={template} 
    userFullName={userFullName} 
    userEmail={userEmail} 
    onBack={() => setAuthState('templates')}
  />;
}

// --- UI COMPONENTS FOR MOCKUPS (Saves Code Length) ---
const Mockup1Column = () => (
  <div className="absolute inset-0 w-[80%] mx-auto aspect-[1/1.4] bg-white rounded-lg shadow-xl overflow-hidden flex flex-col transform -rotate-6 -translate-x-10 border border-gray-200 hover:rotate-0 hover:z-20 transition-all duration-500 ease-in-out cursor-default">
     <div className="w-full bg-slate-800 p-4 text-center">
        <div className="w-1/2 h-2.5 bg-white rounded mx-auto mb-2"></div>
        <div className="w-3/4 flex justify-center gap-2 mx-auto">
           <div className="w-1/4 h-1.5 bg-slate-500 rounded"></div>
           <div className="w-1/4 h-1.5 bg-slate-500 rounded"></div>
           <div className="w-1/4 h-1.5 bg-slate-500 rounded"></div>
         </div>
     </div>
     <div className="p-5 space-y-5">
        <div>
           <div className="w-1/4 h-2 bg-slate-800 rounded mb-3 border-b border-slate-200 pb-1"></div>
           <div className="space-y-2">
             <div className="flex justify-between">
               <div className="w-1/3 h-1.5 bg-slate-600 rounded"></div>
               <div className="w-1/6 h-1.5 bg-slate-400 rounded"></div>
             </div>
             <div className="w-full h-1 bg-slate-300 rounded"></div>
             <div className="w-5/6 h-1 bg-slate-300 rounded"></div>
           </div>
        </div>
        <div>
           <div className="w-1/4 h-2 bg-slate-800 rounded mb-3 border-b border-slate-200 pb-1"></div>
           <div className="space-y-2">
             <div className="w-full h-1 bg-slate-300 rounded"></div>
             <div className="w-full h-1 bg-slate-300 rounded"></div>
             <div className="w-3/4 h-1 bg-slate-300 rounded"></div>
           </div>
        </div>
     </div>
  </div>
);

const Mockup2Column = () => (
  <div className="absolute inset-0 w-[80%] mx-auto aspect-[1/1.4] bg-white rounded-lg shadow-2xl overflow-hidden flex transform rotate-3 translate-x-10 translate-y-4 border border-gray-200 hover:rotate-0 hover:z-20 transition-all duration-500 ease-in-out cursor-default">
     <div className="w-[35%] bg-slate-800 p-4 flex flex-col gap-4">
        <div className="w-12 h-12 rounded-full bg-slate-400 border-2 border-white mx-auto overflow-hidden shadow-sm">
           <img src="https://i.pravatar.cc/150?img=44" className="w-full h-full object-cover" alt="" />
        </div>
        <div className="text-center">
          <div className="w-full h-2 bg-white/90 rounded mb-2"></div>
          <div className="w-2/3 h-1.5 bg-white/60 rounded mx-auto"></div>
        </div>
        <div className="mt-2 space-y-2">
           <div className="w-full h-1 bg-white/40 rounded"></div>
           <div className="w-5/6 h-1 bg-white/40 rounded"></div>
           <div className="w-4/6 h-1 bg-white/40 rounded"></div>
        </div>
     </div>
     <div className="w-[65%] bg-white p-5 space-y-5">
        <div>
           <div className="w-1/3 h-2 bg-slate-800 rounded mb-3"></div>
           <div className="space-y-2">
             <div className="flex justify-between">
               <div className="w-1/2 h-1.5 bg-slate-600 rounded"></div>
             </div>
             <div className="w-full h-1 bg-slate-300 rounded"></div>
             <div className="w-5/6 h-1 bg-slate-300 rounded"></div>
           </div>
        </div>
        <div>
           <div className="w-1/3 h-2 bg-slate-800 rounded mb-3"></div>
           <div className="space-y-4">
             <div className="space-y-2">
               <div className="w-1/2 h-1.5 bg-slate-600 rounded mb-1"></div>
               <div className="w-full h-1 bg-slate-300 rounded"></div>
               <div className="w-5/6 h-1 bg-slate-300 rounded"></div>
             </div>
             <div className="space-y-2">
               <div className="w-1/2 h-1.5 bg-slate-600 rounded mb-1"></div>
               <div className="w-full h-1 bg-slate-300 rounded"></div>
               <div className="w-4/6 h-1 bg-slate-300 rounded"></div>
             </div>
           </div>
        </div>
     </div>
  </div>
);

const TemplateCard1Column = () => (
  <div className="h-56 bg-slate-100 flex items-center justify-center p-6 border-b border-slate-100">
    <div className="w-full h-full bg-white shadow-sm p-4 space-y-4 flex flex-col border border-gray-300 items-center justify-center rounded-sm overflow-hidden relative">
        <div className="w-full bg-slate-800 p-3 flex flex-col items-center justify-center absolute top-0 left-0 right-0 h-16">
           <div className="w-10 h-10 rounded-full bg-white mb-1 shadow-sm absolute -bottom-5 border-2 border-slate-200"></div>
        </div>
        <div className="w-1/2 h-2 bg-slate-600 rounded mt-8"></div>
        <div className="w-3/4 h-1.5 bg-slate-300 rounded mb-2"></div>
        <div className="w-full border-t border-slate-200 pt-2 space-y-2">
           <div className="w-full h-1.5 bg-slate-200 rounded"></div>
           <div className="w-5/6 h-1.5 bg-slate-200 rounded"></div>
        </div>
    </div>
  </div>
);

const TemplateCard2Column = () => (
  <div className="h-56 bg-slate-100 flex items-center justify-center p-6 border-b border-slate-100">
    <div className="w-full h-full bg-white shadow-sm flex border border-gray-300 rounded-sm overflow-hidden">
      <div className="w-1/3 border-r border-gray-200 bg-slate-800 p-3 space-y-3">
        <div className="w-8 h-8 rounded-full bg-slate-400 mb-2 mx-auto"></div>
        <div className="w-full h-2 bg-slate-200 rounded"></div>
        <div className="w-full h-1.5 bg-slate-400 rounded mt-4"></div>
        <div className="w-5/6 h-1.5 bg-slate-400 rounded"></div>
      </div>
      <div className="w-2/3 p-3 space-y-4">
        <div className="w-1/2 h-3 bg-slate-600 rounded"></div>
        <div className="w-full h-1.5 bg-slate-200 rounded"></div>
        <div className="w-full h-1.5 bg-slate-200 rounded"></div>
        <div className="w-3/4 h-1.5 bg-slate-200 rounded"></div>
      </div>
    </div>
  </div>
);

// --- 1. PROFESSIONAL AUTH PAGES ---
function LoginPage({ onLogin, onSwitchToSignUp, onBack }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password && name) onLogin(email, name);
  };

  return (
    <div className="min-h-screen flex font-sans bg-white relative">
      <button onClick={onBack} className="absolute top-6 left-6 flex items-center gap-2 text-slate-700 hover:text-blue-600 font-bold z-20 bg-white/80 px-4 py-2 rounded-full shadow-sm backdrop-blur transition-all">
         <ArrowLeft size={18} /> Back to Home
      </button>

      {/* Left Decorative Side */}
      <div className="hidden lg:flex w-1/2 bg-blue-600 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        <div className="z-10 text-white text-center px-12">
          <FileText size={80} className="mx-auto mb-6 text-blue-200" />
          <h2 className="text-4xl font-extrabold mb-4">ResumeMaker</h2>
          <p className="text-blue-100 text-lg leading-relaxed">Log in to access your saved templates, continue editing your professional resume, and download the latest versions.</p>
        </div>
      </div>

      {/* Right Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50">
        <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-100">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-100">
              <Lock size={28} className="text-blue-600" />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Welcome Back</h1>
            <p className="text-slate-500 font-medium">Please sign in to your account</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Full Name</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3.5 border border-slate-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium bg-slate-50 focus:bg-white" placeholder="Enter your full name" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Email Address</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3.5 border border-slate-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium bg-slate-50 focus:bg-white" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3.5 border border-slate-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium bg-slate-50 focus:bg-white" placeholder="••••••••" />
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-4 px-4 rounded-xl flex items-center justify-center gap-2 transition-all mt-4 shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5">
              Sign In <ChevronRight size={20} />
            </button>
          </form>
          
          <div className="mt-8 text-center text-sm font-medium text-slate-600">
            Don't have an account? <button onClick={onSwitchToSignUp} className="text-blue-600 font-extrabold hover:text-blue-800 ml-1">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SignUpPage({ onSignUp, onSwitchToLogin, onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password && name) onSignUp(email, name);
  };

  return (
    <div className="min-h-screen flex font-sans bg-white relative">
      <button onClick={onBack} className="absolute top-6 left-6 flex items-center gap-2 text-slate-700 hover:text-blue-600 font-bold z-20 bg-white/80 px-4 py-2 rounded-full shadow-sm backdrop-blur transition-all">
         <ArrowLeft size={18} /> Back to Home
      </button>

      {/* Left Decorative Side */}
      <div className="hidden lg:flex w-1/2 bg-blue-600 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        <div className="z-10 text-white text-center px-12">
          <Award size={80} className="mx-auto mb-6 text-blue-200" />
          <h2 className="text-4xl font-extrabold mb-4">Start Your Journey</h2>
          <p className="text-blue-100 text-lg leading-relaxed">Join ResumeMaker today to craft a modern, eye-catching resume that lands interviews faster.</p>
        </div>
      </div>

      {/* Right Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50">
        <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-100">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-100">
              <User size={28} className="text-blue-600" />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Create an Account</h1>
            <p className="text-slate-500 font-medium">Sign up to start building your professional resume</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Full Name</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3.5 border border-slate-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium bg-slate-50 focus:bg-white" placeholder="Enter your full name" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Email Address</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3.5 border border-slate-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium bg-slate-50 focus:bg-white" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3.5 border border-slate-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium bg-slate-50 focus:bg-white" placeholder="••••••••" />
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-4 px-4 rounded-xl flex items-center justify-center gap-2 transition-all mt-6 shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5">
              Sign Up <ChevronRight size={20} />
            </button>
          </form>
          
          <div className="mt-8 text-center text-sm font-medium text-slate-600">
            Already have an account? <button onClick={onSwitchToLogin} className="text-blue-600 font-extrabold hover:text-blue-800 ml-1">Sign In</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 2. HOME PAGE (Landing) ---
function HomePage({ userEmail, onLogout, onNavigate }) {
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
        <div className="flex items-center gap-2 text-blue-800 font-bold text-2xl tracking-tight cursor-pointer" onClick={() => onNavigate('home')}>
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
              <button onClick={onLogout} className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm shadow-md">
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
            Build a professional, eye-catching resume from scratch in minutes. Let ResumeMaker help you present your skills and experience perfectly to land your dream job.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center lg:justify-start">
            <button onClick={handleCreateCV} className="bg-yellow-400 text-yellow-900 font-extrabold px-10 py-4 rounded-full hover:bg-yellow-500 shadow-lg text-lg transition-transform hover:scale-105 active:scale-95 text-center">
              Create new CV
            </button>
          </div>
        </div>
        
        <div className="lg:w-1/2 relative w-full max-w-lg mt-12 lg:mt-0 h-[500px]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-100 rounded-full -z-10 blur-3xl opacity-60 translate-x-20 -translate-y-10"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-100 rounded-full -z-10 blur-3xl opacity-60 -translate-x-10 translate-y-20"></div>
          <Mockup1Column />
          <Mockup2Column />
        </div>
      </main>
    </div>
  );
}

// --- 3. TEMPLATES SELECTION PAGE ---
function TemplatesPage({ onSelect, userEmail, userName, onLogout, onBack }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #cbd5e1 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-300 rounded-full -z-10 blur-[120px] opacity-30 pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-yellow-200 rounded-full -z-10 blur-[120px] opacity-30 pointer-events-none"></div>

      <header className="bg-white/80 backdrop-blur-md text-slate-800 p-4 sm:p-6 shadow-sm border-b border-gray-200 flex items-center justify-between z-10">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={onBack}>
            <ArrowLeft size={20} className="text-blue-600 hidden sm:block" />
            <FileText size={24} className="text-blue-600 sm:w-7 sm:h-7" />
            <h1 className="text-xl sm:text-2xl font-bold text-blue-900">ResumeMaker</h1>
          </div>
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden md:flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center border border-blue-200">
              <User size={16} className="text-blue-600" />
            </div>
            <span className="text-sm font-medium text-slate-700 truncate max-w-[150px]">{userEmail || 'Guest'}</span>
          </div>
          <button onClick={onLogout} className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm shadow-md">
            <LogOut size={16} /> <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>
      
      <main className="flex-grow flex flex-col items-center p-4 sm:p-8 z-10 relative">
        <div className="w-full max-w-4xl mb-4 flex justify-center md:justify-start">
           {userName && <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Hey, {userName}</h2>}
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900 mb-4 text-center">Choose a Template</h2>
        <p className="text-slate-600 mb-8 sm:mb-12 text-center max-w-2xl text-base sm:text-lg">Select a layout to structure your professional resume.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          {/* Template 1: 2-Column */}
          <div onClick={() => onSelect('2-column')} className="bg-white rounded-2xl shadow-lg border-4 border-blue-300 overflow-hidden cursor-pointer hover:shadow-[0_0_35px_rgba(37,99,235,0.5)] hover:-translate-y-1 transition-all duration-300 group">
            <TemplateCard2Column />
            <div className="p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">Professional 2-Column</h3>
              <p className="text-slate-600 text-sm">Clean, modern two-column layout. Perfect for highlighting skills and experience clearly.</p>
            </div>
          </div>
          
          {/* Template 2: 1-Column */}
          <div onClick={() => onSelect('1-column')} className="bg-white rounded-2xl shadow-lg border-4 border-blue-300 overflow-hidden cursor-pointer hover:shadow-[0_0_35px_rgba(37,99,235,0.5)] hover:-translate-y-1 transition-all duration-300 group">
            <TemplateCard1Column />
            <div className="p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">Creative 1-Column</h3>
              <p className="text-slate-600 text-sm">Standard centralized layout. Great for a classic, narrative-driven resume format.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// --- 4. EDITOR COMPONENT ---
function ResumeEditor({ template, userFullName, userEmail, onBack }) {
  // --- STATE MANAGEMENT ---
  const [pageSelection, setPageSelection] = useState('1'); 
  const [customPageCount, setCustomPageCount] = useState(5);
  const pageCount = pageSelection === 'custom' ? customPageCount : parseInt(pageSelection);

  const [fontSizeNum, setFontSizeNum] = useState(10); 
  const [fontFamily, setFontFamily] = useState("'Times New Roman', serif");
  const [themeColor, setThemeColor] = useState(template === '2-column' ? '#31414e' : '#f8fafc'); 
  const [themeTextColor, setThemeTextColor] = useState(template === '2-column' ? 'white' : 'black'); 
  
  const [headSizeSelection, setHeadSizeSelection] = useState('32'); 
  const [customHeadSize, setCustomHeadSize] = useState(32);
  const [headerAlignment, setHeaderAlignment] = useState('left');
  const [photoAlignment, setPhotoAlignment] = useState('left');
  const [activeSection, setActiveSection] = useState('basic-info');
  
  const activeHeadSize = headSizeSelection === 'custom' ? customHeadSize : Number(headSizeSelection);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const [personalInfo, setPersonalInfo] = useState({
    name: userFullName || 'Rahul Sharma',
    email: userEmail || 'rahul.sharma@example.com',
    phone: '+91 98765 43210',
    location: 'Bangalore, India',
  });

  const [links, setLinks] = useState([
    { id: 1, label: 'LinkedIn', url: 'linkedin.com/in/rahulsharma' }
  ]);

  const [showPhoto, setShowPhoto] = useState(true);
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoFileName, setPhotoFileName] = useState('');
  
  const [summaryContent, setSummaryContent] = useState('Passionate software engineer with 5+ years of experience building scalable web applications and intuitive user interfaces. Highly adept at independent project management, collaborating with cross-functional teams, and driving business growth through technical innovation. Proven track record of delivering high-quality software solutions on time and under budget.');

  // Sections State - Timeline toggle available for all
  const [sections, setSections] = useState([
    { id: 'education', title: 'Education', visible: true, column: 'left', timeline: true },
    { id: 'summary', title: 'Professional Summary', visible: true, column: 'right', timeline: false },
    { id: 'experience', title: 'Experience', visible: true, column: 'right', timeline: true },
    { id: 'projects', title: 'Projects', visible: true, column: 'right', timeline: false },
    { id: 'skills', title: 'Skills', visible: true, column: 'left', timeline: false },
    { id: 'certifications', title: 'Certifications', visible: true, column: 'left', timeline: false },
    { id: 'achievements', title: 'Achievements', visible: true, column: 'left', timeline: false },
    { id: 'custom-default', title: 'Languages / Interests', visible: false, column: 'left', timeline: false }
  ]);

  const [customSectionsData, setCustomSectionsData] = useState({
    'custom-default': {
      title: 'Languages / Interests',
      items: [{ id: 1, title: '', subtitle: '', description: '' }]
    }
  });

  const [education, setEducation] = useState([
    {
      id: 1, degree: 'B.Tech in Computer Science', school: 'National Institute of Technology', from: 'Aug 2023', to: 'May 2027', cgpa: '8.5 / 10'
    }
  ]);

  const [skillsFormat, setSkillsFormat] = useState('categorized');
  const [skillsContent, setSkillsContent] = useState('JavaScript, TypeScript, React, Node.js, Python, SQL, Git');
  const [skillsData, setSkillsData] = useState(() => {
    return [
      { id: 1, category: 'Programming', skills: 'JavaScript, TypeScript, Python, Java' },
      { id: 2, category: 'Frameworks', skills: 'React, Next.js, Node.js, Django' }
    ];
  });

  // Dynamic Experience initialization (Shared Core Default)
  const [experience, setExperience] = useState(() => {
    return [
      {
        id: 1, role: 'Senior Software Engineer', company: 'Tech Solutions Inc.', from: 'Jan 2022', to: 'Present', isBullet: true,
        description: 'Lead a team of 4 developers to build a modern e-commerce platform using React and Next.js, scaling to over 1 million users.\nImproved overall site performance by 40% through advanced code splitting and intelligent lazy loading.\nMentored junior engineers and established comprehensive code review guidelines to ensure maximum maintainability.'
      }
    ];
  });

  // Dynamic Projects initialization (Shared Core Default)
  const [projects, setProjects] = useState(() => {
    const p1 = {
      id: 1, title: 'E-commerce Platform Refactor', tech: 'React, Node.js, MongoDB, Tailwind CSS', isBullet: true,
      description: 'Overhauled the legacy frontend architecture, resulting in a verifiable 25% increase in overall user retention.\nImplemented a highly secure payment gateway and comprehensive user authentication system using industry standards.\nDrastically reduced average page load time from 4s to 1.5s by transitioning to advanced server-side rendering.'
    };
    const p2 = {
      id: 2, title: 'Task Management Application', tech: 'TypeScript, React, Firebase', isBullet: true,
      description: 'Built a real-time, scalable task management tool currently utilized by over 500+ active daily enterprise users.\nEngineered a highly intuitive drag-and-drop Kanban board interface for seamless daily task organization and tracking.\nSuccessfully set up automated CI/CD deployment pipelines using GitHub Actions to guarantee zero-downtime feature releases.'
    };
    const p3 = {
      id: 3, title: 'Portfolio Generator', tech: 'React, Tailwind CSS', isBullet: true,
      description: 'Created a popular open-source portfolio generator that empowers developers to beautifully showcase their personal work.\nIntegrated robust markdown support allowing for incredibly easy and flexible content formatting by the end users.\nAchieved over 1k stars on GitHub within the very first month of its highly anticipated initial public repository release.'
    };

    if (template === '1-column') {
      return [p1, p2]; // Default exactly 2 projects for 1-column layout
    }
    return [p1, p2, p3]; // Default exactly 3 projects for 2-column layout
  });

  const [certifications, setCertifications] = useState(() => {
    return [
      { id: 1, text: 'AWS Certified Solutions Architect' },
      { id: 2, text: 'React Native Specialist Certification' }
    ];
  });

  const [achievements, setAchievements] = useState(() => {
    return [
      { id: 1, text: 'Best Developer Award 2022' },
      { id: 2, text: 'Winner - Global Hackathon 2021' }
    ];
  });

  const [isDownloading, setIsDownloading] = useState(false);
  const previewContainerRef = useRef(null);
  const innerContentRef = useRef(null);

  // --- UNDO / REDO HISTORY STATE ---
  const historyRef = useRef([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const isRestoring = useRef(false);
  const isReadyForHistory = useRef(false);

  // Load from absolutely unified persistent storage so data seamlessly transfers
  useEffect(() => {
    let savedStateObj = null;
    try {
      const saved = localStorage.getItem('ResumeMaker_Shared_Data');
      if (saved) savedStateObj = JSON.parse(saved);
    } catch(e) {}

    if (savedStateObj) {
       restoreState(JSON.stringify(savedStateObj));
       // Override visual style defaults based on the active template to prevent breakage
       if (template === '1-column') {
         setFontSizeNum(10);
         setHeadSizeSelection('0');
         setThemeColor('#f8fafc');
         setThemeTextColor('black');
       } else if (template === '2-column') {
         setFontSizeNum(11);
         setHeadSizeSelection('32');
         setThemeColor('#31414e');
         setThemeTextColor('white');
       }
    } else {
       // First time fresh load defaults
       if (template === '1-column') {
         setFontSizeNum(10);
         setHeadSizeSelection('0');
         setHeaderAlignment('left');
         setPhotoAlignment('left');
         setThemeColor('#f8fafc');
         setThemeTextColor('black');
       } else if (template === '2-column') {
         setFontSizeNum(11);
         setHeadSizeSelection('32');
         setThemeColor('#31414e');
         setThemeTextColor('white');
       }
    }
    
    // Prevent immediate initializations from showing undo button early
    const historyTimer = setTimeout(() => {
       isReadyForHistory.current = true;
    }, 800);
    return () => clearTimeout(historyTimer);
  }, [template]);

  // Push to History Stack & Unified LocalStorage Autosave
  useEffect(() => {
    if (!isReadyForHistory.current) return;
    if (isRestoring.current) {
      isRestoring.current = false;
      return;
    }
    const currentState = JSON.stringify({
      personalInfo, links, showPhoto, photoUrl, photoFileName, sections, customSectionsData,
      education, experience, projects, skillsContent, skillsData, skillsFormat, certifications, achievements, summaryContent,
      pageSelection, customPageCount, fontSizeNum, fontFamily, themeColor, themeTextColor, headSizeSelection, customHeadSize, headerAlignment, photoAlignment
    });

    localStorage.setItem('ResumeMaker_Shared_Data', currentState);

    if (historyIndex >= 0 && historyRef.current[historyIndex] === currentState) {
      return;
    }

    const newHistory = historyRef.current.slice(0, historyIndex + 1);
    newHistory.push(currentState);
    historyRef.current = newHistory;
    setHistoryIndex(newHistory.length - 1);
  }, [personalInfo, links, showPhoto, photoUrl, photoFileName, sections, customSectionsData, education, experience, projects, skillsContent, skillsData, skillsFormat, certifications, achievements, summaryContent, pageSelection, customPageCount, fontSizeNum, fontFamily, themeColor, themeTextColor, headSizeSelection, customHeadSize, headerAlignment, photoAlignment]);

  const undo = () => {
    if (historyIndex > 0) {
      isRestoring.current = true;
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      restoreState(historyRef.current[newIndex]);
    }
  };

  const redo = () => {
    if (historyIndex < historyRef.current.length - 1) {
      isRestoring.current = true;
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      restoreState(historyRef.current[newIndex]);
    }
  };

  const restoreState = (stateStr) => {
    const state = JSON.parse(stateStr);
    setPersonalInfo(state.personalInfo);
    setLinks(state.links);
    setShowPhoto(state.showPhoto);
    setPhotoUrl(state.photoUrl);
    setPhotoFileName(state.photoFileName || '');
    setSections(state.sections);
    setCustomSectionsData(state.customSectionsData);
    setEducation(state.education);
    setExperience(state.experience);
    setProjects(state.projects);
    setSkillsContent(state.skillsContent);
    if(state.skillsData) setSkillsData(state.skillsData);
    if(state.skillsFormat) setSkillsFormat(state.skillsFormat);
    setCertifications(state.certifications);
    setAchievements(state.achievements);
    setSummaryContent(state.summaryContent);
    
    if (state.pageSelection !== undefined) setPageSelection(state.pageSelection);
    if (state.customPageCount !== undefined) setCustomPageCount(state.customPageCount);
    if (state.fontSizeNum !== undefined) setFontSizeNum(state.fontSizeNum);
    if (state.fontFamily !== undefined) setFontFamily(state.fontFamily);
    if (state.themeColor !== undefined) setThemeColor(state.themeColor);
    if (state.themeTextColor !== undefined) setThemeTextColor(state.themeTextColor);
    if (state.headSizeSelection !== undefined) setHeadSizeSelection(state.headSizeSelection);
    if (state.customHeadSize !== undefined) setCustomHeadSize(state.customHeadSize);
    if (state.headerAlignment !== undefined) setHeaderAlignment(state.headerAlignment);
    if (state.photoAlignment !== undefined) setPhotoAlignment(state.photoAlignment);
  };

  // --- OVERFLOW DETECTION ---
  useEffect(() => {
    const checkOverflow = () => {
      if (previewContainerRef.current && innerContentRef.current) {
        const isSpilling = innerContentRef.current.scrollHeight > (previewContainerRef.current.clientHeight + 2);
        setIsOverflowing(isSpilling);
      }
    };
    checkOverflow();
    const observer = new ResizeObserver(checkOverflow);
    if (innerContentRef.current) { observer.observe(innerContentRef.current); }
    return () => observer.disconnect();
  }, [personalInfo, links, education, experience, projects, skillsContent, skillsData, skillsFormat, certifications, achievements, customSectionsData, summaryContent, template, sections, fontSizeNum, fontFamily, pageCount, showPhoto, themeColor, themeTextColor, activeHeadSize, headerAlignment, photoAlignment]);

  // --- HANDLERS ---
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => setPhotoUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleArrayUpdate = (setter, id, field, value) => {
    setter(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  };
  const handleArrayAdd = (setter, defaultObj) => {
    setter(prev => [...prev, { id: Date.now(), ...defaultObj }]);
  };
  const handleArrayRemove = (setter, id) => {
    setter(prev => prev.filter(item => item.id !== id));
  };

  // Custom Sections Management
  const handleAddCustomSection = () => {
    const newId = `custom-${Date.now()}`;
    setCustomSectionsData(prev => ({
      ...prev, [newId]: { title: 'New Custom Section', items: [{ id: Date.now(), title: '', subtitle: '', description: '' }] }
    }));
    setSections(prev => [...prev, { id: newId, title: 'New Custom Section', visible: true, column: 'left', timeline: false }]);
  };
  const updateCustomSectionTitle = (sectionId, newTitle) => {
    setCustomSectionsData(prev => ({ ...prev, [sectionId]: { ...prev[sectionId], title: newTitle } }));
    setSections(prev => prev.map(s => s.id === sectionId ? { ...s, title: newTitle || 'Custom Section' } : s));
  };
  const updateCustomItem = (sectionId, itemId, field, value) => {
    setCustomSectionsData(prev => ({
      ...prev, [sectionId]: { ...prev[sectionId], items: prev[sectionId].items.map(item => item.id === itemId ? { ...item, [field]: value } : item) }
    }));
  };
  const addCustomItem = (sectionId) => {
    setCustomSectionsData(prev => ({
      ...prev, [sectionId]: { ...prev[sectionId], items: [...prev[sectionId].items, { id: Date.now(), title: '', subtitle: '', description: '' }] }
    }));
  };
  const removeCustomItem = (sectionId, itemId) => {
    setCustomSectionsData(prev => ({
      ...prev, [sectionId]: { ...prev[sectionId], items: prev[sectionId].items.filter(item => item.id !== itemId) }
    }));
  };
  const deleteCustomSection = (sectionId) => {
    setSections(prev => prev.filter(s => s.id !== sectionId));
    setCustomSectionsData(prev => { const newData = { ...prev }; delete newData[sectionId]; return newData; });
  };

  // Drag, Drop, and Toggles
  const [draggedIdx, setDraggedIdx] = useState(null);
  const handleDragStart = (e, index) => { setDraggedIdx(index); e.dataTransfer.effectAllowed = 'move'; };
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e, index) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === index) return;
    const newSections = [...sections];
    const draggedSection = newSections[draggedIdx];
    newSections.splice(draggedIdx, 1);
    newSections.splice(index, 0, draggedSection);
    setSections(newSections);
    setDraggedIdx(null);
  };
  const toggleSectionVisibility = (id) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, visible: !s.visible } : s));
  };
  const toggleSectionColumn = (id, col) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, column: col } : s));
  };
  const toggleSectionTimeline = (id) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, timeline: !s.timeline } : s));
  };

  // --- EXACT PDF DOWNLOAD LOGIC ---
  const processPDFPromise = () => {
    return new Promise((resolve, reject) => {
      const element = document.getElementById('resume-preview-content');
      const clone = element.cloneNode(true);
      
      const tempWrapper = document.createElement('div');
      tempWrapper.style.position = 'absolute';
      tempWrapper.style.top = '0';
      tempWrapper.style.left = '0';
      tempWrapper.style.width = '816px'; 
      tempWrapper.style.height = `${pageCount * 1056}px`; 
      tempWrapper.style.zIndex = '-9999';
      tempWrapper.style.backgroundColor = 'white';
      
      clone.style.width = '100%';
      clone.style.height = '100%';
      clone.style.margin = '0';
      
      tempWrapper.appendChild(clone);
      document.body.appendChild(tempWrapper);

      const baseName = personalInfo.name ? personalInfo.name.trim().replace(/\s+/g, '_') : 'User';

      const opt = {
        margin:       0,
        filename:     `${baseName}_Resume.pdf`,
        image:        { type: 'jpeg', quality: 1 },
        html2canvas:  { 
          scale: 2, 
          useCORS: true, 
          logging: false, 
          width: 816, 
          height: pageCount * 1056,
          windowWidth: 816,
          x: 0,
          y: 0,
          scrollX: 0,
          scrollY: 0
        },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      window.html2pdf().set(opt).from(tempWrapper).save().then(() => {
        document.body.removeChild(tempWrapper);
        resolve();
      }).catch(err => {
        console.error(err);
        document.body.removeChild(tempWrapper);
        reject(err);
      });
    });
  };

  const generateExactPDF = async () => {
    setIsDownloading(true);
    if (window.html2pdf) {
      await processPDFPromise();
    } else {
      await new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        script.onload = async () => {
          await processPDFPromise();
          resolve();
        };
        document.body.appendChild(script);
      });
    }
    setIsDownloading(false);
  };

  // --- DYNAMIC FONT STYLING ---
  const sSm = { fontSize: `${Math.max(8, fontSizeNum - 2)}px` };
  const sBase = { fontSize: `${fontSizeNum}px` };
  const sLg = { fontSize: `${fontSizeNum + 2}px` };
  const sXl = { fontSize: `${fontSizeNum + 6}px` };
  const sTitle = { fontSize: `${fontSizeNum + 20}px` };

  // Calculate strict dynamic 1.3-inch picture sizing bound (~125px base)
  const activeHeadSizeNum = Number(activeHeadSize);
  let picSizeValue = 125; 
  if (template === '2-column') {
    picSizeValue = Math.max(50, Math.min(180, (activeHeadSizeNum / 32) * 125));
  } else {
    picSizeValue = Math.max(50, Math.min(180, 125 + (activeHeadSizeNum * 1.3)));
  }
  const picSizeStr = `${picSizeValue}px`;

  // Dynamic Spacing based on Template 
  const sectionMb = template === '1-column' ? 'mb-2' : 'mb-4';
  const titleMb = template === '1-column' ? 'mb-1.5' : 'mb-3';
  const timelineGapMb = template === '1-column' ? 'mb-2' : 'mb-3';
  const timelineGapPb = template === '1-column' ? 'pb-2' : 'pb-3';

  // Focus Styling engine - Removed positioning/zIndex to fix overlap
  const getActiveStyle = (id) => {
    if (activeSection === id) {
      return { outline: '3px solid #0f172a', outlineOffset: '-3px' };
    }
    return {};
  };

  // 2-Column Name Resizer rule
  const getTwoColumnName = (name) => {
    if (!name) return 'Your Name';
    const parts = name.trim().split(/\s+/);
    if (parts.length > 2) {
      return parts.slice(0, 2).join(' ');
    }
    return name;
  };

  const renderDescription = (desc, isBullet, colorClass, baseSizeStyle) => {
    if (!desc) return null;
    if (isBullet !== false) {
      return (
        <ul className="list-disc pl-5 mt-1" style={{...baseSizeStyle, color: colorClass}}>
          {desc.split('\n').filter(line => line.trim()).map((line, i) => (
            <li key={i} className="mb-0.5 leading-relaxed">{line}</li>
          ))}
        </ul>
      );
    }
    return <p style={{...baseSizeStyle, color: colorClass}} className="whitespace-pre-wrap leading-relaxed mt-1">{desc}</p>;
  };

  const renderTimelineItem = (itemContent, itemId, timelineEnabled, mode, gapMb = timelineGapMb, gapPb = timelineGapPb) => {
    const borderColor = mode === 'themed' && themeTextColor === 'white' ? 'rgba(255,255,255,0.3)' : '#e2e8f0';
    const dotColor = mode === 'themed' && themeTextColor === 'white' ? 'white' : '#0f172a';

    if (timelineEnabled) {
      return (
        <div key={itemId} className={`relative pl-4 border-l ${gapPb} last:pb-0`} style={{ borderLeftColor: borderColor }}>
          <div className="absolute w-2 h-2 rounded-full -left-[4.5px] top-1.5" style={{ backgroundColor: dotColor }}></div>
          {itemContent}
        </div>
      );
    }
    return <div key={itemId} className={`${gapMb} last:mb-0`}>{itemContent}</div>;
  };

  // --- RENDER HELPERS FOR PREVIEW ---
  const renderPreviewSection = (sectionId, mode = 'standard') => {
    const hColor = mode === 'themed' && themeTextColor === 'white' ? '#ffffff' : '#0f172a';
    const pColor = mode === 'themed' && themeTextColor === 'white' ? '#f1f5f9' : '#334155';
    const mColor = mode === 'themed' && themeTextColor === 'white' ? '#cbd5e1' : '#64748b';
    const borderColor = mode === 'themed' && themeTextColor === 'white' ? 'rgba(255,255,255,0.3)' : '#e2e8f0';

    const section = sections.find(s => s.id === sectionId);
    if (!section) return null;
    const activeStyle = getActiveStyle(sectionId);

    if (sectionId.startsWith('custom')) {
      const data = customSectionsData[sectionId];
      if (!data) return null;
      const hasContent = data.items.some(i => i.title || i.subtitle || i.description);
      if (!hasContent) return null;

      return (
        <section key={sectionId} className={`${sectionMb} transition-all`} style={activeStyle}>
           <h2 style={{...sXl, color: hColor, borderBottomColor: borderColor }} className={`font-bold ${titleMb} uppercase tracking-wider border-b pb-1`}>
            {data.title || 'Custom Section'}
          </h2>
          <div className="space-y-0">
            {data.items.map(item => (item.title || item.subtitle || item.description) && renderTimelineItem(
              <div key={`custom-item-${item.id}`} className="block">
                {item.title && <h3 style={{...sLg, color: hColor}} className={`font-bold`}>{item.title}</h3>}
                {item.subtitle && <div style={{...sSm, color: pColor}} className={`font-medium mb-1`}>{item.subtitle}</div>}
                {item.description && renderDescription(item.description, item.isBullet, pColor, sBase)}
              </div>,
              item.id, section.timeline, mode
            ))}
          </div>
        </section>
      );
    }

    switch(sectionId) {
      case 'summary':
        return summaryContent && (
          <section key="summary" className={`${sectionMb} transition-all`} style={activeStyle}>
            <h2 style={{...sXl, color: hColor, borderBottomColor: borderColor }} className={`font-bold ${titleMb} uppercase tracking-wider border-b pb-1`}>
              Professional Summary
            </h2>
            {renderTimelineItem(
              <p style={{...sBase, color: pColor}} className={`whitespace-pre-wrap leading-relaxed`}>{summaryContent}</p>,
              'summary-item', section.timeline, mode, 'mb-0', 'pb-0'
            )}
          </section>
        );
      case 'education':
        return education.length > 0 && (
          <section key="education" className={`${sectionMb} transition-all`} style={activeStyle}>
            <h2 style={{...sXl, color: hColor, borderBottomColor: borderColor }} className={`font-bold ${titleMb} uppercase tracking-wider border-b pb-1`}>
              Education
            </h2>
            <div className="space-y-0">
              {education.map(edu => renderTimelineItem(
                <div key={`edu-item-${edu.id}`} className="block">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-0.5">
                    <h3 style={{...sLg, color: hColor}} className={`font-bold`}>{edu.school || 'University Name'}</h3>
                    {template === '1-column' && (
                      <span style={{...sSm, color: mColor}} className={`font-bold whitespace-nowrap ml-auto`}>
                        {edu.from || 'Aug 2023'} - {edu.to || 'May 2027'}
                      </span>
                    )}
                  </div>
                  {template === '2-column' ? (
                     <div style={{...sSm, color: pColor}} className={`font-medium mb-1 uppercase tracking-wide`}>
                        {edu.degree || 'Degree Name'} | <span className="font-bold">{edu.from || 'Aug 2023'} - {edu.to || 'May 2027'}</span>
                     </div>
                  ) : (
                     <div style={{...sBase, color: hColor}} className={`font-medium mb-1`}>{edu.degree || 'Degree Name'}</div>
                  )}
                  {edu.cgpa && <div style={{...sSm, color: pColor}} className={`font-medium`}>Current CGPA: {edu.cgpa}</div>}
                  {renderDescription(edu.description, edu.isBullet, pColor, sBase)}
                </div>,
                edu.id, section.timeline, mode
              ))}
            </div>
          </section>
        );
      case 'experience':
        return experience.length > 0 && (
          <section key="experience" className={`${sectionMb} transition-all`} style={activeStyle}>
            <h2 style={{...sXl, color: hColor, borderBottomColor: borderColor }} className={`font-bold ${titleMb} uppercase tracking-wider border-b pb-1`}>
              Experience
            </h2>
            <div className="space-y-0">
              {experience.map(exp => renderTimelineItem(
                <div key={`exp-item-${exp.id}`} className="block">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-0.5">
                    <h3 style={{...sLg, color: hColor}} className={`font-bold`}>{exp.role || 'Job Role'}</h3>
                    {template === '1-column' && (
                      <span style={{...sSm, color: mColor}} className={`font-bold whitespace-nowrap ml-auto`}>
                        {exp.from} - {exp.to}
                      </span>
                    )}
                  </div>
                  {template === '2-column' ? (
                     <div style={{...sSm, color: pColor}} className={`font-medium mb-1 uppercase tracking-wide`}>
                        {exp.company || 'Company'} | <span className="font-bold">{exp.from} - {exp.to}</span>
                     </div>
                  ) : (
                     <div style={{...sBase, color: hColor}} className={`font-medium mb-1`}>{exp.company || 'Company Name'}</div>
                  )}
                  {renderDescription(exp.description, exp.isBullet, pColor, sBase)}
                </div>,
                exp.id, section.timeline, mode
              ))}
            </div>
          </section>
        );
      case 'projects':
        return projects.length > 0 && (
          <section key="projects" className={`${sectionMb} transition-all`} style={activeStyle}>
            <h2 style={{...sXl, color: hColor, borderBottomColor: borderColor }} className={`font-bold ${titleMb} uppercase tracking-wider border-b pb-1`}>
              Projects
            </h2>
            <div className="space-y-0">
              {projects.map(proj => renderTimelineItem(
                <div key={`proj-item-${proj.id}`} className="block">
                  <h3 style={{...sLg, color: hColor}} className={`font-bold`}>{proj.title || 'Project Title'}</h3>
                  <div style={{...sSm, color: mColor}} className={`font-medium italic mb-1`}>{proj.tech}</div>
                  {renderDescription(proj.description, proj.isBullet, pColor, sBase)}
                </div>,
                proj.id, section.timeline, mode
              ))}
            </div>
          </section>
        );
      case 'skills':
        return (skillsFormat === 'categorized' ? skillsData.length > 0 : skillsContent) && (
          <div key="skills" className={`${sectionMb} transition-all`} style={activeStyle}>
            <h2 style={{...sXl, color: hColor, borderBottomColor: borderColor }} className={`font-bold ${titleMb} uppercase tracking-wider border-b pb-1`}>Skills</h2>
            {renderTimelineItem(
              skillsFormat === 'categorized' ? (
                <div className="space-y-1">
                  {skillsData.map(item => item.category && item.skills && (
                    <div key={`skill-cat-${item.id}`} style={{...sBase, color: pColor}} className="leading-relaxed">
                      <span style={{color: hColor}} className="mr-1 font-bold">{item.category}:</span>
                      {item.skills.split(',').map(s => s.trim()).filter(Boolean).join(' | ')}
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{...sBase, color: pColor}} className={`font-medium leading-relaxed`}>
                  {skillsContent.split(',').map(skill => skill.trim()).filter(Boolean).join(' | ')}
                </div>
              ),
              'skills-list', section.timeline, mode
            )}
          </div>
        );
      case 'certifications':
        return certifications.length > 0 && (
          <div key="certifications" className={`${sectionMb} transition-all`} style={activeStyle}>
            <h2 style={{...sXl, color: hColor, borderBottomColor: borderColor }} className={`font-bold mb-2 uppercase tracking-wider border-b pb-1`}>
              Certifications
            </h2>
            <div className="space-y-0">
              {certifications.map(cert => cert.text && renderTimelineItem(
                <div key={`cert-item-${cert.id}`} style={{...sBase, color: pColor}} className="leading-relaxed">
                  {!section.timeline && <span style={{color: hColor}} className={`mr-2`}>•</span>}
                  {cert.text}
                </div>,
                cert.id, section.timeline, mode, 'mb-1', 'pb-2'
              ))}
            </div>
          </div>
        );
      case 'achievements':
        return achievements.length > 0 && (
          <div key="achievements" className={`${sectionMb} transition-all`} style={activeStyle}>
            <h2 style={{...sXl, color: hColor, borderBottomColor: borderColor }} className={`font-bold mb-2 uppercase tracking-wider border-b pb-1`}>
              Achievements
            </h2>
            <div className="space-y-0">
              {achievements.map(ach => ach.text && renderTimelineItem(
                <div key={`ach-item-${ach.id}`} style={{...sBase, color: pColor}} className="leading-relaxed">
                   {!section.timeline && <span style={{color: hColor}} className={`mr-2`}>•</span>}
                   {ach.text}
                </div>,
                ach.id, section.timeline, mode, 'mb-1', 'pb-2'
              ))}
            </div>
          </div>
        );
      default: return null;
    }
  };

  const renderEditorSection = (sectionId) => {
    if (sectionId.startsWith('custom')) {
      const data = customSectionsData[sectionId];
      if (!data) return null;
      return (
        <div className="space-y-4">
          <div className="flex justify-between items-end mb-4">
            <div className="flex-1 mr-4">
              <label className="block text-sm font-medium text-gray-600 mb-1">Custom Section Title</label>
              <input type="text" value={data.title} onChange={(e) => updateCustomSectionTitle(sectionId, e.target.value)} placeholder="e.g. Languages, Hobbies" className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <button onClick={() => deleteCustomSection(sectionId)} className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors" title="Delete Entire Section">
               <Trash2 size={20} />
            </button>
          </div>
          {data.items.map((item) => (
            <div key={item.id} className="p-4 bg-white border border-gray-200 rounded relative group shadow-sm">
              <button onClick={() => removeCustomItem(sectionId, item.id)} className="absolute top-4 right-4 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
                <Trash2 size={18} />
              </button>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Item Title</label>
                  <input type="text" value={item.title} onChange={(e) => updateCustomItem(sectionId, item.id, 'title', e.target.value)} className="w-full p-2 border border-gray-300 rounded outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Details / Subtitle</label>
                  <input type="text" value={item.subtitle} onChange={(e) => updateCustomItem(sectionId, item.id, 'subtitle', e.target.value)} className="w-full p-2 border border-gray-300 rounded outline-none" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm font-medium text-gray-600">Description (Optional)</label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input type="checkbox" checked={item.isBullet !== false} onChange={(e) => updateCustomItem(sectionId, item.id, 'isBullet', e.target.checked)} className="w-3.5 h-3.5 text-blue-600 rounded focus:ring-blue-500" />
                      <span className="text-xs font-medium text-gray-500">Bullet Points</span>
                    </label>
                  </div>
                  <textarea value={item.description} onChange={(e) => updateCustomItem(sectionId, item.id, 'description', e.target.value)} rows={2} className="w-full p-2 border border-gray-300 rounded outline-none" />
                </div>
              </div>
            </div>
          ))}
          <button onClick={() => addCustomItem(sectionId)} className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium mt-2">
            <Plus size={16} /> Add Item
          </button>
        </div>
      );
    }

    switch(sectionId) {
      case 'summary':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Professional Summary</label>
            <textarea value={summaryContent} onChange={(e) => setSummaryContent(e.target.value)} rows={4} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
          </div>
        );
      case 'education':
        return (
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="p-4 bg-white border border-gray-200 rounded relative group shadow-sm">
                <button onClick={() => handleArrayRemove(setEducation, edu.id)} className="absolute top-4 right-4 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 size={18} />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-600 mb-1">School / University Name</label>
                    <input type="text" value={edu.school} onChange={(e) => handleArrayUpdate(setEducation, edu.id, 'school', e.target.value)} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Degree Name</label>
                    <input type="text" value={edu.degree} onChange={(e) => handleArrayUpdate(setEducation, edu.id, 'degree', e.target.value)} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">From</label>
                    <input type="text" placeholder="e.g. Aug 2023" value={edu.from} onChange={(e) => handleArrayUpdate(setEducation, edu.id, 'from', e.target.value)} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">To</label>
                    <input type="text" placeholder="e.g. May 2027" value={edu.to} onChange={(e) => handleArrayUpdate(setEducation, edu.id, 'to', e.target.value)} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Current CGPA</label>
                    <input type="text" placeholder="e.g. 8.5 / 10" value={edu.cgpa} onChange={(e) => handleArrayUpdate(setEducation, edu.id, 'cgpa', e.target.value)} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                </div>
              </div>
            ))}
            <button onClick={() => handleArrayAdd(setEducation, { degree: '', school: '', from: '', to: '', cgpa: '' })} className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium mt-2">
              <Plus size={16} /> Add Education
            </button>
          </div>
        );
      case 'experience':
        return (
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="p-4 bg-white border border-gray-200 rounded relative group shadow-sm">
                <button onClick={() => handleArrayRemove(setExperience, exp.id)} className="absolute top-4 right-4 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 size={18} />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Job Role</label>
                    <input type="text" value={exp.role} onChange={(e) => handleArrayUpdate(setExperience, exp.id, 'role', e.target.value)} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Company</label>
                    <input type="text" value={exp.company} onChange={(e) => handleArrayUpdate(setExperience, exp.id, 'company', e.target.value)} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">From</label>
                    <input type="text" placeholder="e.g. Nov 2024" value={exp.from} onChange={(e) => handleArrayUpdate(setExperience, exp.id, 'from', e.target.value)} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">To</label>
                    <input type="text" placeholder="e.g. Jan 2026" value={exp.to} onChange={(e) => handleArrayUpdate(setExperience, exp.id, 'to', e.target.value)} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <div className="md:col-span-2">
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-sm font-medium text-gray-600">Description</label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input type="checkbox" checked={exp.isBullet !== false} onChange={(e) => handleArrayUpdate(setExperience, exp.id, 'isBullet', e.target.checked)} className="w-3.5 h-3.5 text-blue-600 rounded focus:ring-blue-500" />
                        <span className="text-xs font-medium text-gray-500">Bullet Points</span>
                      </label>
                    </div>
                    <textarea value={exp.description} onChange={(e) => handleArrayUpdate(setExperience, exp.id, 'description', e.target.value)} rows={3} placeholder="Separate points with a new line (Enter)" className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                </div>
              </div>
            ))}
            <button onClick={() => handleArrayAdd(setExperience, { role: '', company: '', from: '', to: '', description: '', isBullet: true })} className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium mt-2">
              <Plus size={16} /> Add Experience
            </button>
          </div>
        );
      case 'projects':
        return (
          <div className="space-y-4">
            {projects.map((proj) => (
              <div key={proj.id} className="p-4 bg-white border border-gray-200 rounded relative group shadow-sm">
                <button onClick={() => handleArrayRemove(setProjects, proj.id)} className="absolute top-4 right-4 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 size={18} />
                </button>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Project Title</label>
                    <input type="text" value={proj.title} onChange={(e) => handleArrayUpdate(setProjects, proj.id, 'title', e.target.value)} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Technologies Used</label>
                    <input type="text" value={proj.tech} onChange={(e) => handleArrayUpdate(setProjects, proj.id, 'tech', e.target.value)} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-sm font-medium text-gray-600">Description</label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input type="checkbox" checked={proj.isBullet !== false} onChange={(e) => handleArrayUpdate(setProjects, proj.id, 'isBullet', e.target.checked)} className="w-3.5 h-3.5 text-blue-600 rounded focus:ring-blue-500" />
                        <span className="text-xs font-medium text-gray-500">Bullet Points</span>
                      </label>
                    </div>
                    <textarea value={proj.description} onChange={(e) => handleArrayUpdate(setProjects, proj.id, 'description', e.target.value)} rows={2} placeholder="Separate points with a new line (Enter)" className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                </div>
              </div>
            ))}
            <button onClick={() => handleArrayAdd(setProjects, { title: '', tech: '', description: '', isBullet: true })} className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium mt-2">
              <Plus size={16} /> Add Project
            </button>
          </div>
        );
      case 'skills':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-100">
              <label className="block text-sm font-medium text-gray-600">Skills Format</label>
              <select value={skillsFormat} onChange={(e) => setSkillsFormat(e.target.value)} className="p-1 border border-slate-300 rounded text-xs font-medium outline-none bg-white">
                <option value="categorized">Categorized (Recommended)</option>
                <option value="simple">Simple (Comma Separated)</option>
              </select>
            </div>
            
            {skillsFormat === 'categorized' ? (
              <div className="space-y-3">
                {skillsData.map(item => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-3 bg-white p-3 border border-gray-200 rounded relative group shadow-sm">
                    <button onClick={() => handleArrayRemove(setSkillsData, item.id)} className="absolute top-2 right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 size={16} />
                    </button>
                    <div className="w-full sm:w-1/3">
                      <label className="block text-xs font-medium text-gray-500 mb-1">Category</label>
                      <input type="text" value={item.category} onChange={(e) => handleArrayUpdate(setSkillsData, item.id, 'category', e.target.value)} className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="e.g. Programming" />
                    </div>
                    <div className="w-full sm:w-2/3 pr-6">
                      <label className="block text-xs font-medium text-gray-500 mb-1">Skills (comma separated)</label>
                      <input type="text" value={item.skills} onChange={(e) => handleArrayUpdate(setSkillsData, item.id, 'skills', e.target.value)} className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Java, Python, C++" />
                    </div>
                  </div>
                ))}
                <button onClick={() => handleArrayAdd(setSkillsData, { category: '', skills: '' })} className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium mt-2">
                  <Plus size={16} /> Add Category
                </button>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Skills Content</label>
                <textarea value={skillsContent} onChange={(e) => setSkillsContent(e.target.value)} rows={3} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="JavaScript, React, Node.js..." />
              </div>
            )}
          </div>
        );
      case 'certifications':
        return (
          <div className="space-y-2">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex gap-2 items-center bg-white p-2 border border-gray-200 rounded shadow-sm">
                <input type="text" value={cert.text} onChange={(e) => handleArrayUpdate(setCertifications, cert.id, 'text', e.target.value)} className="flex-1 p-1 outline-none" placeholder="Certification Name" />
                <button onClick={() => handleArrayRemove(setCertifications, cert.id)} className="p-1 text-red-400 hover:text-red-600 rounded">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            <button onClick={() => handleArrayAdd(setCertifications, { text: '' })} className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium mt-2">
              <Plus size={16} /> Add Certification
            </button>
          </div>
        );
      case 'achievements':
        return (
          <div className="space-y-2">
            {achievements.map((ach) => (
              <div key={ach.id} className="flex gap-2 items-center bg-white p-2 border border-gray-200 rounded shadow-sm">
                <input type="text" value={ach.text} onChange={(e) => handleArrayUpdate(setAchievements, ach.id, 'text', e.target.value)} className="flex-1 p-1 outline-none" placeholder="Achievement Detail" />
                <button onClick={() => handleArrayRemove(setAchievements, ach.id)} className="p-1 text-red-400 hover:text-red-600 rounded">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            <button onClick={() => handleArrayAdd(setAchievements, { text: '' })} className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium mt-2">
              <Plus size={16} /> Add Achievement
            </button>
          </div>
        );
      default: return null;
    }
  };

  const headHColor = themeTextColor === 'white' ? '#ffffff' : '#0f172a';
  const headPColor = themeTextColor === 'white' ? '#f1f5f9' : '#334155';

  return (
    <div className="flex flex-col lg:flex-row min-h-screen lg:h-screen bg-gray-100 font-sans overflow-auto lg:overflow-hidden text-gray-800">
      
      {/* LEFT PANEL: EDITOR */}
      <div className="w-full lg:w-[45%] h-auto lg:h-screen overflow-y-auto bg-slate-50 border-b lg:border-b-0 lg:border-r border-gray-200 shadow-lg z-10 flex-shrink-0">
        <div className="p-6 bg-slate-800 text-white sticky top-0 z-20 flex items-center justify-between shadow-md">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <FileText size={24} className="text-blue-400" />
              <h1 className="text-xl font-bold">
                ResumeMaker <span className="text-sm font-normal text-slate-300 ml-2">({template === '1-column' ? '1-Column' : '2-Column'})</span>
              </h1>
            </div>
            <button onClick={onBack} className="flex items-center gap-1 text-sm text-slate-300 hover:text-white transition-colors">
              <ArrowLeft size={16} /> Back to Templates
            </button>
          </div>
        </div>
        
        <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
          {/* 1. Basic Information Form */}
          <section 
            className={`bg-white p-4 sm:p-5 rounded-lg border transition-all ${activeSection === 'basic-info' ? 'border-slate-800 ring-1 ring-slate-800 shadow-md' : 'border-gray-200 shadow-sm'}`}
            onClickCapture={() => setActiveSection('basic-info')}
          >
            <h2 className="text-lg font-bold text-slate-800 border-b border-gray-100 pb-3 mb-4">Basic Information</h2>
            
            <div className="bg-slate-50 p-4 border border-slate-200 rounded-lg mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center gap-2 font-medium text-slate-700 cursor-pointer">
                  <input type="checkbox" checked={showPhoto} onChange={(e) => setShowPhoto(e.target.checked)} className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
                  Include Profile Photo
                </label>
                <ImageIcon size={20} className="text-slate-400" />
              </div>
              {showPhoto && (
                <div className="mt-3 pl-4 sm:pl-6 border-l-2 border-slate-200 space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Upload photo</label>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      {!photoUrl ? (
                        <input type="file" accept="image/*" onChange={handlePhotoUpload} className="block w-full text-xs sm:text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors" />
                      ) : (
                        <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 px-3 py-2 rounded-md w-fit">
                          <span className="text-xs text-blue-800 font-medium truncate max-w-[150px]">{photoFileName || 'Profile Photo'}</span>
                          <button onClick={() => { setPhotoUrl(''); setPhotoFileName(''); }} className="text-slate-400 hover:text-red-500 transition-colors">
                            <X size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  {template === '1-column' && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-gray-500">Photo Align:</span>
                      <select 
                        value={photoAlignment} 
                        onChange={(e) => setPhotoAlignment(e.target.value)} 
                        className="p-1 border border-slate-300 rounded text-xs outline-none bg-white"
                      >
                        <option value="left">Left</option>
                        <option value="center">Center</option>
                        <option value="right">Right</option>
                      </select>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div className="md:col-span-2 flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                {template === '1-column' && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-500">Alignment:</span>
                    <select 
                      value={headerAlignment} 
                      onChange={(e) => setHeaderAlignment(e.target.value)} 
                      className="p-1 border border-slate-300 rounded text-xs outline-none bg-white"
                    >
                      <option value="left">Left</option>
                      <option value="center">Center</option>
                    </select>
                  </div>
                )}
              </div>
              <div className="md:col-span-2 mt-[-8px]">
                <input type="text" name="name" value={personalInfo.name} onChange={handlePersonalInfoChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                <input type="email" name="email" value={personalInfo.email} onChange={handlePersonalInfoChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
                <input type="text" name="phone" value={personalInfo.phone} onChange={handlePersonalInfoChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-600 mb-1">Location</label>
                <input type="text" name="location" value={personalInfo.location} onChange={handlePersonalInfoChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
              </div>
            </div>

            <div className="mt-4 border-t border-gray-100 pt-4">
              <label className="block text-sm font-medium text-gray-600 mb-2">Additional Links (LinkedIn, GitHub, Portfolio)</label>
              <div className="space-y-3">
                {links.map(link => (
                  <div key={link.id} className="flex flex-col gap-2 p-3 border border-slate-200 rounded bg-slate-50 shadow-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Link</span>
                      <button onClick={() => handleArrayRemove(setLinks, link.id)} className="text-red-400 hover:text-red-600"><Trash2 size={16} /></button>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                       <input type="text" value={link.label || ''} onChange={(e) => handleArrayUpdate(setLinks, link.id, 'label', e.target.value)} placeholder="Text to appear (e.g. LinkedIn)" className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                       <input type="text" value={link.url} onChange={(e) => handleArrayUpdate(setLinks, link.id, 'url', e.target.value)} placeholder="URL link" className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                    </div>
                  </div>
                ))}
                <button onClick={() => handleArrayAdd(setLinks, { label: '', url: '' })} className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium mt-2"><Plus size={16} /> Add Link</button>
              </div>
            </div>
          </section>

          {/* 2. Draggable Sections Manager */}
          <div className="space-y-4">
            <p className="text-sm text-gray-500 font-medium px-1 flex flex-wrap items-center gap-2">
              <GripVertical size={16} className="shrink-0" /> Drag headers to reorder. Line style or Hide.
              {template === '2-column' && <span className="text-blue-600 font-bold ml-1">L|R toggles column placement.</span>}
            </p>
            {sections.map((section, index) => (
              <div 
                key={section.id} 
                className={`bg-white rounded-lg border transition-all overflow-hidden ${activeSection === section.id ? 'border-slate-800 ring-1 ring-slate-800 shadow-md' : (section.visible ? 'border-blue-200 shadow-sm' : 'border-gray-200 opacity-60')}`}
                onClickCapture={() => setActiveSection(section.id)}
              >
                <div draggable onDragStart={(e) => handleDragStart(e, index)} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, index)} className={`p-3 flex flex-wrap gap-2 items-center justify-between cursor-grab active:cursor-grabbing border-b ${section.visible ? 'bg-blue-50 border-blue-100' : 'bg-gray-50 border-gray-100'}`}>
                  <div className="flex items-center gap-3">
                    <GripVertical size={20} className="text-slate-400" />
                    <h2 className="text-md font-bold text-slate-800">{section.title}</h2>
                  </div>
                  
                  <div className="flex items-center gap-1 shrink-0">
                    {template === '2-column' && (
                      <div className="flex bg-slate-200 rounded p-0.5 mr-2">
                         <button onClick={() => toggleSectionColumn(section.id, 'left')} className={`text-[10px] px-2 py-1 rounded-sm transition-colors ${section.column === 'left' ? 'bg-white font-bold text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>L</button>
                         <button onClick={() => toggleSectionColumn(section.id, 'right')} className={`text-[10px] px-2 py-1 rounded-sm transition-colors ${section.column === 'right' ? 'bg-white font-bold text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>R</button>
                      </div>
                    )}
                    <div className="flex bg-slate-200 rounded p-0.5 mr-2" title="Toggle Timeline Line Style">
                       <button onClick={() => toggleSectionTimeline(section.id)} className={`text-[10px] px-2 py-1 rounded-sm transition-colors ${section.timeline ? 'bg-white font-bold text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Line</button>
                    </div>
                    <button onClick={() => toggleSectionVisibility(section.id)} className={`p-1.5 rounded-md transition-colors ${section.visible ? 'text-blue-600 hover:bg-blue-100' : 'text-gray-500 hover:bg-gray-200'}`} title={section.visible ? "Hide Section" : "Show Section"}>
                      {section.visible ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                  </div>

                </div>
                
                {/* Content Editor */}
                {section.visible && (
                  <div className="p-4 bg-slate-50">
                    {renderEditorSection(section.id)}
                  </div>
                )}
              </div>
            ))}
            
            <button onClick={handleAddCustomSection} className="w-full py-3 mt-4 border-2 border-dashed border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 font-medium flex justify-center items-center gap-2 transition-colors">
               <Plus size={18} /> Add New Custom Section
            </button>
          </div>

        </div>
      </div>

      {/* RIGHT PANEL: LIVE PREVIEW & DOWNLOAD BUTTONS */}
      <div className="w-full lg:w-[55%] h-auto lg:h-screen overflow-y-auto bg-gray-200 p-4 lg:p-8 flex flex-col items-center">
        
        {/* INNER WRAPPER */}
        <div className="w-full max-w-[816px] flex flex-col gap-4 pb-12">
          
          {/* OVERFLOW WARNING BANNER */}
          {isOverflowing && (
             <div className="w-full bg-red-50 border-l-4 border-red-500 p-4 rounded-md shadow-sm flex items-start gap-3 shrink-0">
               <AlertTriangle className="text-red-500 mt-0.5 shrink-0" size={20} />
               <div>
                 <h3 className="text-red-800 font-bold text-sm">Content Spillage Detected!</h3>
                 <p className="text-red-700 text-xs mt-1">
                   Your content currently exceeds the bounds of your {pageCount}-page layout. 
                   To fix this, change the <b>Font Size</b> to a smaller number, remove content, or change the layout to <b>2 Pages</b>.
                 </p>
               </div>
             </div>
          )}

          {/* ACTION BAR */}
          <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5 shrink-0">
            
            {/* Top Row: History Controls (Only renders when history exists) */}
            {historyRef.current.length > 1 && (
              <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-4">
                <button onClick={undo} disabled={historyIndex <= 0} className="p-2 bg-slate-100 rounded hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed text-slate-700 transition-colors" title="Undo">
                   <Undo2 size={18} />
                </button>
                <button onClick={redo} disabled={historyIndex >= historyRef.current.length - 1} className="p-2 bg-slate-100 rounded hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed text-slate-700 transition-colors" title="Redo">
                   <Redo2 size={18} />
                </button>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">History</span>
              </div>
            )}

            {/* Middle Row: Settings Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4">
              
              {/* Box 1: Head Size (Numeric/Custom) */}
              <div className="flex flex-col bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Head Size</span>
                <div className="flex flex-col gap-2">
                  <select 
                    value={headSizeSelection} 
                    onChange={(e) => setHeadSizeSelection(e.target.value)}
                    className="w-full h-8 border border-slate-300 rounded text-xs font-medium outline-none bg-white px-2"
                  >
                    <option value="0">0 (None)</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                    <option value="32">32 (Normal)</option>
                    <option value="40">40 (Large)</option>
                    <option value="50">50 (Huge)</option>
                    <option value="custom">Custom...</option>
                  </select>
                  {headSizeSelection === 'custom' && (
                    <input 
                      type="number" 
                      min="0" max="80" 
                      value={customHeadSize} 
                      onChange={(e) => setCustomHeadSize(Number(e.target.value))}
                      placeholder="Size"
                      className="w-full h-8 border border-slate-300 rounded text-xs font-medium outline-none bg-white px-2 text-center"
                    />
                  )}
                </div>
              </div>

              {/* Box 2: Theme Settings */}
              <div className="flex flex-col bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Theme Colors</span>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <input 
                      type="color" 
                      value={themeColor} 
                      onChange={(e) => setThemeColor(e.target.value)}
                      className="w-6 h-6 rounded cursor-pointer border-0 p-0 bg-transparent shrink-0"
                    />
                    <span className="text-xs font-medium text-slate-700">Shade</span>
                  </div>
                  <select 
                    value={themeTextColor} 
                    onChange={(e) => setThemeTextColor(e.target.value)}
                    className="w-full h-8 border border-slate-300 rounded text-xs font-medium outline-none bg-white px-2"
                  >
                    <option value="black">Text: Dark</option>
                    <option value="white">Text: Light</option>
                  </select>
                </div>
              </div>

              {/* Box 3: Typography */}
              <div className="flex flex-col bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex justify-between">
                  <span>Font Size</span>
                </span>
                <div className="flex flex-col gap-2">
                  <input 
                    type="number" 
                    min="8" max="72" 
                    value={fontSizeNum} 
                    onChange={(e) => setFontSizeNum(Number(e.target.value))}
                    className="w-full h-8 border border-slate-300 rounded text-xs font-medium outline-none bg-white px-2 text-center"
                  />
                  <select 
                    value={fontFamily} 
                    onChange={(e) => setFontFamily(e.target.value)}
                    className="w-full h-8 border border-slate-300 rounded text-[10px] sm:text-xs font-medium outline-none bg-white px-1"
                  >
                    <option value="'Times New Roman', serif">Times New Roman</option>
                    <option value="Arial, sans-serif">Arial</option>
                    <option value="'Calibri', sans-serif">Calibri</option>
                    <option value="Garamond, serif">Garamond</option>
                    <option value="Georgia, serif">Georgia</option>
                    <option value="Roboto, sans-serif">Roboto</option>
                  </select>
                </div>
              </div>

              {/* Box 4: Page Layout */}
              <div className="flex flex-col bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Pages Length</span>
                <div className="flex flex-col gap-2">
                   <select 
                     value={pageSelection} 
                     onChange={(e) => setPageSelection(e.target.value)}
                     className="w-full h-8 border border-slate-300 rounded text-xs font-medium outline-none bg-white px-2"
                   >
                     <option value="1">1 Page</option>
                     <option value="2">2 Pages</option>
                     <option value="3">3 Pages</option>
                     <option value="4">4 Pages</option>
                     <option value="custom">Custom...</option>
                   </select>
                   {pageSelection === 'custom' && (
                     <input 
                       type="number" 
                       min="1" max="20" 
                       value={customPageCount} 
                       onChange={(e) => setCustomPageCount(Number(e.target.value))}
                       placeholder="Pages"
                       className="w-full h-8 border border-slate-300 rounded text-xs font-medium outline-none bg-white px-2 text-center"
                     />
                   )}
                </div>
              </div>

            </div>

            {/* Bottom Row: Download Button */}
            <button 
              onClick={generateExactPDF} 
              disabled={isDownloading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-yellow-400 text-yellow-900 rounded-lg font-extrabold hover:bg-yellow-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(250,204,21,0.5)]"
            >
              <Download size={20} /> {isDownloading ? 'Generating PDF...' : 'Download PDF'}
            </button>
          </div>

          {/* SCROLLABLE DOCUMENT WRAPPER */}
          <div className="w-full overflow-x-auto text-center whitespace-nowrap pb-12">
            
            {/* EXACT SIZED DOCUMENT CONTAINER */}
            <div 
              ref={previewContainerRef}
              className="inline-block text-left shadow-2xl bg-white relative overflow-hidden whitespace-normal align-top" 
              style={{ width: '816px', height: `${pageCount * 1056}px` }}
            >
              
              {/* INNER CONTENT WRAPPER */}
              <div 
                id="resume-preview-content" 
                ref={innerContentRef}
                className="w-full bg-white flex flex-col relative"
                style={{ minHeight: '100%', fontFamily: fontFamily, color: '#0f172a' }}
              >
                
                {/* --- TEMPLATE 1: CREATIVE 1-COLUMN --- */}
                {template === '1-column' && (
                  <div className="flex flex-col flex-1 h-full">
                    {/* Colored Edge-to-Edge Header */}
                    <div 
                      className={`flex ${photoAlignment === 'left' ? 'flex-row' : photoAlignment === 'right' ? 'flex-row-reverse' : 'flex-col'} items-${photoAlignment === 'left' ? 'center' : photoAlignment === 'center' ? 'center' : 'center'} gap-6 px-10 mb-4 transition-all`}
                      style={{ backgroundColor: themeColor, paddingTop: `${activeHeadSize}px`, paddingBottom: `${activeHeadSize}px`, ...(activeSection === 'basic-info' ? { outline: '3px solid #0f172a', outlineOffset: '-3px' } : {}) }}
                    >
                      {showPhoto && (
                        <div className={`relative shrink-0 mx-0`} style={{ width: picSizeStr, height: picSizeStr, minWidth: picSizeStr }}>
                          {photoUrl ? (
                            <img src={photoUrl} alt="Profile" className="w-full h-full rounded-full object-cover border-4 border-slate-100 shadow-sm" />
                          ) : (
                            <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center border-4 border-slate-50 shadow-sm">
                              <User size={60} className="text-slate-400" />
                            </div>
                          )}
                        </div>
                      )}
                      <div className={`flex-1 flex flex-col w-full ${headerAlignment === 'center' ? 'items-center text-center' : 'justify-center text-left'}`}>
                        <h1 style={{...sTitle, color: headHColor}} className={`font-bold mb-1 break-words whitespace-normal w-full`}>{personalInfo.name || 'Your Name'}</h1>
                        <div style={{...sSm, color: headPColor}} className={`flex flex-wrap ${headerAlignment === 'center' ? 'justify-center' : 'justify-start'} gap-x-5 gap-y-1 w-full`}>
                          {personalInfo.email && <span className="flex items-center gap-1.5"><Mail size={Math.max(12, fontSizeNum-2)} style={{color: headPColor}}/>{personalInfo.email}</span>}
                          {personalInfo.phone && <span className="flex items-center gap-1.5"><Phone size={Math.max(12, fontSizeNum-2)} style={{color: headPColor}}/>{personalInfo.phone}</span>}
                          {personalInfo.location && <span className="flex items-center gap-1.5"><MapPin size={Math.max(12, fontSizeNum-2)} style={{color: headPColor}}/>{personalInfo.location}</span>}
                          {links.map(link => link.url && (
                             <span key={link.id} className="flex items-center gap-1.5">
                               <Link2 size={Math.max(12, fontSizeNum-2)} style={{color: headPColor}} />
                               <a href={link.url.startsWith('http') ? link.url : `https://${link.url}`} target="_blank" rel="noreferrer" style={{color: headPColor}} className="underline underline-offset-2 break-all">{link.label || link.url.replace(/^https?:\/\//, '')}</a>
                             </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Render 1-Column Sections Dynamically based on Editor Order */}
                    <div className="flex flex-col flex-1 px-10 pb-10">
                      {sections.filter(s => s.visible).map(section => renderPreviewSection(section.id, 'standard'))}
                    </div>
                  </div>
                )}

                {/* --- TEMPLATE 2: PROFESSIONAL 2-COLUMN --- */}
                {template === '2-column' && (
                  <div className="flex flex-row flex-1 items-stretch w-full h-full min-h-full">
                    
                    {/* Left Column (Sidebar) - Strictly stretched to full height */}
                    <div 
                      className={`p-8 flex flex-col border-r border-slate-200`}
                      style={{ backgroundColor: themeColor, minHeight: '100%', width: `${activeHeadSize}%` }}
                    >
                      
                      <div style={activeSection === 'basic-info' ? { outline: '3px solid #0f172a', outlineOffset: '-3px' } : {}} className="transition-all">
                        {/* Flexible Photo Rendering */}
                        {showPhoto && (
                          <div className="relative mb-5 mx-0" style={{ width: picSizeStr, height: picSizeStr, minWidth: picSizeStr }}>
                            {photoUrl ? (
                              <img src={photoUrl} alt="Profile" className="w-full h-full rounded-full object-cover border-4 border-white shadow-sm" />
                            ) : (
                              <div className="w-full h-full rounded-full bg-white flex items-center justify-center border-4 border-gray-200 shadow-sm">
                                <User size={60} className="text-gray-400" />
                              </div>
                            )}
                          </div>
                        )}

                        {/* Header Info */}
                        <div className="mb-4 text-left">
                          <h1 style={{...sTitle, color: headHColor}} className={`font-bold mb-1 leading-tight break-words whitespace-normal w-full`}>{personalInfo.name || 'Your Name'}</h1>
                        </div>

                        {/* Contact Details */}
                        <div className="mb-4 space-y-2">
                          {personalInfo.email && (
                            <div style={{color: headPColor}} className={`flex items-center gap-3`}>
                              <Mail size={Math.max(12, fontSizeNum-2)} style={{color: headPColor}} className="shrink-0" />
                              <span style={sSm} className={`break-all`}>{personalInfo.email}</span>
                            </div>
                          )}
                          {personalInfo.phone && (
                            <div style={{color: headPColor}} className={`flex items-center gap-3`}>
                              <Phone size={Math.max(12, fontSizeNum-2)} style={{color: headPColor}} className="shrink-0" />
                              <span style={sSm}>{personalInfo.phone}</span>
                            </div>
                          )}
                          {personalInfo.location && (
                            <div style={{color: headPColor}} className={`flex items-center gap-3`}>
                              <MapPin size={Math.max(12, fontSizeNum-2)} style={{color: headPColor}} className="shrink-0" />
                              <span style={sSm}>{personalInfo.location}</span>
                            </div>
                          )}
                        </div>
                        
                        {links.some(l => l.url) && (
                          <div className="grid grid-cols-2 gap-x-2 gap-y-2 mb-6 w-full">
                            {links.map(link => link.url && (
                              <div key={link.id} style={{color: headPColor}} className={`flex items-start gap-2 overflow-hidden`}>
                                <Link2 size={Math.max(12, fontSizeNum-2)} style={{color: headPColor, marginTop: '2px'}} className="shrink-0" />
                                <a href={link.url.startsWith('http') ? link.url : `https://${link.url}`} target="_blank" rel="noreferrer" style={{...sSm, color: headPColor}} className={`underline underline-offset-2 break-all leading-tight block`}>{link.label || link.url.replace(/^https?:\/\//, '')}</a>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Left Column Dynamic Sections */}
                      {sections.filter(s => s.visible && s.column === 'left')
                               .map(section => renderPreviewSection(section.id, 'themed'))}
                    </div>

                    {/* Right Column (Main Content) */}
                    <div 
                      className={`p-8 flex flex-col bg-white h-full`}
                      style={{ width: `${100 - activeHeadSize}%` }}
                    >
                      {/* Right Column Dynamic Sections */}
                      {sections.filter(s => s.visible && s.column === 'right')
                               .map(section => renderPreviewSection(section.id, 'standard'))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
