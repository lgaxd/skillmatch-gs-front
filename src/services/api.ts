import type { LoginRequest, LoginResponse, Carreira, CarreiraUsuario, Skill, Curso, UsuarioRanking, DashboardData } from '../types/api';
import type { User } from '../types/user';

// URLs hardcoded para desenvolvimento
const API_BASE_URL = 'http://localhost:8080';
const FLASK_API_URL = 'http://localhost:5000';

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

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      
      if (!response.ok) {
        // Se for erro 404 ou similar, não throw error para desenvolvimento
        if (response.status === 404) {
          console.warn(`Endpoint não encontrado: ${endpoint}`);
          throw new Error('ENDPOINT_NOT_FOUND');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error(`Erro na requisição para ${endpoint}:`, error);
      throw error;
    }
  }

  private async flaskRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(`${FLASK_API_URL}${endpoint}`, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error(`Erro na requisição Flask para ${endpoint}:`, error);
      throw error;
    }
  }

  // Autenticação & Usuários
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response.json();
    } catch (error) {
      console.error('Erro no login, retornando mock:', error);
      // Retornar dados mockados para desenvolvimento
      return {
        id: 1,
        nome: 'João Silva',
        email: credentials.email
      };
    }
  }

  async register(userData: any): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response.json();
    } catch (error) {
      console.error('Erro no registro, retornando mock:', error);
      // Retornar dados mockados para desenvolvimento
      return {
        id: 1,
        nome: userData.nome,
        email: userData.email
      };
    }
  }

  async getUser(id: number): Promise<User> {
    try {
      return await this.request<User>(`/usuarios/${id}`);
    } catch (error) {
      console.error('Erro ao buscar usuário, retornando mock:', error);
      // Fallback
      return {
        id_usuario: id,
        nome_usuario: 'Usuário Teste',
        email_usuario: 'teste@email.com',
        data_nascimento: '1990-01-01',
        data_cadastro: '2024-01-01'
      };
    }
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    try {
      return await this.request<User>(`/usuarios/${id}`, {
        method: 'PUT',
        body: JSON.stringify(userData),
      });
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      throw error;
    }
  }

  // Carreiras & Recomendações
  async getCarreiras(): Promise<Carreira[]> {
    try {
      return await this.request<Carreira[]>('/carreiras');
    } catch (error) {
      console.error('Erro ao buscar carreiras, retornando mock:', error);
      // Fallback com dados mockados
      return [
        {
          id_carreira: 1,
          nome_carreira: "Desenvolvedor Front-end",
          area_atuacao: "Programação",
          descricao: "Desenvolvimento de interfaces web",
          demanda: 'alta' as const,
          salario_medio: "R$ 6.000 - R$ 12.000",
          tempo_preparacao: "8-14 meses",
          skills_principais: ["JavaScript", "React", "CSS"]
        }
      ];
    }
  }

  async getCarreira(id: number): Promise<Carreira> {
    try {
      return await this.request<Carreira>(`/carreiras/${id}`);
    } catch (error) {
      console.error('Erro ao buscar carreira, retornando mock:', error);
      // Fallback
      return {
        id_carreira: id,
        nome_carreira: "Carreira Mock",
        area_atuacao: "Tecnologia",
        descricao: "Descrição mock",
        demanda: 'media' as const,
        salario_medio: "R$ 5.000 - R$ 10.000",
        tempo_preparacao: "6-12 meses",
        skills_principais: ["Skill 1", "Skill 2"]
      };
    }
  }

  async selectCarreira(userId: number, carreiraId: number): Promise<void> {
    try {
      await this.request<void>(`/usuarios/${userId}/carreira`, {
        method: 'POST',
        body: JSON.stringify({ id: carreiraId }),
      });
    } catch (error) {
      console.error('Erro ao selecionar carreira:', error);
      // Não throw error para desenvolvimento
    }
  }

  async getCarreiraAtual(userId: number): Promise<CarreiraUsuario> {
    try {
      return await this.request<CarreiraUsuario>(`/usuarios/${userId}/carreira-atual`);
    } catch (error) {
      console.error('Erro ao buscar carreira atual, retornando mock:', error);
      // Fallback
      return {
        id_carreira: 1,
        nome_carreira: "Desenvolvedor Front-end",
        area_atuacao: "Programação",
        progresso_percentual: 25.50,
        xp_total: 1250,
        data_inicio: "2024-01-15",
        status_jornada: "Em Andamento"
      };
    }
  }

  // Skills & Trilhas
  async getSkillsCarreira(carreiraId: number): Promise<Skill[]> {
    try {
      return await this.request<Skill[]>(`/carreiras/${carreiraId}/skills`);
    } catch (error) {
      console.error('Erro ao buscar skills, retornando mock:', error);
      // Fallback
      return [];
    }
  }

  async getCursosSkill(skillId: number): Promise<Curso[]> {
    try {
      return await this.request<Curso[]>(`/skills/${skillId}/cursos`);
    } catch (error) {
      console.error('Erro ao buscar cursos, retornando mock:', error);
      // Fallback
      return [];
    }
  }

  // Cursos & Progresso
  async iniciarCurso(cursoId: number, userId: number): Promise<void> {
    try {
      await this.request<void>(`/cursos/${cursoId}/iniciar?idUsuario=${userId}`, {
        method: 'POST',
      });
    } catch (error) {
      console.error('Erro ao iniciar curso:', error);
    }
  }

  async concluirCurso(cursoId: number, userId: number): Promise<void> {
    try {
      await this.request<void>(`/cursos/${cursoId}/concluir?idUsuario=${userId}`, {
        method: 'PUT',
      });
    } catch (error) {
      console.error('Erro ao concluir curso:', error);
    }
  }

  async getCursosUsuario(userId: number): Promise<Curso[]> {
    try {
      return await this.request<Curso[]>(`/usuarios/${userId}/cursos`);
    } catch (error) {
      console.error('Erro ao buscar cursos do usuário, retornando mock:', error);
      return [];
    }
  }

  async updateProgressoCurso(cursoId: number, userId: number, progresso: number): Promise<void> {
    try {
      await this.request<void>(`/cursos/${cursoId}/progresso?idUsuario=${userId}`, {
        method: 'PUT',
        body: JSON.stringify({ percentual: progresso }),
      });
    } catch (error) {
      console.error('Erro ao atualizar progresso:', error);
    }
  }

  // Ranking & Gamificação
  async getRanking(mes: string): Promise<UsuarioRanking[]> {
    try {
      return await this.request<UsuarioRanking[]>(`/ranking/${mes}`);
    } catch (error) {
      console.error('Erro ao buscar ranking, retornando mock:', error);
      // Fallback
      return [];
    }
  }

  async getRankingUsuario(userId: number): Promise<UsuarioRanking> {
    try {
      return await this.request<UsuarioRanking>(`/usuarios/${userId}/ranking`);
    } catch (error) {
      console.error('Erro ao buscar ranking do usuário, retornando mock:', error);
      // Fallback
      return {
        id_usuario: userId,
        nome_usuario: "Usuário Teste",
        posicao: 7,
        pontuacao_total: 1250,
        carreira: "Desenvolvedor Front-end",
        area_atuacao: "Programação",
        mes_referencia: "2024-01"
      };
    }
  }

  async addXP(userId: number, xp: number): Promise<void> {
    try {
      await this.request<void>(`/usuarios/${userId}/xp`, {
        method: 'POST',
        body: JSON.stringify({ quantidadeXp: xp }),
      });
    } catch (error) {
      console.error('Erro ao adicionar XP:', error);
    }
  }

  // Dashboard & Estatísticas
  async getDashboard(userId: number): Promise<DashboardData> {
    try {
      return await this.request<DashboardData>(`/usuarios/${userId}/dashboard`);
    } catch (error) {
      console.error('Erro ao buscar dashboard, retornando mock:', error);
      // Fallback
      return {
        usuario: {
          id_usuario: userId,
          nome_usuario: "João Silva",
          email_usuario: "joao.silva@email.com",
          data_nascimento: "1990-05-15",
          data_cadastro: "2024-01-15",
          genero: "Masculino",
          telefone: "(11) 99999-9999"
        },
        carreira: {
          id_carreira: 1,
          nome_carreira: "Desenvolvedor Front-end",
          area_atuacao: "Programação",
          progresso_percentual: 25.50,
          xp_total: 1250,
          data_inicio: "2024-01-15",
          status_jornada: "Em Andamento"
        },
        progressoCursos: {
          cursos_concluidos: 2,
          cursos_andamento: 1,
          cursos_pendentes: 7,
          total_cursos: 10
        },
        ranking: {
          posicao: 7,
          pontuacao_total: 1250,
          mes_referencia: "2024-01"
        }
      };
    }
  }

  async getEstatisticas(userId: number): Promise<any> {
    try {
      return await this.request<any>(`/usuarios/${userId}/estatisticas`);
    } catch (error) {
      console.error('Erro ao buscar estatísticas, retornando mock:', error);
      // Fallback
      return {
        totalCursosIniciados: 3,
        totalCursosConcluidos: 2
      };
    }
  }

  // API Python Flask (Machine Learning)
  async getRecomendacoesKNN(perfil: any): Promise<any> {
    try {
      return await this.flaskRequest<any>('/recomendar', {
        method: 'POST',
        body: JSON.stringify({ skills: perfil }),
      });
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

  async preverSalario(perfil: any): Promise<any> {
    try {
      return await this.flaskRequest<any>('/prever_salario', {
        method: 'POST',
        body: JSON.stringify({ skills: perfil }),
      });
    } catch (error) {
      console.error('Erro ao prever salário, retornando mock:', error);
      // Fallback
      return {
        perfil_enviado: perfil,
        salario_medio_previsto: "R$ 8.500,00"
      };
    }
  }

  async getModeloStatus(): Promise<{ status: string }> {
    try {
      return await this.flaskRequest<{ status: string }>('/');
    } catch (error) {
      console.error('Erro ao verificar status do modelo:', error);
      // Fallback
      return { status: 'Modelo offline - usando dados mockados' };
    }
  }
}

export const apiService = new ApiService();