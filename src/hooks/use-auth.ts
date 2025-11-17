import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types/user';

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
            id_usuario: 1,
            nome_usuario: 'João Silva',
            email_usuario: 'joao.silva@email.com',
            data_nascimento: '1990-01-01',
            data_cadastro: '2023-01-01'
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
    const mockUser = {
            id_usuario: 1,
            nome_usuario: 'João Silva',
            email_usuario: 'joao.silva@email.com',
            data_nascimento: '1990-01-01',
            data_cadastro: '2023-01-01'
          };
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