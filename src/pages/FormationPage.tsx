import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Calendar, 
  Clock, 
  MapPin, 
  Laptop, 
  Layers, 
  Award, 
  Users, 
  Sparkles, 
  ShieldCheck, 
  Compass, 
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import { useAcademySettings, useCurriculum } from '../services/api';

interface FormationPageProps {
  onNavigate: (page: string, param?: string) => void;
  onOpenApplyModal: (intent?: 'programme' | 'candidature') => void;
}

export const FormationPage: React.FC<FormationPageProps> = ({ onNavigate, onOpenApplyModal }) => {
  const { data: settings } = useAcademySettings();
  const { data: weeks } = useCurriculum();
  const [activeTab, setActiveTab] = useState<'overview' | 'syllabus' | 'inclusions' | 'prerequisites'>('overview');

  return (
    <div className="space-y-16 pb-20">
      
      {/* Header Banner */}
      <section className="bg-[#082238] text-white py-16 sm:py-20 relative overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F5B716]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-xs text-[#F5B716] font-bold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Formation Pratique Complète</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-6">
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                Formation SEO, Marketing Digital & Création de Site WordPress
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl">
                Un cursus intensif et 100% orienté pratique à Casablanca. Ne vous contentez pas d'écouter la théorie : créez votre site, positionnez vos mots-clés stratégiques et mesurez vos performances réelles.
              </p>

              {/* Key metadata chips */}
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-semibold text-slate-200">
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700">
                  <Clock className="w-4 h-4 text-[#F5B716]" />
                  <span>{settings?.duration || '5 semaines (30 à 40h de pratique)'}</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700">
                  <MapPin className="w-4 h-4 text-[#F5B716]" />
                  <span>Casablanca (Mers Sultan) & En direct en ligne</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700">
                  <Calendar className="w-4 h-4 text-[#F5B716]" />
                  <span>Prochaine session : {settings?.nextSessionDate || 'À confirmer avec l’équipe'}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                <button
                  onClick={() => onOpenApplyModal('candidature')}
                  className="px-8 py-4 rounded-full bg-[#F5B716] hover:bg-[#E0A30B] text-slate-950 font-black text-sm sm:text-base transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <span>Candidater à la formation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onOpenApplyModal('programme')}
                  className="px-6 py-4 rounded-full border border-slate-600 bg-slate-900/50 hover:bg-slate-800 text-white font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4 text-[#F5B716]" />
                  <span>Télécharger le syllabus PDF</span>
                </button>
              </div>
            </div>

            {/* Quick summary box */}
            <div className="lg:col-span-4 bg-slate-900/90 border border-slate-700 rounded-3xl p-6 sm:p-7 space-y-4 shadow-xl">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#F5B716]">
                Ce qui est inclus
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#F5B716] shrink-0 mt-0.5" />
                  <span>1 Site WordPress complet développé par vos soins</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#F5B716] shrink-0 mt-0.5" />
                  <span>Nom de domaine & Hébergement professionnel (1 an)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#F5B716] shrink-0 mt-0.5" />
                  <span>Accompagnement personnalisé et revue de projet</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#F5B716] shrink-0 mt-0.5" />
                  <span>Audit SEO technique & stratégie de contenu réelle</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#F5B716] shrink-0 mt-0.5" />
                  <span>Certificat d'assiduité et d'achèvement de formation</span>
                </li>
              </ul>

              <div className="pt-4 border-t border-slate-800">
                <div className="text-[11px] text-slate-400">
                  <span className="font-bold text-slate-200">Tarif officiel :</span> Sur demande ou selon la formule choisie (détails validés lors de l'entretien).
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Main Content Area with Navigation Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 overflow-x-auto gap-2 sm:gap-6 pb-2 mb-10">
          {[
            { id: 'overview', label: 'Vue d’ensemble & Objectifs' },
            { id: 'syllabus', label: 'Programme 5 Semaines' },
            { id: 'inclusions', label: 'Équipements & Inclusions' },
            { id: 'prerequisites', label: 'Prérequis & Public cible' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-4 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-[#082238] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-8">
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-4">
                  Pourquoi cette formation est différente
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  La plupart des cours de marketing digital se limitent à des diapositives théoriques. Chez <strong>FORMASEO.ma</strong>, nous croyons qu'on n'apprend le SEO qu'en se confrontant au terrain : en installant son CMS, en indexant ses pages sur Google Search Console, en écrivant pour de vrais utilisateurs et en observant l'évolution de ses positions.
                </p>
              </div>

              {/* 4 Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#082238] flex items-center justify-center font-black">
                    01
                  </div>
                  <h4 className="font-extrabold text-slate-900">Création Technique</h4>
                  <p className="text-xs text-slate-600">
                    Configuration de WordPress, choix d'architecture, balisage propre, vitesse de chargement et ergonomie mobile.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#082238] flex items-center justify-center font-black">
                    02
                  </div>
                  <h4 className="font-extrabold text-slate-900">Stratégie Sémantique</h4>
                  <p className="text-xs text-slate-600">
                    Recherche de mots-clés pertinents, intention de recherche, rédaction optimisée et assistance par l'IA éthique.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#082238] flex items-center justify-center font-black">
                    03
                  </div>
                  <h4 className="font-extrabold text-slate-900">Visibilité & Réseaux</h4>
                  <p className="text-xs text-slate-600">
                    Optimisation Google Business Profile (SEO local Casablanca / Maroc), maillage et diffusion sur les réseaux sociaux.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#082238] flex items-center justify-center font-black">
                    04
                  </div>
                  <h4 className="font-extrabold text-slate-900">Mesure & Analytics</h4>
                  <p className="text-xs text-slate-600">
                    Prise en main de Google Analytics 4 et Search Console pour interpréter vos impressions, clics et conversions.
                  </p>
                </div>
              </div>

              {/* Concrete deliverables table */}
              <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-4">
                <h3 className="text-lg font-black text-slate-900">
                  Livrables concrets à la fin de la formation
                </h3>
                <div className="space-y-3 text-sm text-slate-700">
                  <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900">Votre site Web en production :</strong> entièrement sécurisé (HTTPS), responsive et prêt pour la vente ou la génération de prospects.
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900">Votre matrice sémantique :</strong> liste de 50 à 200 mots-clés qualifiés avec volumes et priorités d'action.
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900">Vos outils de suivi configurés :</strong> Google Search Console et Google Analytics 4 reliés sans erreur.
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Sidebar CTA */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#082238] text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-[#F5B716] uppercase tracking-wider">
                    Inscriptions Ouvertes
                  </span>
                  <h3 className="text-xl font-black">
                    Rejoignez la prochaine session
                  </h3>
                  <p className="text-xs text-slate-300">
                    Les places sont limitées pour garantir un encadrement personnalisé pour chaque apprenant.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <button
                    onClick={() => onOpenApplyModal('candidature')}
                    className="w-full py-3.5 rounded-full bg-[#F5B716] hover:bg-[#E0A30B] text-slate-950 font-black text-sm transition-all flex items-center justify-center gap-2"
                  >
                    <span>Déposer ma candidature</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onOpenApplyModal('programme')}
                    className="w-full py-3.5 rounded-full border border-slate-700 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2"
                  >
                    <FileText className="w-4 h-4 text-[#F5B716]" />
                    <span>Recevoir le programme détaillé</span>
                  </button>
                </div>

                <div className="text-[11px] text-slate-400 text-center">
                  Aucun engagement préalable. Un conseiller vous contacte sous 24h.
                </div>
              </div>

              {/* Assistance contact */}
              <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-5 space-y-2">
                <h4 className="font-black text-amber-950 text-sm flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-700" />
                  Une question sur la formation ?
                </h4>
                <p className="text-xs text-amber-900">
                  Consultez notre foire aux questions ou envoyez-nous une demande pour échanger sur vos objectifs.
                </p>
                <button
                  onClick={() => onNavigate('faq')}
                  className="text-xs font-bold text-amber-950 hover:underline inline-flex items-center gap-1 pt-1"
                >
                  <span>Voir la FAQ</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Syllabus */}
        {activeTab === 'syllabus' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-slate-900">
                  Programme semaine par semaine (5 Semaines)
                </h2>
                <p className="text-sm text-slate-600">
                  Un rythme équilibré entre explications concrètes, ateliers dirigés et coaching individuel.
                </p>
              </div>
              <button
                onClick={() => onNavigate('programme')}
                className="px-5 py-2.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold inline-flex items-center gap-2 shrink-0 self-start sm:self-auto"
              >
                <span>Voir le syllabus complet</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-4">
              {(weeks || []).map((week) => (
                <div key={week.weekNumber} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 hover:border-slate-300 transition-all shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-[#082238] text-white font-extrabold text-xs flex items-center justify-center">
                        S{week.weekNumber}
                      </span>
                      <h3 className="font-extrabold text-slate-900 text-base">
                        {week.title}
                      </h3>
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                      {week.hours}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600">
                    {week.objective}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Modules abordés
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {week.topics.map((t, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F5B716]" />
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Atelier & Livrable de la semaine
                      </h4>
                      <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-950 font-medium">
                        {week.practicalWorkshop}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Inclusions */}
        {activeTab === 'inclusions' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-black text-slate-900 mb-2">
                Tout le nécessaire pour réussir votre projet
              </h2>
              <p className="text-sm text-slate-600">
                Vous ne repartez pas seulement avec des connaissances : vous repartez avec un écosystème digital fonctionnel.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-black">
                  <Laptop className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-base">
                  Site WordPress & Nom de domaine
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Votre nom de domaine professionnel et votre hébergement sont activés pour toute une année pour héberger votre projet en toute autonomie.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-900 flex items-center justify-center font-black">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-base">
                  Coaching & Revue d'audit
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Chaque étape de votre site est revue par le formateur pour corriger les erreurs de balisage, de vitesse et de structure sémantique.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-black">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-base">
                  Certificat d'Achèvement
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Délivrance d'une attestation de formation valorisable sur votre profil LinkedIn et auprès de vos clients ou employeurs.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Prerequisites */}
        {activeTab === 'prerequisites' && (
          <div className="space-y-8 max-w-4xl">
            <div>
              <h2 className="text-2xl font-black text-slate-900 mb-2">
                Prérequis et Profils Idéaux
              </h2>
              <p className="text-sm text-slate-600">
                La formation est pensée pour être accessible sans connaissances préalables en code ou en programmation.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
              <div className="space-y-4">
                <h3 className="font-extrabold text-slate-900 text-base">
                  Ce dont vous avez besoin :
                </h3>
                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#F5B716] shrink-0" />
                    <span>Un ordinateur portable (PC ou Mac) fonctionnel avec connexion Internet.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#F5B716] shrink-0" />
                    <span>Une idée de projet ou d'activité (ou nous vous fournirons un cas d'étude réel).</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#F5B716] shrink-0" />
                    <span>Aucune compétence en code (HTML/PHP) n'est requise : tout se fait via WordPress et des outils visuels.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <h3 className="font-extrabold text-slate-900 text-base mb-3">
                  Pour qui cette formation est conçue :
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <strong className="text-slate-900 block mb-1">Porteurs de projets & Entrepreneurs</strong>
                    Créer son propre canal d'acquisition organique sans dépendre d'une agence tierce.
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <strong className="text-slate-900 block mb-1">Freelances & Rédacteurs</strong>
                    Ajouter les compétences de création de site et d'audit SEO à leurs prestations.
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <strong className="text-slate-900 block mb-1">Étudiants & Reconversion</strong>
                    Acquérir des compétences pratiques directement demandées sur le marché marocain.
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <strong className="text-slate-900 block mb-1">Dirigeants de PME</strong>
                    Comprendre les leviers du référencement et piloter leur visibilité avec clarté.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#082238] rounded-3xl p-8 sm:p-12 text-center text-white space-y-6 relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black">
              Prêt à développer vos compétences et lancer votre site ?
            </h2>
            <p className="text-sm text-slate-300">
              Déposez votre candidature en quelques instants pour être recontacté par l'équipe pédagogique.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenApplyModal('candidature')}
              className="px-8 py-4 rounded-full bg-[#F5B716] hover:bg-[#E0A30B] text-slate-950 font-black text-sm transition-all shadow-lg flex items-center gap-2"
            >
              <span>Candidater à la prochaine session</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-4 rounded-full border border-slate-700 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
            >
              Nous contacter d'abord
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
