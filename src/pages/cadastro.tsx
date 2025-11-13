import { useNavigate } from "react-router-dom";
import { BackgroundPrincipal } from "../components/background-principal";
import BotaoPersonalizado from "../components/botao-personalizado";

export function Cadastro() {
    const navigate = useNavigate();
    return (
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
            <BackgroundPrincipal />
            <h1 className="relative z-10 text-3xl font-bold mb-6 text-white">Página de Cadastro</h1>
            {/* Formulário de cadastro pode ser adicionado aqui */}
            <BotaoPersonalizado
                texto="Voltar para a página inicial"
                onClick={() => navigate("/")}
                className="mt-6"
            />
        </div>
    );
}