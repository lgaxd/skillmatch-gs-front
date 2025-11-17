import { useNavigate } from "react-router-dom";
import { BackgroundPrincipal } from "../components/background-principal";
import BotaoPersonalizado from "../components/ui/buttons/botao-personalizado";

interface Integrante {
  nome: string;
  rm: string;
  funcao: string;
  responsabilidades: string[];
  linkedin?: string;
  github?: string;
}

export function Integrantes() {
  const navigate = useNavigate();

  const integrantes: Integrante[] = [
    {
      nome: "Lucas Grillo Alcântara",
      rm: "561413",
      funcao: "Tech Lead & Full Stack Developer",
      responsabilidades: [
        "Arquitetura do sistema e tomadas de decisão técnicas",
        "Desenvolvimento do backend com Quarkus (Java)",
        "Coordenação da integração entre frontend e backend",
        "Modelagem do banco de dados Oracle",
        "Implementação do algoritmo KNN para recomendações"
      ],
      linkedin: "#",
      github: "#"
    },
    {
      nome: "Pietro Abrahamian",
      rm: "561469", 
      funcao: "Front-end Specialist & UI/UX",
      responsabilidades: [
        "Desenvolvimento da interface com React e TypeScript",
        "Design system e experiência do usuário",
        "Implementação de componentes reutilizáveis",
        "Integração com APIs do backend",
        "Otimização de performance e responsividade"
      ],
      linkedin: "#",
      github: "#"
    },
    {
      nome: "Augusto Buguas Rodrigues",
      rm: "563858",
      funcao: "AI Engineer & Data Specialist",
      responsabilidades: [
        "Desenvolvimento do modelo de Machine Learning (KNN)",
        "API Python com Flask para processamento de dados",
        "Análise e preparação dos dados para treinamento",
        "Otimização do algoritmo de recomendação",
        "Integração da IA com o sistema principal"
      ],
      linkedin: "#",
      github: "#"
    }
  ];

  const tecnologias = [
    { nome: "Front-end", stack: ["React", "TypeScript", "Tailwind CSS", "Vite"] },
    { nome: "Back-end", stack: ["Quarkus (Java)", "JAX-RS", "CDI", "JPA"] },
    { nome: "Banco de Dados", stack: ["Oracle Database", "SQL", "DDL/DML"] },
    { nome: "Machine Learning", stack: ["Python", "Flask", "Scikit-learn", "KNN"] },
    { nome: "DevOps", stack: ["Git", "GitHub", "Vercel", "Railway"] }
  ];

  return (
    <div className="relative min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <BackgroundPrincipal />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">
            Nossa Equipe 👥
          </h1>
          <p className="text-xl text-black opacity-90">
            Conheça os desenvolvedores por trás do SkillMatch
          </p>
          <div className="mt-4 bg-white bg-opacity-20 rounded-full px-6 py-2 inline-block">
            <p className="text-black font-semibold">
              Global Solution - 2025/2 - FIAP
            </p>
          </div>
        </div>

        {/* Integrantes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {integrantes.map((integrante, index) => (
            <div 
              key={integrante.rm}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              {/* Header do Card */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">
                      {index === 0 ? "👨‍💻" : index === 1 ? "🎨" : "🤖"}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold">{integrante.nome}</h3>
                  <p className="text-indigo-100">RM {integrante.rm}</p>
                </div>
              </div>

              {/* Conteúdo */}
              <div className="p-6">
                <div className="text-center mb-4">
                  <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold">
                    {integrante.funcao}
                  </span>
                </div>

                <h4 className="font-semibold text-gray-800 mb-3">Principais Responsabilidades:</h4>
                <ul className="space-y-2 mb-6">
                  {integrante.responsabilidades.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span className="text-gray-600 text-sm">{resp}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex justify-center gap-4 pt-4 border-t border-gray-200">
                  {integrante.linkedin && (
                    <a 
                      href={integrante.linkedin}
                      className="text-gray-400 hover:text-blue-600 transition-colors cursor-pointer"
                      title="LinkedIn"
                    >
                      <span className="text-lg">💼</span>
                    </a>
                  )}
                  {integrante.github && (
                    <a 
                      href={integrante.github}
                      className="text-gray-400 hover:text-gray-800 transition-colors cursor-pointer"
                      title="GitHub"
                    >
                      <span className="text-lg">🐙</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stack Tecnológica */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Stack Tecnológico 🛠️
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {tecnologias.map((tech, index) => (
              <div 
                key={index}
                className="text-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
              >
                <h3 className="font-bold text-gray-800 mb-3">{tech.nome}</h3>
                <div className="space-y-2">
                  {tech.stack.map((item, idx) => (
                    <div 
                      key={idx}
                      className="px-3 py-1 bg-white rounded-lg text-sm text-gray-700 border border-gray-200"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Metodologia */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Metodologia de Desenvolvimento 📋
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span className="text-2xl">🎯</span>
                Abordagem Técnica
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Desenvolvimento ágil com sprints quinzenais</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Code reviews e pair programming</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Integração contínua e deploy automático</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Testes unitários e de integração</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <span className="text-2xl">🤝</span>
                Colaboração
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Reuniões diárias de sincronização</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Documentação técnica detalhada</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Versionamento com Git Flow</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Comunicação constante via Discord</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BotaoPersonalizado
              texto="Voltar ao Início"
              onClick={() => navigate("/")}
            />
            <button
              onClick={() => navigate("/sobre")}
              className="px-8 py-3 text-lg font-semibold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Sobre o Projeto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}