import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { ShieldAlert } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-[#F5B82E] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-bold text-slate-500">Vérification de la session...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-4 shadow-xl">
          <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-black text-slate-900">Accès Non Autorisé</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Votre compte (rôle: <strong className="uppercase text-slate-900">{user.role}</strong>) n'a pas les privilèges nécessaires pour accéder à cet espace.
          </p>
          <div className="pt-2">
            <a
              href="/"
              className="inline-block px-6 py-2.5 rounded-full bg-[#082238] text-white text-xs font-bold hover:bg-slate-800 transition-colors"
            >
              Retour à l'accueil
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
