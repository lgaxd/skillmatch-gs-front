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
        
        if (!userId) {
          throw new Error('Usuário não autenticado');
        }

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
    dashboardData
  });

  return {
    dashboardData,
    isLoading,
    error
  };
};

// Dados mockados apenas para fallback em caso de erro
const mockData: DashboardData = {
  nomeUsuario: "João Silva",
  carreiraAtual: "Desenvolvedor Front-end",
  progressoCarreira: 25.50,
  xpTotal: 1250,
  cursosConcluidos: 2
};