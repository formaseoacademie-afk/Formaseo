import React, { useState } from 'react';
import { ChevronRight, Check, ArrowRight, BookOpen, Sparkles, Layers } from 'lucide-react';
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

  const handleNavigate = () => {
    if (onExploreFullCurriculum) onExploreFullCurriculum();
    else if (onNavigateToProgramme) onNavigateToProgramme();
  };

  return (
    <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-5 h-1 bg-[#F5B716] rounded-full inline-block" />
            <span className="text-xs font-black uppercase tracking-wider text-slate-500">
              Progression Pédagogique
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Le Programme en 5 Semaines
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
            Une méthode progressive conçue pour passer de la création technique du site jusqu'à l'acquisition de trafic et la mesure des résultats.
          </p>
        </div>

        <button
          onClick={handleNavigate}
          className="self-start md:self-auto px-6 py-3 rounded-full border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white font-extrabold text-xs transition-all flex items-center gap-2 group cursor-pointer"
        >
          <span>Voir le programme détaillé</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Week Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3 mb-8">
        {weeks.map((week) => {
          const isSelected = activeWeek === week.weekNumber;
          return (
            <button
              key={week.weekNumber}
              onClick={() => setActiveWeek(week.weekNumber)}
              className={`p-3.5 sm:p-4 rounded-2xl text-left transition-all border cursor-pointer ${
                isSelected
                  ? 'bg-[#082238] text-white border-slate-900 shadow-md ring-2 ring-[#F5B716]'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span
                className={`text-[10px] font-black uppercase tracking-wider block mb-1 ${
                  isSelected ? 'text-[#F5B716]' : 'text-slate-500'
                }`}
              >
                Semaine {week.weekNumber}
              </span>
              <span className="font-extrabold text-xs sm:text-sm block line-clamp-1">
                {week.title.split(':')[1] || week.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Week Detail Card */}
      {currentWeekData && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 sm:p-10 transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 bg-yellow-50 text-[#9A6B00] border border-yellow-200/80 rounded-full text-xs font-black uppercase tracking-wider">
                  Semaine {currentWeekData.weekNumber}
                </span>
                <span className="text-xs text-slate-500 font-semibold">
                  {currentWeekData.hours || '8h de formation pratique'}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                {currentWeekData.title}
              </h3>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {currentWeekData.objective || currentWeekData.focus}
              </p>

              <div className="pt-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-3">
                  Ce que vous allez pratiquer :
                </h4>
                <div className="space-y-2">
                  {currentWeekData.topics.map((t, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#9A6B00] bg-amber-100 px-2 py-0.5 rounded">
                  Livrable de la semaine
                </span>
                <h4 className="text-sm font-black text-slate-900 mt-2">
                  {currentWeekData.deliverable || currentWeekData.practicalWorkshop}
                </h4>
              </div>

              {currentWeekData.tools && currentWeekData.tools.length > 0 && (
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-2">
                    Outils utilisés :
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentWeekData.tools.map((tool, i) => (
                      <span key={i} className="px-2.5 py-1 bg-white rounded-lg border border-slate-200 text-xs font-bold text-slate-800">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2">
                <button
                  onClick={() => onOpenApplyModal?.('programme')}
                  className="w-full py-3 bg-[#082238] hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Demander le syllabus complet
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
