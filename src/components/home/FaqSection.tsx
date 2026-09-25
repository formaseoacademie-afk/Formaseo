import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle, ArrowRight } from 'lucide-react';
import { fallbackFaqs } from '../../config/defaultData';

interface FaqSectionProps {
  onContactClick?: () => void;
  onViewAllFaqs?: () => void;
  onOpenApplyModal?: (intent?: 'programme' | 'candidature') => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  onContactClick,
  onViewAllFaqs,
  onOpenApplyModal,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Faut-il savoir coder pour suivre la formation ?',
      a: 'Non, absolument aucun prérequis en code n\'est nécessaire. Vous apprenez à créer et gérer votre site via WordPress et à optimiser vos balises et contenus avec des outils visuels et intuitifs.',
    },
    {
      q: 'Où se déroulent les cours en présentiel ?',
      a: 'Les sessions présentielles se déroulent à Casablanca, dans le quartier central d\'Avenue Mers Sultan. Les apprenants à distance peuvent suivre les cours en direct en visioconférence interactive.',
    },
    {
      q: 'Qu\'est-ce qui est inclus dans l\'inscription ?',
      a: 'L\'inscription comprend la réservation de votre nom de domaine, 1 an d\'hébergement professionnel, l\'installation de votre site WordPress, les ateliers pratiques dirigés, le support du formateur et votre certificat.',
    },
    {
      q: 'Quels résultats concrets puis-je espérer ?',
      a: 'Vous quittez la formation avec un site internet réellement en ligne, une stratégie de mots-clés ciblée, vos outils Google Search Console et Google Analytics 4 paramétrés et une maîtrise complète de votre visibilité.',
    },
    {
      q: 'Comment s\'organisent les dates et horaires des sessions ?',
      a: 'Les sessions sont organisées en promotions à effectif restreint. Les dates et plannings précis sont confirmés lors de votre entretien de candidature selon vos disponibilités (soirée, week-end ou journée).',
    },
  ];

  return (
    <section className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-2">
          <span className="w-5 h-1 bg-[#F5B716] rounded-full inline-block" />
          <span className="text-xs font-black uppercase tracking-wider text-slate-500">
            Questions Fréquentes
          </span>
          <span className="w-5 h-1 bg-[#F5B716] rounded-full inline-block" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Tout ce que vous devez savoir avant de commencer
        </h2>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all duration-200 shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-extrabold text-slate-900 hover:text-[#082238] text-sm sm:text-base cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#F5B716]' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-6 pb-6 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        {onViewAllFaqs && (
          <button
            onClick={onViewAllFaqs}
            className="px-6 py-3 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs flex items-center gap-2 cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-[#F5B716]" />
            <span>Consulter toutes les questions de la FAQ</span>
          </button>
        )}

        {onOpenApplyModal && (
          <button
            onClick={() => onOpenApplyModal('candidature')}
            className="px-6 py-3 rounded-full bg-[#F5B716] hover:bg-[#E0A30B] text-slate-950 font-black text-xs flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <span>Poser une question spécifique</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </section>
  );
};
