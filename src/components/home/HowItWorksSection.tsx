import React from 'react';
import { Users2, Laptop2, HelpCircle, CheckCircle, MapPin, ArrowRight } from 'lucide-react';

interface HowItWorksSectionProps {
  onOpenApplyModal?: (intent?: 'programme' | 'candidature') => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onOpenApplyModal }) => {
  const steps = [
    {
      title: '1. Ateliers en Petit Groupe',
      desc: 'Des promotions à taille humaine pour permettre un suivi individualisé sur chaque projet de site web.',
      icon: Users2,
    },
    {
      title: '2. Pratique Directe sur Écran',
      desc: 'Vous manipulez les outils en direct : achat de domaine, WordPress, balisage SEO et Search Console.',
      icon: Laptop2,
    },
    {
      title: '3. Accompagnement & Revues d’Audit',
      desc: 'Vos livrables et choix de mots-clés sont audités pour corriger immédiatement les blocages.',
      icon: CheckCircle,
    },
    {
      title: '4. Format Présentiel Casablanca ou En Ligne',
      desc: 'Sessions interactives organisées dans le secteur Mers Sultan à Casablanca ou en visioconférence directe.',
      icon: MapPin,
    },
  ];

  return (
    <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 mb-2">
          <span className="w-5 h-1 bg-[#F5B716] rounded-full inline-block" />
          <span className="text-xs font-black uppercase tracking-wider text-slate-500">
            Méthodologie Pédagogique
          </span>
          <span className="w-5 h-1 bg-[#F5B716] rounded-full inline-block" />
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Comment se déroulent les sessions ?
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-2">
          Un cadre structuré et bienveillant pour progresser pas à pas sans se perdre dans la technique.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-yellow-50 text-[#9A6B00] border border-yellow-200/80 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-black text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {onOpenApplyModal && (
        <div className="mt-12 text-center">
          <button
            onClick={() => onOpenApplyModal('candidature')}
            className="px-8 py-4 rounded-full bg-[#F5B716] hover:bg-[#E0A30B] text-slate-950 font-black text-xs sm:text-sm transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Candidater pour la prochaine promotion</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </section>
  );
};
