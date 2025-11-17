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
  if (error || !dashboardData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <BackgroundPrincipal />
        <div className="relative z-10 bg-white rounded-2xl p-8 shadow-2xl">
          <div className="text-center">
            <div className="text-6xl mb-4">😕</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Ops! Algo deu errado
            </h2>
            <p className="text-gray-600 mb-6">
              {error || "Não foi possível carregar o dashboard"}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors cursor-pointer"
            >
              Tentar Novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { usuario, carreira, progressoCursos, ranking } = dashboardData;

  return (
    <div className="relative min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <BackgroundPrincipal />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header do Dashboard */}
        <Card className="mb-8" padding="lg">
          <DashboardHeader 
            usuario={usuario}
            carreira={carreira}
            onVerPerfil={() => navigate('/perfil')}
            onTrocarCarreira={() => navigate('/recomendacoes')}
          />
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna 1: Progresso e Ações Rápidas */}
          <div className="lg:col-span-2 space-y-8">
            <ProgressoJornada 
              carreira={carreira}
              progressoCursos={progressoCursos}
              onContinuarJornada={() => navigate(`/trilha/${carreira.id_carreira}`)}
            />
            
            <AtividadesRecentes />
          </div>

          {/* Coluna 2: Ranking e Estatísticas */}
          <div className="space-y-8">
            <RankingCard 
              ranking={ranking}
              onVerRanking={() => navigate('/ranking')}
            />
            
            <EstatisticasCarreira 
              carreira={carreira}
              progressoCursos={progressoCursos}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Subcomponente Header do Dashboard
interface DashboardHeaderProps {
  usuario: any;
  carreira: any;
  onVerPerfil: () => void;
  onTrocarCarreira: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  usuario, 
  carreira, 
  onVerPerfil, 
  onTrocarCarreira 
}) => {
  const nivelAtual = calcularNivel(carreira.xp_total);
  const { progresso } = calcularProgressoNivel(carreira.xp_total, nivelAtual);

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Bem-vindo de volta, {usuario.nome_usuario}! 👋
        </h1>
        <p className="text-gray-600 mb-4">
          Continue sua jornada em <strong>{carreira.nome_carreira}</strong> - {carreira.area_atuacao}
        </p>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">Nível {nivelAtual}</div>
            <div className="text-sm text-gray-500">Seu nível</div>
          </div>
          <div className="flex-1">
            <ProgressBar value={progresso} label={`${carreira.xp_total} XP`} />
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