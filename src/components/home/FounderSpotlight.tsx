import React from 'react';
import { Shield, Sparkles, MapPin, Linkedin, ArrowRight, ExternalLink } from 'lucide-react';
import { AcademySettings } from '../../types';
import { fallbackSettings } from '../../config/defaultData';

interface FounderSpotlightProps {
  settings?: AcademySettings;
  onLearnMore?: () => void;
  onOpenApplyModal?: (intent?: 'programme' | 'candidature') => void;
}

export const FounderSpotlight: React.FC<FounderSpotlightProps> = ({
  settings = fallbackSettings,
  onLearnMore,
  onOpenApplyModal,
}) => {
  const st = settings || fallbackSettings;

  return (
    <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 lg:p-14 border border-slate-800 shadow-xl relative overflow-hidden">
        
        {/* Glow orb */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#F5B716]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          
          <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="relative">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl overflow-hidden border-4 border-[#F5B716] shadow-xl bg-slate-800 flex items-center justify-center text-white font-black text-3xl">
                WK
              </div>
              <span className="absolute -bottom-2.5 right-2 bg-[#F5B716] text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow">
                Formateur
              </span>
            </div>

            <h3 className="text-xl font-black text-white mt-4">{st.founderName || 'Wassim Kassy'}</h3>
            <p className="text-xs font-bold text-[#F5B716] mt-0.5">{st.founderRole || 'Fondateur & Consultant SEO'}</p>
            <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#F5B716]" /> {st.city || 'Casablanca, Maroc'}
            </p>
          </div>

          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-xs text-[#F5B716] font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direction Pédagogique & Accompagnement</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Un formateur praticien du SEO au service de votre projet
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Fondée à Casablanca, FormaSEO.ma a été pensée pour transmettre des méthodes concrètes et adaptées aux spécificités du web marocain et international. L'objectif est de vous rendre autonome et confiant dans le pilotage de votre visibilité digitale.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              {onOpenApplyModal && (
                <button
                  onClick={() => onOpenApplyModal('candidature')}
                  className="px-6 py-3 rounded-full bg-[#F5B716] hover:bg-[#E0A30B] text-slate-950 font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Échanger sur votre projet</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}

              {onLearnMore && (
                <button
                  onClick={onLearnMore}
                  className="px-5 py-3 rounded-full border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-white font-bold text-xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>En savoir plus sur l'académie</span>
                </button>
              )}
            </div>

            <div className="pt-2">
              <span className="text-[10px] text-slate-400 italic">
                * Profil biographique et mentions à valider avec le formateur avant diffusion publique définitive.
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
