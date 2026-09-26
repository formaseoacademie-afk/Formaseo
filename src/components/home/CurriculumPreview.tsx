import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Wrench, 
  Globe, 
  Search, 
  Zap, 
  MapPin, 
  BarChart3,
  Award,
  Layers
} from 'lucide-react';
import { CurriculumWeek } from '../../types';
import { fallbackCurriculum } from '../../config/defaultData';

interface CurriculumPreviewProps {
  curriculum?: CurriculumWeek[];
  onExploreFullCurriculum?: () => void;
  onNavigateToProgramme?: () => void;
  onOpenApplyModal?: (intent?: 'programme' | 'candidature') => void;
}

export const CurriculumPreview: React.FC<CurriculumPreviewProps> = ({
  curriculum = fallbackCurriculum,
  onExploreFullCurriculum,
  onNavigateToProgramme,
  onOpenApplyModal,
}) => {
  const [activeWeek, setActiveWeek] = useState<number>(1);
  const weeks = curriculum || fallbackCurriculum;
  const currentWeekData = weeks.find((w) => w.weekNumber === activeWeek) || weeks[0];

  const weekIcons: Record<number, React.ElementType> = {
    1: Globe,
    2: Search,
    3: Zap,
    4: MapPin,
    5: BarChart3,
  };

  const weekMilestones: Record<number, string> = {
    1: 'Site WordPress déployé & sécurisé en ligne',
    2: 'Matrice de 50+ requêtes cibles & 1er article publié',
    3: 'Score PageSpeed 90+ & Sitemap XML indexé',
    4: 'Fiche Google Maps vérifiée & présence locale',
    5: 'Search Console & GA4 configurés avec suivi de trafic',
  };

  const handleNavigate = () => {
    if (onExploreFullCurriculum) onExploreFullCurriculum();
    else if (onNavigateToProgramme) onNavigateToProgramme();
  };

  return (
    <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-5 h-1 bg-[#F5B716] rounded-full inline-block" />
            <span className="text-xs font-black uppercase tracking-wider text-slate-500">
              Syllabus Pédagogique
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Le Programme Pratique en 5 Semaines
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
            Une progression étape par étape pour passer de l'installation de votre site web jusqu'au positionnement de vos pages en 1ère page de Google.
          </p>
        </div>

        <button
          onClick={handleNavigate}
          className="self-start md:self-auto px-6 py-3 rounded-full border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white font-black text-xs transition-all flex items-center gap-2 group cursor-pointer shrink-0"
        >
          <span>Consulter le programme complet</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Week Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
        {weeks.map((week) => {
          const isSelected = activeWeek === week.weekNumber;
          const Icon = weekIcons[week.weekNumber] || Layers;

          return (
            <button
              key={week.weekNumber}
              onClick={() => setActiveWeek(week.weekNumber)}
              className={`p-4 rounded-2xl text-left transition-all relative overflow-hidden border cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#082238] text-white border-slate-900 shadow-xl ring-2 ring-[#F5B716] transform -translate-y-0.5'
                  : 'bg-white text-slate-700 border-slate-200/90 hover:border-slate-300 hover:bg-slate-50 shadow-sm'
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#F5B716]" />
              )}
              
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                    isSelected ? 'bg-white/10 text-[#F5B716]' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  Semaine 0{week.weekNumber}
                </span>
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                    isSelected ? 'bg-[#F5B716] text-slate-950' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>

              <span className={`font-black text-xs sm:text-sm leading-snug line-clamp-2 ${
                isSelected ? 'text-white' : 'text-slate-900'
              }`}>
                {week.title.split(':')[1] || week.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Week Detail Card */}
      {currentWeekData && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg p-6 sm:p-10 transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Left Column: Workshop topics & focus */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3.5 py-1 bg-yellow-50 text-[#9A6B00] border border-yellow-200/80 rounded-full text-xs font-black uppercase tracking-wider">
                  Module 0{currentWeekData.weekNumber}
                </span>
                <span className="text-xs text-slate-500 font-bold flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-full">
                  <Clock className="w-3.5 h-3.5 text-[#F5B716]" />
                  {currentWeekData.hours || '8h d’ateliers pratiques dirigés'}
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {currentWeekData.title}
                </h3>
                <div className="mt-2.5 pl-3 border-l-2 border-[#F5B716]">
                  <p className="text-slate-600 text-xs sm:text-sm font-semibold">
                    {currentWeekData.objective || currentWeekData.focus}
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F5B716]" />
                  <span>Compétences & Réalisations pendant l'atelier :</span>
                </h4>
                
                <div className="grid grid-cols-1 gap-2.5">
                  {(currentWeekData.topics || currentWeekData.bulletPoints || []).map((t, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-start gap-3 p-3.5 bg-slate-50/80 hover:bg-yellow-50/40 border border-slate-200/70 rounded-2xl text-xs sm:text-sm text-slate-800 font-medium transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#F5B716] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Branded Deliverable Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#082238] via-[#0B2A46] to-[#082238] rounded-3xl p-7 sm:p-8 text-white border border-slate-800 shadow-xl relative overflow-hidden space-y-6">
              {/* Subtle ambient light */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#F5B716]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F5B716]/15 border border-[#F5B716]/30 text-[#F5B716] rounded-full text-[10px] font-black uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5" />
                  <span>Livrable Tangible Semaine 0{currentWeekData.weekNumber}</span>
                </div>

                <h4 className="text-base sm:text-lg font-black text-white leading-snug">
                  {currentWeekData.deliverable || currentWeekData.practicalWorkshop}
                </h4>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#F5B716] block">
                    Validation du formateur :
                  </span>
                  <p className="leading-relaxed text-slate-200">
                    {weekMilestones[currentWeekData.weekNumber] || 'Revue et validation individuelle sur votre site.'}
                  </p>
                </div>
              </div>

              {currentWeekData.tools && currentWeekData.tools.length > 0 && (
                <div className="relative z-10 space-y-2 pt-2 border-t border-slate-700/80">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5 text-[#F5B716]" />
                    <span>Outils maîtrisés ce module :</span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {currentWeekData.tools.map((tool, i) => (
                      <span key={i} className="px-3 py-1 bg-slate-800/90 hover:bg-slate-700 border border-slate-600/80 rounded-xl text-xs font-bold text-white transition-colors">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="relative z-10 pt-2">
                <button
                  onClick={() => onOpenApplyModal?.('programme')}
                  className="w-full py-4 bg-[#F5B716] hover:bg-[#E0A30B] text-slate-950 font-black text-xs sm:text-sm rounded-2xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Recevoir le syllabus complet par email</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
