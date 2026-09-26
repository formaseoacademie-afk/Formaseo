import React, { useState } from 'react';
import { X, Send, CheckCircle2, ShieldCheck, BookOpen, AlertCircle, FileText } from 'lucide-react';
import { api } from '../../services/api';

interface ApplicationModalProps {
  isOpen: boolean;
  intent?: 'programme' | 'candidature';
  onClose: () => void;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({
  isOpen,
  intent = 'candidature',
  onClose,
}) => {
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

  if (!isOpen) return null;

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
      setErrorMsg(res.message || 'Une erreur est survenue lors de l’envoi.');
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setGoal('');
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-8 overflow-hidden max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 sm:py-8 space-y-5 animate-in fade-in">
            <div className="w-16 h-16 rounded-3xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-600/20">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                Confirmation d'Envoi
              </span>
              <h3 className="text-2xl font-black text-slate-900">
                Demande confirmée avec succès !
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
                Merci <strong>{name}</strong>. Votre demande a bien été transmise à l'équipe FormaSEO.ma. Vous recevrez les détails complets par email et WhatsApp sous <strong>24h ouvrées</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2 text-xs">
              <div className="font-bold text-slate-900 text-[11px] uppercase tracking-wide text-slate-500">
                Prochaines étapes :
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">✓</span>
                <span>Envoi du programme officiel & calendrier 2026</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">✓</span>
                <span>Échange d'orientation personnalisé</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
              <a
                href="https://wa.me/212600000000?text=Bonjour%20FormaSEO%2C%20je%20viens%20de%20d%C3%A9poser%20ma%20candidature..."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Écrire sur WhatsApp</span>
              </a>
              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 text-white rounded-full text-xs font-bold hover:bg-slate-800 transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-50 text-[#9A6B00] border border-yellow-200/80 rounded-full text-[11px] font-extrabold uppercase tracking-wider mb-2">
                <FileText className="w-3.5 h-3.5 text-[#F5B716]" />
                {intent === 'programme' ? 'Brochure & Syllabus Détaillé' : 'Candidature Session Pratique'}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                {intent === 'programme' ? 'Demander le programme complet' : 'Rejoindre la formation FormaSEO.ma'}
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Remplissez ce formulaire pour recevoir la brochure pédagogique, les dates exactes et le tarif de la prochaine session à Casablanca.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nom complet *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex : Karim Bennani"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#F5B716]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="votre.email@domaine.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#F5B716]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Téléphone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+212 6 XX XX XX XX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#F5B716]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Votre Profil</label>
                  <select
                    value={profileType}
                    onChange={(e) => setProfileType(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none cursor-pointer"
                  >
                    <option value="entrepreneur">Porteur de projet / Entrepreneur</option>
                    <option value="freelance">Freelance / Consultant</option>
                    <option value="etudiant">Étudiant / En reconversion</option>
                    <option value="professionnel">Salarié / Responsable Marketing</option>
                    <option value="autre">Autre profil</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Format Souhaité</label>
                  <select
                    value={preferredFormat}
                    onChange={(e) => setPreferredFormat(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none cursor-pointer"
                  >
                    <option value="presentiel_casablanca">Présentiel à Casablanca (Mers Sultan)</option>
                    <option value="en_ligne">En ligne (visioconférence en direct)</option>
                    <option value="flexible">Flexible / À confirmer</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Votre objectif principal *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Ex : Créer le site vitrine de mon agence, apprendre à ranker sur Casablanca, ajouter une compétence SEO à mes services..."
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#F5B716]"
                />
              </div>

              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="consent_check"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 text-[#F5B716] rounded"
                />
                <label htmlFor="consent_check" className="text-[11px] text-slate-500 leading-tight">
                  J'accepte d'être recontacté par FormaSEO.ma pour recevoir le programme pédagogique et les dates de formation.
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#F5B716] hover:bg-[#E0A30B] text-slate-950 font-black rounded-xl text-xs transition-all shadow flex items-center justify-center gap-2 mt-2"
              >
                <span>{loading ? 'Envoi en cours...' : intent === 'programme' ? 'Recevoir le programme par email & WhatsApp' : 'Envoyer ma candidature'}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
