import type { User } from "./user";

export interface Carreira {
  id: number;
  nome: string;
  descricao?: string;
  demanda?: 'alta' | 'media' | 'baixa';
  salario_medio?: string;
  tempo_preparacao?: string;
  skills_principais?: string[];
}

export interface CarreiraUsuario {
  id: number;
  usuario: User;
  carreira: Carreira;
  idStatusJornada: number;
  progresso: number;
  xp: number;
  data_inicio?: string;
}

export interface DashboardData {
  nomeUsuario: string;
  carreiraAtual: string;
  progressoCarreira: number;
  xpTotal: number;
  cursosConcluidos: number;
}