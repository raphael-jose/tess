import React, { useState } from 'react';
import '../App.css';

function Settings({ setCurrentPage }) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('pt');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você adicionaria a lógica para salvar as configurações
    console.log('CONFIGURAÇÕES SALVAS:', { notifications, darkMode, language });
    alert('CONFIGURAÇÕES SALVAS COM SUCESSO!');
  };

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
        <h2>CONFIGURAÇÕES</h2>
        <form onSubmit={handleSubmit} className="App-form">
          <div className="App-form-group">
            <label>
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
              />
              ATIVAR NOTIFICAÇÕES
            </label>
          </div>
          
          <div className="App-form-group">
            <label>
              <input
                type="checkbox"
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
              />
              MODO ESCURO
            </label>
          </div>
          
          <div className="App-form-group">
            <label>
              IDIOMA:
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="App-input"
              >
                <option value="pt">PORTUGUÊS</option>
                <option value="en">ENGLISH</option>
                <option value="es">ESPAÑOL</option>
              </select>
            </label>
          </div>
          
          <button type="submit" className="App-button">SALVAR CONFIGURAÇÕES</button>
        </form>
        
        <div className="App-settings-actions">
          <button className="App-button">ALTERAR SENHA</button>
          <button className="App-button" style={{ backgroundColor: '#ff6b6b' }}>EXCLUIR CONTA</button>
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

export default Settings;