import { useState, useEffect } from 'react';

interface DashboardData {
  usuario: any;
  carreira: any;
  progressoCursos: any;
  ranking: any;
}

export const useDashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const carregarDashboard = async () => {
      try {
        // Simulação de dados - futuramente substituir pela API real
        const mockData: DashboardData = {
          usuario: {
            id_usuario: 1,
            nome_usuario: "João Silva",
            data_cadastro: "2024-01-15"
          },
          carreira: {
            id_carreira: 1,
            nome_carreira: "Desenvolvedor Front-end",
            area_atuacao: "Programação",
            progresso_percentual: 25.50,
            xp_total: 1250,
            status_jornada: "Em Andamento",
            data_inicio: "2024-01-15"
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

        await new Promise(resolve => setTimeout(resolve, 1000)); // Simula delay
        setDashboardData(mockData);
        
      } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
      } finally {
        setIsLoading(false);
      }
    };

    carregarDashboard();
  }, []);

  return {
    dashboardData,
    isLoading
  };
};