import React from 'react';
import { BookOpen, ArrowRight, CheckCircle2, Search, MapPin, FileText, ChevronRight } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { getBreadcrumbSchema } from '../config/seoSchemas';

interface ResourcesPageProps {
  onNavigate: (page: string, param?: string) => void;
  onOpenApplyModal?: (intent?: 'programme' | 'candidature') => void;
}

export const ResourcesPage: React.FC<ResourcesPageProps> = ({ onNavigate, onOpenApplyModal }) => {
  const breadcrumbs = getBreadcrumbSchema([
    { name: 'Accueil', url: '/' },
    { name: 'Ressources & Guides SEO Maroc', url: '/ressources-seo' },
  ]);

  const articles = [
    {
      id: 'seo-local-casablanca',
      title: 'SEO Local à Casablanca : Comment optimiser sa fiche Google Maps',
      category: 'SEO Local & Visibilité',
      readTime: '6 min de lecture',
      summary: 'Guide pratique pour les commerces, cabinets et entreprises à Casablanca : configuration de Google Business Profile, signaux de proximité et gestion des avis clients réels.',
      points: [
        'Choisir les catégories primaires et secondaires adaptées au marché marocain',
        'Optimiser son adresse, ses horaires et son numéro de téléphone officiel',
        'Recueillir des avis clients authentiques avec mots-clés géolocalisés'
      ]
    },
    {
      id: 'audit-seo-wordpress-maroc',
      title: 'Audit SEO concret d’un site WordPress : Les 7 erreurs fréquentes',
      category: 'Technique & WordPress',
      readTime: '8 min de lecture',
      summary: 'Analyse des blocages techniques qui empêchent les sites marocains d’apparaître en 1ère page de Google : vitesse mobile, balisage Hn et indexation Search Console.',
      points: [
        'Vérifier les balises Title uniques et éviter la duplication de contenu',
        'Compresser les visuels au format WebP pour améliorer le score PageSpeed',
        'Diagnostiquer les pages orphelines et les erreurs de sitemap.xml'
      ]
    },
    {
      id: 'seo-vs-google-ads-pme-maroc',
      title: 'SEO vs Google Ads : Quelle stratégie d’acquisition pour une PME au Maroc ?',
      category: 'Stratégie Digitale',
      readTime: '5 min de lecture',
      summary: 'Comparatif direct entre référencement payant (SEA) et référencement naturel (SEO) : coûts réels par clic au Maroc, pérennité des résultats et retour sur investissement.',
      points: [
        'Comprendre quand lancer du SEA pour tester une offre rapidement',
        'Construire un actif SEO qui continue d’attirer des prospects gratuitement',
        'Complémentarité entre Search Console et campagnes d’acquisition payantes'
      ]
    },
    {
      id: 'recherche-mots-cles-maroc',
      title: 'Comment trouver les mots-clés rentables pour son activité au Maroc',
      category: 'Sémantique & Rédaction',
      readTime: '7 min de lecture',
      summary: 'Méthodologie pas à pas pour identifier les requêtes francophones et arabophones tapées à Casablanca, Rabat et Marrakech via Google Keyword Planner.',
      points: [
        'Distinguer requêtes informationnelles et intentions transactionnelles',
        'Évaluer la concurrence réelle dans les résultats de recherche au Maroc',
        'Structurer un plan éditorial avec un calendrier de publication efficace'
      ]
    }
  ];

  return (
    <div className="space-y-16 pb-20">
      <SEOHead
        title="Guides & Ressources SEO au Maroc | FormaSEO.ma"
        description="Consultez nos guides pratiques et études de cas réelles sur le référencement naturel (SEO), Google Maps et la création de site WordPress au Maroc."
        canonicalPath="/ressources-seo"
        schema={[breadcrumbs]}
      />

      {/* Header */}
      <section className="bg-[#082238] text-white py-16 sm:py-20 relative overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F5B716]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-xs text-[#F5B716] font-bold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Expertise & Cas Pratiques Maroc</span>
          </div>

          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Guides & Tutoriels Pratiques de Référencement au Maroc
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              Des conseils concrets, des méthodologies applicables et des études de cas adaptées aux spécificités du marché marocain et des entreprises locales.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((art) => (
            <div
              key={art.id}
              className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#9A6B00] bg-yellow-50 px-3 py-1 rounded-md">
                    {art.category}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {art.readTime}
                  </span>
                </div>

                <h2 className="text-xl font-black text-slate-900 leading-snug">
                  {art.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {art.summary}
                </p>

                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Points clés du guide :
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {art.points.map((p, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#F5B716] shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onNavigate('formation-marketing-digital-casablanca')}
                  className="text-xs font-black text-[#082238] hover:text-[#F5B716] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Apprendre ces méthodes en atelier</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Conversion Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#082238] text-white rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-xl sm:text-2xl font-black">
              Vous préférez appliquer ces méthodes avec un accompagnement direct ?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Rejoignez la prochaine promotion FormaSEO.ma à Casablanca pour construire et référencer votre site pas à pas.
            </p>
          </div>

          <button
            onClick={() => {
              if (onOpenApplyModal) onOpenApplyModal('candidature');
              else onNavigate('formation-marketing-digital-casablanca');
            }}
            className="px-8 py-4 rounded-full bg-[#F5B716] hover:bg-[#E0A30B] text-slate-950 font-black text-xs sm:text-sm transition-all shadow shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <span>Candidater à la session</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
