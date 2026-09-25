import React from 'react';
import { Check, X, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

interface PricingPageProps {
  onNavigate: (page: string, param?: string) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onNavigate }) => {
  const { currency, setCurrency, formatPrice } = useCurrency();

  const comparisonFeatures = [
    { name: 'Accès aux vidéos HD à la demande', starter: true, pass: true, enterprise: true },
    { name: 'Templates, checklists et prompts Notion', starter: true, pass: true, enterprise: true },
    { name: 'Certificat officiel FormaSeo vérifiable', starter: true, pass: true, enterprise: true },
    { name: 'Accès aux 6 formations complètes', starter: false, pass: true, enterprise: true },
    { name: 'Mises à jour automatiques 2026 incluses', starter: true, pass: true, enterprise: true },
    { name: 'Coaching Live bimensuel avec les formateurs', starter: false, pass: true, enterprise: true },
    { name: 'Revue personnalisée d’un audit SEO de votre site', starter: false, pass: true, enterprise: true },
    { name: 'Accès salon VIP Discord & WhatsApp', starter: false, pass: true, enterprise: true },
    { name: 'Dashboard de progression multi-utilisateurs', starter: false, pass: false, enterprise: true },
    { name: 'Ateliers sur-mesure sur votre site d’entreprise', starter: false, pass: false, enterprise: true },
  ];

  return (
    <div className="min-h-screen py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2">
          <span className="w-5 h-1 bg-[#F5B716] rounded-full inline-block" />
          <span className="text-xs font-black uppercase tracking-wider text-slate-500">
            Formules & Tarifs
          </span>
          <span className="w-5 h-1 bg-[#F5B716] rounded-full inline-block" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Investissez dans les compétences qui génèrent du résultat
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          Des formules adaptées que vous soyez étudiant, indépendant, ou une entreprise souhaitant internaliser son acquisition SEO.
        </p>

        {/* Currency Switch */}
        <div className="pt-2 inline-flex items-center bg-slate-100 p-1 rounded-full border border-slate-200">
          <button
            onClick={() => setCurrency('MAD')}
            className={`px-6 py-2 rounded-full text-xs font-black transition-all ${
              currency === 'MAD' ? 'bg-[#F5B716] text-slate-950 shadow' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Dirhams Marocains (MAD)
          </button>
          <button
            onClick={() => setCurrency('EUR')}
            className={`px-6 py-2 rounded-full text-xs font-black transition-all ${
              currency === 'EUR' ? 'bg-[#F5B716] text-slate-950 shadow' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Euros (€)
          </button>
        </div>
      </div>

      {/* 3 Main Plan Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {/* Starter */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-black text-slate-900">À la Carte</h3>
            <p className="text-xs text-slate-500 mb-6">1 formation au choix selon votre besoin immédiat</p>
            <div className="text-3xl font-black text-slate-900 mb-6 pb-6 border-b border-slate-100">
              {formatPrice(1490, 139)} <span className="text-xs text-slate-400 font-normal">/ formation</span>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-600 mb-8">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-600" /> Accès complet à 1 formation choisie
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-600" /> Accès à vie & mises à jour
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-600" /> Exercices et templates inclus
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-600" /> Certificat officiel individuel
              </li>
            </ul>
          </div>
          <button
            onClick={() => onNavigate('courses')}
            className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-bold text-xs"
          >
            Choisir une formation
          </button>
        </div>

        {/* Pass Illimité */}
        <div className="relative bg-slate-900 text-white rounded-3xl p-8 shadow-2xl ring-4 ring-[#F5B716] flex flex-col justify-between scale-100 lg:-translate-y-2">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#F5B716] text-slate-950 text-xs font-black px-4 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow">
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>Recommandé & Le Plus Populaire</span>
          </div>
          <div>
            <h3 className="text-xl font-black text-white">Pass Illimité Académie</h3>
            <p className="text-xs text-slate-300 mb-6">L'accès intégral à toutes les formations actuelles et futures</p>
            <div className="text-3xl sm:text-4xl font-black text-white mb-6 pb-6 border-b border-slate-800">
              {formatPrice(3990, 369)} <span className="text-xs text-slate-400 font-normal">/ an</span>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-200 mb-8">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#F5B716]" /> Accès aux 6 formations complètes
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#F5B716]" /> Toutes les nouvelles formations 2026
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#F5B716]" /> Coaching live bimensuel
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#F5B716]" /> 6 Certifications officielles FormaSeo
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#F5B716]" /> Revue personnalisée d’un audit SEO
              </li>
            </ul>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="w-full py-4 bg-[#F5B716] hover:bg-[#E0A30B] text-slate-950 font-black rounded-full text-sm shadow-lg"
          >
            Souscrire au Pass Illimité
          </button>
        </div>

        {/* Enterprise */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-black text-slate-900">Pack Entreprise B2B</h3>
            <p className="text-xs text-slate-500 mb-6">Pour former votre équipe marketing ou commerciale</p>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 mb-6 pb-6 border-b border-slate-100">
              Sur Devis <span className="text-xs text-slate-400 font-normal">/ convention</span>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-600 mb-8">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-600" /> Accès multi-comptes pour vos équipes
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-600" /> Dashboard de suivi des apprenants
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-600" /> Ateliers pratiques sur votre propre site
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-600" /> Facturation conforme Maroc & convention
              </li>
            </ul>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-bold text-xs"
          >
            Demander un devis sur-mesure
          </button>
        </div>
      </div>

      {/* Feature Matrix Table */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm overflow-x-auto">
        <h3 className="text-xl font-black text-slate-900 mb-6">Tableau Comparatif Détaillé</h3>
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-slate-200 text-xs font-black uppercase tracking-wider text-slate-400">
              <th className="py-4">Fonctionnalités & Avantages</th>
              <th className="py-4 text-center">À la carte</th>
              <th className="py-4 text-center text-[#0B253A]">Pass Illimité</th>
              <th className="py-4 text-center">Entreprise</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
            {comparisonFeatures.map((row, i) => (
              <tr key={i} className="hover:bg-slate-50/60">
                <td className="py-3.5 font-medium">{row.name}</td>
                <td className="py-3.5 text-center">
                  {row.starter ? <Check className="w-5 h-5 text-emerald-600 mx-auto" /> : <X className="w-5 h-5 text-slate-300 mx-auto" />}
                </td>
                <td className="py-3.5 text-center bg-yellow-50/40 font-bold">
                  {row.pass ? <Check className="w-5 h-5 text-[#F5B716] mx-auto stroke-[3]" /> : <X className="w-5 h-5 text-slate-300 mx-auto" />}
                </td>
                <td className="py-3.5 text-center">
                  {row.enterprise ? <Check className="w-5 h-5 text-emerald-600 mx-auto" /> : <X className="w-5 h-5 text-slate-300 mx-auto" />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
