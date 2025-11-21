import type { User } from "./user";

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface LoginRequest {
  email: string;
  senha: string; // Mudar de 'password' para 'senha' para match com backend
}

export interface LoginResponse {
  id: number; // Mudar de string para number
  nome: string;
  email: string;
}


// Tipos para Carreiras
export interface Carreira {
  id_carreira: number;
  nome_carreira: string;
  area_atuacao: string;
  descricao: string;
  demanda: 'alta' | 'media' | 'baixa';
  salario_medio: string;
  tempo_preparacao: string;
  skills_principais: string[];
}

export interface CarreiraUsuario {
  id_carreira: number;
  nome_carreira: string;
  area_atuacao: string;
  progresso_percentual: number;
  xp_total: number;
  data_inicio: string;
  status_jornada: 'Não Iniciada' | 'Em Andamento' | 'Concluída' | 'Pausada';
}

// Tipos para Skills
export interface Skill {
  id_skill: number;
  nome_skill: string;
  descricao_skill: string;
  nivel_dificuldade: 'Iniciante' | 'Intermediário' | 'Avançado';
  tempo_estimado_horas: number;
  xp_skill: number;
  ordem_trilha: number;
  concluida: boolean;
  progresso_percentual: number;
}

export interface SkillComCursos extends Skill {
  cursos: Curso[];
}

// Tipos para Cursos
export interface Curso {
  id_curso: number;
  nome_curso: string;
  link_curso: string;
  plataforma: string;
  duracao_estimada_horas: number;
  dificuldade: string;
  status_curso: 'Pendente' | 'Em andamento' | 'Concluído';
  progresso_percentual: number;
}

// Tipos para Ranking
export interface UsuarioRanking {
  id_usuario: number;
  nome_usuario: string;
  posicao: number;
  pontuacao_total: number;
  carreira: string;
  area_atuacao: string;
  mes_referencia: string;
}

export interface RankingUsuario {
  posicao: number;
  pontuacao_total: number;
  mes_referencia: string;
}

// Tipos para Dashboard
export interface DashboardData {
  usuario: User;
  carreira: CarreiraUsuario;
  progressoCursos: ProgressoCursos;
  ranking: RankingUsuario;
}

export interface ProgressoCursos {
  cursos_concluidos: number;
  cursos_andamento: number;
  cursos_pendentes: number;
  total_cursos: number;
}

// Tipos para KNN/Recomendações
export interface PerfilProfissional {
  experienciaAnos: string;
  areaAtual: string;
  nivelSenioridade: string;
  estiloTrabalho: string;
  interessesTecnologia: string;
  interessesNegocios: string;
  interessesCriatividade: string;
  habilidadesComunicacao: string;
  habilidadesLideranca: string;
  habilidadesAnalise: string;
  preferenciaAmbiente: string;
  disponibilidadeEstudo: string;
  objetivoCarreira: string;
  faixaSalarial: string;
  mobilidadeGeografica: string;
}

export interface RecomendacaoCarreira extends Carreira {
  alinhamento: number;
}