// src/hooks/use-dashboard.ts
import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { authService } from '../services/auth';
import type { DashboardCompleto } from '../types/api';

// Função auxiliar para obter mês de referência
const getMesReferenciaAtual = (): string => {
  const now = new Date();
  const ano = now.getFullYear();
  const mes = (now.getMonth() + 1).toString().padStart(2, '0');
  return `${ano}-${mes}`;
};

export const useDashboard = () => {
  const [dashboardCompleto, setDashboardCompleto] = useState<DashboardCompleto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const carregarDashboardCompleto = async () => {
    try {
      console.log('🚀 Iniciando carregamento do dashboard...');
      setIsLoading(true);
      setError(null);

      // Adicionar todos os usuários ao ranking do mês atual
      const mesAtual = getMesReferenciaAtual();
      await apiService.adicionarTodosUsuariosAoRanking(mesAtual);
      console.log(`✅ Todos os usuários adicionados ao ranking de ${mesAtual}`);

      // Atualizar o ranking de todos os usuários
      await apiService.atualizarRankingTodosUsuarios();
      console.log('✅ Ranking de todos os usuários atualizado');
      
      const userId = authService.getCurrentUserId();
      
      if (!userId) {
        throw new Error('Usuário não autenticado');
      }

      console.log(`📊 Buscando dados para usuário ${userId}...`);

      const mesReferencia = getMesReferenciaAtual();

      // Carregar todos os dados em paralelo
      const [
        usuario,
        carreiraUsuario,
        dashboardData,
        estatisticas,
        rankingUsuario,
        rankingGeral
      ] = await Promise.all([
        apiService.getUser(userId),
        apiService.getCarreiraAtual(userId).catch(() => null),
        apiService.getDashboard(userId),
        apiService.getEstatisticas(userId).catch(() => ({ totalCursosIniciados: 0, totalCursosConcluidos: 0 })),
        apiService.getRankingUsuario(userId).catch(() => null),
        apiService.getRanking(mesReferencia).catch(() => [])
      ]);

      console.log('✅ Dados carregados:', {
        usuario,
        carreiraUsuario,
        dashboardData,
        estatisticas,
        rankingUsuario,
        rankingGeralCount: rankingGeral.length
      });

      // Processar top 3 do ranking
      const top3Ranking = rankingGeral.slice(0, 3).map((item: any, index: number) => ({
        posicao: index + 1,
        nome: item.usuario?.nome || `Usuário ${index + 1}`,
        pontuacao: item.pontuacao || 0
      }));

      const dashboardCompleto: DashboardCompleto = {
        usuario,
        carreiraUsuario,
        dashboardData,
        estatisticas,
        ranking: rankingUsuario,
        top3Ranking
      };

      setDashboardCompleto(dashboardCompleto);
      
    } catch (err: any) {
      console.error('❌ Erro ao carregar dashboard:', err);
      const errorMessage = err.message || 'Erro desconhecido ao carregar dashboard';
      setError(errorMessage);
      
      // Fallback com dados mínimos
      const userId = authService.getCurrentUserId();
      const fallbackData: DashboardCompleto = {
        usuario: {
          id: userId || 0,
          nome: "Usuário",
          dataNascimento: "1990-01-01"
        },
        carreiraUsuario: null,
        dashboardData: {
          nomeUsuario: "Usuário",
          carreiraAtual: "Nenhuma carreira selecionada",
          progressoCarreira: 0,
          xpTotal: 0,
          cursosConcluidos: 0
        },
        estatisticas: {
          totalCursosIniciados: 0,
          totalCursosConcluidos: 0
        },
        ranking: null,
        top3Ranking: []
      };
      setDashboardCompleto(fallbackData);
    } finally {
      console.log('🏁 Finalizando carregamento do dashboard');
      setIsLoading(false);
    }
  };

  // Função para atualizar o progresso localmente
  const atualizarProgresso = (novoProgresso: number, novaXP: number, cursosConcluidos: number) => {
    setDashboardCompleto(prev => {
      if (!prev) return prev;

      return {
        ...prev,
        carreiraUsuario: prev.carreiraUsuario ? {
          ...prev.carreiraUsuario,
          progresso: novoProgresso,
          xp: novaXP
        } : null,
        dashboardData: {
          ...prev.dashboardData,
          progressoCarreira: novoProgresso,
          xpTotal: novaXP,
          cursosConcluidos: cursosConcluidos
        }
      };
    });
  };

  useEffect(() => {
    carregarDashboardCompleto();
  }, []);

  return {
    dashboardCompleto,
    isLoading,
    error,
    recarregarDashboard: carregarDashboardCompleto,
    atualizarProgresso
  };
};