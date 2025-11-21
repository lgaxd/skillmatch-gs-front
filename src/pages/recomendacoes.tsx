import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { BackgroundPrincipal } from "../components/background-principal";
import { Loading } from "../components/ui/feedback/loading";
import { apiService } from "../services/api";
import { authService } from "../services/auth";

interface Carreira {
    id: string;
    nome: string;
    area: string;
    demanda: 'alta' | 'media' | 'baixa';
    descricao: string;
    salarioMedio: string;
    tempoPreparacao: string;
    skillsPrincipais: string[];
    alinhamento: number;
}

export function Recomendacoes() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [carreiraSelecionada, setCarreiraSelecionada] = useState<string | null>(null);
    const [carreiras, setCarreiras] = useState<Carreira[]>([]);

    // Carregar recomendações ao montar o componente
    useEffect(() => {
        const carregarRecomendacoes = async () => {
            setIsLoading(true);
            try {
                const recomendacoesSalvas = localStorage.getItem('recomendacoesKNN');
                
                if (recomendacoesSalvas) {
                    const data = JSON.parse(recomendacoesSalvas);
                    console.log("Dados das recomendações:", data);
                    
                    if (data.recomendacoes && Array.isArray(data.recomendacoes)) {
                        // Converter recomendações da API para o formato do componente
                        const carreirasFormatadas = data.recomendacoes.map((rec: any, index: number) => {
                            const alinhamento = Math.max(70, 100 - (rec.distancia * 20));
                            
                            return {
                                id: (index + 1).toString(),
                                nome: rec.carreira,
                                area: "Tecnologia",
                                demanda: 'alta' as const,
                                descricao: `Carreira altamente recomendada baseada no seu perfil. Nível de compatibilidade: ${alinhamento}%`,
                                salarioMedio: "R$ 8.000 - R$ 15.000",
                                tempoPreparacao: "6-12 meses",
                                skillsPrincipais: ["Python", "Machine Learning", "Análise de Dados"],
                                alinhamento: alinhamento
                            };
                        });
                        
                        setCarreiras(carreirasFormatadas);
                    } else {
                        // Estrutura inválida, usar mock
                        setCarreiras(carreirasMock);
                    }
                } else {
                    // Sem recomendações salvas, usar mock
                    setCarreiras(carreirasMock);
                }
            } catch (error) {
                console.error("Erro ao carregar recomendações:", error);
                setCarreiras(carreirasMock);
            } finally {
                setIsLoading(false);
            }
        };

        carregarRecomendacoes();
    }, []);

    const handleSelecionarCarreira = async (carreiraId: string) => {
        setIsLoading(true);
        setCarreiraSelecionada(carreiraId);

        try {
            const userId = authService.getCurrentUserId();
            
            // Tentar salvar no backend
            try {
                await apiService.selectCarreira(userId, parseInt(carreiraId));
                console.log("Carreira selecionada no backend:", carreiraId);
            } catch (error) {
                console.error("Erro ao salvar carreira no backend:", error);
                // Continuar mesmo com erro
            }

            // Redireciona para o dashboard
            navigate("/dashboard");
        } catch (error) {
            console.error("Erro ao selecionar carreira:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleVoltar = () => {
        navigate("/formulario-perfil");
    };

    const buscarRecomendacoes = async () => {
        setIsLoading(true);
        try {
            // Buscar perfil do localStorage
            const perfilSalvo = localStorage.getItem('perfilUsuario');
            if (perfilSalvo) {
                const perfil = JSON.parse(perfilSalvo);
                
                // Re-processar perfil
                const skillsParaKNN = {
                    Engenharia_Software: parseInt(perfil.interessesTecnologia) || 5,
                    Analise_Dados: parseInt(perfil.habilidadesAnalise) || 5,
                    Gestao_Projetos: parseInt(perfil.habilidadesLideranca) || 5,
                    Design_UX: parseInt(perfil.interessesCriatividade) || 5,
                    Comunicacao: parseInt(perfil.habilidadesComunicacao) || 5,
                    Marketing_Digital: 5,
                    Pensamento_Critico: parseInt(perfil.habilidadesAnalise) || 5,
                    Lideranca: parseInt(perfil.habilidadesLideranca) || 5,
                    Negociacao: parseInt(perfil.habilidadesComunicacao) || 5,
                    Financas: 5,
                    Criatividade: parseInt(perfil.interessesCriatividade) || 5
                };

                const recomendacoes = await apiService.getRecomendacoesKNN(skillsParaKNN);
                localStorage.setItem('recomendacoesKNN', JSON.stringify(recomendacoes));
                
                // Recarregar a página
                window.location.reload();
            }
        } catch (error) {
            console.error("Erro ao buscar recomendações:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const getDemandaColor = (demanda: string) => {
        switch (demanda) {
            case 'alta': return 'bg-green-100 text-green-800 border-green-200';
            case 'media': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'baixa': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getDemandaText = (demanda: string) => {
        switch (demanda) {
            case 'alta': return 'Alta Demanda';
            case 'media': return 'Média Demanda';
            case 'baixa': return 'Baixa Demanda';
            default: return demanda;
        }
    };

    const getAlinhamentoColor = (alinhamento: number) => {
        if (alinhamento >= 90) return 'text-green-600';
        if (alinhamento >= 80) return 'text-blue-600';
        if (alinhamento >= 70) return 'text-yellow-600';
        return 'text-gray-600';
    };

    if (isLoading && carreiras.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <BackgroundPrincipal />
                <div className="relative z-10">
                    <Loading message="Analisando seu perfil e buscando as melhores carreiras..." size="lg" />
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
                        Suas Recomendações de Carreira
                    </h1>
                    <p className="text-xl text-black opacity-90 mb-2">
                        Baseado no seu perfil, encontramos estas opções alinhadas com você
                    </p>
                    <p className="text-black opacity-80">
                        💡 Ordenadas por nível de compatibilidade com suas skills e interesses
                    </p>
                </div>

                {/* Grid de Recomendações */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                    {carreiras.map((carreira, index) => (
                        <div
                            key={carreira.id}
                            className="bg-white rounded-2xl shadow-2xl border-2 border-gray-100 hover:border-indigo-300 transition-all duration-300 hover:shadow-2xl"
                        >
                            {/* Header do Card */}
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold">
                                            #{index + 1}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border ${getDemandaColor(carreira.demanda)}`}>
                                            {getDemandaText(carreira.demanda)}
                                        </span>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-gray-800 mb-2">
                                    {carreira.nome}
                                </h3>

                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 font-medium">
                                        {carreira.area}
                                    </span>
                                    <div className="text-right">
                                        <div className={`text-lg font-bold ${getAlinhamentoColor(carreira.alinhamento)}`}>
                                            {carreira.alinhamento}%
                                        </div>
                                        <div className="text-xs text-gray-500">compatibilidade</div>
                                    </div>
                                </div>
                            </div>

                            {/* Conteúdo do Card */}
                            <div className="p-6">
                                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                                    {carreira.descricao}
                                </p>

                                {/* Informações Adicionais */}
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <div className="text-xs text-gray-500 font-medium">Salário Médio</div>
                                        <div className="text-sm font-semibold text-gray-800">{carreira.salarioMedio}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 font-medium">Tempo de Preparação</div>
                                        <div className="text-sm font-semibold text-gray-800">{carreira.tempoPreparacao}</div>
                                    </div>
                                </div>

                                {/* Skills Principais */}
                                <div className="mb-4">
                                    <div className="text-xs text-gray-500 font-medium mb-2">Skills Principais</div>
                                    <div className="flex flex-wrap gap-1">
                                        {carreira.skillsPrincipais.slice(0, 3).map((skill, idx) => (
                                            <span
                                                key={idx}
                                                className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                        {carreira.skillsPrincipais.length > 3 && (
                                            <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs">
                                                +{carreira.skillsPrincipais.length - 3}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Barra de Alinhamento */}
                                <div className="mb-4">
                                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                                        <span>Compatibilidade</span>
                                        <span>{carreira.alinhamento}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full ${carreira.alinhamento >= 90 ? 'bg-green-500' :
                                                    carreira.alinhamento >= 80 ? 'bg-blue-500' :
                                                        carreira.alinhamento >= 70 ? 'bg-yellow-500' : 'bg-gray-500'
                                                }`}
                                            style={{ width: `${carreira.alinhamento}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Botão de Seleção */}
                                <button
                                    onClick={() => handleSelecionarCarreira(carreira.id)}
                                    disabled={isLoading && carreiraSelecionada === carreira.id}
                                    className={`w-full px-6 py-3 text-white bg-indigo-600 rounded-xl font-semibold transition-all duration-300 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-[1.02] ${
                                        isLoading && carreiraSelecionada === carreira.id ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                >
                                    {isLoading && carreiraSelecionada === carreira.id
                                        ? "Selecionando..."
                                        : "Selecionar Esta Carreira"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Ações Adicionais */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <div className="text-center">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            Não encontrou o que procurava?
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Refine seu perfil ou explore mais opções personalizadas
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={handleVoltar}
                                className="px-6 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-xl hover:bg-gray-200 transition-colors cursor-pointer font-semibold"
                            >
                                Refazer Questionário
                            </button>
                            <button
                                onClick={buscarRecomendacoes}
                                disabled={isLoading}
                                className="px-6 py-3 text-white bg-indigo-500 border border-transparent rounded-xl hover:bg-indigo-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors cursor-pointer font-semibold"
                            >
                                {isLoading ? "Buscando..." : "Buscar Mais Opções"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Informações sobre o Processo */}
                <div className="text-center">
                    <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6 inline-block max-w-2xl">
                        <h4 className="font-semibold text-indigo-800 mb-2">
                            💡 Como funcionam as recomendações?
                        </h4>
                        <p className="text-indigo-700 text-sm">
                            Nossa IA analisou seu perfil profissional, interesses e habilidades usando o algoritmo KNN
                            para encontrar carreiras com perfis similares ao seu que tiveram sucesso. As recomendações
                            consideram demanda do mercado, compatibilidade com suas skills e potencial de crescimento.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Dados mockados de fallback
const carreirasMock: Carreira[] = [
    {
        id: "1",
        nome: "Cientista de Dados",
        area: "Tecnologia",
        demanda: "alta",
        descricao: "Profissional responsável por analisar e interpretar dados complexos para auxiliar na tomada de decisões estratégicas. Combina conhecimentos em estatística, programação e negócios.",
        salarioMedio: "R$ 8.000 - R$ 15.000",
        tempoPreparacao: "6-12 meses",
        skillsPrincipais: ["Python", "Machine Learning", "Estatística", "SQL", "Visualização de Dados"],
        alinhamento: 92
    },
    {
        id: "2",
        nome: "Desenvolvedor Full Stack",
        area: "Tecnologia",
        demanda: "alta",
        descricao: "Desenvolve tanto o front-end quanto o back-end de aplicações web. Trabalha com diversas tecnologias para criar soluções completas e escaláveis.",
        salarioMedio: "R$ 6.000 - R$ 12.000",
        tempoPreparacao: "8-14 meses",
        skillsPrincipais: ["JavaScript", "React", "Node.js", "Banco de Dados", "APIs"],
        alinhamento: 88
    },
    {
        id: "3",
        nome: "Product Manager",
        area: "Tecnologia & Negócios",
        demanda: "alta",
        descricao: "Lidera o desenvolvimento de produtos digitais, atuando na interface entre negócios, tecnologia e usuários. Define a visão do produto e prioriza funcionalidades.",
        salarioMedio: "R$ 12.000 - R$ 20.000",
        tempoPreparacao: "12-18 meses",
        skillsPrincipais: ["Gestão de Produto", "UX/UI", "Metodologias Ágeis", "Análise de Mercado", "Comunicação"],
        alinhamento: 85
    }
];