import { useNavigate } from "react-router-dom";
import { BackgroundPrincipal } from "../components/background-principal";
import BotaoPersonalizado from "../components/ui/buttons/botao-personalizado";

export function Sobre() {
  const navigate = useNavigate();

  const odsList = [
    {
      numero: 4,
      titulo: "Educação de Qualidade",
      descricao: "Assegurar a educação inclusiva, equitativa e de qualidade, e promover oportunidades de aprendizagem ao longo da vida para todos.",
      icone: "🎓"
    },
    {
      numero: 8,
      titulo: "Trabalho Decente e Crescimento Econômico",
      descricao: "Promover o crescimento econômico sustentado, inclusivo e sustentável, emprego pleno e produtivo e trabalho decente para todos.",
      icone: "💼"
    },
    {
      numero: 9,
      titulo: "Indústria, Inovação e Infraestrutura",
      descricao: "Construir infraestruturas resilientes, promover a industrialização inclusiva e sustentável e fomentar a inovação.",
      icone: "🏗️"
    },
    {
      numero: 10,
      titulo: "Redução das Desigualdades",
      descricao: "Reduzir a desigualdade dentro dos países e entre eles.",
      icone: "⚖️"
    }
  ];

  const tecnologias = [
    { nome: "React + TypeScript", descricao: "Front-end moderno e tipado" },
    { nome: "Quarkus (Java)", descricao: "Back-end eficiente e rápido" },
    { nome: "Python (Flask)", descricao: "Machine Learning com KNN" },
    { nome: "Oracle Database", descricao: "Banco de dados corporativo" },
    { nome: "Tailwind CSS", descricao: "Estilização e design system" }
  ];

  return (
    <div className="relative min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <BackgroundPrincipal />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">
            Sobre o SkillMatch 🌟
          </h1>
          <p className="text-xl text-black opacity-90 max-w-3xl mx-auto">
            Conectando talentos às carreiras do futuro através de inteligência artificial e educação personalizada
          </p>
        </div>

        <div className="space-y-12">
          {/* Missão e Visão */}
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                  <span className="text-3xl">🎯</span>
                  Nossa Missão
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Democratizar o acesso à orientação profissional qualificada, utilizando 
                  inteligência artificial para conectar pessoas em processo de requalificação 
                  com as carreiras mais promissoras do mercado de tecnologia.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                  <span className="text-3xl">🔭</span>
                  Nossa Visão
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Ser a plataforma líder em requalificação profissional no Brasil, 
                  transformando vidas através da educação tecnológica e reduzindo 
                  a lacuna de skills do mercado digital.
                </p>
              </div>
            </div>
          </div>

          {/* ODS */}
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Objetivos de Desenvolvimento Sustentável 🌍
            </h2>
            <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
              O SkillMatch está alinhado com a Agenda 2030 da ONU, contribuindo diretamente 
              para o alcance dos seguintes Objetivos de Desenvolvimento Sustentável:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {odsList.map((ods) => (
                <div 
                  key={ods.numero}
                  className="border-2 border-green-200 rounded-2xl p-6 bg-green-50 hover:bg-green-100 transition-colors duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{ods.icone}</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        ODS {ods.numero}: {ods.titulo}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {ods.descricao}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Como Funciona */}
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Como o SkillMatch Funciona? 🔧
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">1. Análise de Perfil</h3>
                <p className="text-gray-600">
                  Nosso algoritmo KNN analisa suas experiências, interesses e habilidades 
                  para entender seu perfil profissional único.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">2. Recomendações Personalizadas</h3>
                <p className="text-gray-600">
                  Receba as 5 carreiras mais alinhadas com seu perfil, considerando 
                  demanda do mercado e suas aptidões naturais.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">3. Jornada de Aprendizado</h3>
                <p className="text-gray-600">
                  Acesse trilhas estruturadas com cursos curados e acompanhe seu progresso 
                  com gamificação e ranking mensal.
                </p>
              </div>
            </div>
          </div>

          {/* Tecnologias */}
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Tecnologias Utilizadas 💻
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {tecnologias.map((tech, index) => (
                <div 
                  key={index}
                  className="bg-gray-50 rounded-xl p-4 text-center hover:bg-gray-100 transition-colors duration-200"
                >
                  <h3 className="font-semibold text-gray-800 mb-1">{tech.nome}</h3>
                  <p className="text-sm text-gray-600">{tech.descricao}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">
                Pronto para Transformar Sua Carreira?
              </h2>
              <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
                Junte-se a milhares de profissionais que já descobriram seu caminho 
                ideal com a ajuda da inteligência artificial do SkillMatch.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <BotaoPersonalizado
                  texto="Começar Agora"
                  onClick={() => navigate("/cadastro")}
                  className="text-indigo-600 hover:bg-gray-100"
                />
                <button
                  onClick={() => navigate("/integrantes")}
                  className="px-6 py-3 text-white border border-white rounded-xl hover:bg-white hover:bg-opacity-10 transition-colors cursor-pointer"
                >
                  Conhecer a Equipe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}