import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Send, CheckCircle2, Clock, MessageCircle, ShieldCheck } from 'lucide-react';
import { api, useAcademySettings } from '../services/api';
import { SEOHead } from '../components/common/SEOHead';
import { getLocalBusinessSchema, getBreadcrumbSchema } from '../config/seoSchemas';

export const ContactPage: React.FC = () => {
  const { data: settings } = useAcademySettings();
  const localSchema = getLocalBusinessSchema();
  const breadcrumbs = getBreadcrumbSchema([
    { name: 'Accueil', url: '/' },
    { name: 'Contact & Candidature Casablanca', url: '/contact' },
  ]);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    audience: 'entrepreneur',
    preferredFormat: 'presential',
    goal: '',
    projectDescription: '',
    consent: false,
    honeypot: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.honeypot) {
      return; // Anti-spam bot trap
    }

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMsg('Veuillez renseigner votre nom, email et numéro de téléphone / WhatsApp.');
      return;
    }

    if (!formData.consent) {
      setErrorMsg('Veuillez accepter d’être recontacté pour le suivi de votre candidature.');
      return;
    }

    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const res = await api.submitEnquiry({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        audience: formData.audience,
        preferredFormat: formData.preferredFormat as any,
        goal: formData.goal || 'Candidature session',
        projectDescription: formData.projectDescription,
        type: 'candidature',
        consentGiven: formData.consent,
      });

      if (res.success) {
        setSuccessMsg('Votre demande a bien été enregistrée ! Un conseiller de FormaSEO.ma prendra contact avec vous rapidement.');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          audience: 'entrepreneur',
          preferredFormat: 'presential',
          goal: '',
          projectDescription: '',
          consent: false,
          honeypot: '',
        });
      } else {
        setErrorMsg(res.message || 'Une erreur est survenue.');
      }
    } catch (err) {
      setErrorMsg('Erreur de communication avec le serveur. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-16 pb-20">
      <SEOHead
        title="Contact & Candidature Formation SEO Casablanca | FormaSEO.ma"
        description="Contactez l'académie FormaSEO.ma à Casablanca ou déposez votre candidature pour la prochaine session pratique. WhatsApp, téléphone et formulaire de contact."
        canonicalPath="/contact"
        schema={[localSchema, breadcrumbs]}
      />
      
      {/* Header Banner */}
      <section className="bg-[#082238] text-white py-16 sm:py-20 relative overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F5B716]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-xs text-[#F5B716] font-bold mb-6">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Candidature & Contact</span>
          </div>

          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Rejoindre l'Académie FormaSEO.ma
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed">
              Déposez votre candidature pour la prochaine promotion ou posez toutes vos questions à notre équipe pédagogique à Casablanca.
            </p>
          </div>

        </div>
      </section>

      {/* Main Content Form & Contact Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Form Column */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-6">
            <div>
              <h2 className="text-2xl font-black text-slate-900">
                Formulaire de Candidature & Renseignement
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Aucun paiement préalable n'est requis. Nous examinons votre profil et vos objectifs pour confirmer l'adéquation de la formation.
              </p>
            </div>

            {successMsg ? (
              <div className="p-8 sm:p-10 bg-emerald-50/80 rounded-3xl border border-emerald-200 text-center space-y-6 animate-in fade-in">
                <div className="w-16 h-16 rounded-3xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-600/20">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                
                <div className="space-y-2">
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-200/60 px-3 py-1 rounded-full">
                    Demande Confirmée
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                    Merci pour votre candidature !
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
                    Votre demande a bien été enregistrée. Notre conseiller pédagogique étudie votre projet et vous transmettra le programme complet sous <strong>24h ouvrées</strong>.
                  </p>
                </div>

                {/* Next Steps Box */}
                <div className="max-w-md mx-auto p-5 rounded-2xl bg-white border border-emerald-100 text-left space-y-3 shadow-xs text-xs sm:text-sm">
                  <h4 className="font-black text-slate-900 flex items-center gap-2 text-xs uppercase tracking-wider text-emerald-900">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    Prochaines étapes de votre admission :
                  </h4>
                  <div className="space-y-2.5 text-slate-700 text-xs">
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">1</span>
                      <span>Envoi du programme détaillé et des tarifs par email & WhatsApp</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">2</span>
                      <span>Échange téléphonique court (10-15 min) pour aligner vos objectifs</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">3</span>
                      <span>Confirmation de votre place pour la session à Casablanca ou En Ligne</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <a
                    href="https://wa.me/212600000000?text=Bonjour%20FormaSEO%2C%20je%20viens%20de%20d%C3%A9poser%20ma%20candidature%20sur%20le%20site..."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Une question ? Écrivez-nous sur WhatsApp</span>
                  </a>

                  <button
                    onClick={() => setSuccessMsg('')}
                    className="w-full sm:w-auto px-6 py-3 rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors"
                  >
                    Envoyer une autre demande
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {errorMsg && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{errorMsg}</span>
                  </div>
                )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Honeypot anti-spam */}
              <div style={{ display: 'none' }}>
                <input
                  type="text"
                  name="website_trap"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Nom & Prénom <span className="text-amber-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Youssef Mansouri"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full p-3.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#F5B716] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Numéro de Téléphone / WhatsApp <span className="text-amber-600">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Ex: +212 6 XX XX XX XX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-3.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#F5B716] transition-all"
                  />
                </div>
              </div>

              {/* Email & Audience Profile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Adresse Email <span className="text-amber-600">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="votre.email@exemple.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#F5B716] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Votre profil actuel
                  </label>
                  <select
                    value={formData.audience}
                    onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                    className="w-full p-3.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#F5B716] transition-all cursor-pointer"
                  >
                    <option value="entrepreneur">Porteur de projet / Entrepreneur</option>
                    <option value="freelance">Freelance / Prestataire digital</option>
                    <option value="student">Étudiant / En reconversion</option>
                    <option value="business_owner">Dirigeant de PME / Responsable Marketing</option>
                    <option value="autre">Autre situation</option>
                  </select>
                </div>
              </div>

              {/* Preferred Format */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Format d'apprentissage souhaité
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'presential', label: 'Présentiel Casablanca (Mers Sultan)' },
                    { id: 'online', label: 'En ligne en direct' },
                    { id: 'hybrid', label: 'Formule Hybride' },
                  ].map((fmt) => (
                    <label
                      key={fmt.id}
                      className={`p-3 rounded-xl border text-xs font-semibold cursor-pointer flex items-center gap-2 transition-all ${
                        formData.preferredFormat === fmt.id
                          ? 'border-[#082238] bg-slate-900 text-white'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <input
                        type="radio"
                        name="format"
                        value={fmt.id}
                        checked={formData.preferredFormat === fmt.id}
                        onChange={(e) => setFormData({ ...formData, preferredFormat: e.target.value })}
                        className="hidden"
                      />
                      <span>{fmt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Goal & Project Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Votre objectif ou projet (site existant, idée de projet, secteur d'activité)
                </label>
                <textarea
                  rows={4}
                  placeholder="Décrivez brièvement ce que vous souhaitez accomplir ou l'URL de votre site actuel si vous en avez un..."
                  value={formData.projectDescription}
                  onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                  className="w-full p-3.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#F5B716] transition-all"
                />
              </div>

              {/* Consent */}
              <label className="flex items-start gap-3 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  required
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-[#F5B716] focus:ring-[#F5B716]"
                />
                <span className="text-xs text-slate-600 leading-relaxed">
                  J'accepte que les informations saisies soient traitées par <strong>FormaSEO.ma</strong> pour me recontacter dans le cadre de ma demande de formation ou d'information.
                </span>
              </label>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-full bg-[#F5B716] hover:bg-[#E0A30B] disabled:opacity-50 text-slate-950 font-black text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <span>Envoi en cours...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Envoyer ma candidature / demande</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>

          {/* Right Column: Contact Details & Guarantee */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#082238] text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#F5B716] uppercase tracking-wider">
                  Informations Pratiques
                </span>
                <h3 className="text-xl font-black">
                  FormaSEO.ma Casablanca
                </h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#F5B716] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Emplacement des sessions :</strong>
                    <span>{settings?.address || 'Quartier Avenue Mers Sultan, Casablanca 20250, Maroc'}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#F5B716] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Horaires & Sessions :</strong>
                    <span>Formations en soirée, le week-end ou en journée selon la session.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#F5B716] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Courriel de contact :</strong>
                    <span>{settings?.email || 'contact@formaseo.ma'}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700/80 text-xs text-slate-300 space-y-1">
                <div className="font-bold text-[#F5B716]">Processus d'admission :</div>
                <div>1. Réception de votre formulaire</div>
                <div>2. Entretien d'évaluation d'objectifs (15 min)</div>
                <div>3. Confirmation de place & accueil sur la session</div>
              </div>
            </div>

            {/* Privacy note */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-slate-700" />
                Protection de vos données
              </div>
              <p>
                Vos coordonnées ne sont jamais cédées ni vendues à des tiers. Elles sont uniquement utilisées par notre équipe pour vous assister.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
