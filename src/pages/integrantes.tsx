import { useNavigate } from "react-router-dom";
import { BackgroundPrincipal } from "../components/background-principal";
import BotaoPersonalizado from "../components/ui/buttons/botao-personalizado";
import augusto from "../assets/augusto.jpg";
import lucas from "../assets/lucasgrillo.png";
import pietro from "../assets/pietro.png";

interface Integrante {
  nome: string;
  rm: string;
  funcao: string;
  responsabilidades: string[];
  linkedin?: string;
  github?: string;
  imagem: string;
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
      linkedin: "https://www.linkedin.com/in/lgaxd/",
      github: "https://github.com/lgaxd/",
      imagem: lucas
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
      linkedin: "https://www.linkedin.com/in/pietro-abrahamian/",
      github: "https://github.com/pietroabrahamian",
      imagem: pietro
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
      linkedin: "https://www.linkedin.com/in/augusto-buguas-154308280/",
      github: "https://github.com/augustobuguas",
      imagem: augusto
    }
  ];

  const tecnologias = [
    { nome: "Front-end", stack: ["React", "TypeScript", "Tailwind CSS", "Vite"] },
    { nome: "Back-end", stack: ["Quarkus (Java)", "JAX-RS", "CDI", "JPA"] },
    { nome: "Banco de Dados", stack: ["Oracle Database", "SQL", "DDL/DML"] },
    { nome: "Machine Learning", stack: ["Python", "Flask", "Scikit-learn", "KNN"] },
    { nome: "DevOps", stack: ["Git", "GitHub", "Vercel", "Server"] }
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
          {integrantes.map((integrante) => (
            <div 
              key={integrante.rm}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              {/* Header do Card */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
                <div className="text-center">
                  <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden border-4 border-white border-opacity-20">
                    <img 
                      src={integrante.imagem} 
                      alt={integrante.nome}
                      className="w-full h-full object-cover rounded-full"
                    />
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
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-600 transition-colors cursor-pointer"
                      title="LinkedIn"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  )}
                  {integrante.github && (
                    <a 
                      href={integrante.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-800 transition-colors cursor-pointer"
                      title="GitHub"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
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