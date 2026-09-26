import React from 'react';
import { 
  Globe, 
  Search, 
  BarChart3, 
  Zap, 
  Target, 
  PenTool, 
  Wrench,
  CheckCircle2
} from 'lucide-react';
import { AcademySettings } from '../../types';
import { fallbackSettings } from '../../config/defaultData';

interface ToolsSectionProps {
  tools?: AcademySettings['toolsCovered'];
}

export const ToolsSection: React.FC<ToolsSectionProps> = ({ tools }) => {
  const items = tools || fallbackSettings.toolsCovered || [];

  const toolIcons: Record<string, React.ElementType> = {
    'WordPress': Globe,
    'Google Search Console': Search,
    'Google Analytics (GA4)': BarChart3,
    'PageSpeed Insights': Zap,
    'Google Keyword Planner': Target,
    'Outils IA & Canva': PenTool,
  };

  return (
    <section className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden border-y border-slate-800">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#F5B716]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-5 h-1 bg-[#F5B716] rounded-full inline-block" />
            <span className="text-xs font-black uppercase tracking-wider text-[#F5B716]">
              Outils Professionnels & Pratique
            </span>
            <span className="w-5 h-1 bg-[#F5B716] rounded-full inline-block" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            La suite d'outils que vous maîtriserez
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
            Les standards industriels du marketing digital et du SEO, directement configurés et exploités sur votre propre site web.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((tool, idx) => {
            const Icon = toolIcons[tool.name] || Wrench;
            return (
              <div
                key={idx}
                className="bg-slate-800/80 rounded-3xl p-6 sm:p-7 border border-slate-700/80 hover:border-slate-500 transition-all flex flex-col justify-between group shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-[#082238] border border-slate-700 text-[#F5B716] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#F5B716] bg-yellow-500/10 border border-yellow-500/20 px-2.5 py-0.5 rounded-full">
                      {tool.category}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-white group-hover:text-[#F5B716] transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-700/60 flex items-center gap-1.5 text-[11px] text-slate-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F5B716] shrink-0" />
                  <span>Utilisation directe en session</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
