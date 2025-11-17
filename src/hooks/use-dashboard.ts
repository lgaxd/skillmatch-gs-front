import { useState, useEffect } from 'react';
import type { DashboardData } from '../types/api';

export const useDashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('🔧 useDashboard useEffect executando');
    
    const carregarDashboard = async () => {
      try {
        console.log('🚀 Iniciando carregamento do dashboard...');
        setIsLoading(true);
        setError(null);
        
        console.log('📊 Criando dados mockados...');
        
        // Dados mockados para desenvolvimento
        const mockData: DashboardData = {
          usuario: {
            id_usuario: 1,
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
        
        console.log('✅ Dados mockados criados:', mockData);
        setDashboardData(mockData);
        
      } catch (err) {
        console.error('❌ Erro ao carregar dashboard:', err);
        setError("Erro ao carregar dados do dashboard");
      } finally {
        console.log('🏁 Finalizando carregamento do dashboard');
        setIsLoading(false);
      }
    };

    carregarDashboard();
  }, []);

  console.log('🔄 useDashboard retornando:', { dashboardData, isLoading, error });

  return {
    dashboardData,
    isLoading,
    error
  };
};