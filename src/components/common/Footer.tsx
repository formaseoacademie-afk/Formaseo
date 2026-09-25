import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Mail, MapPin, Phone, ShieldCheck, Sparkles, Heart } from 'lucide-react';
import { Logo } from './Logo';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#061826] text-white border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter & Academy summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14 border-b border-slate-800">
          <div className="lg:col-span-5 space-y-4">
            <Logo variant="light" size="lg" />
            <p className="text-slate-300 text-sm leading-relaxed max-w-md pt-2">
              L'Académie marocaine de référence dédiée au référencement naturel et à la visibilité digitale sur Google. Formations pratiques, méthodologies éprouvées et accompagnement d'experts.
            </p>
            <div className="flex items-center gap-6 pt-2 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#F5B716]" /> Marina Casablanca & Rabat
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#F5B716]" /> Certifications reconnues
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-900/80 p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#F5B716] mb-2">
                <Sparkles className="w-3.5 h-3.5" /> La Newsletter SEO N°1 au Maroc
              </span>
              <h4 className="text-lg sm:text-xl font-bold text-white mb-2">
                Recevez chaque semaine nos analyses algorithmiques & astuces SEO gratuites
              </h4>
              <p className="text-xs text-slate-400 mb-4">
                Rejoignez 5 400+ professionnels du web. Aucun spam, désinscription en un clic.
              </p>
            </div>

            {subscribed ? (
              <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                <CheckCircle2 className="w-5 h-5" />
                <span>Merci ! Vous êtes bien inscrit à la lettre d'information FormaSeo.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="Votre adresse email professionnelle..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-700 rounded-full text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#F5B716]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-[#F5B716] hover:bg-[#E0A30B] text-slate-950 font-bold text-sm transition-all flex items-center justify-center gap-2"
                >
                  <span>S'abonner</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-slate-800 text-sm">
          <div>
            <h5 className="font-bold text-white mb-4 uppercase text-xs tracking-wider text-[#F5B716]">
              Formations
            </h5>
            <ul className="space-y-2.5 text-slate-300">
              <li>
                <button onClick={() => onNavigate('courses')} className="hover:text-white transition-colors">
                  SEO Débutant (Fondations)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('courses')} className="hover:text-white transition-colors">
                  SEO Avancé & Sémantique
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('courses')} className="hover:text-white transition-colors">
                  Rédaction SEO & IA Hybride
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('courses')} className="hover:text-white transition-colors">
                  SEO E-commerce & Business
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('courses')} className="hover:text-white transition-colors">
                  Netlinking & Autorité
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white mb-4 uppercase text-xs tracking-wider text-[#F5B716]">
              Académie
            </h5>
            <ul className="space-y-2.5 text-slate-300">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  À propos de FormaSeo
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('pricing')} className="hover:text-white transition-colors">
                  Tarifs & Formules
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  Nos Formateurs Experts
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  Certifications officielles
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Formations en Entreprise (B2B)
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white mb-4 uppercase text-xs tracking-wider text-[#F5B716]">
              Ressources
            </h5>
            <ul className="space-y-2.5 text-slate-300">
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-white transition-colors">
                  Blog & Actualités Google
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-white transition-colors">
                  Guide SEO Maroc 2026
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Demande d'Audit Diagnostic
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-white transition-colors">
                  Foire Aux Questions (FAQ)
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white mb-4 uppercase text-xs tracking-wider text-[#F5B716]">
              Contact & Support
            </h5>
            <ul className="space-y-2.5 text-slate-300 text-xs">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#F5B716]" /> +212 (0)5 22 40 80 90
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#F5B716]" /> contact@formaseo.ma
              </li>
              <li className="text-slate-400 mt-2">
                Du Lundi au Vendredi : 9h00 - 18h30 (GMT+1)
              </li>
              <li className="pt-2">
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-all text-xs"
                >
                  Prendre rendez-vous
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} FormaSeo Maroc. Tous droits réservés. Conçu avec passion pour le web marocain.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-white cursor-pointer">Conditions Générales</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Politique de Confidentialité</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Mentions Légales</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
