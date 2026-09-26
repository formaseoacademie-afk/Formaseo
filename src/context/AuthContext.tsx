import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('formaseo_token'));
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const res = await api.getCurrentUser();
      if (res && res.user) {
        setUser(res.user);
      } else {
        setUser(null);
        setToken(null);
        localStorage.removeItem('formaseo_token');
      }
    } catch (e) {
      setUser(null);
      setToken(null);
      localStorage.removeItem('formaseo_token');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api.login(email, password);
    if (res && res.success && res.data) {
      setUser(res.data.user);
      setToken(res.data.token);
      localStorage.setItem('formaseo_token', res.data.token);
      return { success: true, message: res.message };
    }
    return { success: false, message: res?.message || 'Identifiants invalides' };
  };

  const register = async (name: string, email: string, password: string, phone?: string) => {
    const res = await api.register(name, email, password, phone);
    if (res && res.success && res.data) {
      setUser(res.data.user);
      setToken(res.data.token);
      localStorage.setItem('formaseo_token', res.data.token);
      return { success: true, message: res.message };
    }
    return { success: false, message: res?.message || 'Erreur lors de l’inscription' };
  };

  const logout = async () => {
    await api.logout();
    setUser(null);
    setToken(null);
    localStorage.removeItem('formaseo_token');
  };

  const updateProfile = async (data: Partial<User>) => {
    const res = await api.updateProfile(data);
    if (res) {
      setUser((prev) => (prev ? { ...prev, ...res } : res));
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        refreshUser,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
