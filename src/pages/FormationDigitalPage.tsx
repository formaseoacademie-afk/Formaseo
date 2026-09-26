import React from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Clock, 
  MapPin, 
  Calendar, 
  Laptop, 
  Award, 
  Layers, 
  ShieldCheck, 
  HelpCircle,
  ChevronRight
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { getCourseSchema, getBreadcrumbSchema } from '../config/seoSchemas';
import { useAcademySettings, useCurriculum } from '../services/api';

interface FormationDigitalPageProps {
  onNavigate: (page: string, param?: string) => void;
  onOpenApplyModal: (intent?: 'programme' | 'candidature') => void;
}

export const FormationDigitalPage: React.FC<FormationDigitalPageProps> = ({
  onNavigate,
  onOpenApplyModal,
}) => {
  const { data: settings } = useAcademySettings();
  const { data: weeks } = useCurriculum();

  const courseSchema = getCourseSchema({
    name: 'Formation Marketing Digital & SEO Pratique à Casablanca',
    description: 'Formation pratique intensive de 5 semaines à Casablanca pour créer un site WordPress professionnel, optimiser son référencement Google et mesurer ses résultats.',
    url: 'https://formaseo.ma/formation-marketing-digital-casablanca',
  });

  const breadcrumbs = getBreadcrumbSchema([
    { name: 'Accueil', url: '/' },
    { name: 'Formation Marketing Digital Casablanca', url: '/formation-marketing-digital-casablanca' },
  ]);

  return (
    <div className="space-y-16 pb-20">
      <SEOHead
        title="Formation Marketing Digital & SEO à Casablanca | FormaSEO.ma"
        description="Formation pratique en marketing digital, création de site WordPress et référencement naturel (SEO) à Casablanca. Apprenez en créant votre propre projet réel."
        canonicalPath="/formation-marketing-digital-casablanca"
        schema={[courseSchema, breadcrumbs]}
      />

      {/* Hero Section */}
      <section className="bg-[#082238] text-white py-16 sm:py-20 relative overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F5B716]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-xs text-[#F5B716] font-bold mb-6">
            <Award className="w-3.5 h-3.5" />
            <span>Cursus Pratique 5 Semaines • Casablanca & En Direct</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-6">
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                Formation Marketing Digital, SEO & WordPress à Casablanca
              </h1>
              <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-3xl">
                Un accompagnement concret sur 5 semaines pour apprendre à concevoir votre site web, positionner votre activité en tête des recherches Google et mesurer votre acquisition de clients.
              </p>

              {/* Meta information tags */}
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-semibold text-slate-200">
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700">
                  <Clock className="w-4 h-4 text-[#F5B716]" />
                  <span>5 Semaines (30 à 40h de pratique dirigée)</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700">
                  <MapPin className="w-4 h-4 text-[#F5B716]" />
                  <span>Casablanca (Mers Sultan) & Visioconférence</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700">
                  <Calendar className="w-4 h-4 text-[#F5B716]" />
                  <span>Prochaine Session : Inscriptions Ouvertes</span>
                </div>
              </div>

              {/* Action Buttons with crawlable links */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                <button
                  onClick={() => onOpenApplyModal('candidature')}
                  className="px-8 py-4 rounded-full bg-[#F5B716] hover:bg-[#E0A30B] text-slate-950 font-black text-sm sm:text-base transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Candidater à la formation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onOpenApplyModal('programme')}
                  className="px-6 py-4 rounded-full border border-slate-600 bg-slate-900/50 hover:bg-slate-800 text-white font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-[#F5B716]" />
                  <span>Demander le syllabus PDF</span>
                </button>
              </div>
            </div>

            {/* Inclusions summary card */}
            <div className="lg:col-span-4 bg-slate-900/90 border border-slate-700 rounded-3xl p-6 sm:p-7 space-y-4 shadow-xl">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#F5B716]">
                Ce qui est inclus
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#F5B716] shrink-0 mt-0.5" />
                  <span>1 Site WordPress créé et mis en ligne sur votre nom de domaine</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#F5B716] shrink-0 mt-0.5" />
                  <span>Nom de domaine .ma / .com + hébergement professionnel (1 an)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#F5B716] shrink-0 mt-0.5" />
                  <span>Stratégie de mots-clés et optimisation technique complète</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#F5B716] shrink-0 mt-0.5" />
                  <span>Paramétrage de Google Search Console & Google Analytics 4</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#F5B716] shrink-0 mt-0.5" />
                  <span>Attestation d'assiduité et d'achèvement de formation</span>
                </li>
              </ul>

              <div className="pt-4 border-t border-slate-800 text-xs text-slate-400">
                Formateur : <strong>Wassim Kassy</strong> (Consultant SEO & Praticien Web).
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5 Core Pillars Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Ce que vous saurez faire concrètement
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Pas de théorie déconnectée du marché : vous appliquez chaque méthode sur un projet digital réel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <span className="w-8 h-8 rounded-xl bg-amber-50 text-[#082238] font-black text-xs flex items-center justify-center">
              01
            </span>
            <h3 className="font-extrabold text-slate-900 text-base">
              Concevoir votre site WordPress
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Choisir un hébergeur fiable, installer WordPress, structurer l'architecture des pages et concevoir une ergonomie rapide et adaptée aux mobiles.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <span className="w-8 h-8 rounded-xl bg-amber-50 text-[#082238] font-black text-xs flex items-center justify-center">
              02
            </span>
            <h3 className="font-extrabold text-slate-900 text-base">
              Rechercher les bons mots-clés
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Identifier les requêtes tapées par vos clients cibles au Maroc via Google Keyword Planner, analyser la concurrence et construire votre cocon sémantique.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <span className="w-8 h-8 rounded-xl bg-amber-50 text-[#082238] font-black text-xs flex items-center justify-center">
              03
            </span>
            <h3 className="font-extrabold text-slate-900 text-base">
              Rédiger du contenu optimisé
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Rédiger des titres, méta-descriptions et articles qui répondent parfaitement aux intentions de recherche des utilisateurs tout en séduisant les robots de Google.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <span className="w-8 h-8 rounded-xl bg-amber-50 text-[#082238] font-black text-xs flex items-center justify-center">
              04
            </span>
            <h3 className="font-extrabold text-slate-900 text-base">
              Optimiser le SEO Local sur Google Maps
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Configurer et positionner votre fiche Google Business Profile pour capter les recherches géolocalisées à Casablanca, Rabat et partout au Maroc.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <span className="w-8 h-8 rounded-xl bg-amber-50 text-[#082238] font-black text-xs flex items-center justify-center">
              05
            </span>
            <h3 className="font-extrabold text-slate-900 text-base">
              Mesurer le trafic sur GA4 & Search Console
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Suivre le nombre d'impressions, les clics réels, les positions des requêtes et le taux de conversion de vos visiteurs pour piloter votre croissance.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#082238] text-white flex flex-col justify-between shadow-sm">
            <div>
              <h3 className="font-extrabold text-[#F5B716] text-base mb-2">
                Un projet final vérifiable
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Vous quittez la formation avec un actif numérique opérationnel à présenter à vos clients ou recruteurs.
              </p>
            </div>
            <button
              onClick={() => onOpenApplyModal('candidature')}
              className="mt-4 w-full py-2.5 bg-[#F5B716] text-slate-950 font-black text-xs rounded-xl hover:bg-[#E0A30B] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Rejoindre la promotion</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Full 5-Week Syllabus Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Programme Détaillé (5 Semaines)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Chaque semaine alterne entre explication méthodologique et atelier pratique dirigé.
            </p>
          </div>
          <a
            href="/programme-5-semaines"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('programme');
            }}
            className="px-5 py-2.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold inline-flex items-center gap-2 self-start sm:self-auto"
          >
            <span>Voir le syllabus complet</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="space-y-4">
          {(weeks || []).map((w) => (
            <div
              key={w.weekNumber}
              className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#082238] text-white font-black text-xs flex items-center justify-center">
                    S{w.weekNumber}
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-base">
                    {w.title}
                  </h3>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                  {w.hours}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600">{w.objective}</p>
              <div className="p-3 bg-amber-50/70 border border-amber-200/60 rounded-xl text-xs text-amber-950">
                <strong>Livrable pratique :</strong> {w.practicalWorkshop}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Practical Project Proof & Deliverables */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-[#F5B716]">
              Preuve & Résultats
            </span>
            <h2 className="text-2xl sm:text-3xl font-black">
              Comment se déroule la validation de votre formation ?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Pour obtenir votre attestation FormaSEO.ma, vous devez présenter votre site en ligne lors de la session de clôture : balisage vérifié, mots-clés indexés sur Google et outils de mesure connectés.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-1">
              <strong className="text-[#F5B716] block">1. Audit individuel</strong>
              <p className="text-slate-300">Revue détaillée de vos balises et de votre vitesse de chargement par le formateur.</p>
            </div>
            <div className="p-4 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-1">
              <strong className="text-[#F5B716] block">2. Indexation Google</strong>
              <p className="text-slate-300">Validation de la soumission de votre sitemap et présence des pages dans l'index.</p>
            </div>
            <div className="p-4 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-1">
              <strong className="text-[#F5B716] block">3. Plan de suivi</strong>
              <p className="text-slate-300">Feuille de route pour continuer à publier et optimiser votre site après la formation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#082238] rounded-3xl p-8 sm:p-12 text-center text-white space-y-6">
          <div className="max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black">
              Prêt à lancer votre projet digital à Casablanca ?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Déposez votre candidature pour échanger sur vos objectifs et réserver votre place pour la prochaine promotion.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenApplyModal('candidature')}
              className="px-8 py-4 rounded-full bg-[#F5B716] hover:bg-[#E0A30B] text-slate-950 font-black text-sm transition-all shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <span>Candidater maintenant</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('contact');
              }}
              className="px-6 py-4 rounded-full border border-slate-700 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
            >
              Poser une question à l'équipe
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
