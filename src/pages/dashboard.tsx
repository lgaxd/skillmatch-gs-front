import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { BackgroundPrincipal } from "../components/background-principal";
import BotaoPersonalizado from "../components/botao-personalizado";
import { Loading } from "../components/loading";

interface Usuario {
  id_usuario: number;
  nome_usuario: string;
  data_cadastro: string;
}

interface CarreiraUsuario {
  id_carreira: number;
  nome_carreira: string;
  area_atuacao: string;
  progresso_percentual: number;
  xp_total: number;
  status_jornada: string;
}

interface ProgressoCurso {
  cursos_concluidos: number;
  cursos_andamento: number;
  cursos_pendentes: number;
  total_cursos: number;
}

interface RankingUsuario {
  posicao: number;
  pontuacao_total: number;
  mes_referencia: string;
}

export function Dashboard() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carreira, setCarreira] = useState<CarreiraUsuario | null>(null);
  const [progressoCursos, setProgressoCursos] = useState<ProgressoCurso | null>(null);
  const [ranking, setRanking] = useState<RankingUsuario | null>(null);

  // Dados mockados baseados no seu schema
  const usuarioMock: Usuario = {
    id_usuario: 1,
    nome_usuario: "João Silva",
    data_cadastro: "2024-01-15"
  };

  const carreiraMock: CarreiraUsuario = {
    id_carreira: 1,
    nome_carreira: "Desenvolvedor Front-end",
    area_atuacao: "Programação",
    progresso_percentual: 25.50,
    xp_total: 1250,
    status_jornada: "Em Andamento"
  };

  const progressoCursosMock: ProgressoCurso = {
    cursos_concluidos: 2,
    cursos_andamento: 1,
    cursos_pendentes: 7,
    total_cursos: 10
  };

  const rankingMock: RankingUsuario = {
    posicao: 7,
    pontuacao_total: 1250,
    mes_referencia: "2024-01"
  };

  useEffect(() => {
    const carregarDashboard = async () => {
      setIsLoading(true);
      try {
        // Simulação de chamada à API
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Aqui viriam as chamadas reais para a API baseadas no seu schema:
        // - TB_USUARIO + TB_LOGIN_USUARIO (dados do usuário)
        // - TB_USUARIO_CARREIRA + TB_CARREIRA + TB_AREAS_ATUACAO (carreira atual)
        // - TB_USUARIO_CURSO (progresso dos cursos)
        // - TB_RANKING (posição no ranking)
        
        setUsuario(usuarioMock);
        setCarreira(carreiraMock);
        setProgressoCursos(progressoCursosMock);
        setRanking(rankingMock);
        
      } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
      } finally {
        setIsLoading(false);
      }
    };

    carregarDashboard();
  }, []);

  const calcularNivel = (xp: number) => {
    // Baseado na sua estrutura de XP, calculamos o nível
    // Cada nível requer 500 XP
    return Math.floor(xp / 500) + 1;
  };

  const calcularProgressoNivel = (xp: number, nivel: number) => {
    const xpNivelAtual = (nivel - 1) * 500;
    const xpProximoNivel = nivel * 500;
    const xpNecessario = xpProximoNivel - xp;
    const progresso = ((xp - xpNivelAtual) / 500) * 100;
    
    return { xpProximoNivel, xpNecessario, progresso };
  };

  const handleVerJornada = () => {
    // Futuramente navegará para a página de skills da carreira
    navigate("/perfil");
  };

  const handleVerRanking = () => {
    navigate("/ranking");
  };

  const handleVerPerfil = () => {
    navigate("/perfil");
  };

  const handleTrocarCarreira = () => {
    navigate("/recomendacoes");
  };

  if (isLoading || !usuario || !carreira || !progressoCursos) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <BackgroundPrincipal />
        <div className="relative z-10">
          <Loading message="Carregando seu dashboard..." size="lg" />
        </div>
      </div>
    );
  }

  const nivelAtual = calcularNivel(carreira.xp_total);
  const { xpProximoNivel, xpNecessario, progresso } = calcularProgressoNivel(carreira.xp_total, nivelAtual);

  return (
    <div className="relative min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <BackgroundPrincipal />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header do Dashboard */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Bem-vindo de volta, {usuario.nome_usuario}! 👋
              </h1>
              <p className="text-gray-600 mb-4">
                Continue sua jornada em <strong>{carreira.nome_carreira}</strong> - {carreira.area_atuacao}
              </p>
              
              {/* Nível e XP - Baseado na TB_USUARIO_CARREIRA.xp_total */}
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">Nível {nivelAtual}</div>
                  <div className="text-sm text-gray-500">Seu nível</div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>{carreira.xp_total} XP</span>
                    <span>{xpProximoNivel} XP</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${progresso}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {xpNecessario} XP para o próximo nível
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleVerPerfil}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Meu Perfil
              </button>
              <button
                onClick={handleTrocarCarreira}
                className="px-4 py-2 text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors cursor-pointer"
              >
                Trocar Carreira
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna 1: Progresso e Ações Rápidas */}
          <div className="lg:col-span-2 space-y-8">
            {/* Card de Progresso da Jornada - Baseado na TB_USUARIO_CARREIRA */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Sua Jornada</h2>
                <span className="text-sm font-semibold text-indigo-600">
                  {carreira.progresso_percentual}% Concluído
                </span>
              </div>
              
              <div className="mb-6">
                <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                  <div 
                    className="bg-green-500 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${carreira.progresso_percentual}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Progresso Geral</span>
                  <span>{carreira.progresso_percentual}%</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{progressoCursos.cursos_concluidos}</div>
                  <div className="text-sm text-blue-800">Cursos Concluídos</div>
                  <div className="text-xs text-blue-600">de {progressoCursos.total_cursos}</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{progressoCursos.cursos_andamento}</div>
                  <div className="text-sm text-green-800">Cursos em Andamento</div>
                  <div className="text-xs text-green-600">de {progressoCursos.total_cursos}</div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">Status da Jornada</h3>
                <p className="text-gray-600 mb-3">{carreira.status_jornada}</p>
                <BotaoPersonalizado
                  texto="Continuar Jornada"
                  onClick={handleVerJornada}
                  className="w-full"
                />
              </div>
            </div>

            {/* Card de Atividades Recentes - Baseado na TB_USUARIO_CURSO */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Atividades Recentes</h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600">✅</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">Curso concluído</p>
                    <p className="text-sm text-gray-600">HTML5 e CSS3 Fundamentos</p>
                    <p className="text-xs text-gray-500">Há 2 horas • +100 XP</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600">📚</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">Curso em andamento</p>
                    <p className="text-sm text-gray-600">CSS Grid e Flexbox</p>
                    <p className="text-xs text-gray-500">65% concluído • Continuar estudando</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 bg-purple-50 rounded-lg">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600">🎯</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">Jornada iniciada</p>
                    <p className="text-sm text-gray-600">{carreira.nome_carreira}</p>
                    <p className="text-xs text-gray-500">15 de Janeiro de 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna 2: Ranking e Estatísticas */}
          <div className="space-y-8">
            {/* Card de Ranking - Baseado na TB_RANKING */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Ranking Mensal</h2>
                <button 
                  onClick={handleVerRanking}
                  className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm cursor-pointer"
                >
                  Ver ranking completo
                </button>
              </div>
              
              <div className="space-y-3">
                {ranking && (
                  <div className={`flex items-center justify-between p-3 rounded-lg border ${
                    ranking.posicao <= 3 
                      ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200' 
                      : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                        ranking.posicao === 1 ? 'bg-yellow-500' :
                        ranking.posicao === 2 ? 'bg-gray-400' :
                        ranking.posicao === 3 ? 'bg-orange-500' : 'bg-blue-500'
                      }`}>
                        {ranking.posicao}º
                      </div>
                      <span className="font-semibold text-gray-800">Você</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-800">{ranking.pontuacao_total} XP</div>
                      <div className="text-xs text-gray-600">
                        {ranking.posicao === 1 ? 'Líder' : 
                         ranking.posicao <= 3 ? 'Top 3' : 'Em progresso'}
                      </div>
                    </div>
                  </div>
                )}

                {/* Top 3 do ranking (dados mockados baseados no seu INSERT) */}
                <div className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      1º
                    </div>
                    <span className="text-gray-700">Amanda Ferreira</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-700">5000 XP</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      2º
                    </div>
                    <span className="text-gray-700">Fernanda Rocha</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-700">4500 XP</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      3º
                    </div>
                    <span className="text-gray-700">Ana Costa</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-700">3800 XP</div>
                  </div>
                </div>
              </div>

              {ranking && ranking.posicao <= 3 && (
                <div className="mt-4 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                  <p className="text-sm text-indigo-800 text-center">
                    {ranking.posicao === 1 ? '🏆 Você está no topo do ranking!' :
                     ranking.posicao === 2 ? '🥈 Excelente! Você está em 2º lugar!' :
                     '🥉 Parabéns! Você está no pódio!'}
                  </p>
                </div>
              )}
            </div>

            {/* Card de Estatísticas - Baseado nas tabelas existentes */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Estatísticas</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-800">{carreira.xp_total}</div>
                  <div className="text-xs text-gray-600">XP Total</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-800">{progressoCursos.cursos_concluidos}</div>
                  <div className="text-xs text-gray-600">Cursos Concluídos</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-800">{nivelAtual}</div>
                  <div className="text-xs text-gray-600">Nível Atual</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-800">{ranking?.posicao || '-'}</div>
                  <div className="text-xs text-gray-600">Posição Ranking</div>
                </div>
              </div>
            </div>

            {/* Card de Status da Carreira - Baseado na TB_USUARIO_CARREIRA */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Sua Carreira</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Carreira:</span>
                  <span className="font-semibold text-gray-800">{carreira.nome_carreira}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Área:</span>
                  <span className="font-semibold text-gray-800">{carreira.area_atuacao}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-semibold ${
                    carreira.status_jornada === 'Em Andamento' ? 'text-green-600' :
                    carreira.status_jornada === 'Concluída' ? 'text-blue-600' :
                    carreira.status_jornada === 'Pausada' ? 'text-yellow-600' : 'text-gray-600'
                  }`}>
                    {carreira.status_jornada}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Início:</span>
                  <span className="font-semibold text-gray-800">
                    {new Date(usuario.data_cadastro).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}