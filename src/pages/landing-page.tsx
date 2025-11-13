import { useNavigate } from "react-router-dom";
import logo from "../assets/SkillMatch-logo.png";
import { BackgroundPrincipal } from "../components/background-principal";

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
                <button
                    onClick={() => navigate("/cadastro")}
                        className="px-10 py-3 border-2 border-black rounded-lg text-lg font-medium text-white bg-transparent hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer"
                >
                    Começar
                </button>

                <button
                    onClick={() => navigate("/login")}
                        className="px-10 py-3 border-2 border-black rounded-lg text-lg font-medium text-white bg-transparent hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer"
                >
                    Já sou membro
                </button>
            </div>
        </div>
    );
}
