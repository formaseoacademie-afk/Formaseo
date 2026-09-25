import React from 'react';
import { Rocket, Briefcase, GraduationCap, TrendingUp, ArrowRight } from 'lucide-react';
import { AcademySettings } from '../../types';
import { fallbackSettings } from '../../config/defaultData';

interface AudiencesSectionProps {
  audiences?: AcademySettings['audiences'];
  onOpenApplyModal?: (intent?: 'programme' | 'candidature') => void;
}

export const AudiencesSection: React.FC<AudiencesSectionProps> = ({ audiences, onOpenApplyModal }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Rocket':
        return Rocket;
      case 'Briefcase':
        return Briefcase;
      case 'GraduationCap':
        return GraduationCap;
      case 'TrendingUp':
      default:
        return TrendingUp;
    }
  };

  const audienceColors = [
    { bg: 'bg-[#EAF3FA]', border: 'border-blue-100', iconBg: 'bg-[#D3E5F5]', iconColor: 'text-[#0B3A60]' },
    { bg: 'bg-[#FEF6E4]', border: 'border-yellow-100', iconBg: 'bg-[#FDE7BA]', iconColor: 'text-[#9A6B00]' },
    { bg: 'bg-[#ECFDF5]', border: 'border-emerald-100', iconBg: 'bg-[#A7F3D0]', iconColor: 'text-[#065F46]' },
    { bg: 'bg-[#EEF5F8]', border: 'border-cyan-100', iconBg: 'bg-[#D9EAF0]', iconColor: 'text-[#0F394D]' },
  ];

  const items = audiences || fallbackSettings.audiences || [];

  return (
    <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 mb-2">
          <span className="w-5 h-1 bg-[#F5B716] rounded-full inline-block" />
          <span className="text-xs font-black uppercase tracking-wider text-slate-500">
            Profils & Objectifs
          </span>
          <span className="w-5 h-1 bg-[#F5B716] rounded-full inline-block" />
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          À qui s'adresse la formation FormaSEO.ma ?
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
          Le programme est conçu pour s'adapter aux objectifs spécifiques de chaque apprenant, avec un accompagnement sur mesure.
        </p>
      </div>

      {/* Grid of 4 Audiences */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {items.map((aud, idx) => {
          const Icon = getIcon(aud.icon);
          const styling = audienceColors[idx % audienceColors.length];

          return (
            <div
              key={idx}
              className={`rounded-3xl p-7 border ${styling.border} ${styling.bg} flex flex-col justify-between transition-all hover:scale-[1.02] hover:shadow-lg`}
            >
              <div>
                <div className={`w-14 h-14 rounded-2xl ${styling.iconBg} ${styling.iconColor} flex items-center justify-center mb-6 shadow-sm`}>
                  <Icon className="w-7 h-7" />
                </div>

                <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                  {aud.subtitle}
                </span>

                <h3 className="text-lg font-black text-slate-900 mt-1 mb-3">
                  {aud.title}
                </h3>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                  {aud.description}
                </p>
              </div>

              {onOpenApplyModal && (
                <button
                  onClick={() => onOpenApplyModal('candidature')}
                  className="w-full py-2.5 px-4 bg-white/90 hover:bg-white text-slate-900 font-extrabold text-xs rounded-xl border border-slate-200/80 transition-all flex items-center justify-center gap-1.5 group cursor-pointer"
                >
                  <span>Rejoindre la formation</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              )}
            </div>
          );
        })}
      </div>

    </section>
  );
};
