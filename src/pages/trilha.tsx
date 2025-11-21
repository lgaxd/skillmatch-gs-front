import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { BackgroundPrincipal } from "../components/background-principal";
import BotaoPersonalizado from "../components/ui/buttons/botao-personalizado";
import { Loading } from "../components/ui/feedback/loading";
import { apiService } from "../services/api";
import { authService } from "../services/auth";
import type { CarreiraSkill, Curso, UsuarioCurso, CarreiraUsuario } from '../types/api';
import { useDashboard } from '../hooks/use-dashboard';

interface SkillCompleta {
  id_skill: number;
  nome_skill: string;
  descricao_skill: string;
  nivel_dificuldade: 'Iniciante' | 'Intermediário' | 'Avançado';
  tempo_estimado_horas: number;
  xp_skill: number;
  ordem_trilha: number;
  concluida: boolean;
  progresso_percentual: number;
  cursos: CursoTrilha[];
}

interface CursoTrilha {
  id_curso: number;
  nome_curso: string;
  link_curso: string;
  plataforma: string;
  duracao_estimada_horas: number;
  dificuldade: string;
  status_curso: 'Pendente' | 'Em andamento' | 'Concluído';
  progresso_percentual: number;
}

interface CarreiraTrilha {
  id_carreira: number;
  nome_carreira: string;
  area_atuacao: string;
  progresso_geral: number;
  xp_total: number;
  total_skills: number;
  skills_concluidas: number;
}

