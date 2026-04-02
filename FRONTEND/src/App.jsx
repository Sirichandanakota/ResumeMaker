import { useState } from 'react'
import LoginPage from './components/LoginPage'
import SignUpPage from './components/SignUpPage'
import Resume from './resume.jsx'   
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('login')
  const [user, setUser] = useState(null)

  const handleLogin = (email, name) => {
    setUser({ email, name })
    setCurrentPage('templates')
  }

  const handleSignUp = (email, name) => {
    setUser({ email, name })
    setCurrentPage('templates')
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(null)
    setCurrentPage('login')
  }

  const handleSwitchPage = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className="app">

      {/* LOGIN */}
      {currentPage === 'login' && (
        <LoginPage 
          onLogin={handleLogin}
          onSwitchPage={handleSwitchPage}
        />
      )}

      {/* SIGNUP */}
      {currentPage === 'signup' && (
        <SignUpPage 
          onSignUp={handleSignUp}
          onSwitchPage={handleSwitchPage}
        />
      )}

      {/* 🚀 RESUME BUILDER */}
      {currentPage === 'templates' && (
        <Resume 
          user={user}
          onLogout={handleLogout}
        />
      )}

    </div>
  )
}

export default App
