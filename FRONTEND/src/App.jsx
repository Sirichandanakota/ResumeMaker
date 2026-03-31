import { useState } from 'react'
import LoginPage from './components/LoginPage'
import SignUpPage from './components/SignUpPage'
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
      {currentPage === 'login' && (
        <LoginPage 
          onLogin={handleLogin}
          onSwitchPage={handleSwitchPage}
        />
      )}
      {currentPage === 'signup' && (
        <SignUpPage 
          onSignUp={handleSignUp}
          onSwitchPage={handleSwitchPage}
        />
      )}
      {currentPage === 'templates' && (
        <div className="templates-page">
          <div className="navbar">
            <h1>ResumeMaker</h1>
            <div>
              <span>Welcome, {user?.name}</span>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
          <div className="templates-container">
            <h2>Select a Resume Template</h2>
            <p>Templates coming soon...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
