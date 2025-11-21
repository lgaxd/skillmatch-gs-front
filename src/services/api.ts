import type { LoginRequest, LoginResponse, Carreira, CarreiraUsuario, Skill, Curso, UsuarioRanking, DashboardData } from '../types/api';
import type { User } from '../types/user';

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

      // Para respostas vazias (204 No Content)
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
      body: JSON.stringify({
        email: credentials.email,
        senha: credentials.senha
      }),
    });
  }

  async register(userData: any): Promise<any> {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        nome: userData.nome,
        email: userData.email,
        senha: userData.senha,
        dataNascimento: userData.dataNascimento
      }),
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

  // Carreiras & Recomendações
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

  async getCarreiraAtual(userId: number): Promise<CarreiraUsuario> {
    return this.request<CarreiraUsuario>(`/usuarios/${userId}/carreira-atual`);
  }

  // Skills & Trilhas
  async getSkillsCarreira(carreiraId: number): Promise<Skill[]> {
    return this.request<Skill[]>(`/carreiras/${carreiraId}/skills`);
  }

  async getCursosSkill(skillId: number): Promise<Curso[]> {
    return this.request<Curso[]>(`/skills/${skillId}/cursos`);
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

  async getCursosUsuario(userId: number): Promise<Curso[]> {
    return this.request<Curso[]>(`/usuarios/${userId}/cursos`);
  }

  async updateProgressoCurso(cursoId: number, userId: number, progresso: number): Promise<void> {
    return this.request<void>(`/cursos/${cursoId}/progresso?idUsuario=${userId}`, {
      method: 'PUT',
      body: JSON.stringify({ percentual: progresso }),
    });
  }

  // Ranking & Gamificação
  async getRanking(mes: string): Promise<UsuarioRanking[]> {
    return this.request<UsuarioRanking[]>(`/ranking/${mes}`);
  }

  async getRankingUsuario(userId: number): Promise<UsuarioRanking> {
    return this.request<UsuarioRanking>(`/usuarios/${userId}/ranking`);
  }

  async addXP(userId: number, xp: number): Promise<void> {
    return this.request<void>(`/usuarios/${userId}/xp`, {
      method: 'POST',
      body: JSON.stringify({ quantidadeXp: xp }),
    });
  }

  // Dashboard & Estatísticas
  async getDashboard(userId: number): Promise<DashboardData> {
    const response = await this.request<any>(`/usuarios/${userId}/dashboard`);
    
    // Adaptar a resposta do backend para o formato esperado pelo frontend
    return {
      usuario: {
        id_usuario: userId,
        nome_usuario: response.nomeUsuario,
        email_usuario: '', // Será preenchido pelo getUser se necessário
        data_nascimento: '',
        data_cadastro: '',
        genero: '',
        telefone: ''
      },
      carreira: {
        id_carreira: 0, // Será preenchido pelo getCarreiraAtual se necessário
        nome_carreira: response.carreiraAtual,
        area_atuacao: '',
        progresso_percentual: response.progressoCarreira || 0,
        xp_total: response.xpTotal || 0,
        data_inicio: '',
        status_jornada: 'Em Andamento'
      },
      progressoCursos: {
        cursos_concluidos: response.cursosConcluidos || 0,
        cursos_andamento: 0, // Será calculado
        cursos_pendentes: 0, // Será calculado
        total_cursos: 0 // Será calculado
      },
      ranking: {
        posicao: 0, // Será preenchido pelo getRankingUsuario
        pontuacao_total: response.xpTotal || 0,
        mes_referencia: '2024-01'
      }
    };
  }

  async getEstatisticas(userId: number): Promise<any> {
    return this.request<any>(`/usuarios/${userId}/estatisticas`);
  }

  // API Python Flask (Machine Learning) - Mantido igual
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
      // Fallback
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