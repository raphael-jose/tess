import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Profile from './components/Profile';
import Settings from './components/Settings';
import AuthService from './services/authService';
import dbService from './services/dbService';
import './services/seedData'; // Import seed data
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('login'); // 'login', 'signup', 'home', 'profile', or 'settings'
  const [currentUser, setCurrentUser] = useState(null);

  // Check if user is already logged in
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setCurrentPage('home');
    }
  }, []);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'signup':
        return <Signup setCurrentUser={setCurrentUser} setCurrentPage={setCurrentPage} />;
      case 'home':
        return <Home setCurrentPage={setCurrentPage} currentUser={currentUser} />;
      case 'profile':
        return <Profile currentUser={currentUser} setCurrentPage={setCurrentPage} />;
      case 'settings':
        return <Settings setCurrentPage={setCurrentPage} />;
      case 'login':
      default:
        return <Login setCurrentUser={setCurrentUser} setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div>
      {renderCurrentPage()}
    </div>
  );
}

export default App;