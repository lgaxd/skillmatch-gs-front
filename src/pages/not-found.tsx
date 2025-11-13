import { useNavigate } from "react-router-dom";
import { BackgroundPrincipal } from "../components/background-principal";
import  notFoundImage from "../assets/erro-404.png";

export function NotFoundPage() {
    const navigate = useNavigate();
    return (
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
            <BackgroundPrincipal />
            <h1 className="relative z-10 text-3xl font-bold mb-6 text-white">Página Não Encontrada</h1>
            <img
                src={notFoundImage}
                alt="Erro 404 - Página Não Encontrada"
                className="relative z-10 w-64 h-64 mb-6"
            />
            <button
                onClick={() => navigate("/")}
                className="px-10 py-3 border-2 border-black rounded-lg text-lg font-medium hover:bg-black transition cursor-pointer text-white bg-transparent mt-6"
            >
                Voltar para a página inicial
            </button>
        </div>
    );
}