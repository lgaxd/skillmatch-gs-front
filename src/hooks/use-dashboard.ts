import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { authService } from '../services/auth';
import type { DashboardCompleto } from '../types/api';

export const useDashboard = () => {
  const [dashboardCompleto, setDashboardCompleto] = useState<DashboardCompleto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const carregarDashboardCompleto = async () => {
      try {
        console.log('🚀 Iniciando carregamento do dashboard...');
        setIsLoading(true);
        setError(null);
        
        const userId = authService.getCurrentUserId();
        
        if (!userId) {
          throw new Error('Usuário não autenticado');
        }

        console.log(`📊 Buscando dados para usuário ${userId}...`);

        // Carregar todos os dados em paralelo
        const [
          usuario,
          carreiraUsuario,
          dashboardData,
          estatisticas,
          ranking
        ] = await Promise.all([
          apiService.getUser(userId),
          apiService.getCarreiraAtual(userId).catch(() => null), // Pode não ter carreira
          apiService.getDashboard(userId),
          apiService.getEstatisticas(userId).catch(() => ({ totalCursosIniciados: 0, totalCursosConcluidos: 0 })),
          apiService.getRankingUsuario(userId).catch(() => null) // Pode não estar no ranking
        ]);

        console.log('✅ Dados carregados:', {
          usuario,
          carreiraUsuario,
          dashboardData,
          estatisticas,
          ranking
        });

        const dashboardCompleto: DashboardCompleto = {
          usuario,
          carreiraUsuario,
          dashboardData,
          estatisticas,
          ranking
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
          ranking: null
        };
        setDashboardCompleto(fallbackData);
      } finally {
        console.log('🏁 Finalizando carregamento do dashboard');
        setIsLoading(false);
      }
    };

    carregarDashboardCompleto();
  }, []);

  return {
    dashboardCompleto,
    isLoading,
    error
  };
};