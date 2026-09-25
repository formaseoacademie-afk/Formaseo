import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Send, CheckCircle2, Clock, Sparkles, MessageCircle } from 'lucide-react';
import { api } from '../services/api';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Demande de formation individuelle',
    message: '',
    serviceInterest: 'SEO Débutant',
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const res = await api.sendContact(formData);
      if (res.success) {
        setSuccessMsg(res.message);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: 'Demande de formation individuelle',
          message: '',
          serviceInterest: 'SEO Débutant',
        });
      } else {
        setErrorMsg(res.message || 'Une erreur est survenue.');
      }
    } catch (err) {
      setErrorMsg('Erreur de connexion au serveur.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header */}
      <div className="bg-[#0A263B] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-slate-800">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-5 h-1 bg-[#F5B716] rounded-full inline-block" />
            <span className="text-xs font-black uppercase tracking-wider text-[#F5B716]">
              Contact & Accompagnement
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
            Parlons de vos Objectifs SEO
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Besoin d'un conseil sur le cursus le plus adapté à votre projet, d'un devis pour votre entreprise ou d'un audit préliminaire ? Notre équipe vous répond avec plaisir.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">Envoyez-nous un message</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Remplissez ce formulaire et un conseiller pédagogique vous contactera sous 24h.
            </p>
          </div>

          {successMsg && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center gap-3 text-xs sm:text-sm font-semibold animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs sm:text-sm font-semibold">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Votre Nom & Prénom *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Mehdi Alaoui"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#F5B716]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Votre Email *</label>
                <input
                  type="email"
                  required
                  placeholder="votre.email@domaine.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#F5B716]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Téléphone / WhatsApp</label>
                <input
                  type="tel"
                  placeholder="+212 6 XX XX XX XX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#F5B716]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Formation d'intérêt</label>
                <select
                  value={formData.serviceInterest}
                  onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                  className="w-full p-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#F5B716] cursor-pointer"
                >
                  <option value="SEO Débutant">SEO Débutant</option>
                  <option value="SEO Avancé">SEO Avancé</option>
                  <option value="Rédaction SEO & IA">Rédaction SEO & IA</option>
                  <option value="SEO Business & E-commerce">SEO Business & E-commerce</option>
                  <option value="Pass Illimité">Pass Illimité Académie</option>
                  <option value="Formation Entreprise">Formation Sur-Mesure Entreprise</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Votre Message / Votre Site Web *</label>
              <textarea
                required
                rows={4}
                placeholder="Parlez-nous de votre situation, de votre site web ou de vos attentes..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full p-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#F5B716]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#F5B716] hover:bg-[#E0A30B] text-slate-950 font-black rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>{loading ? 'Envoi en cours...' : 'Envoyer ma demande'}</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Right Column: Contact Details & Fast WhatsApp (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Quick WhatsApp Box */}
          <div className="bg-emerald-950 text-white rounded-3xl p-8 border border-emerald-800 relative overflow-hidden shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Assistance WhatsApp Directe</h3>
                <p className="text-xs text-emerald-300">Réponse quasi-instantanée</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              Discutez directement avec un conseiller pour tester votre éligibilité ou poser vos questions techniques.
            </p>
            <a
              href="https://wa.me/212522408090"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-full text-xs transition-all"
            >
              Ouvrir WhatsApp (+212 5 22 40 80 90)
            </a>
          </div>

          {/* Contact Details */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6 text-sm text-slate-700">
            <h3 className="font-black text-slate-900 text-lg">Nos Coordonnées</h3>

            <div className="flex items-start gap-3.5">
              <MapPin className="w-5 h-5 text-[#F5B716] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-900 text-xs">Siège Principal & Studios</p>
                <p className="text-xs text-slate-500">Boulevard des Almohades, Marina Business Center, Tour Ivoire, Casablanca, Maroc</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <Phone className="w-5 h-5 text-[#F5B716] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-900 text-xs">Téléphone</p>
                <p className="text-xs text-slate-500">+212 (0)5 22 40 80 90</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <Mail className="w-5 h-5 text-[#F5B716] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-900 text-xs">Email</p>
                <p className="text-xs text-slate-500">contact@formaseo.ma</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 pt-4 border-t border-slate-100">
              <Clock className="w-5 h-5 text-[#F5B716] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-900 text-xs">Horaires d'ouverture</p>
                <p className="text-xs text-slate-500">Lundi au Vendredi : 09h00 - 18h30 (GMT+1)</p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
