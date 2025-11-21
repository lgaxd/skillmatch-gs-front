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
import type { CarreiraUsuario, DashboardData } from '../types/api';

export function Dashboard() {
  const navigate = useNavigate();
  const { dashboardCompleto, isLoading, error, recarregarDashboard } = useDashboard();

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
      if (error || !dashboardCompleto) {
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
                  {error || "Não foi possível carregar os dados do dashboard"}
                </p>
                <div className="space-y-3">
                  <button
                    onClick={() => recarregarDashboard()}
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

      const {
        usuario,
        carreiraUsuario,
        dashboardData,
        estatisticas,
        ranking
      } = dashboardCompleto;

      // Preparar dados para os componentes
      const carreiraCompativel = carreiraUsuario ? {
        id: carreiraUsuario.id,
        usuario: carreiraUsuario.usuario,
        carreira: carreiraUsuario.carreira,
        idStatusJornada: carreiraUsuario.idStatusJornada,
        progresso: carreiraUsuario.progresso,
        xp: carreiraUsuario.xp,
      } : null;

      const progressoCursosCompativel = {
        cursos_concluidos: estatisticas.totalCursosConcluidos,
        cursos_andamento: Math.max(0, estatisticas.totalCursosIniciados - estatisticas.totalCursosConcluidos),
        cursos_pendentes: Math.max(0, 10 - estatisticas.totalCursosIniciados), // Estimativa
        total_cursos: 10
      };

      const rankingCompativel = ranking ? {
        posicao: ranking.posicao,
        pontuacao_total: ranking.pontuacao,
        mes_referencia: ranking.mesReferencia
      } : null;

      return (
        <div className="relative min-h-screen py-8 px-4 sm:px-6 lg:px-8">
          <BackgroundPrincipal />

          <div className="relative z-10 max-w-7xl mx-auto">
            {/* Header do Dashboard */}
            <Card className="mb-8" padding="lg">
              <DashboardHeader
                usuario={usuario}
                carreira={carreiraCompativel}
                dashboardData={dashboardData}
                onVerPerfil={() => navigate('/perfil')}
                onTrocarCarreira={() => navigate('/recomendacoes')}
              />
            </Card>

            {carreiraCompativel ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Coluna 1: Progresso e Ações Rápidas */}
                <div className="lg:col-span-2 space-y-8">
                  <ProgressoJornada
                    carreira={carreiraCompativel}
                    progressoCursos={progressoCursosCompativel}
                    onContinuarJornada={() => {
                      if (carreiraCompativel.id) {
                        navigate(`/trilha/${carreiraCompativel.carreira.id}`);
                      } else {
                        navigate('/recomendacoes');
                      }
                    }}
                  />

                  <AtividadesRecentes />
                </div>

                {/* Coluna 2: Ranking e Estatísticas */}
                <div className="space-y-8">
                  {rankingCompativel && (
                    <RankingCard
                      ranking={rankingCompativel}
                      onVerRanking={() => navigate('/ranking')}
                    />
                  )}

                  <EstatisticasCarreira
                    carreira={carreiraCompativel}
                    progressoCursos={progressoCursosCompativel}
                  />
                </div>
              </div>
            ) : (
              // Estado quando o usuário não tem carreira selecionada
              <div className="text-center py-12">
                <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto">
                  <div className="text-6xl mb-4">🎯</div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Bem-vindo ao SkillMatch, {usuario.nome}!
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Você ainda não selecionou uma carreira. Comece sua jornada de requalificação
                    profissional descobrindo as carreiras mais alinhadas com seu perfil.
                  </p>
                  <div className="space-y-4">
                    <button
                      onClick={() => navigate('/formulario-perfil')}
                      className="w-full px-8 py-4 text-lg font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors cursor-pointer"
                    >
                      Descobrir Minhas Carreiras
                    </button>
                    <button
                      onClick={() => navigate('/recomendacoes')}
                      className="w-full px-8 py-4 text-lg font-semibold text-gray-700 bg-gray-100 border border-gray-300 rounded-xl hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      Ver Carreiras Disponíveis
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    // Subcomponente Header do Dashboard
    interface DashboardHeaderProps {
      usuario: { id: number; nome: string; dataNascimento: string };
      carreira: CarreiraUsuario | null;
      dashboardData: DashboardData;
      onVerPerfil: () => void;
      onTrocarCarreira: () => void;
    }

    const DashboardHeader: React.FC<DashboardHeaderProps> = ({
      usuario,
      carreira,
      dashboardData,
      onVerPerfil,
      onTrocarCarreira
    }) => {
      const nomeUsuario = usuario?.nome || 'Usuário';
      const nomeCarreira = carreira?.carreira.nome || dashboardData.carreiraAtual || 'Nenhuma carreira selecionada';

      // Usar o progresso da carreira se disponível, senão usar do dashboardData
      const progresso = carreira?.progresso || dashboardData.progressoCarreira || 0;
      const xpTotal = carreira?.xp || dashboardData.xpTotal || 0;

      const nivelAtual = calcularNivel(xpTotal);
      const { progresso: progressoNivel } = calcularProgressoNivel(xpTotal, nivelAtual);

      return (
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Bem-vindo de volta, {nomeUsuario}! 👋
            </h1>
            <p className="text-gray-600 mb-4">
              {carreira ? (
                <>Continue sua jornada em <strong>{nomeCarreira}</strong></>
              ) : (
                <>Comece sua jornada de requalificação profissional</>
              )}
            </p>

            {carreira && (
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">Nível {nivelAtual}</div>
                  <div className="text-sm text-gray-500">Seu nível</div>
                </div>
                <div className="flex-1">
                  <ProgressBar value={progressoNivel} label={`${xpTotal} XP`} />
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>Progresso da Jornada: {progresso}%</span>
                    <span>{xpTotal} XP</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onVerPerfil}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Meu Perfil
            </button>

            {carreira ? (
              <button
                onClick={onTrocarCarreira}
                className="px-4 py-2 text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors cursor-pointer"
              >
                Trocar Carreira
              </button>
            ) : (
              <button
                onClick={onTrocarCarreira}
                className="px-4 py-2 text-green-700 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors cursor-pointer"
              >
                Escolher Carreira
              </button>
            )}
          </div>
        </div>
      );
    };