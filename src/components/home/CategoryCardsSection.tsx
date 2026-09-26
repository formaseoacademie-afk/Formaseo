import React from 'react';
import { GraduationCap, BarChart3, Briefcase, ArrowRight } from 'lucide-react';

interface CategoryCardsSectionProps {
  onSelectCategory?: (category: string) => void;
  onOpenApplyModal?: (intent?: 'programme' | 'candidature') => void;
}

export const CategoryCardsSection: React.FC<CategoryCardsSectionProps> = ({
  onSelectCategory,
  onOpenApplyModal,
}) => {
  const categories = [
    {
      id: 'debutant',
      title: 'SEO Débutant',
      desc: 'Apprenez les bases du SEO et lancez votre première stratégie.',
      icon: GraduationCap,
      iconBg: 'bg-[#2563EB] text-white',
      cardBg: 'bg-[#EEF6FC]',
      cardBorder: 'border-sky-100/80',
      categoryParam: 'formation-seo-casablanca',
    },
    {
      id: 'avance',
      title: 'SEO Avancé',
      desc: 'Maîtrisez les techniques avancées et passez au niveau supérieur.',
      icon: BarChart3,
      iconBg: 'bg-[#F5B82E] text-slate-950',
      cardBg: 'bg-[#FFF9EE]',
      cardBorder: 'border-amber-100/80',
      categoryParam: 'formation-marketing-digital-casablanca',
    },
    {
      id: 'business',
      title: 'SEO Business',
      desc: 'Utilisez le SEO pour développer votre entreprise ou votre carrière.',
      icon: Briefcase,
      iconBg: 'bg-[#082238] text-white',
      cardBg: 'bg-[#EEF6FC]',
      cardBorder: 'border-sky-100/80',
      categoryParam: 'programme-5-semaines',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-10 sm:pb-12">
      {/* Section Title */}
      <div className="flex items-center gap-2.5 sm:gap-3 mb-6 sm:mb-8">
        <span className="w-5 sm:w-6 h-1 bg-[#F5B82E] rounded-full inline-block" />
        <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Choisissez votre catégorie
        </h2>
      </div>

      {/* 3 Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-7">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.id}
              className={`${cat.cardBg} ${cat.cardBorder} border rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group`}
            >
              <div>
                {/* Icon Badge */}
                <div
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl ${cat.iconBg} flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform`}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-4 sm:mt-5 mb-2 group-hover:text-slate-950 transition-colors">
                  {cat.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {cat.desc}
                </p>
              </div>

              {/* Link CTA */}
              <button
                onClick={() => {
                  if (onSelectCategory) {
                    onSelectCategory(cat.categoryParam);
                  } else if (onOpenApplyModal) {
                    onOpenApplyModal('candidature');
                  }
                }}
                className="inline-flex items-center gap-1.5 text-[#1D4ED8] hover:text-[#1E40AF] font-extrabold text-sm transition-all group-hover:gap-2.5 text-left cursor-pointer"
              >
                <span>Voir les formations</span>
                <ArrowRight className="w-4 h-4 transition-transform" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
