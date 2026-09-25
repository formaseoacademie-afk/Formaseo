import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { api } from '../../services/api';

export const ApplicationFormSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profileType, setProfileType] = useState('entrepreneur');
  const [goal, setGoal] = useState('');
  const [preferredFormat, setPreferredFormat] = useState('presentiel_casablanca');
  const [consent, setConsent] = useState(true);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const res = await api.sendEnquiry({
      name,
      email,
      phone,
      profileType,
      goal,
      preferredFormat,
      consent,
    });

    setLoading(false);
    if (res.success) {
      setSubmitted(true);
    } else {
      setErrorMsg(res.message || 'Une erreur est survenue.');
    }
  };

  return (
    <section className="py-16 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl relative overflow-hidden">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-black uppercase tracking-wider text-slate-500">
            Candidature & Programme
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
            Rejoignez la prochaine session FormaSEO.ma
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
            Remplissez ce formulaire pour recevoir le programme complet des 5 semaines, les dates officielles et les modalités d'inscription.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="text-xl font-black text-slate-900">Demande enregistrée avec succès !</h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              Merci <strong>{name}</strong>. Notre équipe pédagogique prendra contact avec vous sous 24h pour vous transmettre tous les détails de la formation.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Votre Nom & Prénom *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex : Sarah Mansouri"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#F5B716]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Votre Email *</label>
                <input
                  type="email"
                  required
                  placeholder="sarah@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#F5B716]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Téléphone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="+212 6 XX XX XX XX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#F5B716]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Votre Profil</label>
                <select
                  value={profileType}
                  onChange={(e) => setProfileType(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none cursor-pointer"
                >
                  <option value="entrepreneur">Entrepreneur / Porteur de projet</option>
                  <option value="freelance">Freelance / Consultant</option>
                  <option value="etudiant">Étudiant / Reconversion</option>
                  <option value="professionnel">Salarié / Responsable Marketing</option>
                  <option value="autre">Autre profil</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Format Préféré</label>
                <select
                  value={preferredFormat}
                  onChange={(e) => setPreferredFormat(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none cursor-pointer"
                >
                  <option value="presentiel_casablanca">Présentiel Casablanca (Mers Sultan)</option>
                  <option value="en_ligne">En ligne (visioconférence en direct)</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Votre projet ou objectif digital *</label>
              <textarea
                required
                rows={3}
                placeholder="Parlez-nous brièvement de votre projet de site web ou de votre activité..."
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#F5B716]"
              />
            </div>

            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                id="form_consent"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 text-[#F5B716] rounded"
              />
              <label htmlFor="form_consent" className="text-[11px] text-slate-500 leading-tight">
                J'accepte que mes données soient utilisées par FormaSEO.ma pour me contacter au sujet de la formation.
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#F5B716] hover:bg-[#E0A30B] text-slate-950 font-black rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>{loading ? 'Traitement...' : 'Demander le programme & Candidater'}</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}

      </div>
    </section>
  );
};
