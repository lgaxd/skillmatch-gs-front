import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { authService } from '../services/auth';
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
        
        // Obter ID do usuário autenticado
        const userId = authService.getCurrentUserId();
        console.log(`📊 Buscando dashboard para usuário ${userId}...`);
        
        // Fazer chamada REAL para a API
        console.log(`🌐 Chamando: http://localhost:8080/usuarios/${userId}/dashboard`);
        const data = await apiService.getDashboard(userId);
        
        console.log('✅ Dados recebidos da API:', data);
        
        // Verificar se os dados são válidos
        if (!data) {
          throw new Error('Dados vazios recebidos da API');
        }
        
        setDashboardData(data);
        
      } catch (err: any) {
        console.error('❌ Erro ao carregar dashboard:', err);
        const errorMessage = err.message || 'Erro desconhecido ao carregar dashboard';
        setError(errorMessage);
        
        // Usar fallback mockado apenas se necessário
        console.log('🔄 Usando dados mockados como fallback...');
        setDashboardData(mockData);
      } finally {
        console.log('🏁 Finalizando carregamento do dashboard');
        setIsLoading(false);
      }
    };

    carregarDashboard();
  }, []);

  console.log('🔄 useDashboard retornando:', { 
    hasData: !!dashboardData, 
    isLoading, 
    error,
    dataStructure: dashboardData ? {
      hasUsuario: !!dashboardData.usuario,
      hasCarreira: !!dashboardData.carreira,
      hasProgresso: !!dashboardData.progressoCursos,
      hasRanking: !!dashboardData.ranking
    } : 'no data'
  });

  return {
    dashboardData,
    isLoading,
    error
  };
};

// Dados mockados apenas para fallback em caso de erro
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