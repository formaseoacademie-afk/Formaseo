import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';

interface FaqSectionProps {
  onContactClick: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onContactClick }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Je débute totalement en informatique, puis-je suivre vos formations ?',
      a: 'Absolument ! Notre cursus "SEO Débutant" a été conçu spécifiquement sans aucun jargon préalable. Vous apprendrez pas à pas avec des démonstrations sur écran partagé.',
    },
    {
      q: 'Les cours sont-ils dispensés en direct ou enregistrés ?',
      a: 'Les cours sont 100% enregistrés en vidéo haute définition avec accès 24h/24 et 7j/7, ce qui vous permet d’avancer à votre propre rythme. De plus, nous organisons des sessions Live bimensuelles de Q&R avec les formateurs.',
    },
    {
      q: 'Les formations sont-elles adaptées au marché marocain ?',
      a: 'Oui ! FormaSeo est la seule académie intégrant des modules spécifiques sur le référencement multilingue (Français, Arabe, Darija translittérée), le SEO Local au Maroc (Google Maps à Casablanca, Rabat, Marrakech, etc.) et le e-commerce local.',
    },
    {
      q: 'Comment s’obtient la certification FormaSeo ?',
      a: 'À l’issue de chaque formation, vous passez un test pratique en ligne ainsi qu’une soumission d’audit. Avec un score supérieur à 75%, votre certificat officiel vous est automatiquement délivré avec lien de vérification public pour LinkedIn.',
    },
    {
      q: 'Quels sont les moyens de paiement acceptés au Maroc et à l’international ?',
      a: 'Nous acceptons les cartes bancaires marocaines et internationales (CMI, Visa, Mastercard), ainsi que les virements bancaires locaux (RIB marocain) et le paiement échelonné.',
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
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-[#0B253A] text-sm sm:text-base"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180 text-[#F5B716]' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-6 pb-6 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-50 bg-slate-50/50">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Support CTA */}
      <div className="mt-10 p-6 bg-slate-100 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#F5B716] text-slate-950 flex items-center justify-center shrink-0">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">Vous avez une question spécifique ?</h4>
            <p className="text-xs text-slate-500">Notre équipe de conseillers pédagogiques vous répond sous 2h.</p>
          </div>
        </div>
        <button
          onClick={onContactClick}
          className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-xs font-bold transition-all shrink-0"
        >
          Contacter un conseiller
        </button>
      </div>
    </section>
  );
};
