import { apiService } from './api';
import type { LoginResponse, RegisterResponse } from '../types/api';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  nome: string;
  email: string;
  password: string;
  dataNascimento?: string;
}

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  dataNascimento?: string;
}

class AuthService {
  async login(credentials: LoginData): Promise<Usuario> {
    try {
      console.log("🔐 Tentando login com:", { email: credentials.email });
      
      const response: LoginResponse = await apiService.login({
        email: credentials.email,
        senha: credentials.password
      });
      
      console.log("✅ Resposta do login:", response);
      
      // Validar resposta
      if (!response || !response.id || !response.nome) {
        throw new Error('Resposta de login inválida');
      }
      
      // Criar objeto usuário
      const usuario: Usuario = {
        id: response.id,
        nome: response.nome,
        email: response.email || credentials.email,
        dataNascimento: response.dataNascimento
      };
      
      // Salvar dados do usuário
      this.salvarUsuario(usuario);
      
      console.log("👤 Usuário autenticado e salvo:", usuario);
      return usuario;
      
    } catch (error: any) {
      console.error('❌ Erro no login:', error);
      
      // Mensagem de erro mais específica
      let errorMessage = 'Email ou senha incorretos';
      if (error.message.includes('Failed to fetch')) {
        errorMessage = 'Erro de conexão com o servidor';
      } else if (error.message.includes('HTTP error! status: 401')) {
        errorMessage = 'Email ou senha incorretos';
      } else if (error.message.includes('Resposta de login inválida')) {
        errorMessage = 'Resposta inválida do servidor';
      }
      
      throw new Error(errorMessage);
    }
  }

  async register(userData: RegisterData): Promise<Usuario> {
    try {
      console.log("📝 Tentando registrar usuário:", { 
        nome: userData.nome, 
        email: userData.email,
        dataNascimento: userData.dataNascimento 
      });
      
      const response: RegisterResponse = await apiService.register({
        nome: userData.nome,
        email: userData.email,
        senha: userData.password,
        dataNascimento: userData.dataNascimento
      });
      
      console.log("✅ Resposta do registro:", response);
      
      // Validar resposta
      if (!response || !response.id || !response.nome) {
        throw new Error('Resposta de registro inválida');
      }
      
      // Criar objeto usuário
      const usuario: Usuario = {
        id: response.id,
        nome: response.nome,
        email: response.email || userData.email,
        dataNascimento: response.dataNascimento
      };
      
      // **CORREÇÃO: Salvar usuário diretamente após registro bem-sucedido**
      // Não tentar fazer login automático se a API de login está dando 401
      this.salvarUsuario(usuario);
      
      console.log("🎉 Registro bem-sucedido, usuário salvo:", usuario);
      return usuario;
      
    } catch (error: any) {
      console.error('❌ Erro no registro:', error);
      
      // Mensagem de erro mais específica
      let errorMessage = 'Erro ao criar conta';
      if (error.message.includes('Failed to fetch')) {
        errorMessage = 'Erro de conexão com o servidor';
      } else if (error.message.includes('HTTP error! status: 400')) {
        errorMessage = 'Dados inválidos para registro. Verifique os campos.';
      } else if (error.message.includes('HTTP error! status: 409')) {
        errorMessage = 'Este email já está cadastrado';
      } else if (error.message.includes('email já existe')) {
        errorMessage = 'Este email já está cadastrado';
      }
      
      throw new Error(errorMessage);
    }
  }

  // **NOVO MÉTODO: Salvar usuário no localStorage**
  private salvarUsuario(usuario: Usuario): void {
    try {
      localStorage.setItem('userData', JSON.stringify(usuario));
      localStorage.setItem('userToken', 'authenticated');
      localStorage.setItem('userId', usuario.id.toString());
      
      console.log("💾 Usuário salvo no localStorage:", {
        userData: usuario,
        userToken: 'authenticated',
        userId: usuario.id
      });
    } catch (error) {
      console.error('❌ Erro ao salvar usuário no localStorage:', error);
      throw new Error('Erro ao salvar dados de autenticação');
    }
  }

  logout(): void {
    console.log("🚪 Fazendo logout...");
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('userId');
    localStorage.removeItem('recomendacoesKNN');
    localStorage.removeItem('perfilUsuario');
    console.log("✅ Logout concluído");
  }

  getCurrentUser(): Usuario | null {
    try {
      const userData = localStorage.getItem('userData');
      if (!userData) {
        console.log("📭 Nenhum userData encontrado no localStorage");
        return null;
      }
      
      const usuario = JSON.parse(userData);
      
      // Validar estrutura do usuário
      if (!usuario.id || !usuario.nome) {
        console.warn('❌ Dados do usuário inválidos no localStorage');
        this.logout();
        return null;
      }
      
      console.log("👤 Usuário recuperado do localStorage:", usuario);
      return usuario;
    } catch (error) {
      console.error('❌ Erro ao recuperar usuário do localStorage:', error);
      this.logout();
      return null;
    }
  }

  getCurrentUserId(): number {
    const usuario = this.getCurrentUser();
    const userId = usuario?.id || 0;
    console.log("🆔 ID do usuário atual:", userId);
    return userId;
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('userToken');
    const usuario = this.getCurrentUser();
    const isAuth = !!token && !!usuario;
    
    console.log("🔐 Status de autenticação:", isAuth);
    return isAuth;
  }

  // Método utilitário para debug
  debugAuth(): void {
    console.log('=== 🔍 DEBUG AUTH ===');
    console.log('userToken:', localStorage.getItem('userToken'));
    console.log('userData:', localStorage.getItem('userData'));
    console.log('userId:', localStorage.getItem('userId'));
    console.log('isAuthenticated:', this.isAuthenticated());
    console.log('currentUser:', this.getCurrentUser());
    console.log('currentUserId:', this.getCurrentUserId());
    console.log('==================');
  }
}

export const authService = new AuthService();