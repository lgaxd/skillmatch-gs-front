import { useNavigate } from "react-router-dom";
import logo from "../assets/SkillMatch-logo.png";
import { BackgroundPrincipal } from "../components/background-principal";
import BotaoPersonalizado from "../components/botao-personalizado";

export function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen px-6">
            <BackgroundPrincipal />
            {/* Logo e nome */}
            <div className="relative z-10 flex flex-col items-center">
                <img src={logo} alt="SkillMatch Logo" className="w-128 h-128" />
            </div>

            {/* Tagline */}
            <p className="relative z-10 text-center text-lg font-medium mb-10 text-white">
                O futuro do trabalho está nas suas mãos
            </p>

            {/* Botões */}
            <div className="relative z-10 flex flex-col sm:flex-row gap-6">
                <BotaoPersonalizado
                    texto="Começar"
                    onClick={() => navigate("/cadastro")}
                />

                <BotaoPersonalizado
                    texto="Já sou membro"
                    onClick={() => navigate("/login")}
                />
            </div>
        </div>
    );
}
