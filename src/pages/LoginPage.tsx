import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, AlertCircle, ShieldCheck, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { SEOHead } from '../components/common/SEOHead';

export const LoginPage: React.FC = () => {
  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get('redirect') || (user?.role === 'SUPER_ADMIN' || user?.role === 'ADMIN' ? '/admin' : '/student/dashboard');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // If already authenticated, redirect
  React.useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'SUPER_ADMIN' || user.role === 'ADMIN') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/student/dashboard', { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      navigate(redirectPath, { replace: true });
    } else {
      setErrorMsg(res.message || 'Identifiants incorrects.');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <SEOHead
        title="Connexion Espace Membre & Académie | FormaSEO.ma"
        description="Connectez-vous à votre espace étudiant FormaSEO.ma pour accéder à vos cours, leçons vidéo et certificats officiels."
        canonicalPath="/login"
      />

      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-2xl p-8 sm:p-10 space-y-6 animate-in fade-in">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-[#082238] text-[#F5B82E] flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Espace Membre
          </h1>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Accédez à vos cours, leçons pratiques et outils d'apprentissage.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs font-bold flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Adresse Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="votre.email@domaine.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#F5B82E] transition-all"
                autoFocus
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Mot de passe
              </label>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="Entrez votre mot de passe..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#F5B82E] transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-[#082238] hover:bg-slate-800 text-white font-black text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <span>Vérification...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 text-[#F5B82E]" />
                <span>Se connecter</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
          <Link to="/register" className="hover:text-slate-900 transition-colors flex items-center gap-1">
            <UserPlus className="w-3.5 h-3.5 text-[#F5B82E]" />
            <span>Créer un compte étudiant</span>
          </Link>
          <Link to="/" className="hover:text-slate-900 transition-colors">
            ← Site public
          </Link>
        </div>
      </div>
    </div>
  );
};
