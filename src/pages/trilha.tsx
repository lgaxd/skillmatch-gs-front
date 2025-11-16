import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { BackgroundPrincipal } from "../components/background-principal";
import BotaoPersonalizado from "../components/botao-personalizado";
import { Loading } from "../components/loading";

interface Skill {
  id_skill: number;
  nome_skill: string;
  descricao_skill: string;
  nivel_dificuldade: 'Iniciante' | 'Intermediário' | 'Avançado';
  tempo_estimado_horas: number;
  xp_skill: number;
  ordem_trilha: number;
  concluida: boolean;
  progresso_percentual: number;
  cursos: Curso[];
}

interface Curso {
  id_curso: number;
  nome_curso: string;
  link_curso: string;
  plataforma: string;
  duracao_estimada_horas: number;
  dificuldade: string;
  status_curso: 'Pendente' | 'Em andamento' | 'Concluído';
  progresso_percentual: number;
}

interface Carreira {
  id_carreira: number;
  nome_carreira: string;
  area_atuacao: string;
  progresso_geral: number;
  xp_total: number;
  total_skills: number;
  skills_concluidas: number;
}

export function Trilha() {
  const navigate = useNavigate();
  const { idCarreira } = useParams<{ idCarreira: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [carreira, setCarreira] = useState<Carreira | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [skillExpandida, setSkillExpandida] = useState<number | null>(null);

  // Dados mockados baseados no seu schema
  const carreiraMock: Carreira = {
    id_carreira: 1,
    nome_carreira: "Desenvolvedor Front-end",
    area_atuacao: "Programação",
    progresso_geral: 25.50,
    xp_total: 1250,
    total_skills: 12,
    skills_concluidas: 3
  };

  const skillsMock: Skill[] = [
    {
      id_skill: 1,
      nome_skill: "HTML/CSS Fundamentos",
      descricao_skill: "Fundamentos de estruturação e estilização web",
      nivel_dificuldade: 'Iniciante',
      tempo_estimado_horas: 40,
      xp_skill: 100,
      ordem_trilha: 1,
      concluida: true,
      progresso_percentual: 100,
      cursos: [
        {
          id_curso: 1,
          nome_curso: "HTML5 e CSS3 Fundamentos",
          link_curso: "https://www.exemplo.com/html-css",
          plataforma: "Alura",
          duracao_estimada_horas: 15,
          dificuldade: "Iniciante",
          status_curso: 'Concluído',
          progresso_percentual: 100
        },
        {
          id_curso: 2,
          nome_curso: "CSS Grid e Flexbox",
          link_curso: "https://www.exemplo.com/css-grid",
          plataforma: "Udemy",
          duracao_estimada_horas: 12,
          dificuldade: "Iniciante",
          status_curso: 'Concluído',
          progresso_percentual: 100
        }
      ]
    },
    {
      id_skill: 2,
      nome_skill: "JavaScript Moderno",
      descricao_skill: "Programação para interatividade web",
      nivel_dificuldade: 'Intermediário',
      tempo_estimado_horas: 80,
      xp_skill: 150,
      ordem_trilha: 2,
      concluida: false,
      progresso_percentual: 65,
      cursos: [
        {
          id_curso: 3,
          nome_curso: "JavaScript Moderno ES6+",
          link_curso: "https://www.exemplo.com/js-es6",
          plataforma: "Alura",
          duracao_estimada_horas: 20,
          dificuldade: "Intermediário",
          status_curso: 'Em andamento',
          progresso_percentual: 65
        },
        {
          id_curso: 4,
          nome_curso: "JavaScript para Iniciantes",
          link_curso: "https://www.exemplo.com/js-iniciante",
          plataforma: "Coursera",
          duracao_estimada_horas: 25,
          dificuldade: "Iniciante",
          status_curso: 'Pendente',
          progresso_percentual: 0
        }
      ]
    },
    {
      id_skill: 3,
      nome_skill: "React Framework",
      descricao_skill: "Biblioteca para interfaces de usuário modernas",
      nivel_dificuldade: 'Intermediário',
      tempo_estimado_horas: 60,
      xp_skill: 200,
      ordem_trilha: 3,
      concluida: false,
      progresso_percentual: 0,
      cursos: [
        {
          id_curso: 5,
          nome_curso: "React do Zero ao Avançado",
          link_curso: "https://www.exemplo.com/react-avancado",
          plataforma: "Udemy",
          duracao_estimada_horas: 35,
          dificuldade: "Intermediário",
          status_curso: 'Pendente',
          progresso_percentual: 0
        }
      ]
    },
    {
      id_skill: 4,
      nome_skill: "Versionamento com Git",
      descricao_skill: "Controle de versão para projetos colaborativos",
      nivel_dificuldade: 'Iniciante',
      tempo_estimado_horas: 30,
      xp_skill: 120,
      ordem_trilha: 4,
      concluida: false,
      progresso_percentual: 0,
      cursos: [
        {
          id_curso: 6,
          nome_curso: "Git e GitHub para Iniciantes",
          link_curso: "https://www.exemplo.com/git-github",
          plataforma: "Alura",
          duracao_estimada_horas: 18,
          dificuldade: "Iniciante",
          status_curso: 'Pendente',
          progresso_percentual: 0
        }
      ]
    }
  ];

  useEffect(() => {
    const carregarTrilha = async () => {
      setIsLoading(true);
      try {
        // Simulação de chamada à API
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Aqui viriam as chamadas reais para a API baseadas no seu schema:
        // - TB_CARREIRA + TB_AREAS_ATUACAO (dados da carreira)
        // - TB_CARREIRA_SKILL + TB_SKILL (skills da carreira)
        // - TB_CURSO (cursos de cada skill)
        // - TB_USUARIO_CURSO (progresso do usuário nos cursos)
        
        setCarreira(carreiraMock);
        setSkills(skillsMock);
        
      } catch (error) {
        console.error("Erro ao carregar trilha:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (idCarreira) {
      carregarTrilha();
    }
  }, [idCarreira]);

  const toggleSkill = (skillId: number) => {
    setSkillExpandida(skillExpandida === skillId ? null : skillId);
  };

  const handleConcluirCurso = async (cursoId: number) => {
    try {
      // Simulação de chamada à API para marcar curso como concluído
      // await fetch(`/api/cursos/${cursoId}/concluir`, { method: 'POST' });
      
      // Atualização local (será substituída pela API real)
      setSkills(prevSkills => 
        prevSkills.map(skill => ({
          ...skill,
          cursos: skill.cursos.map(curso => 
            curso.id_curso === cursoId 
              ? { ...curso, status_curso: 'Concluído', progresso_percentual: 100 }
              : curso
          )
        }))
      );

      // Recalcular progresso da skill
      setSkills(prevSkills => 
        prevSkills.map(skill => {
          const cursosDaSkill = skill.cursos;
          const cursosConcluidos = cursosDaSkill.filter(c => c.status_curso === 'Concluído').length;
          const progressoSkill = cursosDaSkill.length > 0 ? (cursosConcluidos / cursosDaSkill.length) * 100 : 0;
          
          return {
            ...skill,
            progresso_percentual: progressoSkill,
            concluida: progressoSkill === 100
          };
        })
      );

      console.log(`Curso ${cursoId} marcado como concluído`);
    } catch (error) {
      console.error("Erro ao concluir curso:", error);
    }
  };

  const handleIniciarCurso = async (cursoId: number) => {
    try {
      // Simulação de chamada à API para iniciar curso
      // await fetch(`/api/cursos/${cursoId}/iniciar`, { method: 'POST' });
      
      // Atualização local
      setSkills(prevSkills => 
        prevSkills.map(skill => ({
          ...skill,
          cursos: skill.cursos.map(curso => 
            curso.id_curso === cursoId && curso.status_curso === 'Pendente'
              ? { ...curso, status_curso: 'Em andamento', progresso_percentual: 0 }
              : curso
          )
        }))
      );

      console.log(`Curso ${cursoId} iniciado`);
    } catch (error) {
      console.error("Erro ao iniciar curso:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Concluído': return 'bg-green-100 text-green-800 border-green-200';
      case 'Em andamento': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Pendente': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDificuldadeColor = (dificuldade: string) => {
    switch (dificuldade) {
      case 'Iniciante': return 'bg-green-100 text-green-800';
      case 'Intermediário': return 'bg-yellow-100 text-yellow-800';
      case 'Avançado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleVoltar = () => {
    navigate("/dashboard");
  };

  if (isLoading || !carreira) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <BackgroundPrincipal />
        <div className="relative z-10">
          <Loading message="Carregando sua trilha de aprendizado..." size="lg" />
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
          <h1 className="text-4xl font-bold text-white mb-4">
            Sua Jornada em {carreira.nome_carreira} 🚀
          </h1>
          <p className="text-xl text-white opacity-90">
            {carreira.area_atuacao} • Siga a trilha para dominar as skills necessárias
          </p>
        </div>

        {/* Progresso Geral */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Progresso da Jornada
              </h2>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600">{carreira.progresso_geral}%</div>
                  <div className="text-sm text-gray-600">Concluído</div>
                </div>
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                      className="bg-green-500 h-4 rounded-full transition-all duration-500"
                      style={{ width: `${carreira.progresso_geral}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>{carreira.skills_concluidas} de {carreira.total_skills} skills</span>
                    <span>{carreira.xp_total} XP</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <BotaoPersonalizado
                texto="Voltar ao Dashboard"
                onClick={handleVoltar}
              />
            </div>
          </div>
        </div>

        {/* Lista de Skills */}
        <div className="space-y-4">
          {skills.map((skill) => (
            <div 
              key={skill.id_skill}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-200"
            >
              {/* Header da Skill */}
              <div 
                className="p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                onClick={() => toggleSkill(skill.id_skill)}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    {/* Número e Status */}
                    <div className="flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                        skill.concluida ? 'bg-green-500' : 'bg-indigo-500'
                      }`}>
                        {skill.ordem_trilha}
                      </div>
                      {skill.concluida && (
                        <div className="mt-1 text-green-500 text-sm">✓</div>
                      )}
                    </div>

                    {/* Informações da Skill */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-800">
                          {skill.nome_skill}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getDificuldadeColor(skill.nivel_dificuldade)}`}>
                          {skill.nivel_dificuldade}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-3">
                        {skill.descricao_skill}
                      </p>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <span>⏱️</span>
                          <span>{skill.tempo_estimado_horas}h estimadas</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>⭐</span>
                          <span>{skill.xp_skill} XP</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>📚</span>
                          <span>{skill.cursos.length} cursos</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Progresso e Ação */}
                  <div className="flex flex-col items-end gap-3">
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-800">
                        {skill.progresso_percentual}%
                      </div>
                      <div className="text-sm text-gray-600">Concluído</div>
                    </div>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          skill.concluida ? 'bg-green-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${skill.progresso_percentual}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Cursos da Skill (expandido) */}
              {skillExpandida === skill.id_skill && (
                <div className="border-t border-gray-200">
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                      Cursos Recomendados ({skill.cursos.length})
                    </h4>
                    
                    <div className="space-y-4">
                      {skill.cursos.map((curso) => (
                        <div 
                          key={curso.id_curso}
                          className="border border-gray-200 rounded-xl p-4 hover:border-indigo-300 transition-colors duration-200"
                        >
                          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-start gap-3 mb-2">
                                <div className="flex-1">
                                  <h5 className="font-semibold text-gray-800 mb-1">
                                    {curso.nome_curso}
                                  </h5>
                                  <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-2">
                                    <span>🏢 {curso.plataforma}</span>
                                    <span>⏱️ {curso.duracao_estimada_horas}h</span>
                                    <span>📊 {curso.dificuldade}</span>
                                  </div>
                                </div>
                                <span className={`px-3 py-1 text-sm font-semibold rounded-full border ${getStatusColor(curso.status_curso)}`}>
                                  {curso.status_curso}
                                </span>
                              </div>

                              {curso.status_curso === 'Em andamento' && (
                                <div className="mb-3">
                                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                                    <span>Progresso do curso</span>
                                    <span>{curso.progresso_percentual}%</span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                      className="bg-blue-500 h-2 rounded-full"
                                      style={{ width: `${curso.progresso_percentual}%` }}
                                    />
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-2">
                              <a
                                href={curso.link_curso}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors cursor-pointer text-center text-sm font-semibold"
                              >
                                Acessar Curso
                              </a>
                              
                              {curso.status_curso === 'Pendente' && (
                                <button
                                  onClick={() => handleIniciarCurso(curso.id_curso)}
                                  className="px-4 py-2 text-green-600 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors cursor-pointer text-sm font-semibold"
                                >
                                  Iniciar
                                </button>
                              )}
                              
                              {curso.status_curso === 'Em andamento' && (
                                <button
                                  onClick={() => handleConcluirCurso(curso.id_curso)}
                                  className="px-4 py-2 text-green-600 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors cursor-pointer text-sm font-semibold"
                                >
                                  Concluir
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Resumo da Skill */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div>
                          <div className="text-lg font-bold text-gray-800">
                            {skill.cursos.filter(c => c.status_curso === 'Concluído').length}
                          </div>
                          <div className="text-sm text-gray-600">Concluídos</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-gray-800">
                            {skill.cursos.filter(c => c.status_curso === 'Em andamento').length}
                          </div>
                          <div className="text-sm text-gray-600">Em andamento</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-gray-800">
                            {skill.cursos.filter(c => c.status_curso === 'Pendente').length}
                          </div>
                          <div className="text-sm text-gray-600">Pendentes</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-gray-800">
                            {skill.xp_skill}
                          </div>
                          <div className="text-sm text-gray-600">XP Disponível</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Informações Adicionais */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            💡 Dicas para sua Jornada
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>Siga a ordem recomendada para um aprendizado progressivo</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>Conclua os cursos para ganhar XP e subir no ranking</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>Pratique os conceitos aprendidos em projetos pessoais</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>Mantenha consistência - mesmo 30 minutos por dia fazem diferença</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}