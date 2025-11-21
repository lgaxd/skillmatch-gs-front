import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { BackgroundPrincipal } from "../components/background-principal";
import BotaoPersonalizado from "../components/ui/buttons/botao-personalizado";
import { Loading } from "../components/ui/feedback/loading";
import { authService } from "../services/auth";
import { apiService } from "../services/api";

interface UsuarioRanking {
  id_usuario: number;
  nome_usuario: string;
  posicao: number;
  pontuacao_total: number;
  carreira: string;
  area_atuacao: string;
  mes_referencia: string;
}

interface RankingUsuario {
  posicao: number;
  pontuacao_total: number;
  mes_referencia: string;
}

export function Ranking() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [rankingGeral, setRankingGeral] = useState<UsuarioRanking[]>([]);
  const [meuRanking, setMeuRanking] = useState<RankingUsuario | null>(null);
  const [mesSelecionado, setMesSelecionado] = useState('2025-11');

  // Dados mockados baseados no seu schema - TB_RANKING + TB_USUARIO + TB_USUARIO_CARREIRA + TB_CARREIRA
  const rankingMock: UsuarioRanking[] = [
    {
      id_usuario: 10,
      nome_usuario: "Amanda Ferreira",
      posicao: 1,
      pontuacao_total: 5000,
      carreira: "Marketing Digital",
      area_atuacao: "Comercial",
      mes_referencia: "2024-01"
    },
    {
      id_usuario: 6,
      nome_usuario: "Fernanda Rocha",
      posicao: 2,
      pontuacao_total: 4500,
      carreira: "UI Designer",
      area_atuacao: "Design",
      mes_referencia: "2024-01"
    },
    {
      id_usuario: 4,
      nome_usuario: "Ana Costa",
      posicao: 3,
      pontuacao_total: 3800,
      carreira: "Desenvolvedor Back-end",
      area_atuacao: "Programação",
      mes_referencia: "2024-01"
    },
    {
      id_usuario: 8,
      nome_usuario: "Juliana Pereira",
      posicao: 4,
      pontuacao_total: 3025,
      carreira: "Executivo de Vendas",
      area_atuacao: "Comercial",
      mes_referencia: "2024-01"
    },
    {
      id_usuario: 2,
      nome_usuario: "Maria Santos",
      posicao: 5,
      pontuacao_total: 2200,
      carreira: "UX Designer",
      area_atuacao: "Design",
      mes_referencia: "2024-01"
    },
    {
      id_usuario: 5,
      nome_usuario: "Carlos Lima",
      posicao: 6,
      pontuacao_total: 1650,
      carreira: "Cientista de Dados",
      area_atuacao: "Dados",
      mes_referencia: "2024-01"
    },
    {
      id_usuario: 1,
      nome_usuario: "João Silva",
      posicao: 7,
      pontuacao_total: 1250,
      carreira: "Desenvolvedor Front-end",
      area_atuacao: "Programação",
      mes_referencia: "2024-01"
    },
    {
      id_usuario: 7,
      nome_usuario: "Ricardo Alves",
      posicao: 8,
      pontuacao_total: 790,
      carreira: "DevOps Engineer",
      area_atuacao: "Infraestrutura",
      mes_referencia: "2024-01"
    },
    {
      id_usuario: 3,
      nome_usuario: "Pedro Oliveira",
      posicao: 9,
      pontuacao_total: 650,
      carreira: "Analista de Dados",
      area_atuacao: "Dados",
      mes_referencia: "2024-01"
    },
    {
      id_usuario: 9,
      nome_usuario: "Bruno Souza",
      posicao: 10,
      pontuacao_total: 260,
      carreira: "Product Manager",
      area_atuacao: "Programação",
      mes_referencia: "2024-01"
    }
  ];

  const meuRankingMock: RankingUsuario = {
    posicao: 7,
    pontuacao_total: 1250,
    mes_referencia: "2024-01"
  };

  const mesesDisponiveis = [
    { value: '2025-11', label: 'Novembro 2025' },
    { value: '2024-01', label: 'Janeiro 2024' },
    { value: '2023-12', label: 'Dezembro 2023' },
    { value: '2023-11', label: 'Novembro 2023' }
  ];

  useEffect(() => {
  const carregarRanking = async () => {
    setIsLoading(true);
    try {
      // Buscar ranking geral
      const rankingGeralAPI = await apiService.getRanking(mesSelecionado);
      
      // Converter para o formato do componente
      const rankingFormatado = rankingGeralAPI.map((item: any) => ({
        id_usuario: item.usuario.id,
        nome_usuario: item.usuario.nome,
        posicao: item.posicao,
        pontuacao_total: item.pontuacao,
        carreira: "Carreira", // Você precisará buscar a carreira de cada usuário
        area_atuacao: "Tecnologia",
        mes_referencia: item.mesReferencia
      }));

      setRankingGeral(rankingFormatado);
      
      // Buscar ranking do usuário atual
      const userId = authService.getCurrentUserId();
      const meuRankingAPI = await apiService.getRankingUsuario(userId);
      
      setMeuRanking({
        posicao: meuRankingAPI.posicao,
        pontuacao_total: meuRankingAPI.pontuacao,
        mes_referencia: meuRankingAPI.mesReferencia
      });
      
    } catch (error) {
      console.error("Erro ao carregar ranking:", error);
      // Usar dados mockados em caso de erro
      setRankingGeral(rankingMock);
      setMeuRanking(meuRankingMock);
    } finally {
      setIsLoading(false);
    }
  };

  carregarRanking();
}, [mesSelecionado]);

  const getMedalha = (posicao: number) => {
    switch (posicao) {
      case 1: return { icone: "🥇", cor: "from-yellow-400 to-yellow-500", texto: "Ouro" };
      case 2: return { icone: "🥈", cor: "from-gray-400 to-gray-500", texto: "Prata" };
      case 3: return { icone: "🥉", cor: "from-orange-400 to-orange-500", texto: "Bronze" };
      default: return { icone: "⭐", cor: "from-blue-400 to-blue-500", texto: "Estrela" };
    }
  };

  const getCorPosicao = (posicao: number) => {
    switch (posicao) {
      case 1: return "bg-gradient-to-r from-yellow-100 to-yellow-200 border-yellow-300";
      case 2: return "bg-gradient-to-r from-gray-100 to-gray-200 border-gray-300";
      case 3: return "bg-gradient-to-r from-orange-100 to-orange-200 border-orange-300";
      case 4: case 5: return "bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200";
      default: return "bg-white border-gray-200";
    }
  };

  const getBadgeArea = (area: string) => {
    const cores = {
      'Programação': 'bg-blue-100 text-blue-800 border-blue-200',
      'Design': 'bg-purple-100 text-purple-800 border-purple-200',
      'Comercial': 'bg-green-100 text-green-800 border-green-200',
      'Dados': 'bg-orange-100 text-orange-800 border-orange-200',
      'Infraestrutura': 'bg-red-100 text-red-800 border-red-200'
    };
    return cores[area as keyof typeof cores] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const calcularNivel = (xp: number) => {
    return Math.floor(xp / 500) + 1;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <BackgroundPrincipal />
        <div className="relative z-10">
          <Loading message="Carregando ranking..." size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <BackgroundPrincipal />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black mb-4">
            Ranking Mensal 🏆
          </h1>
          <p className="text-xl text-black opacity-90">
            Os usuários com maior pontuação deste mês
          </p>
        </div>

        {/* Filtro de Mês */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Selecione o mês de referência
              </h2>
            </div>
            <select
              value={mesSelecionado}
              onChange={(e) => setMesSelecionado(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {mesesDisponiveis.map((mes) => (
                <option key={mes.value} value={mes.value}>
                  {mes.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Ranking Geral */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Header da Tabela */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white">
                    Top 10 - {mesesDisponiveis.find(m => m.value === mesSelecionado)?.label}
                  </h2>
                  <div className="text-black text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
                    {rankingGeral.length} competidores
                  </div>
                </div>
              </div>

              {/* Lista do Ranking */}
              <div className="divide-y divide-gray-100">
                {rankingGeral.map((usuario) => {
                  const medalha = getMedalha(usuario.posicao);
                  const nivel = calcularNivel(usuario.pontuacao_total);
                  
                  return (
                    <div 
                      key={usuario.id_usuario}
                      className={`p-6 border-l-4 ${
                        usuario.posicao <= 3 ? 'border-l-4' : 'border-l-2'
                      } ${
                        usuario.posicao <= 3 
                          ? getCorPosicao(usuario.posicao) 
                          : 'bg-white hover:bg-gray-50'
                      } transition-colors duration-200 ${
                        usuario.posicao === meuRanking?.posicao ? 'ring-2 ring-indigo-200' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          {/* Posição e Medalha */}
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                              usuario.posicao === 1 ? 'bg-yellow-500' :
                              usuario.posicao === 2 ? 'bg-gray-500' :
                              usuario.posicao === 3 ? 'bg-orange-500' : 'bg-indigo-500'
                            }`}>
                              {usuario.posicao <= 3 ? medalha.icone : usuario.posicao}
                            </div>
                            
                            {usuario.posicao <= 3 && (
                              <div className="hidden sm:block">
                                <div className="text-xs font-semibold text-gray-600">MEDALHA</div>
                                <div className="text-sm font-bold text-gray-800">{medalha.texto}</div>
                              </div>
                            )}
                          </div>

                          {/* Informações do Usuário */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-bold text-gray-800 truncate">
                                {usuario.nome_usuario}
                                {usuario.posicao === meuRanking?.posicao && (
                                  <span className="ml-2 text-sm text-indigo-600">(Você)</span>
                                )}
                              </h3>
                              <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getBadgeArea(usuario.area_atuacao)}`}>
                                {usuario.area_atuacao}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 truncate">
                              {usuario.carreira} • Nível {nivel}
                            </p>
                          </div>
                        </div>

                        {/* Pontuação */}
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-800">
                            {usuario.pontuacao_total.toLocaleString()} XP
                          </div>
                          <div className="text-sm text-gray-500">
                            {usuario.pontuacao_total === rankingGeral[0]?.pontuacao_total ? 'Líder' : 'Em progresso'}
                          </div>
                        </div>
                      </div>

                      {/* Barra de Progresso (apenas para os 3 primeiros) */}
                      {usuario.posicao <= 3 && (
                        <div className="mt-4">
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Progresso do mês</span>
                            <span>{usuario.pontuacao_total} XP</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full bg-gradient-to-r ${
                                usuario.posicao === 1 ? 'from-yellow-400 to-yellow-500' :
                                usuario.posicao === 2 ? 'from-gray-400 to-gray-500' :
                                'from-orange-400 to-orange-500'
                              }`}
                              style={{ 
                                width: `${(usuario.pontuacao_total / rankingGeral[0]?.pontuacao_total) * 100}%` 
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar - Minha Posição e Estatísticas */}
          <div className="space-y-6">
            {/* Minha Posição */}
            {meuRanking && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                  Sua Posição
                </h3>
                
                <div className="text-center mb-4">
                  <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold ${
                    meuRanking.posicao === 1 ? 'bg-yellow-500' :
                    meuRanking.posicao === 2 ? 'bg-gray-500' :
                    meuRanking.posicao === 3 ? 'bg-orange-500' : 'bg-indigo-500'
                  }`}>
                    {meuRanking.posicao}º
                  </div>
                </div>

                <div className="space-y-3 text-center">
                  <div>
                    <div className="text-2xl font-bold text-gray-800">
                      {meuRanking.pontuacao_total.toLocaleString()} XP
                    </div>
                    <div className="text-sm text-gray-600">Sua pontuação</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gray-50 rounded-lg p-2">
                      <div className="text-lg font-bold text-gray-800">
                        {calcularNivel(meuRanking.pontuacao_total)}
                      </div>
                      <div className="text-xs text-gray-600">Nível</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2">
                      <div className="text-lg font-bold text-gray-800">
                        Top {Math.ceil((meuRanking.posicao / rankingGeral.length) * 100)}%
                      </div>
                      <div className="text-xs text-gray-600">Percentil</div>
                    </div>
                  </div>

                  {meuRanking.posicao > 3 && (
                    <div className="bg-indigo-50 rounded-lg p-3 border border-indigo-200">
                      <p className="text-sm text-indigo-800">
                        {meuRanking.posicao <= 10 
                          ? 'Continue assim! Você está no Top 10!' 
                          : 'Você está fora do Top 10. Continue estudando!'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Estatísticas do Ranking */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Estatísticas do Mês
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Maior pontuação:</span>
                  <span className="font-semibold text-gray-800">
                    {rankingGeral[0]?.pontuacao_total.toLocaleString()} XP
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Pontuação média:</span>
                  <span className="font-semibold text-gray-800">
                    {Math.round(rankingGeral.reduce((acc, user) => acc + user.pontuacao_total, 0) / rankingGeral.length).toLocaleString()} XP
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Área mais popular:</span>
                  <span className="font-semibold text-gray-800">
                    Programação
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Dias restantes:</span>
                  <span className="font-semibold text-gray-800">15</span>
                </div>
              </div>
            </div>

            {/* Dicas para Subir no Ranking */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl shadow-lg p-6 border border-purple-200">
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                💡 Como subir no ranking?
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  Complete cursos para ganhar XP
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  Estude consistentemente
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  Conclua skills da sua carreira
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  Mantenha o progresso diário
                </li>
              </ul>
            </div>

            {/* Botão Voltar */}
            <BotaoPersonalizado
              texto="Voltar ao Dashboard"
              onClick={() => navigate("/dashboard")}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}