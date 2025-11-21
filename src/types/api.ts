export interface User {
  id: number;
  nome: string;
  dataNascimento: string;
}

export interface Carreira {
  id: number;
  nome: string;
  descricao: string;
  demanda: number;
}

export interface Skill {
  id: number;
  nome: string;
  nivel: string;
}

export interface CarreiraSkill {
  id: number;
  carreira: Carreira;
  skill: Skill;
  ordem: number;
}

export interface Curso {
  id: number;
  skill: Skill;
  nome: string;
  link: string;
}

export interface UsuarioCurso {
  id: number;
  usuario: User;
  curso: Curso;
  status: 'Pendente' | 'Em andamento' | 'Concluído';
  progresso: number;
}

export interface Ranking {
  id: number;
  usuario: User;
  pontuacao: number;
  posicao: number;
  mesReferencia: string;
}

export interface CarreiraUsuario {
  id: number;
  usuario: User;
  carreira: Carreira;
  idStatusJornada: number;
  progresso: number;
  xp: number;
}

export interface DashboardData {
  nomeUsuario: string;
  carreiraAtual: string;
  progressoCarreira: number;
  xpTotal: number;
  cursosConcluidos: number;
}

export interface Estatisticas {
  totalCursosIniciados: number;
  totalCursosConcluidos: number;
}

// Interface para o dashboard completo
export interface DashboardCompleto {
  usuario: User;
  carreiraUsuario: CarreiraUsuario | null;
  dashboardData: DashboardData;
  estatisticas: Estatisticas;
  ranking: Ranking | null;
}

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  id: number;
  nome: string;
  email: string;
  dataNascimento?: string;
}

export interface RegisterRequest {
  nome: string;
  email: string;
  senha: string;
  dataNascimento?: string;
}

export interface RegisterResponse {
  id: number;
  nome: string;
  email: string;
  dataNascimento?: string;
}