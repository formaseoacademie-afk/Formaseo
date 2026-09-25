import React from 'react';
import { Layout, Search, Zap, MapPin, BarChart3, CheckCircle2, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

interface DeliverablesSectionProps {
  onOpenApplyModal?: (intent?: 'programme' | 'candidature') => void;
}

export const DeliverablesSection: React.FC<DeliverablesSectionProps> = ({ onOpenApplyModal }) => {
  const deliverables = [
    {
      title: '1. Votre Site WordPress Déployé & Opérationnel',
      desc: 'Nom de domaine, hébergement configuré, pages indispensables créées (Accueil, Services, Contact) et design responsive sur mobile.',
      icon: Layout,
      tag: 'Semaine 1',
    },
    {
      title: '2. Une Stratégie de Mots-Clés Validée',
      desc: 'Cartographie de 50+ mots-clés cibles correspondant aux intentions de recherche de vos clients à Casablanca et au Maroc, avec calendrier éditorial.',
      icon: Search,
      tag: 'Semaine 2',
    },
    {
      title: '3. Un Site Optimisé Techniquement',
      desc: 'Balises Title et Meta rédigées, images compressées au format WebP, audit de vitesse PageSpeed et sitemap XML soumis aux moteurs.',
      icon: Zap,
      tag: 'Semaine 3',
    },
    {
      title: '4. Fiche Google Business Profile & Réseaux',
      desc: 'Votre entreprise visible sur Google Maps pour capter les recherches de proximité, gestion des avis clients et visuels Canva de marque.',
      icon: MapPin,
      tag: 'Semaine 4',
    },
    {
      title: '5. Outils de Mesure Google Connectés',
      desc: 'Google Search Console et Google Analytics 4 (GA4) paramétrés pour suivre vos clics réels, vos positions et le comportement des visiteurs.',
      icon: BarChart3,
      tag: 'Semaine 5',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F5B716]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-5 h-1 bg-[#F5B716] rounded-full inline-block" />
            <span className="text-xs font-black uppercase tracking-wider text-[#F5B716]">
              Livrables Concrets
            </span>
            <span className="w-5 h-1 bg-[#F5B716] rounded-full inline-block" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Ce que vous construisez pendant la formation
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
            Pas de cours théoriques passifs : vous quittez la formation avec des résultats tangibles et directement exploitables pour votre activité.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {deliverables.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-800/80 rounded-3xl p-7 border border-slate-700/80 hover:border-slate-600 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#082238] border border-slate-700 text-[#F5B716] flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-black uppercase px-2.5 py-1 bg-yellow-500/10 text-[#F5B716] border border-yellow-500/20 rounded-full">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-white mb-2 group-hover:text-[#F5B716] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-700/60 flex items-center gap-2 text-xs text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-[#F5B716] shrink-0" />
                  <span>Pratiqué et validé sur votre projet</span>
                </div>
              </div>
            );
          })}

          {/* 6th Card: Summary Call to Action */}
          <div className="bg-[#082238] rounded-3xl p-7 border border-[#F5B716]/40 flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#F5B716] text-slate-950 flex items-center justify-center mb-5 font-black">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-white mb-2">
                Un Écosystème 100% Fonctionnel
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                À la fin du cursus, vous disposez d'un canal d'acquisition opérationnel sans dépendre d'une agence externe.
              </p>
            </div>

            {onOpenApplyModal && (
              <button
                onClick={() => onOpenApplyModal('candidature')}
                className="mt-6 w-full py-3 rounded-xl bg-[#F5B716] hover:bg-[#E0A30B] text-slate-950 font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow"
              >
                <span>Candidater pour construire votre site</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
