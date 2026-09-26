import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  ShieldCheck,
  Save
} from 'lucide-react';

export const StudentProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);

    if (newPassword && newPassword !== confirmPassword) {
      setError('Les nouveaux mots de passe ne correspondent pas');
      return;
    }

    if (newPassword && newPassword.length < 6) {
      setError('Le nouveau mot de passe doit comporter au moins 6 caractères');
      return;
    }

    setSaving(true);

    try {
      await updateProfile({
        name,
        phone,
        bio
      });

      // If updating password
      if (newPassword) {
        await api.auth.updatePassword({
          currentPassword,
          newPassword
        });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }

      setSuccess('Profil mis à jour avec succès !');
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la mise à jour du profil');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Top Banner */}
      <div className="bg-[#082238] text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/student/dashboard"
            className="inline-flex items-center gap-2 text-slate-300 hover:text-[#F5B82E] text-sm font-semibold mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Tableau de bord</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#F5B82E] to-amber-300 text-[#082238] font-black text-2xl flex items-center justify-center shadow-lg">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Paramètres du compte
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm mt-0.5">
                {user?.email} • Rôle : <span className="text-[#F5B82E] font-bold">{user?.role}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <form onSubmit={handleSubmit} className="space-y-8">
          {success && (
            <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-r-xl flex items-center gap-3 text-green-800 text-sm">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <span>{success}</span>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl flex items-center gap-3 text-red-800 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Personal Information */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-lg font-black text-[#082238] mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-[#F5B82E]" />
              <span>Informations personnelles</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Nom complet (affiché sur vos certificats)
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2.5 sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#F5B82E] focus:border-[#082238] outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Email (Identifiant)
                </label>
                <div className="relative rounded-xl shadow-sm bg-slate-50">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    disabled
                    value={user?.email || ''}
                    className="block w-full pl-10 pr-3 py-2.5 sm:text-sm border border-slate-200 rounded-xl text-slate-500 bg-slate-100 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Téléphone / WhatsApp
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Phone className="h-4 w-4" />
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+212 6XX-XXXXXX"
                    className="block w-full pl-10 pr-3 py-2.5 sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#F5B82E] focus:border-[#082238] outline-none transition-all"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Biographie / Objectifs professionnels
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Présentez brièvement vos projets SEO ou marketing digital..."
                  className="block w-full px-3 py-2.5 sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#F5B82E] focus:border-[#082238] outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Password Security */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-lg font-black text-[#082238] mb-6 flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#F5B82E]" />
              <span>Sécurité & Mot de passe</span>
            </h2>

            <div className="space-y-4 max-w-lg">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Nouveau mot de passe (laisser vide pour conserver l'actuel)
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimum 6 caractères"
                  className="block w-full px-3 py-2.5 sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#F5B82E] focus:border-[#082238] outline-none transition-all"
                />
              </div>

              {newPassword && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Confirmer le nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Répétez le nouveau mot de passe"
                    className="block w-full px-3 py-2.5 sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#F5B82E] focus:border-[#082238] outline-none transition-all"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Submit Action */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#082238] hover:bg-[#0B2C47] text-white font-bold text-sm rounded-xl transition-all shadow-lg disabled:opacity-50"
            >
              {saving ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Save className="w-4 h-4 text-[#F5B82E]" />
                  <span>Enregistrer les modifications</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
