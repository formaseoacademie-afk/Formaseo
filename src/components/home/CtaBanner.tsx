import React from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface CtaBannerProps {
  onRegisterClick: () => void;
  onExploreCourses: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onRegisterClick, onExploreCourses }) => {
  return (
    <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl lg:rounded-[3rem] bg-gradient-to-r from-[#082238] via-[#0D3654] to-[#082238] text-white p-8 sm:p-14 lg:p-16 overflow-hidden shadow-2xl border border-slate-700/80">
        
        {/* Glow orb */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#F5B716]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5B716]/10 text-[#F5B716] border border-[#F5B716]/30 text-xs font-bold tracking-wide">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Formation Pratique Encadrée • Casablanca</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Prêt à acquérir des clients qualifiés sur Google ?
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            Rejoignez la prochaine session en atelier à Casablanca. Vous construirez votre site et apprendrez à le positionner sur vos mots-clés d'activité.
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
