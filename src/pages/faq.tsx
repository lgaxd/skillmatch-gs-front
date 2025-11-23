import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { BackgroundPrincipal } from "../components/background-principal";
import BotaoPersonalizado from "../components/ui/buttons/botao-personalizado";

interface FaqItem {
  pergunta: string;
  resposta: string;
  categoria: 'ia' | 'trilhas' | 'pontuacao' | 'geral';
}

export function FAQ() {
  const navigate = useNavigate();
  const [categoriaAtiva, setCategoriaAtiva] = useState<'todos' | 'ia' | 'trilhas' | 'pontuacao' | 'geral'>('todos');
  const [perguntaAberta, setPerguntaAberta] = useState<number | null>(null);

  const faqItems: FaqItem[] = [
    {
      pergunta: "Como o algoritmo de IA funciona para recomendar carreiras?",
      resposta: "Utilizamos o algoritmo KNN (K-Nearest Neighbors) que analisa seu perfil profissional baseado em coordenadas multidimensionais. O sistema compara suas características (experiência, interesses, habilidades) com perfis de carreiras bem-sucedidas e encontra as mais similares usando cálculo de distância euclidiana.",
      categoria: 'ia'
    },
    {
      pergunta: "Quais dados são considerados na recomendação?",
      resposta: "Analisamos: anos de experiência, área atual, nível de senioridade, estilo de trabalho preferido, interesses em tecnologia/negócios/criatividade, habilidades de comunicação/liderança/análise, preferências de ambiente de trabalho, disponibilidade para estudos, objetivos de carreira e expectativas salariais.",
      categoria: 'ia'
    },
    {
      pergunta: "As trilhas de aprendizado são personalizadas?",
      resposta: "Sim! Cada carreira possui uma trilha estruturada com skills essenciais em ordem progressiva. A trilha é composta por cursos curados de fontes confiáveis, organizados do básico ao avançado para garantir um aprendizado eficiente.",
      categoria: 'trilhas'
    },
    {
      pergunta: "Posso pular skills ou fazer em ordem diferente?",
      resposta: "Recomendamos seguir a ordem proposta, pois as skills foram organizadas para construir conhecimento progressivamente. No entanto, você tem flexibilidade para estudar de acordo com sua disponibilidade e preferências.",
      categoria: 'trilhas'
    },
    {
      pergunta: "Como funciona o sistema de pontuação (XP)?",
      resposta: "Você ganha XP ao: completar cursos (+100-200 XP), dominar skills (+150-300 XP), manter consistência nos estudos (+50 XP/dia consecutivo) e alcançar marcos de progresso. O XP determina seu nível e posição no ranking mensal.",
      categoria: 'pontuacao'
    },
    {
      pergunta: "O que são os níveis e como evoluir?",
      resposta: "Os níveis representam seu progresso geral na plataforma. Cada nível requer 500 XP. Ao subir de nível, você desbloqueia novas funcionalidades e reconhecimentos no sistema.",
      categoria: 'pontuacao'
    },
    {
      pergunta: "O ranking é resetado todo mês?",
      resposta: "Sim! O ranking é mensal para manter a competitividade saudável e dar oportunidades iguais a todos os usuários. Sua pontuação total acumulada continua, mas a competição mensal reinicia.",
      categoria: 'pontuacao'
    },
    {
      pergunta: "Posso trocar de carreira depois de escolher?",
      resposta: "Sim! Você pode trocar de carreira a qualquer momento através da página de recomendações. Seu progresso na carreira anterior será salvo, permitindo retomar de onde parou se desejar voltar.",
      categoria: 'geral'
    },
    {
      pergunta: "Os cursos são gratuitos?",
      resposta: "A plataforma SkillMatch é gratuita e oferece curadoria de cursos de diversas fontes, incluindo opções gratuitas e pagas. Indicamos sempre opções acessíveis e de qualidade comprovada.",
      categoria: 'geral'
    },
    {
      pergunta: "Meus dados estão seguros?",
      resposta: "Sim! Seguimos as melhores práticas de segurança e LGPD. Seus dados pessoais e de perfil profissional são criptografados e utilizados apenas para as recomendações personalizadas.",
      categoria: 'geral'
    }
  ];

  const categorias = [
    { id: 'todos' as const, nome: 'Todas', icone: '🔍' },
    { id: 'ia' as const, nome: 'Inteligência Artificial', icone: '🤖' },
    { id: 'trilhas' as const, nome: 'Trilhas de Aprendizado', icone: '📚' },
    { id: 'pontuacao' as const, nome: 'Pontuação & Ranking', icone: '🏆' },
    { id: 'geral' as const, nome: 'Geral', icone: '❓' }
  ];

  const perguntasFiltradas = categoriaAtiva === 'todos' 
    ? faqItems 
    : faqItems.filter(item => item.categoria === categoriaAtiva);

  const togglePergunta = (index: number) => {
    setPerguntaAberta(perguntaAberta === index ? null : index);
  };

  return (
    <div className="relative min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <BackgroundPrincipal />
      
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">
            Perguntas Frequentes ❓
          </h1>
          <p className="text-xl text-black opacity-90">
            Tire suas dúvidas sobre o funcionamento do SkillMatch
          </p>
        </div>

        {/* Filtros de Categoria */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            Filtrar por categoria:
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {categorias.map((categoria) => (
              <button
                key={categoria.id}
                onClick={() => setCategoriaAtiva(categoria.id)}
                className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 flex items-center gap-2 ${
                  categoriaAtiva === categoria.id
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{categoria.icone}</span>
                {categoria.nome}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de FAQs */}
        <div className="space-y-4 mb-8">
          {perguntasFiltradas.map((item, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-200"
            >
              <button
                onClick={() => togglePergunta(index)}
                className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 pr-4">
                    {item.pergunta}
                  </h3>
                </div>
                <div className={`transform transition-transform duration-200 ${
                  perguntaAberta === index ? 'rotate-180' : ''
                }`}>
                  <span className="text-2xl text-gray-400">▼</span>
                </div>
              </button>
              
              {perguntaAberta === index && (
                <div className="px-6 pb-6">
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-gray-600 leading-relaxed">
                      {item.resposta}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Ainda com dúvidas? */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">
            Ainda tem dúvidas?
          </h2>
          <p className="text-indigo-100 mb-6">
            Entre em contato conosco ou explore mais sobre o projeto
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BotaoPersonalizado
              texto="Voltar ao Início"
              onClick={() => navigate("/")}
              className="bg-white text-indigo-600 hover:bg-gray-100"
            />
            <button
              onClick={() => navigate("/sobre")}
              className="px-6 py-3 text-white border border-white rounded-xl hover:bg-white hover:bg-opacity-10 transition-colors cursor-pointer"
            >
              Sobre o Projeto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}