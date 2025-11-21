import type {
  LoginRequest,
  LoginResponse,
  Carreira,
  CarreiraUsuario,
  CarreiraSkill,
  Curso,
  UsuarioCurso,
  Ranking,
  DashboardData,
  Estatisticas,
  User,
  RegisterRequest,
  RegisterResponse
} from '../types/api';

const API_BASE_URL = 'http://localhost:8080';

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (response.status === 204) {
        return {} as T;
      }

      return response.json();
    } catch (error) {
      console.error(`Erro na requisição para ${endpoint}:`, error);
      throw error;
    }
  }

  // Autenticação & Usuários
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    return this.request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: RegisterRequest): Promise<RegisterResponse> {
    return this.request<RegisterResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getUser(id: number): Promise<User> {
    return this.request<User>(`/usuarios/${id}`);
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    return this.request<User>(`/usuarios/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // Carreiras
  async getCarreiras(): Promise<Carreira[]> {
    return this.request<Carreira[]>('/carreiras');
  }

  async getCarreira(id: number): Promise<Carreira> {
    return this.request<Carreira>(`/carreiras/${id}`);
  }

  async selectCarreira(userId: number, carreiraId: number): Promise<void> {
    return this.request<void>(`/usuarios/${userId}/carreira`, {
      method: 'POST',
      body: JSON.stringify({ id: carreiraId }),
    });
  }

  async updateProgressoCarreira(userId: number, percentual: number): Promise<void> {
    return this.request<void>(`/usuarios/${userId}/carreira/atualizar-progresso`, {
      method: 'PUT',
      body: JSON.stringify({ percentual }),
    });
  }

  async getCarreiraAtual(userId: number): Promise<CarreiraUsuario> {
    return this.request<CarreiraUsuario>(`/usuarios/${userId}/carreira-atual`);
  }

  // Skills & Cursos
  async getSkillsCarreira(carreiraId: number): Promise<CarreiraSkill[]> {
    return this.request<CarreiraSkill[]>(`/carreiras/${carreiraId}/skills`);
  }

  async getCursosSkill(skillId: number): Promise<Curso[]> {
    return this.request<Curso[]>(`/skills/${skillId}/cursos`);
  }

  async getCursosUsuario(userId: number): Promise<UsuarioCurso[]> {
    return this.request<UsuarioCurso[]>(`/usuarios/${userId}/cursos`);
  }

  // Cursos & Progresso
  async iniciarCurso(cursoId: number, userId: number): Promise<void> {
    return this.request<void>(`/cursos/${cursoId}/iniciar?idUsuario=${userId}`, {
      method: 'POST',
    });
  }

  async concluirCurso(cursoId: number, userId: number): Promise<void> {
    return this.request<void>(`/cursos/${cursoId}/concluir?idUsuario=${userId}`, {
      method: 'PUT',
    });
  }

  async updateProgressoCurso(cursoId: number, userId: number, progresso: number): Promise<void> {
    return this.request<void>(`/cursos/${cursoId}/progresso?idUsuario=${userId}`, {
      method: 'PUT',
      body: JSON.stringify({ percentual: progresso }),
    });
  }

  // Ranking & Gamificação
  async getRanking(mes: string): Promise<Ranking[]> {
    return this.request<Ranking[]>(`/ranking/${mes}`);
  }

  async getRankingUsuario(userId: number): Promise<Ranking> {
    return this.request<Ranking>(`/usuarios/${userId}/ranking`);
  }

  async addXP(userId: number, xp: number): Promise<void> {
    return this.request<void>(`/usuarios/${userId}/xp`, {
      method: 'POST',
      body: JSON.stringify({ quantidadeXp: xp }),
    });
  }

  // Dashboard & Estatísticas
  async getDashboard(userId: number): Promise<DashboardData> {
    return this.request<DashboardData>(`/usuarios/${userId}/dashboard`);
  }

  async getEstatisticas(userId: number): Promise<Estatisticas> {
    return this.request<Estatisticas>(`/usuarios/${userId}/estatisticas`);
  }

  // API Python Flask (Machine Learning)
  async getRecomendacoesKNN(perfil: any): Promise<any> {
    const FLASK_API_URL = 'http://localhost:5000';

    try {
      const response = await fetch(`${FLASK_API_URL}/recomendar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ skills: perfil }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('Erro na API Flask, retornando mock:', error);
      return {
        perfil_enviado: perfil,
        recomendacoes: [
          { rank: 1, carreira: "Cientista de Dados", distancia: 0.5 },
          { rank: 2, carreira: "Engenheiro de Machine Learning", distancia: 0.7 },
          { rank: 3, carreira: "Analista de BI", distancia: 0.8 },
          { rank: 4, carreira: "Engenheiro de Dados", distancia: 0.9 },
          { rank: 5, carreira: "Arquiteto de Cloud", distancia: 1.0 }
        ]
      };
    }
  }
}

export const apiService = new ApiService();