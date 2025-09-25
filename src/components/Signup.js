import React, { useState, useEffect } from 'react';
import AuthService from '../services/authService';
import '../App.css';

function Signup({ setCurrentUser, setCurrentPage }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showInfoBar, setShowInfoBar] = useState(false);

  // Initialize particles
  useEffect(() => {
    // Create particles effect
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    document.body.appendChild(particlesContainer);
    
    // Create particles
    const createParticles = () => {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.width = Math.random() * 5 + 2 + 'px';
      particle.style.height = particle.style.width;
      particle.style.backgroundColor = Math.random() > 0.5 ? 'var(--cyberpunk-cyan)' : 'var(--cyberpunk-wine)';
      particle.style.borderRadius = '50%';
      particle.style.top = Math.random() * 100 + 'vh';
      particle.style.left = Math.random() * 100 + 'vw';
      particle.style.opacity = Math.random() * 0.5 + 0.1;
      particle.style.boxShadow = `0 0 ${Math.random() * 10 + 5}px ${Math.random() > 0.5 ? 'var(--cyberpunk-cyan)' : 'var(--cyberpunk-wine)'}`;
      
      particlesContainer.appendChild(particle);
      
      // Animate particle
      const animation = particle.animate([
        { transform: 'translateY(0) translateX(0)', opacity: particle.style.opacity },
        { transform: `translateY(${Math.random() * 100 - 50}vh) translateX(${Math.random() * 100 - 50}vw)`, opacity: 0 }
      ], {
        duration: Math.random() * 5000 + 5000,
        easing: 'linear'
      });
      
      animation.onfinish = () => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      };
    };
    
    // Create initial particles
    for (let i = 0; i < 50; i++) {
      setTimeout(createParticles, i * 300);
    }
    
    // Create particles periodically
    const interval = setInterval(createParticles, 200);
    
    // Show info bar after delay
    const infoBarTimeout = setTimeout(() => {
      setShowInfoBar(true);
    }, 3000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(infoBarTimeout);
      if (particlesContainer.parentNode) {
        particlesContainer.parentNode.removeChild(particlesContainer);
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert('AS SENHAS NÃO COINCIDEM!');
      return;
    }
    
    setLoading(true);
    
    try {
      const user = await AuthService.signup(name, email, password);
      setCurrentUser(user);
      setCurrentPage('home');
      alert('CADASTRO REALIZADO COM SUCESSO!');
    } catch (error) {
      alert(error.message || 'ERRO AO CRIAR CONTA');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App signup-container">
      {/* Content section */}
      <div className="signup-content">
        <h1 className="app-title glitch-text" data-text="TESS">TESS</h1>
        <p>Junte-se à revolução social. Conecte-se com pessoas que compartilham seus interesses em um ambiente futurista e seguro.</p>
        
        <ul className="feature-list">
          <li>Crie seu perfil único com personalização avançada</li>
          <li>Compartilhe posts, fotos e vídeos com sua rede</li>
          <li>Participe de grupos e comunidades temáticas</li>
          <li>Receba recomendações personalizadas</li>
          <li>Mantenha-se atualizado com as últimas tendências</li>
        </ul>
      </div>
      
      {/* Signup form */}
      <div className="signup-form">
        <h1>CRIAR CONTA</h1>
        <p>Preencha os dados abaixo</p>
        <form onSubmit={handleSubmit} className="App-form">
          <div className="App-form-group">
            <label>NOME COMPLETO:</label>
            <input
              type="text"
              placeholder="NOME SOBRENOME"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="App-input"
              required
            />
          </div>
          <div className="App-form-group">
            <label>EMAIL:</label>
            <input
              type="email"
              placeholder="USUARIO@EXEMPLO.COM"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="App-input"
              required
            />
          </div>
          <div className="App-form-group">
            <label>SENHA:</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="App-input"
              required
            />
          </div>
          <div className="App-form-group">
            <label>CONFIRMAR SENHA:</label>
            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="App-input"
              required
            />
          </div>
          <button type="submit" className="App-button" disabled={loading}>
            {loading ? 'REGISTRANDO...' : 'CRIAR CONTA'}
          </button>
        </form>
        <p>
          JÁ TEM UMA CONTA? <button onClick={() => setCurrentPage('login')} className="App-link-button">ACESSAR SISTEMA</button>
        </p>
      </div>
      
      {/* Site info bar */}
      <div className={`site-info-bar ${showInfoBar ? '' : 'hidden'}`}>
        <div className="site-info-links">
          <a href="#about" className="site-info-link">SOBRE</a>
          <a href="#privacy" className="site-info-link">PRIVACIDADE</a>
          <a href="#terms" className="site-info-link">TERMOS</a>
          <a href="#help" className="site-info-link">AJUDA</a>
          <a href="#contact" className="site-info-link">CONTATO</a>
        </div>
        <div className="copyright">© 2023 TESS - REDE SOCIAL FUTURISTA</div>
      </div>
    </div>
  );
}

export default Signup;