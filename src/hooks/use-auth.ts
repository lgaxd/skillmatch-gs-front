import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  nome: string;
  email: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('userToken');
        if (token) {
          // Simulação - futuramente buscar da API
          setUser({
            id: 1,
            nome: 'João Silva',
            email: 'joao.silva@email.com'
          });
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    // Futuramente integrar com API
    const mockUser = { id: 1, nome: 'João Silva', email };
    setUser(mockUser);
    localStorage.setItem('userToken', 'mock-token');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userToken');
    navigate('/login');
  };

  return {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user
  };
};