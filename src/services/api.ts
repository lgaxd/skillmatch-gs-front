import type { ApiResponse, LoginRequest, LoginResponse, Carreira, CarreiraUsuario, Skill, Curso, UsuarioRanking, DashboardData, PerfilProfissional, RecomendacaoCarreira } from '../types/api';
import type { User } from '../types/user';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
const FLASK_API_URL = import.meta.env.VITE_FLASK_API_URL || 'http://localhost:5000';

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = localStorage.getItem('userToken');
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  private async flaskRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(`${FLASK_API_URL}${endpoint}`, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Autenticação & Usuários
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    return this.request<LoginResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: any): Promise<ApiResponse<User>> {
    return this.request<ApiResponse<User>>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getUser(id: number): Promise<User> {
    return this.request<User>(`/api/usuarios/${id}`);
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    return this.request<User>(`/api/usuarios/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // Carreiras & Recomendações
  async getCarreiras(): Promise<Carreira[]> {
    return this.request<Carreira[]>('/api/carreiras');
  }

  async getCarreira(id: number): Promise<Carreira> {
    return this.request<Carreira>(`/api/carreiras/${id}`);
  }

  async selectCarreira(userId: number, carreiraId: number): Promise<void> {
    return this.request<void>(`/api/usuarios/${userId}/carreira`, {
      method: 'POST',
      body: JSON.stringify({ id_carreira: carreiraId }),
    });
  }

  async getCarreiraAtual(userId: number): Promise<CarreiraUsuario> {
    return this.request<CarreiraUsuario>(`/api/usuarios/${userId}/carreira-atual`);
  }

  // Skills & Trilhas
  async getSkillsCarreira(carreiraId: number): Promise<Skill[]> {
    return this.request<Skill[]>(`/api/carreiras/${carreiraId}/skills`);
  }

  async getCursosSkill(skillId: number): Promise<Curso[]> {
    return this.request<Curso[]>(`/api/skills/${skillId}/cursos`);
  }

  async updateProgressoSkill(skillId: number, progresso: number): Promise<void> {
    return this.request<void>(`/api/skills/${skillId}/progresso`, {
      method: 'PUT',
      body: JSON.stringify({ progresso_percentual: progresso }),
    });
  }

  // Cursos & Progresso
  async iniciarCurso(cursoId: number): Promise<void> {
    return this.request<void>(`/api/cursos/${cursoId}/iniciar`, {
      method: 'POST',
    });
  }

  async concluirCurso(cursoId: number): Promise<void> {
    return this.request<void>(`/api/cursos/${cursoId}/concluir`, {
      method: 'PUT',
    });
  }

  async getCursosUsuario(userId: number): Promise<Curso[]> {
    return this.request<Curso[]>(`/api/usuarios/${userId}/cursos`);
  }

  async updateProgressoCurso(cursoId: number, progresso: number): Promise<void> {
    return this.request<void>(`/api/cursos/${cursoId}/progresso`, {
      method: 'PUT',
      body: JSON.stringify({ progresso_percentual: progresso }),
    });
  }

  // Ranking & Gamificação
  async getRanking(mes: string): Promise<UsuarioRanking[]> {
    return this.request<UsuarioRanking[]>(`/api/ranking/${mes}`);
  }

  async getRankingUsuario(userId: number): Promise<UsuarioRanking> {
    return this.request<UsuarioRanking>(`/api/usuarios/${userId}/ranking`);
  }

  async addXP(userId: number, xp: number): Promise<void> {
    return this.request<void>(`/api/usuarios/${userId}/xp`, {
      method: 'POST',
      body: JSON.stringify({ xp }),
    });
  }

  // Dashboard & Estatísticas
  async getDashboard(userId: number): Promise<DashboardData> {
    return this.request<DashboardData>(`/api/usuarios/${userId}/dashboard`);
  }

  async getEstatisticas(userId: number): Promise<any> {
    return this.request<any>(`/api/usuarios/${userId}/estatisticas`);
  }

  // API Python Flask (Machine Learning)
  async getRecomendacoesKNN(perfil: PerfilProfissional): Promise<RecomendacaoCarreira[]> {
    return this.flaskRequest<RecomendacaoCarreira[]>('/api/knn/recomendacoes', {
      method: 'POST',
      body: JSON.stringify(perfil),
    });
  }

  async processarPerfil(perfil: PerfilProfissional): Promise<any> {
    return this.flaskRequest<any>('/api/knn/processar-perfil', {
      method: 'POST',
      body: JSON.stringify(perfil),
    });
  }

  async getModeloStatus(): Promise<{ status: string }> {
    return this.flaskRequest<{ status: string }>('/api/knn/modelo-status');
  }
}

export const apiService = new ApiService();