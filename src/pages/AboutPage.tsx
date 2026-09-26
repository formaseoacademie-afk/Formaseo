import React from 'react';
import { 
  Target, 
  MapPin, 
  Users, 
  Globe, 
  ShieldCheck, 
  ArrowRight, 
  Laptop, 
  Compass, 
  Layers, 
  Info,
  CheckCircle2,
  ExternalLink,
  Award
} from 'lucide-react';
import { Logo } from '../components/common/Logo';
import { SEOHead } from '../components/common/SEOHead';
import { getBreadcrumbSchema } from '../config/seoSchemas';
import { useAcademySettings } from '../services/api';

interface AboutPageProps {
  onNavigate: (page: string, param?: string) => void;
  onOpenApplyModal?: (intent?: 'programme' | 'candidature') => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenApplyModal }) => {
  const { data: settings } = useAcademySettings();

  const breadcrumbs = getBreadcrumbSchema([
    { name: 'Accueil', url: '/' },
    { name: 'À Propos & Formateur', url: '/a-propos' },
  ]);

  return (
    <div className="space-y-16 pb-20">
      <SEOHead
        title="À Propos de FormaSEO.ma | Formateur & Méthode SEO à Casablanca"
        description="Découvrez l'histoire de FormaSEO.ma, notre formateur Wassim Kassy et notre méthodologie axée sur la pratique réelle et l'acquisition de trafic Google au Maroc."
        canonicalPath="/a-propos"
        schema={[breadcrumbs]}
      />
      
      {/* Hero Header */}
      <section className="bg-[#082238] text-white py-16 sm:py-20 relative overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F5B716]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-xs text-[#F5B716] font-bold">
            <Compass className="w-3.5 h-3.5" />
            <span>À Propos de FormaSEO.ma</span>
          </div>

          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              L'Académie Pratique du Référencement & du Web à Casablanca
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed">
              Une initiative pédagogique marocaine née d'une conviction simple : le digital ne s'apprend pas dans des manuels théoriques, mais en concevant et en positionnant de vrais sites internet.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-300 pt-2">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700">
              <MapPin className="w-4 h-4 text-[#F5B716]" />
              <span>Casablanca, Maroc (Avenue Mers Sultan)</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700">
              <Laptop className="w-4 h-4 text-[#F5B716]" />
              <span>Formations en Présentiel & À Distance</span>
            </div>
          </div>

        </div>
      </section>

      {/* Mission & Philosophy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2">
              <span className="w-5 h-1 bg-[#F5B716] rounded-full inline-block" />
              <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                Notre Philosophie
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              Remplacer les diaporamas passifs par des livrables concrets
            </h2>

            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Au Maroc, le marché du travail et les entrepreneurs ont besoin de compétences immédiatement opérationnelles. Beaucoup de formations dispensent des définitions générales du référencement sans jamais faire ouvrir un panneau d'administration ni une console Google.
            </p>

            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Chez <strong>FORMASEO.ma</strong>, nous avons structuré un cadre où chaque apprenant travaille directement sur son propre projet digital : de l'installation de WordPress à la recherche de mots-clés, de la rédaction sémantique à l'optimisation technique et l'analyse de trafic.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#F5B716] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-700">
                  <strong>Apprentissage par le projet :</strong> vous ne repartez pas seulement avec des notes, mais avec un site en ligne.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#F5B716] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-700">
                  <strong>Outils de référence :</strong> Google Search Console, Google Analytics 4, Keyword Planner, PageSpeed.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#F5B716] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-700">
                  <strong>Accompagnement de proximité :</strong> petits groupes pour permettre un suivi individualisé.
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#082238] rounded-3xl p-8 text-white space-y-6 shadow-xl">
            <h3 className="text-lg font-black text-[#F5B716]">
              Les 4 Piliers de l'Académie
            </h3>
            
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-1">
                <strong className="text-white block font-bold">1. Concret & Actionnable</strong>
                <p className="text-slate-300 text-xs">Chaque heure de cours se traduit par une action directement menée sur un site réel.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-1">
                <strong className="text-white block font-bold">2. Ancrage Marocain</strong>
                <p className="text-slate-300 text-xs">Cas pratiques et stratégies locales adaptés aux réalités du marché marocain et francophone.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-1">
                <strong className="text-white block font-bold">3. Autonomie Technique</strong>
                <p className="text-slate-300 text-xs">Comprendre le fonctionnement des moteurs sans jargon inutile pour savoir auditer et corriger.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-1">
                <strong className="text-white block font-bold">4. Clarté & Transparence</strong>
                <p className="text-slate-300 text-xs">Aucune promesse trompeuse de résultats miracles : une méthode rigoureuse basée sur le travail de qualité.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Founder & Instructor Profile */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-8">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-slate-400 block mb-1">
                Fondation & Direction Pédagogique
              </span>
              <h2 className="text-2xl font-black text-slate-900">
                Wassim Kassy
              </h2>
              <p className="text-xs sm:text-sm text-[#F5B716] font-bold">
                Fondateur & Consultant SEO chez FormaSEO.ma
              </p>
            </div>

            <a
              href="https://www.linkedin.com/in/kassy-wassim"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <span>Profil LinkedIn</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4 flex justify-center">
              <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-3xl bg-slate-900 border-4 border-[#F5B716] flex items-center justify-center text-white text-3xl font-black shadow-lg">
                WK
              </div>
            </div>

            <div className="md:col-span-8 space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                Consultant en référencement naturel et formateur digital, Wassim Kassy a fondé FormaSEO.ma pour répondre au besoin d'un enseignement pratique du SEO et de la visibilité sur Google à destination des professionnels et porteurs de projet au Maroc.
              </p>
              <p>
                Son approche pédagogique privilégie la mise en situation réelle : accompagner chaque participant dans la structuration d'un site WordPress, la compréhension fine des critères de classement Google, et l'acquisition durable de trafic sans artifice.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Location & Contact Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-black uppercase tracking-wider text-[#F5B716]">
                Implantation
              </span>
              <h3 className="text-2xl font-black">
                Au cœur de Casablanca
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Les sessions en présentiel se déroulent à Casablanca, dans le quartier central d'Avenue Mers Sultan. Les apprenants à distance ou situés dans d'autres villes du Maroc peuvent suivre l'intégralité du cursus en direct avec le même niveau d'encadrement.
              </p>
              <div className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#F5B716] shrink-0" />
                <span>Repère indicatif : Quartier Avenue Mers Sultan, Casablanca, Maroc (adresse exacte communiquée à la convocation).</span>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-3">
              <button
                onClick={() => {
                  if (onOpenApplyModal) onOpenApplyModal('candidature');
                  else onNavigate('contact');
                }}
                className="w-full py-4 rounded-full bg-[#F5B716] hover:bg-[#E0A30B] text-slate-950 font-black text-sm transition-all text-center flex items-center justify-center gap-2"
              >
                <span>Rejoindre la prochaine session</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="w-full py-3.5 rounded-full border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-white font-bold text-xs text-center"
              >
                Poser une question à l'académie
              </button>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
