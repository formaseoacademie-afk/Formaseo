import React from 'react';
import { AcademySettings } from '../../types';
import { fallbackSettings } from '../../config/defaultData';

interface ToolsSectionProps {
  tools?: AcademySettings['toolsCovered'];
}

export const ToolsSection: React.FC<ToolsSectionProps> = ({ tools }) => {
  const items = tools || fallbackSettings.toolsCovered || [];

  return (
    <section className="py-16 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-wider text-slate-500">
            Écosystème Technologique
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Les outils que vous apprendrez à maîtriser
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2">
            Des outils professionnels standards du marché digital, sans surcoût de licence inutile.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((tool, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="text-[10px] font-black uppercase tracking-wider text-[#9A6B00] bg-yellow-50 px-2 py-0.5 rounded-md">
                {tool.category}
              </span>
              <h3 className="text-base font-black text-slate-900 mt-2">
                {tool.name}
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
                {tool.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
