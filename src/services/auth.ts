import { apiService } from './api';

export interface LoginData {
  email: string;
  password: string;
}

export interface Usuario {
  id: number;
  nome: string;
  email: string;
}

class AuthService {
  async login(credentials: LoginData): Promise<Usuario> {
    try {
      const response = await apiService.login({
        email: credentials.email,
        senha: credentials.password
      });
      
      console.log("Resposta do login:", response);
      
      // Salvar dados do usuário
      localStorage.setItem('userData', JSON.stringify(response));
      localStorage.setItem('userToken', 'authenticated');
      localStorage.setItem('userId', response.id.toString());
      
      return response;
    } catch (error) {
      console.error('Erro no login:', error);
      throw new Error('Email ou senha incorretos');
    }
  }

  async register(userData: any): Promise<Usuario> {
    try {
      const response = await apiService.register(userData);
      
      // Fazer login automático após cadastro
      const loginResponse = await this.login({
        email: userData.email,
        password: userData.senha
      });
      
      return loginResponse;
    } catch (error) {
      console.error('Erro no registro:', error);
      throw error;
    }
  }

  logout(): void {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('userId');
    localStorage.removeItem('recomendacoesKNN');
    localStorage.removeItem('perfilUsuario');
  }

  getCurrentUser(): Usuario | null {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }

  getCurrentUserId(): number {
    const userId = localStorage.getItem('userId');
    return userId ? parseInt(userId) : 0;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('userToken');
  }
}

export const authService = new AuthService();