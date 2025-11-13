import { useNavigate } from "react-router-dom";
import { BackgroundPrincipal } from "../components/background-principal";
import LoginForm from "../components/login-form";

export function LoginPage() {
    const navigate = useNavigate();

    return (
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
            <BackgroundPrincipal />
            <h1 className="relative z-10 text-3xl font-bold mb-6 text-white">Login Page</h1>
            <LoginForm />
            <button
                onClick={() => navigate("/")}
                className="px-10 py-3 border-2 border-black rounded-lg text-lg font-medium hover:bg-black transition cursor-pointer text-white bg-transparent mt-6"
            >
                Voltar para a página inicial
            </button>
        </div>
    );
}