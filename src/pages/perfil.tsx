import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { BackgroundPrincipal } from "../components/background-principal";
import { Loading } from "../components/ui/feedback/loading";
import { InputPersonalizado } from "../components/ui/forms/input-personalizado";
import { apiService } from "../services/api";
import { authService } from "../services/auth";
import { calcularNivel } from "../utils/calculations";
import type { CarreiraUsuario, DashboardData } from "../types/api";
import type { User } from "../types/user";

interface Estatisticas {
  cursos_concluidos: number;
  cursos_andamento: number;
  total_cursos: number;
  skills_completas: number;
  total_skills: number;
  tempo_total_estudo: number;
  dias_consecutivos: number;
}

export function Perfil() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [usuario, setUsuario] = useState<User | null>(null);
  const [carreira, setCarreira] = useState<CarreiraUsuario | null>(null);
  const [estatisticas, setEstatisticas] = useState<Estatisticas | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [formData, setFormData] = useState<Partial<User>>({});

  // Função para formatar data
  const formatarData = (dataString: string) => {
    if (!dataString) return 'Não informado';
    try {
      const data = new Date(dataString);
      return data.toLocaleDateString('pt-BR');
    } catch {
      return 'Data inválida';
    }
  };

  // Mapear status da jornada
  const mapearStatusJornada = (idStatus: number) => {
    switch (idStatus) {
      case 1: return 'Não Iniciada';
      case 2: return 'Em Andamento';
      case 3: return 'Concluída';
      case 4: return 'Pausada';
      default: return 'Em Andamento';
    }
  };

  // Função para carregar dados do perfil
  const carregarPerfil = async () => {
    setIsLoading(true);
    try {
      const userId = authService.getCurrentUserId();

      if (!userId) {
        throw new Error('Usuário não autenticado');
      }

      // Carregar dados do usuário
      const usuarioData = await apiService.getUser(userId);
      setUsuario(usuarioData);
      setFormData(usuarioData);

      // Carregar dashboard
      try {
        const dashboard = await apiService.getDashboard(userId);
        setDashboardData(dashboard);
      } catch (error) {
        console.log('⚠️ Erro ao carregar dashboard:', error);
      }

      // Carregar carreira atual
      try {
        const carreiraData = await apiService.getCarreiraAtual(userId);
        setCarreira(carreiraData);
      } catch (error) {
        console.log('⚠️ Usuário sem carreira selecionada:', error);
        setCarreira(null);
      }

      // Carregar estatísticas
      try {
        const statsData = await apiService.getEstatisticas(userId);

        setEstatisticas({
          cursos_concluidos: statsData.totalCursosConcluidos || 0,
          cursos_andamento: (statsData.totalCursosIniciados || 0) - (statsData.totalCursosConcluidos || 0),
          total_cursos: 10,
          skills_completas: Math.floor((statsData.totalCursosConcluidos || 0) / 2),
          total_skills: 12,
          tempo_total_estudo: (statsData.totalCursosConcluidos || 0) * 15,
          dias_consecutivos: 0
        });
      } catch (error) {
        console.log('⚠️ Erro ao carregar estatísticas:', error);
        setEstatisticas({
          cursos_concluidos: 0,
          cursos_andamento: 0,
          total_cursos: 10,
          skills_completas: 0,
          total_skills: 12,
          tempo_total_estudo: 0,
          dias_consecutivos: 0
        });
      }

    } catch (error) {
      console.error("❌ Erro ao carregar perfil:", error);
      // Fallback
      const usuarioFallback = {
        id: 1,
        nome: "Usuário",
        dataNascimento: "1990-01-01"
      };
      setUsuario(usuarioFallback);
      setFormData(usuarioFallback);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    carregarPerfil();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const userId = authService.getCurrentUserId();

      // Preparar dados para envio no formato exato que a API espera
      const dadosParaEnvio = {
        nome: formData.nome,
        dataNascimento: formData.dataNascimento
        // A API atual não suporta gênero e telefone
      };

      await apiService.updateUser(userId, dadosParaEnvio);

      // Recarregar os dados atualizados
      await carregarPerfil();
      setIsEditing(false);

      alert("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar perfil:", error);
      alert("Erro ao atualizar perfil. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData(usuario || {});
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof User, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <BackgroundPrincipal />
        <div className="relative z-10">
          <Loading message="Carregando perfil..." size="lg" />
        </div>
      </div>
    );
  }

  if (!usuario || !estatisticas) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <BackgroundPrincipal />
        <div className="relative z-10 bg-white rounded-2xl p-8 shadow-2xl max-w-md">
          <div className="text-center">
            <div className="text-6xl mb-4">😕</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Erro ao Carregar Perfil
            </h2>
            <p className="text-gray-600 mb-4">
              Não foi possível carregar seus dados.
            </p>
            <button
              onClick={carregarPerfil}
              className="w-full px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors cursor-pointer"
            >
              Tentar Novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  const nivelAtual = calcularNivel(carreira?.xp || dashboardData?.xpTotal || 0);
  const xpTotal = carreira?.xp || dashboardData?.xpTotal || 0;

  return (
    <div className="relative min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <BackgroundPrincipal />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black mb-4">
            Meu Perfil 👤
          </h1>
          <p className="text-xl text-black opacity-90">
            Gerencie suas informações e acompanhe seu progresso
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna 1: Informações Pessoais */}
          <div className="lg:col-span-2 space-y-8">
            {/* Card de Informações Pessoais */}
            <div className="bg-white rounded-2xl shadow-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Informações Pessoais
                </h2>
                {!isEditing && (
                  <button
                    onClick={handleEdit}
                    className="px-4 py-2 text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors cursor-pointer"
                  >
                    Editar Perfil
                  </button>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputPersonalizado
                      label="Nome Completo"
                      type="text"
                      value={formData.nome || ''}
                      onChange={(value) => handleInputChange('nome', value)}
                      placeholder="Seu nome completo"
                    />
                    <InputPersonalizado
                      label="Data de Nascimento"
                      type="date"
                      value={formData.dataNascimento || ''}
                      onChange={(value) => handleInputChange('dataNascimento', value)}
                    />
                    {/* Removidos campos que a API não suporta: email, telefone, gênero */}
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="flex-1 px-6 py-3 text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    >
                      {isLoading ? "Salvando..." : "Salvar Alterações"}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-6 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-xl hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Nome Completo
                      </label>
                      <p className="text-gray-800 font-semibold">{usuario.nome}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        ID do Usuário
                      </label>
                      <p className="text-gray-800 font-semibold">{usuario.id}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Data de Nascimento
                      </label>
                      <p className="text-gray-800 font-semibold">
                        {formatarData(usuario.dataNascimento)}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        E-mail
                      </label>
                      <p className="text-gray-800 font-semibold">{usuario.email || 'Não informado'}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Card de Carreira Atual */}
            <div className="bg-white rounded-2xl shadow-2xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Carreira Atual
              </h2>

              {carreira ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Carreira:</span>
                    <span className="font-semibold text-gray-800">{carreira.carreira?.nome}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Status:</span>
                    <span className={`font-semibold text-green-600`}>
                      {mapearStatusJornada(carreira.idStatusJornada)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Progresso:</span>
                    <span className="font-semibold text-gray-800">{carreira.progresso?.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">XP Total:</span>
                    <span className="font-semibold text-gray-800">{carreira.xp} XP</span>
                  </div>

                  <div className="pt-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Progresso da Jornada</span>
                      <span>{carreira.progresso?.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-green-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${carreira.progresso || 0}%` }}
                      />
                    </div>
                  </div>
                </div>
              ) : dashboardData ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Carreira:</span>
                    <span className="font-semibold text-gray-800">{dashboardData.carreiraAtual}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Progresso:</span>
                    <span className="font-semibold text-gray-800">{dashboardData.progressoCarreira?.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">XP Total:</span>
                    <span className="font-semibold text-gray-800">{dashboardData.xpTotal} XP</span>
                  </div>

                  <div className="pt-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Progresso da Jornada</span>
                      <span>{dashboardData.progressoCarreira?.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-green-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${dashboardData.progressoCarreira || 0}%` }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🎯</div>
                  <p className="text-gray-600 mb-4">Você ainda não selecionou uma carreira</p>
                  <button
                    onClick={() => navigate("/recomendacoes")}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors cursor-pointer"
                  >
                    Escolher Carreira
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Coluna 2: Estatísticas e Ações */}
          <div className="space-y-8">
            {/* Card de Estatísticas */}
            <div className="bg-white rounded-2xl shadow-2xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Estatísticas de Aprendizado
              </h2>

              <div className="space-y-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{nivelAtual}</div>
                  <div className="text-sm text-blue-800">Nível Atual</div>
                  <div className="text-xs text-blue-600">{xpTotal} XP</div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">{estatisticas.cursos_concluidos}</div>
                    <div className="text-xs text-green-800">Cursos Concluídos</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <div className="text-lg font-bold text-yellow-600">{estatisticas.cursos_andamento}</div>
                    <div className="text-xs text-yellow-800">Em Andamento</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">{estatisticas.skills_completas}</div>
                    <div className="text-xs text-purple-800">Skills Completas</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-lg font-bold text-orange-600">{estatisticas.dias_consecutivos}</div>
                    <div className="text-xs text-orange-800">Dias Consecutivos</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tempo Total de Estudo:</span>
                    <span className="font-semibold text-gray-800">{estatisticas.tempo_total_estudo}h</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ações Rápidas */}
            <div className="bg-white rounded-2xl shadow-2xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Ações Rápidas
              </h2>

              <div className="space-y-3">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="w-full px-4 py-3 text-left bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors cursor-pointer font-semibold"
                >
                  Voltar ao Dashboard
                </button>
                <button
                  onClick={() => navigate("/recomendacoes")}
                  className="w-full px-4 py-3 text-left bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors cursor-pointer font-semibold"
                >
                  {carreira ? 'Trocar de Carreira' : 'Escolher Carreira'}
                </button>
                <button
                  onClick={() => navigate("/ranking")}
                  className="w-full px-4 py-3 text-left bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors cursor-pointer font-semibold"
                >
                  Ver Ranking
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}