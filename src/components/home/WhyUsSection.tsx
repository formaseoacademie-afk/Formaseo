import React from 'react';
import { Target, CheckCircle2, Shield, Flame, Laptop, Award, Video, MessageSquare } from 'lucide-react';

export const WhyUsSection: React.FC = () => {
  const pillars = [
    {
      title: 'Pédagogie 100% Pratique & Concrète',
      desc: 'Pas de théories abstraites ou périmées. Chaque leçon est immédiatement appliquée sur de vrais sites, avec des templates et checklists téléchargeables.',
      icon: Target,
      tag: 'Actionnable',
    },
    {
      title: 'Formateurs Experts du Marché Réel',
      desc: 'Nos formateurs gèrent quotidiennement des millions de sessions SEO pour de grandes marques au Maroc et en Europe. Vous apprenez les vrais secrets du métier.',
      icon: Flame,
      tag: '10+ ans d’expérience',
    },
    {
      title: 'Accompagnement & Coaching Live',
      desc: 'Accédez aux sessions de questions-réponses hebdomadaires en direct, aux revues d’audit et à la communauté d’entraide active 7j/7.',
      icon: MessageSquare,
      tag: 'Support continu',
    },
    {
      title: 'Certification Professionnelle Reconnue',
      desc: 'Validez vos compétences via nos examens et recevez votre certification officielle FormaSeo valorisable auprès des recruteurs et clients.',
      icon: Award,
      tag: 'Certificat vérifiable',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#F5B716]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-5 h-1 bg-[#F5B716] rounded-full inline-block" />
            <span className="text-xs font-black uppercase tracking-wider text-[#F5B716]">
              Pourquoi Choisir FormaSeo
            </span>
            <span className="w-5 h-1 bg-[#F5B716] rounded-full inline-block" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            La méthode la plus directe pour maîtriser le SEO
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mt-4">
            Conçue pour vous faire gagner des mois d'essais-erreurs et générer des résultats concrets dès vos premières semaines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-800/80 rounded-3xl p-7 border border-slate-700/80 hover:border-[#F5B716]/60 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#F5B716]/10 text-[#F5B716] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-slate-700 text-slate-300">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-white mb-3 group-hover:text-[#F5B716] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
