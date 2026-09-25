import React from 'react';
import { Check, Sparkles, ArrowRight, Zap, ShieldCheck } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';

interface PricingPreviewSectionProps {
  onSelectPlan: (plan: string) => void;
  onExplorePricing: () => void;
}

export const PricingPreviewSection: React.FC<PricingPreviewSectionProps> = ({
  onSelectPlan,
  onExplorePricing,
}) => {
  const { currency, setCurrency, formatPrice } = useCurrency();

  const plans = [
    {
      id: 'starter',
      name: 'Formation à la carte',
      tagline: 'Idéal pour démarrer ou cibler une compétence',
      priceMAD: 1490,
      priceEUR: 139,
      unit: '/ formation',
      popular: false,
      features: [
        'Accès complet à 1 formation choisie',
        'Accès à vie aux mises à jour des cours',
        'Exercices pratiques & templates Notion/Excel',
        'Accès au forum communautaire',
        'Certificat officiel de complétion',
      ],
      buttonText: 'Choisir une formation',
      buttonVariant: 'outline',
    },
    {
      id: 'all-access',
      name: 'Pass Illimité Académie',
      tagline: 'L’accès total à l’ensemble des cursus',
      priceMAD: 3990,
      priceEUR: 369,
      unit: '/ an',
      popular: true,
      badge: 'Le Plus Populaire',
      features: [
        'Accès illimité aux 6 formations complètes',
        'Toutes les nouvelles formations ajoutées en 2026',
        'Coaching live bimensuel avec nos formateurs',
        'Accès VIP à la communauté d’entraide Discord',
        '6 Certifications officielles FormaSeo',
        'Revue personnalisée de 1 audit de site',
      ],
      buttonText: 'Prendre le Pass Illimité',
      buttonVariant: 'primary',
    },
    {
      id: 'enterprise',
      name: 'Formule Entreprise & Équipe',
      tagline: 'Sur mesure pour vos équipes marketing',
      priceMAD: 7900,
      priceEUR: 730,
      unit: 'sur devis / équipe',
      popular: false,
      features: [
        'Accès pour 3 à 20 collaborateurs',
        'Dashboard d’administration et suivi de progression',
        'Ateliers sur-mesure sur votre propre site web',
        'Convention de formation & facturation marocaine',
        'Support prioritaire dédié 6j/7',
      ],
      buttonText: 'Demander un devis équipe',
      buttonVariant: 'outline',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-5 h-1 bg-[#F5B716] rounded-full inline-block" />
            <span className="text-xs font-black uppercase tracking-wider text-slate-500">
              Investissement & Tarifs
            </span>
            <span className="w-5 h-1 bg-[#F5B716] rounded-full inline-block" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Des tarifs clairs, transparents et rentables
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-2">
            Rentabilisez votre formation dès votre premier projet client ou votre première hausse de trafic.
          </p>

          {/* Currency Toggle */}
          <div className="mt-6 inline-flex items-center bg-white p-1 rounded-full border border-slate-200 shadow-sm">
            <button
              onClick={() => setCurrency('MAD')}
              className={`px-5 py-1.5 rounded-full text-xs font-black transition-all ${
                currency === 'MAD' ? 'bg-[#F5B716] text-slate-950 shadow' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Dirhams Marocains (MAD)
            </button>
            <button
              onClick={() => setCurrency('EUR')}
              className={`px-5 py-1.5 rounded-full text-xs font-black transition-all ${
                currency === 'EUR' ? 'bg-[#F5B716] text-slate-950 shadow' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Euros (€)
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                plan.popular
                  ? 'bg-slate-900 text-white shadow-2xl ring-4 ring-[#F5B716] scale-100 lg:-translate-y-2'
                  : 'bg-white text-slate-900 border border-slate-200 shadow-sm hover:shadow-lg'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#F5B716] text-slate-950 text-xs font-black px-4 py-1.5 rounded-full shadow uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 fill-current" />
                  <span>{plan.badge}</span>
                </div>
              )}

              <div>
                <h3 className="text-xl font-black mb-1">{plan.name}</h3>
                <p className={`text-xs ${plan.popular ? 'text-slate-300' : 'text-slate-500'} mb-6`}>
                  {plan.tagline}
                </p>

                {/* Price Display */}
                <div className="mb-6 pb-6 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-black tracking-tight">
                      {formatPrice(plan.priceMAD, plan.priceEUR)}
                    </span>
                    <span className={`text-xs font-semibold ${plan.popular ? 'text-slate-300' : 'text-slate-500'}`}>
                      {plan.unit}
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  <p className={`text-xs font-bold uppercase tracking-wider ${plan.popular ? 'text-[#F5B716]' : 'text-slate-400'}`}>
                    Ce qui est inclus :
                  </p>
                  {plan.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs sm:text-sm">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          plan.popular ? 'bg-yellow-500/20 text-[#F5B716]' : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span className={plan.popular ? 'text-slate-200' : 'text-slate-700'}>
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Button */}
              <button
                onClick={() => onSelectPlan(plan.id)}
                className={`w-full py-4 rounded-full font-extrabold text-sm transition-all flex items-center justify-center gap-2 group ${
                  plan.popular
                    ? 'bg-[#F5B716] hover:bg-[#E0A30B] text-slate-950 shadow-lg hover:shadow-yellow-500/20'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                <span>{plan.buttonText}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          ))}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-semibold text-slate-500">
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> Garantie 14 jours satisfait ou remboursé
          </span>
          <span className="hidden sm:inline">•</span>
          <span>Paiement sécurisé CMI, Carte Bancaire & Virement</span>
          <span className="hidden sm:inline">•</span>
          <span>Facturation officielle entreprise au Maroc</span>
        </div>
      </div>
    </section>
  );
};
