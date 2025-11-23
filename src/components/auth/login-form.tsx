import { useState, useRef } from "react";
import type { FormEvent } from "react";

type Credentials = {
    email: string;
    password: string;
    remember: boolean;
};

type LoginFormProps = {
    onSubmit?: (creds: Credentials) => Promise<void> | void;
    initialEmail?: string;
    initialRemember?: boolean;
    className?: string;
    submitLabel?: string;
};

const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function LoginForm({
    onSubmit,
    initialEmail = "",
    initialRemember = false,
    className,
    submitLabel = "Entrar",
}: LoginFormProps) {
    const [email, setEmail] = useState(initialEmail);
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(initialRemember);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string }>(
        {}
    );
    const [loading, setLoading] = useState(false);
    const emailRef = useRef<HTMLInputElement | null>(null);

    const validate = () => {
        const e: typeof errors = {};
        if (!email) e.email = "E-mail é obrigatório.";
        else if (!validateEmail(email)) e.email = "E-mail inválido.";
        if (!password) e.password = "Senha é obrigatória.";
        else if (password.length < 6) e.password = "A senha precisa de ao menos 6 caracteres.";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (ev: FormEvent) => {
        ev.preventDefault();
        if (!validate()) {
            if (errors.email) emailRef.current?.focus();
            return;
        }
        try {
            setLoading(true);
            await onSubmit?.({ email, password, remember });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`bg-white p-6 rounded-xl shadow-2xl border border-gray-200 ${className}`}>
            <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                    <label htmlFor="login-email" className="block mb-1">
                        E-mail
                    </label>
                    <input
                        id="login-email"
                        ref={emailRef}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-invalid={errors.email ? "true" : "false"}
                        aria-describedby={errors.email ? "login-email-error" : undefined}
                        placeholder="seu@exemplo.com"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {errors.email && (
                        <div id="login-email-error" role="alert" className="text-red-600 mt-1.5 text-sm">
                            {errors.email}
                        </div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="login-password" className="block mb-1">
                        Senha
                    </label>
                    <div className="flex gap-2">
                        <input
                            id="login-password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            aria-invalid={errors.password ? "true" : "false"}
                            aria-describedby={errors.password ? "login-password-error" : undefined}
                            placeholder="••••••••"
                            className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((s) => !s)}
                            aria-pressed={showPassword}
                            className="px-3 py-2 border border-gray-300 rounded-xl bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                            {showPassword ? "Ocultar" : "Mostrar"}
                        </button>
                    </div>
                    {errors.password && (
                        <div id="login-password-error" role="alert" className="text-red-600 mt-1.5 text-sm">
                            {errors.password}
                        </div>
                    )}
                </div>

                <div className="mb-4 flex items-center gap-2">
                    <input
                        id="login-remember"
                        type="checkbox"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                    />
                    <label htmlFor="login-remember" className="text-gray-700">
                        Manter-me conectado
                    </label>
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="text-lg font-semibold w-full py-2.5 px-3 bg-indigo-600 text-white rounded-xl border-none cursor-pointer hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors transform hover:scale-[1.01]"
                    >
                        {loading ? "Entrando..." : submitLabel}
                    </button>
                </div>
            </form>
        </div>
    );
}