import React from 'react';
import { MapPin, Mail, ShieldCheck, Sparkles, BookOpen, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';

interface FooterProps {
  onNavigate: (page: string) => void;
  onOpenApplyModal?: (intent?: 'programme' | 'candidature') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenApplyModal }) => {
  return (
    <footer className="bg-[#061826] text-white border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top summary row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          <div className="lg:col-span-6 space-y-4">
            <div onClick={() => onNavigate('home')} className="cursor-pointer inline-block">
              <Logo />
            </div>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-md pt-2">
              FormaSEO.ma propose une formation pratique à Casablanca axée sur la création de sites WordPress, le référencement naturel (SEO), la visibilité locale et la mesure des résultats.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#F5B716] shrink-0" />
                Secteur Avenue Mers Sultan, Casablanca
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#F5B716] shrink-0" />
                Apprentissage sur projet réel
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 bg-slate-900/80 p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold text-[#F5B716] uppercase tracking-wider">
                Prochaine Promotion
              </span>
              <h4 className="text-base sm:text-lg font-black text-white mt-1">
                Prêt à créer et référencer votre propre site web ?
              </h4>
              <p className="text-slate-300 text-xs mt-2 leading-relaxed">
                Les inscriptions pour la prochaine session sont ouvertes. Déposez votre candidature pour être contacté par notre équipe.
              </p>
            </div>

            <div className="pt-6 flex flex-wrap gap-3">
              {onOpenApplyModal && (
                <button
                  onClick={() => onOpenApplyModal('candidature')}
                  className="px-5 py-2.5 rounded-full bg-[#F5B716] hover:bg-[#E0A30B] text-slate-950 font-black text-xs transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Candidater à la formation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}

              <button
                onClick={() => onNavigate('programme')}
                className="px-5 py-2.5 rounded-full border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors cursor-pointer"
              >
                <span>Découvrir le programme 5 semaines</span>
              </button>
            </div>
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-b border-slate-800 text-xs">
          
          <div className="space-y-3">
            <h5 className="font-extrabold uppercase tracking-wider text-[#F5B716] text-[11px]">
              Formation
            </h5>
            <ul className="space-y-2 text-slate-300">
              <li>
                <button onClick={() => onNavigate('formation')} className="hover:text-white transition-colors">
                  Présentation de la Formation
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('programme')} className="hover:text-white transition-colors">
                  Programme Semaine par Semaine
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('formation')} className="hover:text-white transition-colors">
                  Inclusions (WordPress, Hébergement)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('formation')} className="hover:text-white transition-colors">
                  Prérequis & Profils Cibles
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-extrabold uppercase tracking-wider text-[#F5B716] text-[11px]">
              L'Académie
            </h5>
            <ul className="space-y-2 text-slate-300">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  À Propos de FormaSEO.ma
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  Méthodologie Pédagogique
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  Formateur (Wassim Kassy)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  Emplacement Casablanca
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-extrabold uppercase tracking-wider text-[#F5B716] text-[11px]">
              Admissions & Aide
            </h5>
            <ul className="space-y-2 text-slate-300">
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Déposer une Candidature
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-white transition-colors">
                  Foire Aux Questions (FAQ)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Contacter l'Équipe
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-extrabold uppercase tracking-wider text-[#F5B716] text-[11px]">
              Transparence & Mentions
            </h5>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              FormaSEO.ma • Académie de formation pratique au SEO et marketing digital basée à Casablanca, Maroc.
            </p>
            <div className="text-[10px] text-slate-500">
              * Ce site concerne formaseo.ma (Maroc) et n'a aucun lien avec formaseo.fr.
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} FormaSEO.ma. Tous droits réservés. Casablanca, Maroc.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-500">Formation 100% pratique sur projet réel</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
