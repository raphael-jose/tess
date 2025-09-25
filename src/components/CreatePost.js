import React, { useState } from 'react';
import '../App.css';

function CreatePost({ onPostCreated, onCancel, currentUser }) {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim() === '') {
      alert('POR FAVOR, ESCREVA ALGO ANTES DE POSTAR.');
      return;
    }
    
    onPostCreated(content);
    setContent('');
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
        <h2>CRIAR NOVA POSTAGEM</h2>
        <form onSubmit={handleSubmit} className="App-form">
          <div className="App-form-group">
            <label>CONTEÚDO:</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="O QUE VOCÊ ESTÁ PENSANDO?"
              className="App-input"
              rows="4"
              style={{ resize: 'vertical', fontFamily: 'inherit' }}
            />
          </div>
          <div className="App-form-actions">
            <button type="submit" className="App-button">PUBLICAR</button>
            <button type="button" className="App-button cancel-button" onClick={onCancel}>CANCELAR</button>
          </div>
        </form>
      </header>
    </div>
  );
}

export default CreatePost;