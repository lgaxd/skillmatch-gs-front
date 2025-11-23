import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth';
import type { Usuario } from '../services/auth';

export const useAuth = () => {
  const [user, setUser] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = authService.getCurrentUser();
    setUser(userData);
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const userData = await authService.login({ email, password });
    setUser(userData);
    return userData;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
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