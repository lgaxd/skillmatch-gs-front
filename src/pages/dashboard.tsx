import { useNavigate } from "react-router-dom";
import { BackgroundPrincipal } from "../components/background-principal";
import { Loading } from "../components/ui/feedback/loading";
import { Card } from "../components/ui/layout/card";
import { ProgressoJornada } from "../components/features/dashboard/progresso-jornada";
import { RankingCard } from "../components/features/ranking/ranking-card";
import { AtividadesRecentes } from "../components/features/dashboard/atividades-recentes";
import { EstatisticasCarreira } from "../components/features/dashboard/estatisticas-carreira";
import { useDashboard } from "../hooks/use-dashboard";
import { calcularNivel, calcularProgressoNivel } from "../utils/calculations";
import { ProgressBar } from "../components/ui/layout/progress-bar";
import type { CarreiraUsuario } from '../types/api';

export function Dashboard() {
  const navigate = useNavigate();
  const { dashboardData, isLoading, error } = useDashboard();

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <BackgroundPrincipal />
        <div className="relative z-10">
          <Loading message="Carregando seu dashboard..." size="lg" />
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <BackgroundPrincipal />
        <div className="relative z-10 bg-white rounded-2xl p-8 shadow-2xl max-w-md">
          <div className="text-center">
            <div className="text-6xl mb-4">😕</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Erro ao Carregar
            </h2>
            <p className="text-gray-600 mb-4">
              {error}
            </p>
            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors cursor-pointer"
              >
                Tentar Novamente
              </button>
              <button
                onClick={() => navigate('/')}
                className="w-full px-6 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-xl hover:bg-gray-200 transition-colors cursor-pointer"
              >
                Voltar ao Início
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Se não há dados mesmo após loading
  if (!dashboardData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <BackgroundPrincipal />
        <div className="relative z-10 bg-white rounded-2xl p-8 shadow-2xl max-w-md">
          <div className="text-center">
            <div className="text-6xl mb-4">📊</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Nenhum Dado Encontrado
            </h2>
            <p className="text-gray-600 mb-6">
              Você ainda não selecionou uma carreira.
            </p>
            <button
              onClick={() => navigate('/recomendacoes')}
              className="w-full px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors cursor-pointer"
            >
              Selecionar uma Carreira
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Dados padrão baseados na estrutura real da API
  const { 
    nomeUsuario,
    carreiraAtual,
    progressoCarreira,
    xpTotal,
    cursosConcluidos
  } = dashboardData;

  // Criar estrutura compatível com os componentes
  const carreiraCompativel: CarreiraUsuario = {
    id: 1,
    usuario: {
      id: 1,
      nome: nomeUsuario,
      dataNascimento: ""
    },
    carreira: {
      id: 1,
      nome: carreiraAtual,
      descricao: carreiraAtual
    },
    idStatusJornada: 2, // Em Andamento
    progresso: progressoCarreira,
    xp: xpTotal,
    data_inicio: new Date().toISOString().split('T')[0]
  };

  const progressoCursosCompativel = {
    cursos_concluidos: cursosConcluidos,
    cursos_andamento: Math.max(0, 3 - cursosConcluidos), // Estimativa
    cursos_pendentes: Math.max(0, 10 - cursosConcluidos), // Estimativa
    total_cursos: 10
  };

  const rankingCompativel = {
    posicao: 7, // Valor padrão
    pontuacao_total: xpTotal,
    mes_referencia: new Date().toISOString().slice(0, 7) // YYYY-MM
  };

  return (
    <div className="relative min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <BackgroundPrincipal />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header do Dashboard */}
        <Card className="mb-8" padding="lg">
          <DashboardHeader 
            usuario={{ nome: nomeUsuario }}
            carreira={carreiraCompativel}
            onVerPerfil={() => navigate('/perfil')}
            onTrocarCarreira={() => navigate('/recomendacoes')}
          />
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna 1: Progresso e Ações Rápidas */}
          <div className="lg:col-span-2 space-y-8">
            <ProgressoJornada 
              carreira={carreiraCompativel}
              progressoCursos={progressoCursosCompativel}
              onContinuarJornada={() => {
                if (carreiraCompativel.id && carreiraCompativel.id > 0) {
                  navigate(`/trilha/${carreiraCompativel.id}`);
                } else {
                  navigate('/recomendacoes');
                }
              }}
            />
            
            <AtividadesRecentes />
          </div>

          {/* Coluna 2: Ranking e Estatísticas */}
          <div className="space-y-8">
            <RankingCard 
              ranking={rankingCompativel}
              onVerRanking={() => navigate('/ranking')}
            />
            
            <EstatisticasCarreira 
              carreira={carreiraCompativel}
              progressoCursos={progressoCursosCompativel}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Subcomponente Header do Dashboard
interface DashboardHeaderProps {
  usuario: { nome: string };
  carreira: CarreiraUsuario;
  onVerPerfil: () => void;
  onTrocarCarreira: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  usuario, 
  carreira, 
  onVerPerfil, 
  onTrocarCarreira 
}) => {
  const nomeUsuario = usuario?.nome || 'Usuário';
  const nomeCarreira = carreira?.carreira?.nome || 'Nenhuma carreira selecionada';
  const xpTotal = carreira?.xp || 0;
  
  const nivelAtual = calcularNivel(xpTotal);
  const { progresso } = calcularProgressoNivel(xpTotal, nivelAtual);

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Bem-vindo de volta, {nomeUsuario}! 👋
        </h1>
        <p className="text-gray-600 mb-4">
          Continue sua jornada em <strong>{nomeCarreira}</strong>
        </p>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">Nível {nivelAtual}</div>
            <div className="text-sm text-gray-500">Seu nível</div>
          </div>
          <div className="flex-1">
            <ProgressBar value={progresso} label={`${xpTotal} XP`} />
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onVerPerfil}
          className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Meu Perfil
        </button>
        <button
          onClick={onTrocarCarreira}
          className="px-4 py-2 text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors cursor-pointer"
        >
          Trocar Carreira
        </button>
      </div>
    </div>
  );
};