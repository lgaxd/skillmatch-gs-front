import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/SkillMatch-logo-notext.png";
import { ThemeToggle } from "../ui/theme-toggle";

interface HeaderProps {
    onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
    const [profileOpen, setProfileOpen] = useState(false);
    const navigate = useNavigate();
    const isAuthenticated = true;

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userId');
        sessionStorage.clear();
        setProfileOpen(false);
        setTimeout(() => {
            navigate("/login");
            window.location.reload();
        }, 100);
    };

    const handleHomeClick = () => {
        navigate('/dashboard');
    };

    const handleProfileClick = () => {
        navigate('/perfil');
        setProfileOpen(false);
    };

    const handleLoginClick = () => {
        navigate('/login');
        setProfileOpen(false);
    };

    return (
        <header className="flex items-center justify-between px-4 py-3 bg-indigo-600 text-white shadow-lg relative z-30">
            {/* Botão Menu */}
            <button
                className="text-2xl cursor-pointer p-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                onClick={onMenuClick}
                aria-label="Abrir menu lateral"
            >
                ☰
            </button>

            {/* Logo Central */}
            <div className="flex-grow text-center">
                <img
                    src={logo}
                    alt="SkillMatch Logo"
                    className="h-10 mx-auto cursor-pointer hover:scale-105 transition-transform duration-200"
                    onClick={handleHomeClick}
                />
            </div>

            {/* Controles: Toggle de Tema e Ícone do Usuário */}
            <div className="flex items-center gap-4">
                {/* Toggle de Tema */}
                <ThemeToggle />
                
                {/* Ícone do Usuário */}
                <div className="relative">
                    <button
                        className="cursor-pointer p-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                        onClick={() => setProfileOpen((prev) => !prev)}
                        aria-haspopup="true"
                        aria-expanded={profileOpen}
                    >
                        <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white font-semibold">
                            {isAuthenticated ? "👤" : "🚪"}
                        </div>
                    </button>

                    {profileOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white text-gray-700 rounded-xl shadow-2xl z-50 border border-gray-200 overflow-hidden">
                            {isAuthenticated ? (
                                <>
                                    <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                                        <p className="text-sm font-semibold text-gray-800">João Silva</p>
                                        <p className="text-xs text-gray-600">Desenvolvedor Front-end</p>
                                    </div>
                                    <ul className="py-1">
                                        <li>
                                            <button
                                                className="w-full text-left px-4 py-3 hover:bg-indigo-50 cursor-pointer flex items-center gap-2 transition-colors duration-200"
                                                onClick={handleProfileClick}
                                            >
                                                <span>👤</span>
                                                <span>Meu Perfil</span>
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className="w-full text-left px-4 py-3 hover:bg-indigo-50 cursor-pointer flex items-center gap-2 transition-colors duration-200"
                                                onClick={() => navigate('/dashboard')}
                                            >
                                                <span>📊</span>
                                                <span>Dashboard</span>
                                            </button>
                                        </li>
                                        <li className="border-t border-gray-100">
                                            <button
                                                className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 cursor-pointer flex items-center gap-2 transition-colors duration-200"
                                                onClick={handleLogout}
                                            >
                                                <span>🚪</span>
                                                <span>Sair</span>
                                            </button>
                                        </li>
                                    </ul>
                                </>
                            ) : (
                                <ul className="py-1">
                                    <li>
                                        <button
                                            className="w-full text-left px-4 py-3 hover:bg-indigo-50 cursor-pointer flex items-center gap-2 transition-colors duration-200"
                                            onClick={handleLoginClick}
                                        >
                                            <span>🔐</span>
                                            <span>Fazer Login</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="w-full text-left px-4 py-3 hover:bg-indigo-50 cursor-pointer flex items-center gap-2 transition-colors duration-200"
                                            onClick={() => navigate('/cadastro')}
                                        >
                                            <span>📝</span>
                                            <span>Criar Conta</span>
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}