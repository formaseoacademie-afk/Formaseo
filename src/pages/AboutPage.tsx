import React from 'react';
import { Target, Award, Users, Globe, ShieldCheck, Sparkles, Heart, ArrowRight } from 'lucide-react';
import { Logo } from '../components/common/Logo';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const trainers = [
    {
      name: 'Yassine Bennani',
      role: 'Fondateur & Head of SEO Strategy',
      bio: 'Plus de 10 ans d’expertise en acquisition organique. A piloté des stratégies de croissance pour les leaders de l’e-commerce et des médias au Maroc et en Europe.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Mehdi Alami',
      role: 'Directeur Technique SEO & Data Engineer',
      bio: 'Spécialiste du SEO programmatique, de l’analyse de logs et de l’optimisation Core Web Vitals sur des architectures à plusieurs millions d’URLs.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Salma Tazi',
      role: 'Lead Content Strategist & Formatrice IA',
      bio: 'Experte en cocons sémantiques, intention de recherche et intégration de l’IA générative dans les processus éditoriaux à fort impact.',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    },
  ];

  return (
    <div className="min-h-screen py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Hero */}
      <div className="bg-[#0A263B] text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden border border-slate-800">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2">
            <span className="w-5 h-1 bg-[#F5B716] rounded-full inline-block" />
            <span className="text-xs font-black uppercase tracking-wider text-[#F5B716]">
              Notre Histoire & Mission
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            L'Académie qui forme l'élite du Référencement Naturel au Maroc
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            FormaSeo est née d'un constat simple : le web marocain regorge d'opportunités inexploitées, mais manque cruellement de formations SEO modernes, pointues et adaptées aux réalités du marché local et international.
          </p>
        </div>
      </div>

      {/* 3 Core Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-yellow-100 text-yellow-800 flex items-center justify-center mb-5">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black text-slate-900 mb-2">Excellence Pratique</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Nous refusons le superflu théorique. Chaque notion enseignée répond à un objectif direct : générer du trafic qualifié et du chiffre d'affaires.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#0B3A60] flex items-center justify-center mb-5">
            <Globe className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black text-slate-900 mb-2">Ancrage Local & Mondial</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Des techniques de pointe valables aussi bien pour ranker sur Google Maroc (Français/Arabe/Darija) que pour attaquer des marchés anglophones concurrentiels.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-5">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black text-slate-900 mb-2">Communauté & Entraide</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Un réseau solidaire de plus de 2 800 étudiants, freelances et directeurs marketing qui partagent quotidiennement opportunités et retours d'expériences.
          </p>
        </div>
      </div>

      {/* Trainers Spotlight */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-5 h-1 bg-[#F5B716] rounded-full inline-block" />
            <span className="text-xs font-black uppercase tracking-wider text-slate-500">
              Corps Pédagogique
            </span>
            <span className="w-5 h-1 bg-[#F5B716] rounded-full inline-block" />
          </div>
          <h2 className="text-3xl font-black text-slate-900">
            Formez-vous auprès des meilleurs spécialistes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trainers.map((t, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm hover:shadow-lg transition-all text-center flex flex-col items-center">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-[#F5B716] shadow-md mb-4"
              />
              <h3 className="text-lg font-black text-slate-900">{t.name}</h3>
              <p className="text-xs font-bold text-[#F5B716] mb-3">{t.role}</p>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{t.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="p-8 sm:p-12 bg-slate-100 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-200">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900">
            Envie de propulser vos compétences SEO ?
          </h3>
          <p className="text-slate-600 text-sm mt-1">Découvrez dès maintenant notre catalogue de formations complètes.</p>
        </div>
        <button
          onClick={() => onNavigate('courses')}
          className="px-6 py-3.5 bg-[#F5B716] hover:bg-[#E0A30B] text-slate-950 font-black rounded-full text-sm shrink-0 flex items-center gap-2"
        >
          <span>Découvrir les formations</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
