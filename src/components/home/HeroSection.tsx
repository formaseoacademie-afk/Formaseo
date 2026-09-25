import React from 'react';
import { ArrowRight, FileText, CheckCircle2, Globe, Layout, Search, TrendingUp, MapPin, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onExploreFormation: () => void;
  onOpenApplyModal: (intent?: 'programme' | 'candidature') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreFormation,
  onOpenApplyModal,
}) => {
  return (
    <section className="relative px-3 sm:px-6 lg:px-8 pt-3 pb-8">
      {/* Dark Navy Fluid Container */}
      <div className="relative mx-auto max-w-[1340px] bg-[#082238] rounded-3xl lg:rounded-[3rem] overflow-hidden shadow-2xl border border-slate-800">
        
        {/* Subtle mesh light orbs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#F5B716]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Core Copy */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 z-10">
            
            {/* Location & Differentiator Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 text-xs">
              <span className="w-2 h-2 rounded-full bg-[#F5B716] animate-pulse" />
              <span className="text-[#F5B716] font-extrabold uppercase tracking-wider text-[11px]">
                Formation Pratique • Casablanca & En Ligne
              </span>
            </div>

            {/* Headline Idea from brief */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-black tracking-tight text-white leading-[1.15]">
              Apprenez le SEO en créant <br className="hidden sm:inline" />
              <span className="text-[#F5B716]">un vrai projet digital</span>.
            </h1>

            {/* Supporting Line from brief */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              Une formation pratique à Casablanca pour apprendre à créer un site WordPress, développer sa visibilité sur Google et mesurer ses résultats.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onExploreFormation}
                className="px-8 py-4 rounded-full bg-[#F5B716] hover:bg-[#E0A30B] text-slate-950 font-extrabold text-sm sm:text-base transition-all transform hover:-translate-y-0.5 shadow-lg flex items-center justify-center gap-2.5 group"
              >
                <span>Découvrir la formation</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => onOpenApplyModal('programme')}
                className="px-7 py-4 rounded-full border border-slate-600 bg-slate-900/50 hover:bg-slate-800 text-white font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2.5"
              >
                <FileText className="w-4 h-4 text-[#F5B716]" />
                <span>Demander le programme</span>
              </button>
            </div>

            {/* Concrete guarantees & focus */}
            <div className="pt-4 flex flex-wrap items-center gap-5 sm:gap-8 text-xs text-slate-300 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F5B716] shrink-0" />
                <span>Votre site WordPress créé et en ligne</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F5B716] shrink-0" />
                <span>Ateliers pratiques sur votre thématique</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F5B716] shrink-0" />
                <span>Outils officiels Google configurés</span>
              </div>
            </div>

          </div>

          {/* Right Column: Learning Pathway Diagram Card */}
          <div className="lg:col-span-5 relative z-10">
            <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-7 border border-slate-700/90 shadow-2xl space-y-4 backdrop-blur-md">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-bold text-[#F5B716] uppercase tracking-wider">
                    Méthode FormaSEO.ma
                  </span>
                  <h3 className="text-base font-extrabold text-white">
                    Parcours d'Apprentissage en 5 Semaines
                  </h3>
                </div>
                <span className="px-2.5 py-1 bg-yellow-500/10 text-[#F5B716] rounded-full text-[10px] font-extrabold">
                  Pratique 100%
                </span>
              </div>

              {/* Steps list */}
              <div className="space-y-3 pt-1">
                {[
                  { step: '01', title: 'Création de votre Site WordPress', sub: 'Nom de domaine, hébergement, structure & pages clés' },
                  { step: '02', title: 'Mots-Clés & Rédaction SEO', sub: 'Intentions de recherche, Google Keyword Planner & IA' },
                  { step: '03', title: 'Optimisation Technique & Vitesse', sub: 'Balises On-Page, vitesse mobile, PageSpeed & sitemap' },
                  { step: '04', title: 'SEO Local & Visibilité Google Maps', sub: 'Fiche Google Business Profile & visibilité au Maroc' },
                  { step: '05', title: 'Google Search Console & Analytics GA4', sub: 'Mesure des clics réels et validation du projet final' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-slate-800/70 border border-slate-700/60 flex items-start gap-3 hover:border-yellow-500/40 transition-colors"
                  >
                    <span className="w-6 h-6 rounded-lg bg-[#F5B716]/10 text-[#F5B716] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {item.step}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-white leading-snug">{item.title}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5 truncate">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onOpenApplyModal('candidature')}
                  className="w-full py-3 bg-yellow-500/10 hover:bg-yellow-500/20 text-[#F5B716] border border-yellow-500/30 rounded-2xl text-xs font-extrabold transition-all flex items-center justify-center gap-2"
                >
                  <span>Candidater pour la prochaine session</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
