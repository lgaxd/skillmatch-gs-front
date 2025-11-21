import { useNavigate } from "react-router-dom";
import { BackgroundPrincipal } from "../components/background-principal";
import LoginForm from "../components/auth/login-form";
import { useAuth } from "../hooks/use-auth";
import { authService } from "../services/auth";

export function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (credentials: any) => {
        try {
            console.log("Tentando login...");
            await login(credentials.email, credentials.password);
            console.log("Login bem-sucedido, redirecionando para dashboard");
            navigate("/dashboard");
        } catch (error: any) {
            console.error("Erro no login:", error);
            alert(error.message || "Email ou senha incorretos. Tente novamente.");
        }
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center px-6">
            <BackgroundPrincipal />
            <div className="relative z-10 w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-white text-center">SkillMatch - Login</h1>
                <LoginForm onSubmit={handleLogin} />
                <button
                    onClick={() => navigate("/")}
                    className="mt-6 w-full px-6 py-3 text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors cursor-pointer"
                >
                    Voltar para a página inicial
                </button>
                
                {/* Botão de debug (remova em produção) */}
                <button
                    onClick={() => {
                        authService.debugAuth();
                    }}
                    className="mt-4 w-full px-6 py-3 text-gray-700 bg-gray-200 rounded-xl hover:bg-gray-300 transition-colors cursor-pointer text-sm"
                >
                    Debug Auth
                </button>
            </div>
        </div>
    );
}