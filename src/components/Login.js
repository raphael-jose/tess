import React, { useState, useEffect } from 'react';
import AuthService from '../services/authService';
import '../App.css';

function Login({ setCurrentUser, setCurrentPage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    setLoading(true);
    
    try {
      const user = await AuthService.login(email, password);
      setCurrentUser(user);
      setCurrentPage('home');
    } catch (error) {
      alert(error.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App login-container">
      {/* Content section */}
      <div className="login-content">
        <h1 className="app-title glitch-text" data-text="TESS">TESS</h1>
        <p>Conecte-se ao futuro da rede social. Uma plataforma onde a tecnologia encontra a humanidade.</p>
        
        <ul className="feature-list">
          <li>Compartilhe ideias com nossa comunidade futurista</li>
          <li>Conecte-se com pessoas de todo o mundo</li>
          <li>Personalize sua experiência com temas únicos</li>
          <li>Participe de discussões em tempo real</li>
          <li>Explore tendências tecnológicas e culturais</li>
        </ul>
      </div>
      
      {/* Login form */}
      <div className="login-form">
        <h1>ACESSAR SISTEMA</h1>
        <p>Entre na sua conta</p>
        <form onSubmit={handleSubmit} className="App-form">
          <div className="App-form-group">
            <label>EMAIL:</label>
            <input
              type="email"
              placeholder="usuario@exemplo.com"
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
          <button type="submit" className="App-button" disabled={loading}>
            {loading ? 'AUTENTICANDO...' : 'ACESSAR SISTEMA'}
          </button>
        </form>
        <p>
          <a href="#forgot" className="App-link">ESQUECEU SUA SENHA?</a>
        </p>
        <p>
          NÃO TEM UMA CONTA? <button onClick={() => setCurrentPage('signup')} className="App-link-button">REGISTRAR-SE</button>
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

export default Login;