import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  register: (name: string, email: string, password?: string) => Promise<boolean>;
  logout: () => void;
  enrollInCourse: (courseId: string) => Promise<boolean>;
  toggleLesson: (lessonId: string) => Promise<boolean>;
  openAuthModal: (mode?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'register';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('formaseo_token'));
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const currentUser = await api.getCurrentUser(token || undefined);
      if (currentUser) {
        setUser(currentUser);
      }
      setLoading(false);
    };
    fetchUser();
  }, [token]);

  const login = async (email: string, password?: string) => {
    const res = await api.login(email, password);
    if (res) {
      setUser(res.user);
      setToken(res.token);
      localStorage.setItem('formaseo_token', res.token);
      setIsAuthModalOpen(false);
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password?: string) => {
    const res = await api.register(name, email, password);
    if (res) {
      setUser(res.user);
      setToken(res.token);
      localStorage.setItem('formaseo_token', res.token);
      setIsAuthModalOpen(false);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('formaseo_token');
  };

  const enrollInCourse = async (courseId: string) => {
    if (!user) {
      openAuthModal('register');
      return false;
    }
    const updated = await api.enroll(courseId, user.id);
    if (updated) {
      setUser(updated);
      return true;
    }
    return false;
  };

  const toggleLesson = async (lessonId: string) => {
    if (!user) return false;
    const updated = await api.toggleLesson(lessonId, user.id);
    if (updated) {
      setUser(updated);
      return true;
    }
    return false;
  };

  const openAuthModal = (mode: 'login' | 'register' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        enrollInCourse,
        toggleLesson,
        openAuthModal,
        closeAuthModal,
        isAuthModalOpen,
        authModalMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
