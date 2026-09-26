import React from 'react';
import { MapPin, ArrowRight, ExternalLink, Award, CheckCircle2, UserCheck } from 'lucide-react';
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
      <div className="bg-[#082238] text-white rounded-3xl p-8 sm:p-12 lg:p-14 border border-slate-800 shadow-2xl relative overflow-hidden">
        
        {/* Ambient light */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#F5B716]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          
          {/* Left Column: Formateur Avatar / Card */}
          <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="relative">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden border-4 border-[#F5B716] shadow-2xl bg-slate-900 flex flex-col items-center justify-center text-white">
                <UserCheck className="w-12 h-12 text-[#F5B716] mb-1" />
                <span className="font-black text-lg tracking-wider">WASSIM KASSY</span>
              </div>
              <span className="absolute -bottom-2.5 right-2 bg-[#F5B716] text-slate-950 text-[10px] font-black px-3 py-1 rounded-full shadow">
                Formateur Référent
              </span>
            </div>

            <h3 className="text-xl font-black text-white mt-4">{st.founderName || 'Wassim Kassy'}</h3>
            <p className="text-xs font-bold text-[#F5B716] mt-0.5">{st.founderRole || 'Consultant SEO & Praticien Web'}</p>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#F5B716]" /> {st.city || 'Casablanca, Maroc'}
            </p>

            <a
              href="https://www.linkedin.com/in/kassy-wassim"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white underline decoration-slate-600 hover:decoration-[#F5B716] transition-colors"
            >
              <span>Consulter le profil LinkedIn</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Right Column: Direction Pédagogique */}
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-xs text-[#F5B716] font-bold">
              <Award className="w-3.5 h-3.5" />
              <span>Direction Pédagogique & Accompagnement Direct</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Un formateur praticien du SEO au service de votre projet
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Fondée à Casablanca, FormaSEO.ma a été pensée pour transmettre des méthodes concrètes et directement applicables aux réalités du marché marocain et international. Vous apprenez les critères d'indexation et de classement sans jargon théorique inutile.
            </p>

            <div className="space-y-2 pt-1 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F5B716] shrink-0" />
                <span>Encadrement en petit groupe pour auditer chaque site individuellement</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F5B716] shrink-0" />
                <span>Cas pratiques issus de véritables commerces et entreprises marocaines</span>
              </div>
            </div>

            <div className="pt-3 flex flex-wrap gap-3">
              {onOpenApplyModal && (
                <button
                  onClick={() => onOpenApplyModal('candidature')}
                  className="px-6 py-3 rounded-2xl bg-[#F5B716] hover:bg-[#E0A30B] text-slate-950 font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Échanger sur votre projet</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}

              {onLearnMore && (
                <button
                  onClick={onLearnMore}
                  className="px-5 py-3 rounded-2xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-white font-bold text-xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Découvrir la méthode FormaSEO.ma</span>
                </button>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
