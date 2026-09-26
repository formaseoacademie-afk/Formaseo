import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';
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
          <div className="p-8 sm:p-12 bg-emerald-50/80 rounded-3xl border border-emerald-200 text-center space-y-6 animate-in fade-in">
            <div className="w-16 h-16 rounded-3xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-600/20">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-200/60 px-3 py-1 rounded-full">
                Candidature Confirmée
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                Merci {name || 'cher candidat'} !
              </h3>
              <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
                Votre dossier a été transmis avec succès à l'équipe FormaSEO.ma. Le syllabus complet et les modalités vous sont envoyés par email & WhatsApp sous <strong>24h ouvrées</strong>.
              </p>
            </div>

            {/* Next steps list */}
            <div className="max-w-md mx-auto p-5 rounded-2xl bg-white border border-emerald-100 text-left space-y-3 shadow-xs text-xs sm:text-sm">
              <h4 className="font-black text-slate-900 flex items-center gap-2 text-xs uppercase tracking-wider text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Ce qui va se passer ensuite :
              </h4>
              <div className="space-y-2 text-slate-700 text-xs">
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px] flex items-center justify-center shrink-0">1</span>
                  <span>Réception de la brochure pédagogique détaillée et du calendrier</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px] flex items-center justify-center shrink-0">2</span>
                  <span>Contact direct par un conseiller pour répondre à vos questions</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px] flex items-center justify-center shrink-0">3</span>
                  <span>Validation de votre place pour la prochaine session</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href="https://wa.me/212600000000?text=Bonjour%20FormaSEO%2C%20je%20viens%20de%20d%C3%A9poser%20ma%20candidature%20sur%20le%20site..."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <span>Une question ? Écrivez-nous sur WhatsApp</span>
              </a>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setEmail('');
                  setPhone('');
                  setGoal('');
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors"
              >
                Soumettre un autre dossier
              </button>
            </div>
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
