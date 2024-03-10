import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './Login';
import Chat from './Chat';
import Summary from './Summary'; // Make sure this import is correct
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const handleLogin = (user) => {
    setUser(user);
    // Save user to localStorage
    localStorage.setItem('user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setUser(null);
    // Remove user from localStorage
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <Link to="/" className="home-link">AuraMind</Link>
          <nav className="nav-links">
            {user ? (
              <>
                <span className="user-name">{user.fullName}</span>
                <button onClick={handleLogout} className="login-button">Logout</button>
              </>
            ) : (
              <Link to="/login">
                <button className="login-button">Login</button>
              </Link>
            )}
          </nav>
        </header>

        <Routes>
          <Route path="/" element={user ? <Navigate to="/chat" /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/chat" element={user ? <Chat user={user} /> : <Navigate to="/login" />} />
          <Route path="/summary" element={<Summary />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