export function Trilha() {
  const { atualizarProgresso } = useDashboard();
  const navigate = useNavigate();
  const { idCarreira } = useParams<{ idCarreira: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [carreira, setCarreira] = useState<CarreiraTrilha | null>(null);
  const [skills, setSkills] = useState<SkillCompleta[]>([]);
  const [skillExpandida, setSkillExpandida] = useState<number | null>(null);

  // Funções auxiliares para determinar plataforma e duração
  const getPlataformaFromLink = (link: string): string => {
    if (link.includes('alura')) return 'Alura';
    if (link.includes('udemy')) return 'Udemy';
    if (link.includes('coursera')) return 'Coursera';
    if (link.includes('edx')) return 'edX';
    if (link.includes('youtube')) return 'YouTube';
    return 'Plataforma Online';
  };

  const estimativaDuracao = (nomeCurso: string): number => {
    if (nomeCurso.toLowerCase().includes('fundamento') || nomeCurso.toLowerCase().includes('básico')) return 8;
    if (nomeCurso.toLowerCase().includes('avançado') || nomeCurso.toLowerCase().includes('completo')) return 20;
    return 12; // padrão
  };

  const estimativaTempoSkill = (nivel: string): number => {
    switch (nivel) {
      case 'Iniciante': return 20;
      case 'Intermediário': return 40;
      case 'Avançado': return 60;
      default: return 30;
    }
  };

  const calcularXPSkill = (nivel: string): number => {
    switch (nivel) {
      case 'Iniciante': return 100;
      case 'Intermediário': return 150;
      case 'Avançado': return 200;
      default: return 100;
    }
  };

  const getDescricaoSkill = (nome: string, nivel: string): string => {
    const descricoes: { [key: string]: string } = {
      'HTML/CSS': 'Fundamentos de estruturação e estilização web',
      'JavaScript': 'Programação para interatividade web',
      'React': 'Biblioteca para interfaces de usuário modernas',
      'TypeScript': 'JavaScript tipado para desenvolvimento escalável',
      'Node.js': 'JavaScript no servidor para aplicações backend',
      'SQL': 'Linguagem para consulta e manipulação de bancos de dados',
      'Python': 'Linguagem versátil para automação e análise de dados',
      'Git': 'Controle de versão para projetos colaborativos',
      'APIs': 'Desenvolvimento e consumo de interfaces de programação',
      'Testes': 'Garantia de qualidade através de testes automatizados'
    };

    return descricoes[nome] || `Skill ${nome} - Nível ${nivel}`;
  };

  useEffect(() => {
    const carregarTrilha = async () => {
      setIsLoading(true);
      try {
        if (!idCarreira) {
          throw new Error("ID da carreira não fornecido");
        }

        const carreiraId = parseInt(idCarreira);
        const userId = authService.getCurrentUserId();

        console.log(`🎯 Carregando trilha para carreira ${carreiraId} e usuário ${userId}`);

        // Buscar carreira atual
        const carreiraAtual: CarreiraUsuario = await apiService.getCarreiraAtual(userId);

        // Buscar skills da carreira
        const skillsBackend: CarreiraSkill[] = await apiService.getSkillsCarreira(carreiraId);

        console.log(`📚 Encontradas ${skillsBackend.length} skills para a carreira`);

        // Buscar cursos do usuário - pode retornar array vazio para usuários novos
        let cursosUsuario: UsuarioCurso[] = [];
        try {
          cursosUsuario = await apiService.getCursosUsuario(userId);
          console.log(`📖 Usuário tem ${cursosUsuario.length} cursos registrados`);
        } catch (error) {
          console.log("ℹ️ Usuário não tem cursos registrados ainda");
        }

        // Processar skills com cursos
        const skillsComCursos = await Promise.all(
          skillsBackend.map(async (carreiraSkill) => {
            const skill = carreiraSkill.skill;

            console.log(`🔍 Buscando cursos para skill ${skill.id} - ${skill.nome}`);

            try {
              // Buscar cursos da skill
              const cursosSkill: Curso[] = await apiService.getCursosSkill(skill.id);
              console.log(`✅ Encontrados ${cursosSkill.length} cursos para skill ${skill.id}`);

              // Mapear cursos com status do usuário
              // Para usuários novos, todos os cursos começam como 'Pendente'
              const cursosComStatus: CursoTrilha[] = cursosSkill.map((curso) => {
                // Encontrar se o usuário já tem algum progresso neste curso
                const cursoUsuario = cursosUsuario.find(uc =>
                  uc.curso && uc.curso.id === curso.id
                );

                return {
                  id_curso: curso.id,
                  nome_curso: curso.nome,
                  link_curso: curso.link,
                  plataforma: getPlataformaFromLink(curso.link),
                  duracao_estimada_horas: estimativaDuracao(curso.nome),
                  dificuldade: skill.nivel,
                  status_curso: cursoUsuario?.status || 'Pendente', // Default para Pendente
                  progresso_percentual: cursoUsuario?.progresso || 0 // Default para 0%
                };
              });

              const cursosConcluidos = cursosComStatus.filter(c => c.status_curso === 'Concluído').length;
              const progressoSkill = cursosComStatus.length > 0 ? (cursosConcluidos / cursosComStatus.length) * 100 : 0;

              return {
                id_skill: skill.id,
                nome_skill: skill.nome,
                descricao_skill: getDescricaoSkill(skill.nome, skill.nivel),
                nivel_dificuldade: skill.nivel as 'Iniciante' | 'Intermediário' | 'Avançado',
                tempo_estimado_horas: estimativaTempoSkill(skill.nivel),
                xp_skill: calcularXPSkill(skill.nivel),
                ordem_trilha: carreiraSkill.ordem,
                concluida: progressoSkill === 100,
                progresso_percentual: progressoSkill,
                cursos: cursosComStatus
              };
            } catch (error) {
              console.error(`❌ Erro ao carregar cursos da skill ${skill.id}:`, error);

              // Retornar skill sem cursos em caso de erro
              return {
                id_skill: skill.id,
                nome_skill: skill.nome,
                descricao_skill: getDescricaoSkill(skill.nome, skill.nivel),
                nivel_dificuldade: skill.nivel as 'Iniciante' | 'Intermediário' | 'Avançado',
                tempo_estimado_horas: estimativaTempoSkill(skill.nivel),
                xp_skill: calcularXPSkill(skill.nivel),
                ordem_trilha: carreiraSkill.ordem,
                concluida: false,
                progresso_percentual: 0,
                cursos: []
              };
            }
          })
        );

        // Calcular progresso geral
        const skillsConcluidas = skillsComCursos.filter(skill => skill.concluida).length;
        const progressoGeral = skillsComCursos.length > 0 ? (skillsConcluidas / skillsComCursos.length) * 100 : 0;

        console.log(`📊 Progresso geral: ${progressoGeral}% (${skillsConcluidas}/${skillsComCursos.length} skills concluídas)`);

        try {
          await apiService.updateProgressoCarreira(userId, progressoGeral);
          console.log(`✅ Progresso da carreira atualizado para ${progressoGeral.toFixed(2)}%`);
        } catch (error) {
          console.log("ℹ️ Progresso da carreira não atualizado, mas continuando...");
        }

        setCarreira({
          id_carreira: carreiraId,
          nome_carreira: carreiraAtual.carreira.nome,
          area_atuacao: carreiraAtual.carreira.descricao,
          progresso_geral: progressoGeral,
          xp_total: carreiraAtual.xp,
          total_skills: skillsComCursos.length,
          skills_concluidas: skillsConcluidas
        });

        setSkills(skillsComCursos);

      } catch (error) {
        console.error("❌ Erro ao carregar trilha:", error);
        // Usar fallback em caso de erro
        setCarreira({
          id_carreira: 1,
          nome_carreira: "Carreira Fallback",
          area_atuacao: "Tecnologia",
          progresso_geral: 0,
          xp_total: 0,
          total_skills: 0,
          skills_concluidas: 0,
        });
        setSkills([]);
      } finally {
        setIsLoading(false);
      }
    };

    carregarTrilha();
  }, [idCarreira]);

  const toggleSkill = (skillId: number) => {
    setSkillExpandida(skillExpandida === skillId ? null : skillId);
  };

  const handleIniciarCurso = async (cursoId: number) => {
    try {
      const userId = authService.getCurrentUserId();
      await apiService.iniciarCurso(cursoId, userId);

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

      console.log(`✅ Curso ${cursoId} iniciado`);
    } catch (error) {
      console.error("❌ Erro ao iniciar curso:", error);
      alert("Erro ao iniciar curso. Tente novamente.");
    }
  };

  const handleConcluirCurso = async (cursoId: number, skillId: number) => {
    try {
      const userId = authService.getCurrentUserId();
      await apiService.concluirCurso(cursoId, userId);

      // 🔥 NOVA LÓGICA: Calcular XP baseado na skill
      const skill = skills.find(s => s.id_skill === skillId);
      if (skill) {
        // Calcular XP por curso: XP total da skill dividido pelo número de cursos
        const xpPorCurso = Math.floor(skill.xp_skill / skill.cursos.length);

        console.log(`🎯 Adicionando ${xpPorCurso} XP (${skill.xp_skill} XP da skill ÷ ${skill.cursos.length} cursos)`);

        try {
          await apiService.addXP(userId, xpPorCurso);
        } catch (xpError) {
          console.log("ℹ️ XP não adicionado, mas continuando...");
        }

        // Atualização local
        setSkills(prevSkills =>
          prevSkills.map(skill =>
            skill.id_skill === skillId
              ? {
                ...skill,
                cursos: skill.cursos.map(curso =>
                  curso.id_curso === cursoId
                    ? { ...curso, status_curso: 'Concluído', progresso_percentual: 100 }
                    : curso
                )
              }
              : skill
          )
        );

        // Recalcular progresso da skill
        setSkills(prevSkills =>
          prevSkills.map(skill => {
            if (skill.id_skill !== skillId) return skill;

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

        // Atualizar progresso geral da carreira
        if (carreira) {
          const skillsConcluidas = skills.filter(skill =>
            skill.cursos.every(curso => curso.status_curso === 'Concluído')
          ).length;
          const progressoGeral = skills.length > 0 ? (skillsConcluidas / skills.length) * 100 : 0;



          // Calcular nova XP (adiciona XP calculado por curso concluído)
          const novaXP = carreira.xp_total + xpPorCurso;

          // Calcular cursos concluídos
          const totalCursosConcluidos = skills.reduce((total, skill) =>
            total + skill.cursos.filter(c => c.status_curso === 'Concluído').length, 0
          );

          setCarreira(prev => prev ? {
            ...prev,
            progresso_geral: progressoGeral,
            skills_concluidas: skillsConcluidas,
            xp_total: novaXP
          } : null);

          // 🔥 ATUALIZAR O DASHBOARD COM O NOVO PROGRESSO
          if (atualizarProgresso) {
            atualizarProgresso(progressoGeral, novaXP, totalCursosConcluidos);
          }
        }

        console.log(`✅ Curso ${cursoId} marcado como concluído (+${xpPorCurso} XP)`);
      }

    } catch (error) {
      console.error("❌ Erro ao concluir curso:", error);
      alert("Erro ao concluir curso. Tente novamente.");
    }
  };

  const handleAtualizarProgresso = async (cursoId: number, progresso: number) => {
    try {
      const userId = authService.getCurrentUserId();
      await apiService.updateProgressoCurso(cursoId, userId, progresso);

      // Atualização local
      setSkills(prevSkills =>
        prevSkills.map(skill => ({
          ...skill,
          cursos: skill.cursos.map(curso =>
            curso.id_curso === cursoId
              ? { ...curso, progresso_percentual: progresso }
              : curso
          )
        }))
      );

      console.log(`📈 Progresso do curso ${cursoId} atualizado para ${progresso}%`);
    } catch (error) {
      console.error("❌ Erro ao atualizar progresso:", error);
      alert("Erro ao atualizar progresso. Tente novamente.");
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <BackgroundPrincipal />
        <div className="relative z-10">
          <Loading message="Carregando sua trilha de aprendizado..." size="lg" />
        </div>
      </div>
    );
  }

  if (!carreira) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <BackgroundPrincipal />
        <div className="relative z-10 bg-white rounded-2xl p-8 shadow-2xl max-w-md">
          <div className="text-center">
            <div className="text-6xl mb-4">😕</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Erro ao Carregar Trilha
            </h2>
            <p className="text-gray-600 mb-4">
              Não foi possível carregar os dados da trilha.
            </p>
            <button
              onClick={handleVoltar}
              className="w-full px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors cursor-pointer"
            >
              Voltar ao Dashboard
            </button>
          </div>
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
            Sua Jornada em {carreira.nome_carreira} 🚀
          </h1>
          <p className="text-xl text-black opacity-90">
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
                  <div className="text-3xl font-bold text-indigo-600">{carreira.progresso_geral.toFixed(1)}%</div>
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
          {skills.length > 0 ? (
            skills.map((skill) => (
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
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${skill.concluida ? 'bg-green-500' : 'bg-indigo-500'
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
                          {skill.progresso_percentual.toFixed(1)}%
                        </div>
                        <div className="text-sm text-gray-600">Concluído</div>
                      </div>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${skill.concluida ? 'bg-green-500' : 'bg-blue-500'
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

                      {skill.cursos.length > 0 ? (
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
                                      <div className="flex gap-2 mt-2">
                                        <button
                                          onClick={() => handleAtualizarProgresso(curso.id_curso, 25)}
                                          className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                                        >
                                          25%
                                        </button>
                                        <button
                                          onClick={() => handleAtualizarProgresso(curso.id_curso, 50)}
                                          className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                                        >
                                          50%
                                        </button>
                                        <button
                                          onClick={() => handleAtualizarProgresso(curso.id_curso, 75)}
                                          className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                                        >
                                          75%
                                        </button>
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
                                      onClick={() => handleConcluirCurso(curso.id_curso, skill.id_skill)}
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
                      ) : (
                        <div className="text-center py-8">
                          <div className="text-4xl mb-2">📚</div>
                          <p className="text-gray-600">Nenhum curso disponível para esta skill</p>
                          <p className="text-sm text-gray-500 mt-1">Em breve adicionaremos cursos para esta habilidade</p>
                        </div>
                      )}

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
            ))
          ) : (
            <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
              <div className="text-6xl mb-4">🎯</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Nenhuma Skill Encontrada
              </h2>
              <p className="text-gray-600 mb-6">
                Esta carreira ainda não possui skills cadastradas.
              </p>
              <button
                onClick={handleVoltar}
                className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors cursor-pointer"
              >
                Voltar ao Dashboard
              </button>
            </div>
          )}
        </div>

        {/* Informações Adicionais */}
        {skills.length > 0 && (
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
        )}
      </div>
    </div>
  );
}