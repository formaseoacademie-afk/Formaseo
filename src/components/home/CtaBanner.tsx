import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface CtaBannerProps {
  onRegisterClick: () => void;
  onExploreCourses: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onRegisterClick, onExploreCourses }) => {
  return (
    <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl lg:rounded-[3rem] bg-gradient-to-r from-[#0B253A] via-[#0D3654] to-[#0B253A] text-white p-8 sm:p-14 lg:p-16 overflow-hidden shadow-2xl border border-slate-700/80">
        
        {/* Glow orb */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#F5B716]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5B716]/10 text-[#F5B716] border border-[#F5B716]/30 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Rejoignez l'académie leader au Maroc</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Propulsez votre visibilité et dominez votre secteur sur Google
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            Inscrivez-vous dès aujourd'hui pour accéder aux premières leçons gratuites et maîtriser les compétences les plus recherchées du marketing digital.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <button
              onClick={onRegisterClick}
              className="px-8 py-4 rounded-full bg-[#F5B716] hover:bg-[#E0A30B] text-slate-950 font-black text-sm sm:text-base transition-all transform hover:-translate-y-0.5 shadow-lg flex items-center justify-center gap-2.5 group"
            >
              <span>Commencer maintenant</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onExploreCourses}
              className="px-8 py-4 rounded-full border border-slate-600 bg-slate-900/40 hover:bg-slate-800 text-white font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2"
            >
              Consulter le catalogue
            </button>
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-300">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#F5B716]" /> Aucun engagement de durée
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#F5B716]" /> Accès immédiat aux cours
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#F5B716]" /> Facture conforme SARL
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
