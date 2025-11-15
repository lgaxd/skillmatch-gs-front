import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { BackgroundPrincipal } from "../components/background-principal";
import BotaoPersonalizado from "../components/botao-personalizado";
import { SelectPersonalizado } from "../components/select-personalizado";

interface FormData {
  experienciaAnos: string;
  areaAtual: string;
  nivelSenioridade: string;
  estiloTrabalho: string;
  interessesTecnologia: string;
  interessesNegocios: string;
  interessesCriatividade: string;
  habilidadesComunicacao: string;
  habilidadesLideranca: string;
  habilidadesAnalise: string;
  preferenciaAmbiente: string;
  disponibilidadeEstudo: string;
  objetivoCarreira: string;
  faixaSalarial: string;
  mobilidadeGeografica: string;
}

interface FormErrors {
  [key: string]: string;
}

export function FormularioPerfil() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    experienciaAnos: "",
    areaAtual: "",
    nivelSenioridade: "",
    estiloTrabalho: "",
    interessesTecnologia: "",
    interessesNegocios: "",
    interessesCriatividade: "",
    habilidadesComunicacao: "",
    habilidadesLideranca: "",
    habilidadesAnalise: "",
    preferenciaAmbiente: "",
    disponibilidadeEstudo: "",
    objetivoCarreira: "",
    faixaSalarial: "",
    mobilidadeGeografica: ""
  });
  
  const [currentSection, setCurrentSection] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  // Opções para as perguntas (escalas de 1-5 ou categorias específicas)
  const opcoesExperiencia = [
    { value: "0-1", label: "0-1 ano (Iniciante)" },
    { value: "2-3", label: "2-3 anos (Júnior)" },
    { value: "4-6", label: "4-6 anos (Pleno)" },
    { value: "7-10", label: "7-10 anos (Sênior)" },
    { value: "10+", label: "10+ anos (Especialista)" }
  ];

  const opcoesAreaAtual = [
    { value: "tecnologia", label: "Tecnologia" },
    { value: "administrativo", label: "Administrativo" },
    { value: "vendas", label: "Vendas" },
    { value: "marketing", label: "Marketing" },
    { value: "rh", label: "Recursos Humanos" },
    { value: "financeiro", label: "Financeiro" },
    { value: "saude", label: "Saúde" },
    { value: "educacao", label: "Educação" },
    { value: "outra", label: "Outra" }
  ];

  const opcoesNivelSenioridade = [
    { value: "estagiario", label: "Estagiário" },
    { value: "junior", label: "Júnior" },
    { value: "pleno", label: "Pleno" },
    { value: "senior", label: "Sênior" },
    { value: "especialista", label: "Especialista" },
    { value: "lideranca", label: "Liderança" }
  ];

  const opcoesEstiloTrabalho = [
    { value: "individual", label: "Trabalho Individual" },
    { value: "equipe", label: "Trabalho em Equipe" },
    { value: "hibrido", label: "Híbrido" },
    { value: "lideranca", label: "Liderança/Gestão" }
  ];

  const opcoesInteresse = [
    { value: "1", label: "Nenhum interesse" },
    { value: "2", label: "Pouco interesse" },
    { value: "3", label: "Interesse moderado" },
    { value: "4", label: "Interesse alto" },
    { value: "5", label: "Muito interessado" }
  ];

  const opcoesHabilidade = [
    { value: "1", label: "Iniciante" },
    { value: "2", label: "Básico" },
    { value: "3", label: "Intermediário" },
    { value: "4", label: "Avançado" },
    { value: "5", label: "Especialista" }
  ];

  const opcoesPreferenciaAmbiente = [
    { value: "presencial", label: "100% Presencial" },
    { value: "hibrido", label: "Híbrido" },
    { value: "remoto", label: "100% Remoto" }
  ];

  const opcoesDisponibilidade = [
    { value: "5-10", label: "5-10 horas/semana" },
    { value: "10-15", label: "10-15 horas/semana" },
    { value: "15-20", label: "15-20 horas/semana" },
    { value: "20+", label: "20+ horas/semana" }
  ];

  const opcoesObjetivo = [
    { value: "recolocacao", label: "Recolocação Profissional" },
    { value: "transicao", label: "Transição de Carreira" },
    { value: "promocao", label: "Promoção/Progressão" },
    { value: "empreender", label: "Empreender" },
    { value: "atualizacao", label: "Atualização de Skills" }
  ];

  const opcoesFaixaSalarial = [
    { value: "ate-3k", label: "Até R$ 3.000" },
    { value: "3k-5k", label: "R$ 3.000 - R$ 5.000" },
    { value: "5k-8k", label: "R$ 5.000 - R$ 8.000" },
    { value: "8k-12k", label: "R$ 8.000 - R$ 12.000" },
    { value: "12k+", label: "Acima de R$ 12.000" }
  ];

  const opcoesMobilidade = [
    { value: "local", label: "Apenas local" },
    { value: "regional", label: "Regional" },
    { value: "nacional", label: "Nacional" },
    { value: "internacional", label: "Internacional" },
    { value: "remoto", label: "Apenas remoto" }
  ];

  const sections = [
    {
      title: "Experiência Profissional",
      description: "Conte-nos sobre sua trajetória profissional atual",
      fields: [
        { key: 'experienciaAnos', label: 'Anos de experiência profissional', options: opcoesExperiencia },
        { key: 'areaAtual', label: 'Área de atuação atual', options: opcoesAreaAtual },
        { key: 'nivelSenioridade', label: 'Nível de senioridade atual', options: opcoesNivelSenioridade },
        { key: 'estiloTrabalho', label: 'Estilo de trabalho preferido', options: opcoesEstiloTrabalho }
      ]
    },
    {
      title: "Interesses e Aptidões",
      description: "Identifique seus interesses e áreas de aptidão natural",
      fields: [
        { key: 'interessesTecnologia', label: 'Interesse em tecnologia e inovação', options: opcoesInteresse },
        { key: 'interessesNegocios', label: 'Interesse em negócios e estratégia', options: opcoesInteresse },
        { key: 'interessesCriatividade', label: 'Interesse em criatividade e design', options: opcoesInteresse },
        { key: 'habilidadesComunicacao', label: 'Habilidade em comunicação', options: opcoesHabilidade },
        { key: 'habilidadesLideranca', label: 'Habilidade em liderança', options: opcoesHabilidade },
        { key: 'habilidadesAnalise', label: 'Habilidade em análise de dados', options: opcoesHabilidade }
      ]
    },
    {
      title: "Preferências e Objetivos",
      description: "Defina suas preferências de trabalho e objetivos de carreira",
      fields: [
        { key: 'preferenciaAmbiente', label: 'Preferência de ambiente de trabalho', options: opcoesPreferenciaAmbiente },
        { key: 'disponibilidadeEstudo', label: 'Disponibilidade para estudos', options: opcoesDisponibilidade },
        { key: 'objetivoCarreira', label: 'Objetivo principal', options: opcoesObjetivo },
        { key: 'faixaSalarial', label: 'Expectativa salarial', options: opcoesFaixaSalarial },
        { key: 'mobilidadeGeografica', label: 'Mobilidade geográfica', options: opcoesMobilidade }
      ]
    }
  ];

  const validateCurrentSection = (): boolean => {
    const currentFields = sections[currentSection].fields;
    const newErrors: FormErrors = {};

    currentFields.forEach(field => {
      if (!formData[field.key as keyof FormData]) {
        newErrors[field.key] = "Este campo é obrigatório";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Remove erro do campo quando usuário selecionar uma opção
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleNext = () => {
    if (validateCurrentSection()) {
      if (currentSection < sections.length - 1) {
        setCurrentSection(currentSection + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    } else {
      navigate("/cadastro");
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      // Simulação de chamada para a API do KNN
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      console.log("Dados para o KNN:", formData);
      
      // Redireciona para as recomendações após processamento
      navigate("/recomendacoes");
    } catch (error) {
      console.error("Erro ao processar perfil:", error);
      setErrors({ submit: "Erro ao processar seu perfil. Tente novamente." });
    } finally {
      setIsLoading(false);
    }
  };

  const progress = ((currentSection + 1) / sections.length) * 100;

  return (
    <div className="relative min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <BackgroundPrincipal />
      
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Perfil Profissional
          </h1>
          <p className="text-xl text-white opacity-90">
            Responda as perguntas para receber recomendações personalizadas
          </p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-700">
              Seção {currentSection + 1} de {sections.length}
            </span>
            <span className="text-sm font-medium text-gray-700">
              {Math.round(progress)}% completo
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Formulário */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
          {/* Section Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {sections[currentSection].title}
            </h2>
            <p className="text-gray-600">
              {sections[currentSection].description}
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            {/* Campos da seção atual */}
            <div className="grid grid-cols-1 gap-6">
              {sections[currentSection].fields.map((field) => (
                <SelectPersonalizado
                  key={field.key}
                  label={field.label}
                  value={formData[field.key as keyof FormData]}
                  onChange={(value) => handleInputChange(field.key as keyof FormData, value)}
                  options={field.options}
                  required
                  error={errors[field.key]}
                />
              ))}
            </div>

            {/* Erro geral */}
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700 text-sm">{errors.submit}</p>
              </div>
            )}

            {/* Botões de Navegação */}
            <div className="flex justify-between pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleBack}
                className="px-8 py-3 text-lg font-semibold text-gray-700 bg-gray-100 border border-gray-300 rounded-xl hover:bg-gray-200 transition-colors cursor-pointer"
              >
                {currentSection === 0 ? 'Voltar ao Cadastro' : 'Voltar'}
              </button>

              <BotaoPersonalizado
                texto={
                  isLoading 
                    ? "Processando..." 
                    : currentSection === sections.length - 1 
                    ? "Ver Minhas Recomendações" 
                    : "Continuar"
                }
                onClick={() => !isLoading && handleNext()}
                className={`min-w-[200px] ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              />
            </div>
          </form>
        </div>

        {/* Informação sobre o KNN */}
        <div className="mt-6 text-center">
          <p className="text-white text-sm opacity-80">
            💡 Seus dados serão processados por nosso algoritmo de IA (KNN) para encontrar 
            as carreiras mais alinhadas com seu perfil
          </p>
        </div>
      </div>
    </div>
  );
}