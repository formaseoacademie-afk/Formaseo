import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Logo } from './Logo';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, authModalMode, closeAuthModal, openAuthModal, login, register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const isLogin = authModalMode === 'login';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isLogin) {
        const ok = await login(email, password);
        if (!ok) setError('Email ou mot de passe invalide.');
      } else {
        if (!name.trim()) {
          setError('Veuillez renseigner votre nom.');
          setIsLoading(false);
          return;
        }
        const ok = await register(name, email, password);
        if (!ok) setError('Une erreur est survenue lors de l’inscription.');
      }
    } catch (err) {
      setError('Erreur de communication avec le serveur.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (role: 'student' | 'admin' = 'student') => {
    setIsLoading(true);
    setError('');
    if (role === 'admin') {
      await login('admin@formaseo.ma', 'admin');
    } else {
      await login('student@formaseo.ma', 'demo');
    }
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-block mb-3">
            <Logo size="md" />
          </div>
          <h3 className="text-xl font-black text-slate-900">
            {isLogin ? 'Connexion à votre espace' : 'Créez votre compte FormaSeo'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {isLogin
              ? 'Accédez à vos leçons, vos quiz et vos certifications.'
              : 'Rejoignez plus de 2 800 étudiants et référenceurs au Maroc.'}
          </p>
        </div>

        {/* Demo Fast Login Button */}
        <div className="mb-5">
          <button
            type="button"
            onClick={() => handleDemoLogin('student')}
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 text-yellow-900 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all"
          >
            <Sparkles className="w-4 h-4 text-[#F5B716]" />
            <span>Tester en 1 clic (Compte Étudiant)</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex py-2 items-center mb-4">
          <div className="flex-grow border-t border-slate-100" />
          <span className="flex-shrink mx-4 text-[11px] text-slate-400 font-bold uppercase tracking-wider">
            ou par email
          </span>
          <div className="flex-grow border-t border-slate-100" />
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {!isLogin && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nom complet</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Ex: Yassine El Mansouri"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#F5B716] focus:ring-2 focus:ring-yellow-100 outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Adresse Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="votre.email@domaine.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#F5B716] focus:ring-2 focus:ring-yellow-100 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Mot de passe</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#F5B716] focus:ring-2 focus:ring-yellow-100 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 bg-[#F5B716] hover:bg-[#E0A30B] text-slate-950 font-black text-sm rounded-xl transition-all shadow hover:shadow-md flex items-center justify-center gap-2"
          >
            <span>{isLoading ? 'Chargement...' : isLogin ? 'Se connecter' : "Créer mon compte"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Switch Mode Footer */}
        <div className="mt-6 text-center text-xs text-slate-500">
          {isLogin ? (
            <p>
              Pas encore d'espace ?{' '}
              <button
                onClick={() => openAuthModal('register')}
                className="font-bold text-slate-900 hover:text-[#F5B716] underline ml-1"
              >
                Inscrivez-vous gratuitement
              </button>
            </p>
          ) : (
            <p>
              Déjà inscrit ?{' '}
              <button
                onClick={() => openAuthModal('login')}
                className="font-bold text-slate-900 hover:text-[#F5B716] underline ml-1"
              >
                Connectez-vous
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
