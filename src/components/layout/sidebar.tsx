import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

interface MenuItem {
  label: string;
  path: string;
  icon: string;
  requiresAuth?: boolean;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const isAuthenticated = true; // Futuramente virá do useAuth

  const menuItems: MenuItem[] = [
    { label: "Dashboard", path: "/dashboard", icon: "📊", requiresAuth: true },
    { label: "Minha Trilha", path: "/trilha/1", icon: "🚀", requiresAuth: true },
    { label: "Recomendações", path: "/recomendacoes", icon: "🎯", requiresAuth: true },
    { label: "Ranking", path: "/ranking", icon: "🏆", requiresAuth: true },
    { label: "Meu Perfil", path: "/perfil", icon: "👤", requiresAuth: true },
    { label: "Sobre o Projeto", path: "/sobre", icon: "ℹ️" },
    { label: "Nossa Equipe", path: "/integrantes", icon: "👥" },
    { label: "Perguntas Frequentes", path: "/faq", icon: "❓" },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    !item.requiresAuth || (item.requiresAuth && isAuthenticated)
  );

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-full w-64 bg-indigo-600 text-white transform ${
        open ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out shadow-2xl z-40`}
    >
      {/* Botão de fechar */}
      <div className="flex justify-end p-4">
        <button
          className="text-2xl font-light cursor-pointer hover:bg-indigo-700 rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-200"
          onClick={onClose}
          aria-label="Fechar menu"
        >
          ✕
        </button>
      </div>

      {/* Logo e Nome */}
      <div className="px-6 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <span className="text-lg">🎯</span>
          </div>
          <div>
            <h1 className="text-xl font-bold">SkillMatch</h1>
            <p className="text-indigo-200 text-sm">by FIAP</p>
          </div>
        </div>
      </div>

      {/* Indicador de Status */}
      <div className="px-6 mb-6">
        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-500 text-white">
          {isAuthenticated ? '🎓 Aluno' : '👤 Visitante'}
        </div>
      </div>

      {/* Lista de itens */}
      <nav className="mt-2 px-4 space-y-2">
        <ul className="space-y-2">
          {filteredMenuItems.map((item, index) => (
            <li
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className="flex items-center gap-3 text-base font-medium cursor-pointer p-3 rounded-lg hover:bg-indigo-700 hover:scale-105 transition-all duration-200 group"
            >
              <span className="text-lg">{item.icon}</span>
              <span className="group-hover:font-semibold transition-all duration-200">
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer da Sidebar */}
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-indigo-500">
        <div className="text-center">
          <p className="text-indigo-200 text-sm">
            Global Solution 2025/2
          </p>
          <p className="text-indigo-300 text-xs mt-1">
            FIAP
          </p>
        </div>
      </div>
    </aside>
  );
}