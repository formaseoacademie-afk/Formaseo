import React from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Laptop, 
  ShieldCheck, 
  Zap, 
  Layers, 
  Clock, 
  MapPin
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { getCourseSchema, getBreadcrumbSchema } from '../config/seoSchemas';

interface FormationWordPressPageProps {
  onNavigate: (page: string, param?: string) => void;
  onOpenApplyModal: (intent?: 'programme' | 'candidature') => void;
}

export const FormationWordPressPage: React.FC<FormationWordPressPageProps> = ({
  onNavigate,
  onOpenApplyModal,
}) => {
  const courseSchema = getCourseSchema({
    name: 'Formation WordPress Pratique à Casablanca',
    description: 'Apprenez à créer et administrer un site WordPress professionnel, rapide, sécurisé et optimisé pour le référencement naturel à Casablanca.',
    url: 'https://formaseo.ma/formation-wordpress-casablanca',
  });

  const breadcrumbs = getBreadcrumbSchema([
    { name: 'Accueil', url: '/' },
    { name: 'Formation WordPress Casablanca', url: '/formation-wordpress-casablanca' },
  ]);

  return (
    <div className="space-y-16 pb-20">
      <SEOHead
        title="Formation WordPress à Casablanca | Création de Site Pro & SEO"
        description="Formation pratique WordPress à Casablanca. Créez un site vitrine ou e-commerce professionnel, rapide, sécurisé et prêt pour le référencement Google."
        canonicalPath="/formation-wordpress-casablanca"
        schema={[courseSchema, breadcrumbs]}
      />

      {/* Hero */}
      <section className="bg-[#082238] text-white py-16 sm:py-20 relative overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F5B716]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-xs text-[#F5B716] font-bold">
            <Laptop className="w-3.5 h-3.5" />
            <span>Création Web Sans Code • Casablanca</span>
          </div>

          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Formation WordPress Pratique à Casablanca
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              Créez votre propre site web professionnel de A à Z : nom de domaine, hébergement, ergonomie responsive, sécurité et fondations SEO indispensables.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-semibold text-slate-200">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700">
              <Clock className="w-4 h-4 text-[#F5B716]" />
              <span>Votre site réel en ligne</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700">
              <MapPin className="w-4 h-4 text-[#F5B716]" />
              <span>Casablanca (Mers Sultan) ou À Distance</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700">
              <Laptop className="w-4 h-4 text-[#F5B716]" />
              <span>Nom de domaine & hébergement inclus (1 an)</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <button
              onClick={() => onOpenApplyModal('candidature')}
              className="px-8 py-4 rounded-full bg-[#F5B716] hover:bg-[#E0A30B] text-slate-950 font-black text-sm sm:text-base transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Candidater à la session WordPress</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onOpenApplyModal('programme')}
              className="px-6 py-4 rounded-full border border-slate-600 bg-slate-900/50 hover:bg-slate-800 text-white font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[#F5B716]" />
              <span>Télécharger le programme</span>
            </button>
          </div>
        </div>
      </section>

      {/* WordPress Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Ce que vous apprenez à construire
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Devenez 100% autonome dans l'administration et l'évolution de votre site internet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#082238] font-black text-xs flex items-center justify-center">
              01
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">
              Installation & Nom de Domaine
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Configuration de l'hébergement web, gestion des DNS, activation du certificat SSL HTTPS et déploiement de WordPress.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#082238] font-black text-xs flex items-center justify-center">
              02
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">
              Design Responsive & Pages Clés
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Création des pages stratégiques (Accueil, Services, Contact, Mentions Légales) et optimisation de l'affichage sur mobile et tablette.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#082238] font-black text-xs flex items-center justify-center">
              03
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">
              Vitesse, Sécurité & Extensions SEO
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Configuration d'extensions de sécurité, mise en place du cache pour accélérer le chargement et extension SEO pour baliser vos contenus.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#082238] rounded-3xl p-8 sm:p-12 text-center text-white space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black">
            Prêt à créer votre propre site web ?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Rejoignez la prochaine promotion FormaSEO.ma à Casablanca pour concevoir votre site avec l'aide directe de notre formateur.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => onOpenApplyModal('candidature')}
              className="px-8 py-4 rounded-full bg-[#F5B716] hover:bg-[#E0A30B] text-slate-950 font-black text-sm transition-all shadow flex items-center gap-2 cursor-pointer"
            >
              <span>Rejoindre la session WordPress</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
