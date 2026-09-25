import React from 'react';
import { Users, Award, Clock, Building, Star, Sparkles } from 'lucide-react';
import { Stats } from '../../types';

interface StatsSectionProps {
  stats: Stats;
}

export const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
  const statCards = [
    {
      label: 'Étudiants formés',
      value: `${stats.totalStudents.toLocaleString()}+`,
      sub: 'Partout au Maroc & en Europe',
      icon: Users,
      color: 'text-[#F5B716]',
      bg: 'bg-yellow-500/10',
    },
    {
      label: 'Taux de satisfaction',
      value: `${stats.satisfactionRate}%`,
      sub: 'Sur plus de 450 avis vérifiés',
      icon: Star,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10',
    },
    {
      label: 'Certifications délivrées',
      value: `${stats.certificationsIssued.toLocaleString()}+`,
      sub: 'Partagées sur LinkedIn',
      icon: Award,
      color: 'text-sky-500',
      bg: 'bg-sky-500/10',
    },
    {
      label: 'Entreprises partenaires',
      value: `${stats.partnerCompanies}+`,
      sub: 'Agences & Grands comptes',
      icon: Building,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
    },
  ];

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-xl relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#F5B716]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10">
          {statCards.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex flex-col items-center text-center p-3 sm:p-4">
                <div className={`w-12 h-12 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center mb-3`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                  {item.value}
                </span>
                <span className="text-sm font-bold text-slate-200 mt-1">
                  {item.label}
                </span>
                <span className="text-[11px] text-slate-400 mt-0.5 hidden sm:inline">
                  {item.sub}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
