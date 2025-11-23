import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { BackgroundPrincipal } from "../components/background-principal";
import { Loading } from "../components/ui/feedback/loading";
import { apiService } from "../services/api";
import { authService } from "../services/auth";

interface Carreira {
    id: string;
    nome: string;
    descricao: string;
    demanda: number;
}

export function Recomendacoes() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [carreiraSelecionada, setCarreiraSelecionada] = useState<string | null>(null);
    const [carreiras, setCarreiras] = useState<Carreira[]>([]);

    // Carregar carreiras da API
    useEffect(() => {
        const carregarCarreiras = async () => {
            setIsLoading(true);
            try {
                const response = await apiService.getCarreiras();
                
                const todasCarreiras: Carreira[] = response.map(carreira => ({
                    id: carreira.id.toString(),
                    nome: carreira.nome,
                    descricao: carreira.descricao,
                    demanda: carreira.demanda
                }));
                
                // Seleciona 5 carreiras aleatórias e ordena pela demanda (maior para menor)
                const carreirasAleatorias = todasCarreiras
                    .sort(() => Math.random() - 0.5) // Embaralha
                    .slice(0, 5) // Pega 5
                    .sort((a, b) => b.demanda - a.demanda) // Ordena por demanda decrescente
                    .map(carreira => ({
                        ...carreira,
                        id: carreira.id.toString()
                    }));
                
                setCarreiras(carreirasAleatorias);
            } catch (error) {
                console.error("Erro ao carregar carreiras:", error);
                // Fallback para dados mockados se a API falhar
                setCarreiras(carreirasMock);
            } finally {
                setIsLoading(false);
            }
        };

        carregarCarreiras();
    }, []);

    const handleSelecionarCarreira = async (carreiraId: string) => {
        setIsLoading(true);
        setCarreiraSelecionada(carreiraId);

        try {
            const userId = authService.getCurrentUserId();

            // Selecionar carreira no backend
            await apiService.selectCarreira(userId, parseInt(carreiraId));
            console.log("Carreira selecionada no backend:", carreiraId);

            // Redireciona para o dashboard
            navigate("/dashboard");
        } catch (error) {
            console.error("Erro ao selecionar carreira:", error);
            alert("Erro ao selecionar carreira. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleVoltar = () => {
        navigate("/formulario-perfil");
    };

    const buscarMaisCarreiras = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8080/carreiras');
            
            if (!response.ok) {
                throw new Error('Erro ao carregar carreiras');
            }
            
            const todasCarreiras: Carreira[] = await response.json();
            
            // Seleciona novas 5 carreiras aleatórias
            const novasCarreiras = todasCarreiras
                .sort(() => Math.random() - 0.5)
                .slice(0, 5)
                .sort((a, b) => b.demanda - a.demanda)
                .map(carreira => ({
                    ...carreira,
                    id: carreira.id.toString()
                }));
            
            setCarreiras(novasCarreiras);
        } catch (error) {
            console.error("Erro ao buscar mais carreiras:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const getDemandaColor = (demanda: number) => {
        if (demanda >= 80) return 'bg-green-100 text-green-800 border-green-200';
        if (demanda >= 60) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        return 'bg-red-100 text-red-800 border-red-200';
    };

    const getDemandaText = (demanda: number) => {
        if (demanda >= 80) return 'Alta Demanda';
        if (demanda >= 60) return 'Média Demanda';
        return 'Baixa Demanda';
    };

    const getAlinhamentoColor = (demanda: number) => {
        if (demanda >= 80) return 'text-green-600';
        if (demanda >= 60) return 'text-blue-600';
        return 'text-gray-600';
    };

    // Calcular compatibilidade baseada na demanda (simulação)
    const calcularCompatibilidade = (demanda: number, index: number) => {
        // Compatibilidade diminui conforme a posição no ranking
        const baseCompatibilidade = Math.max(70, demanda - (index * 5));
        return Math.min(95, baseCompatibilidade);
    };

    if (isLoading && carreiras.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <BackgroundPrincipal />
                <div className="relative z-10">
                    <Loading message="Carregando carreiras recomendadas..." size="lg" />
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
                        Carreiras Recomendadas
                    </h1>
                    <p className="text-xl text-black opacity-90 mb-2">
                        Baseado nas tendências atuais do mercado
                    </p>
                    <p className="text-black opacity-80">
                        💡 Ordenadas por demanda de mercado
                    </p>
                </div>

                {/* Grid de Recomendações */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                    {carreiras.map((carreira, index) => {
                        const compatibilidade = calcularCompatibilidade(carreira.demanda, index);
                        
                        return (
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
                                            Demanda: {carreira.demanda}%
                                        </span>
                                        <div className="text-right">
                                            <div className={`text-lg font-bold ${getAlinhamentoColor(compatibilidade)}`}>
                                                {compatibilidade}%
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

                                    {/* Barra de Compatibilidade */}
                                    <div className="mb-4">
                                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                                            <span>Compatibilidade</span>
                                            <span>{compatibilidade}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full ${
                                                    compatibilidade >= 80 ? 'bg-green-500' :
                                                    compatibilidade >= 60 ? 'bg-blue-500' : 'bg-gray-500'
                                                }`}
                                                style={{ width: `${compatibilidade}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* Botão de Seleção */}
                                    <button
                                        onClick={() => handleSelecionarCarreira(carreira.id)}
                                        disabled={isLoading && carreiraSelecionada === carreira.id}
                                        className={`cursor-pointer w-full px-6 py-3 text-white bg-indigo-600 rounded-xl font-semibold transition-all duration-300 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-[1.02] ${
                                            isLoading && carreiraSelecionada === carreira.id ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                    >
                                        {isLoading && carreiraSelecionada === carreira.id
                                            ? "Selecionando..."
                                            : "Selecionar Esta Carreira"}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Ações Adicionais */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <div className="text-center">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            Quer explorar mais opções?
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Carregue um novo conjunto de carreiras aleatórias
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={handleVoltar}
                                className="px-6 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-xl hover:bg-gray-200 transition-colors cursor-pointer font-semibold"
                            >
                                Voltar ao Questionário
                            </button>
                            <button
                                onClick={buscarMaisCarreiras}
                                disabled={isLoading}
                                className="px-6 py-3 text-white bg-indigo-500 border border-transparent rounded-xl hover:bg-indigo-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors cursor-pointer font-semibold"
                            >
                                {isLoading ? "Carregando..." : "Carregar Mais Carreiras"}
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
                            Estas carreiras são selecionadas aleatoriamente do nosso banco de dados e ordenadas 
                            pela demanda atual do mercado. A compatibilidade é calculada com base na demanda 
                            e posição no ranking.
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
        nome: "Desenvolvedor Front-end",
        descricao: "Desenvolvimento da interface do usuário",
        demanda: 85.5
    },
    {
        id: "2",
        nome: "Cientista de Dados",
        descricao: "Análise e interpretação de dados complexos",
        demanda: 90.2
    },
    {
        id: "3",
        nome: "Desenvolvedor Back-end",
        descricao: "Desenvolvimento da lógica de servidor e APIs",
        demanda: 82.7
    },
    {
        id: "4",
        nome: "Product Manager",
        descricao: "Gestão e desenvolvimento de produtos digitais",
        demanda: 78.9
    },
    {
        id: "5",
        nome: "UX/UI Designer",
        descricao: "Design de experiência e interface do usuário",
        demanda: 75.3
    }
];