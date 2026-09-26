import React from 'react';
import { Store, Laptop, Target, LineChart, ArrowRight, CheckCircle2 } from 'lucide-react';

interface AudiencesSectionProps {
  onOpenApplyModal?: (intent?: 'programme' | 'candidature') => void;
}

export const AudiencesSection: React.FC<AudiencesSectionProps> = ({ onOpenApplyModal }) => {
  const audienceProfiles = [
    {
      id: 'entrepreneurs',
      badge: 'Projets & E-commerce',
      role: 'Entrepreneurs & Porteurs de Projet',
      icon: Store,
      borderColor: 'hover:border-amber-400/80',
      tagColor: 'bg-amber-50 text-amber-900 border-amber-200/80',
      iconBg: 'bg-[#082238] text-[#F5B716]',
      summary: 'Concevez vous-même votre site vitrine ou boutique et positionnez votre activité sur Google sans dépendre d’un budget publicitaire permanent.',
      outcomes: [
        'Site WordPress déployé sur votre nom de domaine',
        'Acquisition naturelle de clients qualifiés au Maroc',
        'Fiche Google Maps locale optimisée à Casablanca'
      ],
      ctaText: 'Lancer mon projet digital'
    },
    {
      id: 'freelances',
      badge: 'Prestations Web',
      role: 'Freelances & Rédacteurs Web',
      icon: Laptop,
      borderColor: 'hover:border-sky-400/80',
      tagColor: 'bg-sky-50 text-sky-950 border-sky-200/80',
      iconBg: 'bg-[#082238] text-sky-400',
      summary: 'Enrichissez vos offres avec la création de sites WordPress, la recherche sémantique et les audits techniques pour facturer des prestations à forte valeur.',
      outcomes: [
        'Vendez des audits SEO complets à vos clients',
        'Proposez la création de sites clés en main',
        'Augmentez votre tarif moyen de prestation'
      ],
      ctaText: 'Enrichir mes compétences'
    },
    {
      id: 'etudiants',
      badge: 'Compétences Métier',
      role: 'Étudiants & En Reconversion',
      icon: Target,
      borderColor: 'hover:border-emerald-400/80',
      tagColor: 'bg-emerald-50 text-emerald-950 border-emerald-200/80',
      iconBg: 'bg-[#082238] text-emerald-400',
      summary: 'Sortez des théories abstraites grâce à un projet en ligne réel et mesurable à présenter aux recruteurs en agence ou en entreprise.',
      outcomes: [
        'Un site réel en production à montrer en entretien',
        'Maîtrise pratique de GA4 et Search Console',
        'Attestation de compétences FormaSEO.ma'
      ],
      ctaText: 'Me former au métier SEO'
    },
    {
      id: 'dirigeants',
      badge: 'Pilotage & ROI',
      role: 'Dirigeants & Responsables Com',
      icon: LineChart,
      borderColor: 'hover:border-indigo-400/80',
      tagColor: 'bg-indigo-50 text-indigo-950 border-indigo-200/80',
      iconBg: 'bg-[#082238] text-indigo-400',
      summary: 'Comprenez les mécanismes réels du référencement pour auditer vos prestataires, guider vos équipes et maximiser le retour sur investissement web.',
      outcomes: [
        'Auditez la qualité du travail de vos agences',
        'Pilotez votre stratégie de trafic organique',
        'Structurez votre visibilité à long terme'
      ],
      ctaText: 'Piloter ma visibilité'
    }
  ];

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
          Le programme est structuré pour s'adapter à votre projet spécifique, que vous souhaitiez lancer un site, enrichir vos services ou monter en compétences.
        </p>
      </div>

      {/* Grid of 4 Elevated Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
        {audienceProfiles.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className={`bg-white rounded-3xl p-7 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group ${item.borderColor}`}
            >
              <div>
                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 rounded-2xl ${item.iconBg} flex items-center justify-center shadow-md`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${item.tagColor}`}>
                    {item.badge}
                  </span>
                </div>

                {/* Role Title */}
                <h3 className="text-lg font-black text-slate-900 mb-3 group-hover:text-[#082238] transition-colors leading-snug">
                  {item.role}
                </h3>

                {/* Summary */}
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5">
                  {item.summary}
                </p>

                {/* Concrete Deliverable Bullets */}
                <div className="pt-4 border-t border-slate-100 space-y-2 mb-6">
                  {item.outcomes.map((out, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#F5B716] shrink-0 mt-0.5" />
                      <span className="leading-snug">{out}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              {onOpenApplyModal && (
                <button
                  onClick={() => onOpenApplyModal('candidature')}
                  className="w-full py-3 px-4 bg-slate-900 hover:bg-[#F5B716] text-white hover:text-slate-950 font-extrabold text-xs rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm group-hover:shadow"
                >
                  <span>{item.ctaText}</span>
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
