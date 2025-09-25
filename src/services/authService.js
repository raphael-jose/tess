import dbService from './dbService';

class AuthService {
  // Login user
  async login(email, password) {
    // In a real app, this would be an API call
    // For now, we'll simulate authentication with localStorage
    
    const user = dbService.getUserByEmail(email);
    
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    
    // In a real app, we would hash and compare passwords
    // For demo purposes, we'll just check if password exists
    if (!password) {
      throw new Error('Senha inválida');
    }
    
    // Store current user in localStorage
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    return user;
  }

  // Signup user
  async signup(name, email, password) {
    // Check if user already exists
    const existingUser = dbService.getUserByEmail(email);
    
    if (existingUser) {
      throw new Error('Usuário já cadastrado');
    }
    
    // Create new user
    const newUser = dbService.createUser({
      name,
      email,
      // In a real app, we would hash the password
      password // Don't do this in production!
    });
    
    // Store current user in localStorage
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    return newUser;
  }

  // Logout user
  logout() {
    localStorage.removeItem('currentUser');
  }

  // Get current user
  getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.getCurrentUser();
  }
}

export default new AuthService();