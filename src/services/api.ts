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

const API_BASE_URL = 'https://skillmatch.winty.cloud/';

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

  async adicionarTodosUsuariosAoRanking(mes: string): Promise<void> {
    return this.request<void>(`/usuarios/ranking/adicionar-todos`, {
      method: 'POST',
      body: JSON.stringify({ mesReferencia: mes }),
    });
  }

  async atualizarRankingTodosUsuarios(): Promise<void> {
    return this.request<void>(`/usuarios/ranking/atualizar-mes-atual`, {
      method: 'PUT'
    });
  }

  // Dashboard & Estatísticas
  async getDashboard(userId: number): Promise<DashboardData> {
    return this.request<DashboardData>(`/usuarios/${userId}/dashboard`);
  }

  async getEstatisticas(userId: number): Promise<Estatisticas> {
    return this.request<Estatisticas>(`/usuarios/${userId}/estatisticas`);
  }
}

export const apiService = new ApiService();