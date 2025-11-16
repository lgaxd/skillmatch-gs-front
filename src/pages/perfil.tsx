import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { BackgroundPrincipal } from "../components/background-principal";
import BotaoPersonalizado from "../components/botao-personalizado";
import { Loading } from "../components/loading";
import { InputPersonalizado } from "../components/input-personalizado";
import { SelectPersonalizado } from "../components/select-personalizado";

interface Usuario {
  id_usuario: number;
  nome_usuario: string;
  email_usuario: string;
  data_nascimento: string;
  data_cadastro: string;
  genero?: string;
  telefone?: string;
}

interface CarreiraUsuario {
  nome_carreira: string;
  area_atuacao: string;
  progresso_percentual: number;
  xp_total: number;
  data_inicio: string;
  status_jornada: string;
}

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
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carreira, setCarreira] = useState<CarreiraUsuario | null>(null);
  const [estatisticas, setEstatisticas] = useState<Estatisticas | null>(null);
  const [formData, setFormData] = useState<Partial<Usuario>>({});

  // Dados mockados baseados no seu schema
  const usuarioMock: Usuario = {
    id_usuario: 1,
    nome_usuario: "João Silva",
    email_usuario: "joao.silva@email.com",
    data_nascimento: "1990-05-15",
    data_cadastro: "2024-01-15",
    genero: "Masculino",
    telefone: "(11) 99999-9999"
  };

  const carreiraMock: CarreiraUsuario = {
    nome_carreira: "Desenvolvedor Front-end",
    area_atuacao: "Programação",
    progresso_percentual: 25.50,
    xp_total: 1250,
    data_inicio: "2024-01-15",
    status_jornada: "Em Andamento"
  };

  const estatisticasMock: Estatisticas = {
    cursos_concluidos: 2,
    cursos_andamento: 1,
    total_cursos: 10,
    skills_completas: 3,
    total_skills: 12,
    tempo_total_estudo: 45,
    dias_consecutivos: 12
  };

  const generos = [
    { value: "masculino", label: "Masculino" },
    { value: "feminino", label: "Feminino" },
    { value: "outro", label: "Outro" },
    { value: "prefiro_nao_informar", label: "Prefiro não informar" }
  ];

  useEffect(() => {
    const carregarPerfil = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setUsuario(usuarioMock);
        setCarreira(carreiraMock);
        setEstatisticas(estatisticasMock);
        setFormData(usuarioMock);
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
      } finally {
        setIsLoading(false);
      }
    };

    carregarPerfil();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulação de salvamento
      await new Promise(resolve => setTimeout(resolve, 500));
      setUsuario(prev => prev ? { ...prev, ...formData } : null);
      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao salvar perfil:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData(usuario || {});
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof Usuario, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calcularNivel = (xp: number) => {
    return Math.floor(xp / 500) + 1;
  };

  const handleVoltar = () => {
    navigate("/dashboard");
  };

  if (isLoading || !usuario || !carreira || !estatisticas) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <BackgroundPrincipal />
        <div className="relative z-10">
          <Loading message="Carregando perfil..." size="lg" />
        </div>
      </div>
    );
  }

  const nivelAtual = calcularNivel(carreira.xp_total);

  return (
    <div className="relative min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <BackgroundPrincipal />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Meu Perfil 👤
          </h1>
          <p className="text-xl text-white opacity-90">
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
                      value={formData.nome_usuario || ''}
                      onChange={(value) => handleInputChange('nome_usuario', value)}
                      placeholder="Seu nome completo"
                    />
                    <InputPersonalizado
                      label="E-mail"
                      type="email"
                      value={formData.email_usuario || ''}
                      onChange={(value) => handleInputChange('email_usuario', value)}
                      placeholder="seu@email.com"
                    />
                    <InputPersonalizado
                      label="Data de Nascimento"
                      type="date"
                      value={formData.data_nascimento || ''}
                      onChange={(value) => handleInputChange('data_nascimento', value)}
                    />
                    <InputPersonalizado
                      label="Telefone"
                      type="tel"
                      value={formData.telefone || ''}
                      onChange={(value) => handleInputChange('telefone', value)}
                      placeholder="(11) 99999-9999"
                    />
                    <SelectPersonalizado
                      label="Gênero"
                      value={formData.genero || ''}
                      onChange={(value) => handleInputChange('genero', value)}
                      options={generos}
                    />
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <BotaoPersonalizado
                      texto="Salvar Alterações"
                      onClick={handleSave}
                      className="flex-1"
                    />
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
                      <p className="text-gray-800 font-semibold">{usuario.nome_usuario}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        E-mail
                      </label>
                      <p className="text-gray-800 font-semibold">{usuario.email_usuario}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Data de Nascimento
                      </label>
                      <p className="text-gray-800 font-semibold">
                        {new Date(usuario.data_nascimento).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Telefone
                      </label>
                      <p className="text-gray-800 font-semibold">{usuario.telefone || 'Não informado'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Gênero
                      </label>
                      <p className="text-gray-800 font-semibold">{usuario.genero || 'Não informado'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Data de Cadastro
                      </label>
                      <p className="text-gray-800 font-semibold">
                        {new Date(usuario.data_cadastro).toLocaleDateString('pt-BR')}
                      </p>
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
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Carreira:</span>
                  <span className="font-semibold text-gray-800">{carreira.nome_carreira}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Área:</span>
                  <span className="font-semibold text-gray-800">{carreira.area_atuacao}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-semibold ${
                    carreira.status_jornada === 'Em Andamento' ? 'text-green-600' :
                    carreira.status_jornada === 'Concluída' ? 'text-blue-600' :
                    'text-yellow-600'
                  }`}>
                    {carreira.status_jornada}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Início:</span>
                  <span className="font-semibold text-gray-800">
                    {new Date(carreira.data_inicio).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                
                <div className="pt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progresso da Jornada</span>
                    <span>{carreira.progresso_percentual}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-green-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${carreira.progresso_percentual}%` }}
                    />
                  </div>
                </div>
              </div>
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
                  <div className="text-xs text-blue-600">{carreira.xp_total} XP</div>
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

            {/* Card de Conquistas */}
            <div className="bg-white rounded-2xl shadow-2xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Conquistas 🏆
              </h2>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="text-2xl">🎯</div>
                  <div>
                    <p className="font-semibold text-gray-800">Primeiros Passos</p>
                    <p className="text-sm text-gray-600">Complete seu primeiro curso</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-2xl">📚</div>
                  <div>
                    <p className="font-semibold text-gray-800">Aprendiz Dedicado</p>
                    <p className="text-sm text-gray-600">Complete 5 cursos</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg border border-gray-200 opacity-60">
                  <div className="text-2xl grayscale">⭐</div>
                  <div>
                    <p className="font-semibold text-gray-500">Skill Master</p>
                    <p className="text-sm text-gray-400">Domine 10 skills</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg border border-gray-200 opacity-60">
                  <div className="text-2xl grayscale">🏆</div>
                  <div>
                    <p className="font-semibold text-gray-500">Nível Expert</p>
                    <p className="text-sm text-gray-400">Alcance o nível 10</p>
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
                  Trocar de Carreira
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