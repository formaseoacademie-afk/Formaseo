import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Layers, 
  Wrench, 
  ArrowRight, 
  FileText, 
  Sparkles, 
  HelpCircle,
  AlertCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useCurriculum, useAcademySettings } from '../services/api';

interface ProgrammePageProps {
  onNavigate: (page: string, param?: string) => void;
  onOpenApplyModal: (intent?: 'programme' | 'candidature') => void;
}

export const ProgrammePage: React.FC<ProgrammePageProps> = ({ onNavigate, onOpenApplyModal }) => {
  const { data: weeks, isLoading } = useCurriculum();
  const { data: settings } = useAcademySettings();
  const [expandedWeek, setExpandedWeek] = useState<number | null>(1);

  const toggleWeek = (num: number) => {
    setExpandedWeek(expandedWeek === num ? null : num);
  };

  return (
    <div className="space-y-16 pb-20">
      
      {/* Header Banner */}
      <section className="bg-[#082238] text-white py-16 sm:py-20 relative overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F5B716]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-xs text-[#F5B716] font-bold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Syllabus Pédagogique Détaillé</span>
          </div>

          <div className="max-w-4xl space-y-6">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Programme de la Formation FormaSEO (5 Semaines)
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed">
              Découvrez en détail les modules, compétences et ateliers pratiques semaine par semaine. Chaque étape est structurée pour vous permettre de construire et référencer votre propre site web.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-300 pt-2">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700">
                <Clock className="w-4 h-4 text-[#F5B716]" />
                <span>{settings?.duration || '5 semaines intensives'}</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700">
                <Wrench className="w-4 h-4 text-[#F5B716]" />
                <span>6 Outils professionnels intégrés</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700">
                <Calendar className="w-4 h-4 text-[#F5B716]" />
                <span>Session : {settings?.nextSessionDate || 'Prochaine session en cours de constitution'}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                onClick={() => onOpenApplyModal('candidature')}
                className="px-8 py-4 rounded-full bg-[#F5B716] hover:bg-[#E0A30B] text-slate-950 font-black text-sm transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <span>Candidater pour cette session</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onOpenApplyModal('programme')}
                className="px-6 py-4 rounded-full border border-slate-600 bg-slate-900/50 hover:bg-slate-800 text-white font-bold text-sm transition-all flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4 text-[#F5B716]" />
                <span>Recevoir la brochure PDF</span>
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* Programme Notice Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3.5 text-amber-950 text-xs sm:text-sm">
          <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Structure pédagogique certifiée FORMASEO.ma :</span> Le programme ci-dessous reflète la progression méthodologique éprouvée de l'académie. Les exercices et cas pratiques sont ajustés aux projets réels des apprenants lors de l'entretien d'orientation.
          </div>
        </div>
      </section>

      {/* Detailed Syllabus Accordions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {(weeks || []).map((week) => {
            const isExpanded = expandedWeek === week.weekNumber;
            return (
              <div 
                key={week.weekNumber}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all"
              >
                {/* Header Clickable */}
                <div 
                  onClick={() => toggleWeek(week.weekNumber)}
                  className="p-6 sm:p-8 cursor-pointer flex flex-wrap sm:flex-nowrap items-center justify-between gap-4 select-none bg-slate-50/50 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-12 h-12 rounded-2xl bg-[#082238] text-white font-black text-base flex items-center justify-center shrink-0 shadow-sm">
                      S{week.weekNumber}
                    </span>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#F5B716] bg-yellow-500/10 px-2.5 py-0.5 rounded-full">
                          Semaine {week.weekNumber}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                          • {week.hours}
                        </span>
                      </div>
                      <h2 className="text-lg sm:text-xl font-black text-slate-900">
                        {week.title}
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <span className="text-xs font-bold text-slate-600 hidden md:inline">
                      {isExpanded ? 'Masquer les détails' : 'Voir les modules'}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>
                </div>

                {/* Body Content */}
                {isExpanded && (
                  <div className="p-6 sm:p-8 border-t border-slate-100 space-y-6">
                    {/* Objective */}
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
                        Objectif Opérationnel
                      </span>
                      <p className="text-sm font-semibold text-slate-800">
                        {week.objective}
                      </p>
                    </div>

                    {/* Modules and Deliverable */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      {/* Topics */}
                      <div className="lg:col-span-7 space-y-3">
                        <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
                          Programme des séances et concepts abordés :
                        </h4>
                        <div className="space-y-2.5">
                          {week.topics.map((topic, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-100 text-xs sm:text-sm text-slate-700">
                              <CheckCircle2 className="w-4 h-4 text-[#F5B716] shrink-0 mt-0.5" />
                              <span>{topic}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Practical Workshop & Tools */}
                      <div className="lg:col-span-5 space-y-4">
                        <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200/80 space-y-2">
                          <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-[#F5B716]" />
                            Atelier Pratique & Livrable
                          </span>
                          <p className="text-xs sm:text-sm text-amber-950 font-bold leading-relaxed">
                            {week.practicalWorkshop}
                          </p>
                        </div>

                        {week.tools && week.tools.length > 0 && (
                          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                              Outils mobilisés
                            </span>
                            <div className="flex flex-wrap gap-2 pt-1">
                              {week.tools.map((tool, i) => (
                                <span key={i} className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-800 text-xs font-semibold">
                                  {tool}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Tools Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F5B716]">
              Boîte à Outils Professionnelle
            </span>
            <h3 className="text-2xl font-black">
              Les outils que vous apprendrez à maîtriser
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Pas de théorie abstraite : manipulation directe des plateformes utilisées par les professionnels du SEO et du marketing digital.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'WordPress', role: 'CMS & Structure' },
              { name: 'Google Search Console', role: 'Indexation & Clics' },
              { name: 'Google Analytics 4', role: 'Trafic & Audience' },
              { name: 'PageSpeed Insights', role: 'Performance & Vitesse' },
              { name: 'Keyword Planner', role: 'Volume de recherche' },
              { name: 'Canva', role: 'Visuels & Médias' },
            ].map((tool, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700 text-center space-y-1">
                <h4 className="font-extrabold text-sm text-white">{tool.name}</h4>
                <p className="text-[11px] text-slate-400">{tool.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#082238] rounded-3xl p-8 sm:p-12 text-center text-white space-y-6 relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black">
              Des questions sur le déroulement du programme ?
            </h2>
            <p className="text-sm text-slate-300">
              Notre équipe pédagogique est à votre écoute pour vérifier l'adéquation de la formation avec vos projets.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenApplyModal('candidature')}
              className="px-8 py-4 rounded-full bg-[#F5B716] hover:bg-[#E0A30B] text-slate-950 font-black text-sm transition-all shadow-lg flex items-center gap-2"
            >
              <span>Déposer ma candidature</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-4 rounded-full border border-slate-700 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
            >
              Contacter l'académie
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
