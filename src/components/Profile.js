import React, { useState, useEffect } from 'react';
import dbService from '../services/dbService';
import '../App.css';

function Profile({ currentUser, setCurrentPage }) {
  const [userStats, setUserStats] = useState({
    posts: 0,
    followers: 0,
    following: 0
  });

  // Load user stats
  useEffect(() => {
    if (currentUser) {
      const user = dbService.getUserById(currentUser.id);
      if (user) {
        const userPosts = dbService.getPostsByUserId(user.id);
        setUserStats({
          posts: userPosts.length,
          followers: user.followers ? user.followers.length : 0,
          following: user.following ? user.following.length : 0
        });
      }
    }
  }, [currentUser]);

  return (
    <div className="App">
      {/* Efeitos visuais futuristas */}
      <div className="scanlines"></div>
      <div className="crt-effect"></div>
      <div className="cyber-grid"></div>
      <div className="cyber-circle cyber-circle-1"></div>
      <div className="cyber-circle cyber-circle-2"></div>
      <div className="hologram hologram-1"></div>
      <div className="hologram hologram-2"></div>
      
      <header className="App-header">
        <h1 className="app-title glitch-text" data-text="TESS">TESS</h1>
        <h2>PERFIL DO USUÁRIO</h2>
        <div className="App-profile">
          <div className="App-profile-header">
            <div className="App-profile-avatar">
              <div className="App-avatar-placeholder">{currentUser?.name.charAt(0)}</div>
            </div>
            <h3>{currentUser?.name}</h3>
            <p>{currentUser?.email}</p>
          </div>
          
          <div className="App-profile-stats">
            <div className="App-stat">
              <span className="App-stat-number">{userStats.posts}</span>
              <span className="App-stat-label">POSTS</span>
            </div>
            <div className="App-stat">
              <span className="App-stat-number">{userStats.followers}</span>
              <span className="App-stat-label">SEGUIDORES</span>
            </div>
            <div className="App-stat">
              <span className="App-stat-number">{userStats.following}</span>
              <span className="App-stat-label">SEGUINDO</span>
            </div>
          </div>
          
          <div className="App-profile-actions">
            <button className="App-button">EDITAR PERFIL</button>
            <button className="App-button" onClick={() => setCurrentPage('settings')}>CONFIGURAÇÕES</button>
          </div>
        </div>
      </header>
      
      {/* Navegação */}
      <div className="App-nav">
        <button className="App-button" onClick={() => setCurrentPage('home')}>🏠 INÍCIO</button>
        <button className="App-button" onClick={() => setCurrentPage('profile')}>👤 PERFIL</button>
        <button className="App-button" onClick={() => setCurrentPage('settings')}>⚙️ CONFIGURAÇÕES</button>
        <button 
          className="App-button" 
          onClick={() => setCurrentPage('login')}
        >
          🔒 SAIR
        </button>
      </div>
    </div>
  );
}

export default Profile;