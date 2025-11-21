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
      // Adaptar para o formato esperado pelo backend Java
      const response = await apiService.login({
        email: credentials.email,
        senha: credentials.password
      });
      
      console.log("Resposta do login:", response);
      
      // Salvar dados do usuário
      localStorage.setItem('userData', JSON.stringify(response));
      localStorage.setItem('userToken', 'mock-token');
      
      return response;
    } catch (error) {
      console.error('Erro no login, usando fallback:', error);
      
      // Fallback para desenvolvimento
      const mockUser: Usuario = {
        id: 1,
        nome: 'Usuário Teste',
        email: credentials.email
      };
      
      localStorage.setItem('userData', JSON.stringify(mockUser));
      localStorage.setItem('userToken', 'mock-token');
      
      return mockUser;
    }
  }

  async register(userData: any): Promise<Usuario> {
    try {
      const response = await apiService.register(userData);
      return {
        id: response.id || 1,
        nome: response.nome || userData.nome,
        email: response.email || userData.email
      };
    } catch (error) {
      console.error('Erro no registro:', error);
      
      // Fallback para desenvolvimento
      const mockUser: Usuario = {
        id: 1,
        nome: userData.nome,
        email: userData.email
      };
      
      return mockUser;
    }
  }

  logout(): void {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('recomendacoesKNN');
  }

  getCurrentUser(): Usuario | null {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }

  getCurrentUserId(): number {
    const user = this.getCurrentUser();
    return user?.id || 1;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('userToken');
  }
}

export const authService = new AuthService();