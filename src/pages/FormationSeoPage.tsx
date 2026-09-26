import React from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Search, 
  Globe, 
  MapPin, 
  Clock, 
  TrendingUp, 
  Zap, 
  BarChart3
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { getCourseSchema, getBreadcrumbSchema } from '../config/seoSchemas';

interface FormationSeoPageProps {
  onNavigate: (page: string, param?: string) => void;
  onOpenApplyModal: (intent?: 'programme' | 'candidature') => void;
}

export const FormationSeoPage: React.FC<FormationSeoPageProps> = ({
  onNavigate,
  onOpenApplyModal,
}) => {
  const courseSchema = getCourseSchema({
    name: 'Formation SEO & Référencement Naturel à Casablanca',
    description: 'Formation approfondie en référencement naturel (SEO) à Casablanca : recherche de mots-clés, audit technique, sémantique, SEO local et Google Search Console.',
    url: 'https://formaseo.ma/formation-seo-casablanca',
  });

  const breadcrumbs = getBreadcrumbSchema([
    { name: 'Accueil', url: '/' },
    { name: 'Formation SEO Casablanca', url: '/formation-seo-casablanca' },
  ]);

  return (
    <div className="space-y-16 pb-20">
      <SEOHead
        title="Formation SEO à Casablanca & Référencement Google | FormaSEO.ma"
        description="Maîtrisez le référencement naturel (SEO) à Casablanca. Formation pratique : audit technique, mots-clés, rédaction On-Page, SEO local et Google Search Console."
        canonicalPath="/formation-seo-casablanca"
        schema={[courseSchema, breadcrumbs]}
      />

      {/* Hero */}
      <section className="bg-[#082238] text-white py-16 sm:py-20 relative overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F5B716]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-xs text-[#F5B716] font-bold">
            <Search className="w-3.5 h-3.5" />
            <span>Spécialisation Référencement Google • Casablanca</span>
          </div>

          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Formation SEO & Référencement Naturel à Casablanca
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              Apprenez les vraies méthodes pour positionner un site en tête des résultats de recherche Google : de l'analyse sémantique à l'optimisation technique et la visibilité locale au Maroc.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-semibold text-slate-200">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700">
              <Clock className="w-4 h-4 text-[#F5B716]" />
              <span>Pratique sur projet réel</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700">
              <MapPin className="w-4 h-4 text-[#F5B716]" />
              <span>Casablanca (Mers Sultan) ou En Ligne</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700">
              <Search className="w-4 h-4 text-[#F5B716]" />
              <span>Google Search Console & Keyword Planner</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <button
              onClick={() => onOpenApplyModal('candidature')}
              className="px-8 py-4 rounded-full bg-[#F5B716] hover:bg-[#E0A30B] text-slate-950 font-black text-sm sm:text-base transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Candidater au module SEO</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onOpenApplyModal('programme')}
              className="px-6 py-4 rounded-full border border-slate-600 bg-slate-900/50 hover:bg-slate-800 text-white font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[#F5B716]" />
              <span>Demander le syllabus détaillé</span>
            </button>
          </div>
        </div>
      </section>

      {/* SEO Modules Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Les 4 Piliers du Référencement Naturel Enseignés
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Une approche 100% conforme aux consignes officielles de Google pour un trafic pérenne et sans risque de pénalité.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#082238] flex items-center justify-center font-black">
              <Search className="w-6 h-6 text-[#9A6B00]" />
            </div>
            <h3 className="text-xl font-black text-slate-900">
              1. Recherche Sémantique & Mots-Clés
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Découvrir exactement ce que tapent vos clients sur Google au Maroc. Analyse de l'intention de recherche, tri des requêtes transactionnelles et organisation du cocon sémantique.
            </p>
            <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F5B716]" />
                <span>Google Keyword Planner & Google Suggest</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F5B716]" />
                <span>Cartographie de 50+ mots-clés cibles</span>
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-900 flex items-center justify-center font-black">
              <Zap className="w-6 h-6 text-sky-700" />
            </div>
            <h3 className="text-xl font-black text-slate-900">
              2. Optimisation Technique & On-Page
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Structuration du code HTML, balises Title et Meta descriptions chirurgicales, compression des images WebP, vitesse de chargement et soumission du fichier sitemap.xml.
            </p>
            <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F5B716]" />
                <span>PageSpeed Insights & Core Web Vitals</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F5B716]" />
                <span>Balisage Hn, maillage interne & robots.txt</span>
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-900 flex items-center justify-center font-black">
              <MapPin className="w-6 h-6 text-emerald-700" />
            </div>
            <h3 className="text-xl font-black text-slate-900">
              3. SEO Local & Google Business Profile
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Pour les entreprises locales, commerces, cabinets et agences : positionner sa fiche sur Google Maps pour capter les requêtes à Casablanca, Rabat et dans les villes marocaines.
            </p>
            <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F5B716]" />
                <span>Optimisation de fiche Google Maps (GBP)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F5B716]" />
                <span>Stratégie d'avis et signaux de proximité</span>
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-900 flex items-center justify-center font-black">
              <BarChart3 className="w-6 h-6 text-indigo-700" />
            </div>
            <h3 className="text-xl font-black text-slate-900">
              4. Mesure du Trafic & Google Search Console
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Comprendre les impressions réelles de vos pages, surveiller l'évolution des positions, détecter les erreurs de crawl et interpréter le comportement des visiteurs sur Google Analytics 4.
            </p>
            <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F5B716]" />
                <span>Configuration complète de Search Console & GA4</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F5B716]" />
                <span>Rapports de performance et audit d'indexation</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#082238] rounded-3xl p-8 sm:p-12 text-center text-white space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black">
            Prêt à positionner votre site sur la 1ère page de Google ?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Rejoignez notre prochaine session à Casablanca pour auditer, optimiser et référencer votre activité étape par étape.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => onOpenApplyModal('candidature')}
              className="px-8 py-4 rounded-full bg-[#F5B716] hover:bg-[#E0A30B] text-slate-950 font-black text-sm transition-all shadow flex items-center gap-2 cursor-pointer"
            >
              <span>Candidater à la formation SEO</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
