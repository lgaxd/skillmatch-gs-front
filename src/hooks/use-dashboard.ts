import { useState, useEffect } from 'react';
import type { DashboardData } from '../types/api';
import { apiService } from '../services/api';
import { useAuth } from './use-auth';

export const useDashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const carregarDashboard = async () => {
      if (!user) return;

      try {
        setIsLoading(true);
        setError(null);
        const data = await apiService.getDashboard(user.id_usuario);
        setDashboardData(data);
      } catch (err) {
        console.error("Erro ao carregar dashboard:", err);
        setError("Erro ao carregar dados do dashboard");
        
        // Fallback para dados mockados temporariamente
        const mockData: DashboardData = {
          usuario: user,
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
        setDashboardData(mockData);
      } finally {
        setIsLoading(false);
      }
    };

    carregarDashboard();
  }, [user]);

  return {
    dashboardData,
    isLoading,
    error
  };
};