import React from 'react';
import {
  GraduationCap,
  TrendingUp,
  Briefcase,
  FileText,
  Cpu,
  Link2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Category } from '../../types';

interface CategoriesSectionProps {
  categories: Category[];
  onSelectCategory: (categorySlug: string) => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  categories,
  onSelectCategory,
}) => {
  // Mapping of category styling matching the UX mockups
  const getCategoryStyles = (slug: string, theme: string) => {
    switch (slug) {
      case 'seo-debutant':
        return {
          cardBg: 'bg-[#EAF3FA] hover:bg-[#E2EEF8]',
          iconBg: 'bg-[#D3E5F5]',
          iconColor: 'text-[#0B3A60]',
          borderColor: 'border-blue-100',
          linkColor: 'text-[#0B3A60]',
          Icon: GraduationCap,
        };
      case 'seo-avance':
        return {
          cardBg: 'bg-[#FEF6E4] hover:bg-[#FDF0D2]',
          iconBg: 'bg-[#FDE7BA]',
          iconColor: 'text-[#9A6B00]',
          borderColor: 'border-yellow-100',
          linkColor: 'text-[#9A6B00]',
          Icon: TrendingUp,
        };
      case 'seo-business':
        return {
          cardBg: 'bg-[#EEF5F8] hover:bg-[#E3EFF3]',
          iconBg: 'bg-[#D9EAF0]',
          iconColor: 'text-[#0F394D]',
          borderColor: 'border-cyan-100',
          linkColor: 'text-[#0F394D]',
          Icon: Briefcase,
        };
      case 'redaction-seo':
        return {
          cardBg: 'bg-[#ECFDF5] hover:bg-[#D1FAE5]',
          iconBg: 'bg-[#A7F3D0]',
          iconColor: 'text-[#065F46]',
          borderColor: 'border-emerald-100',
          linkColor: 'text-[#065F46]',
          Icon: FileText,
        };
      case 'seo-technique':
        return {
          cardBg: 'bg-[#FAF5FF] hover:bg-[#F3E8FF]',
          iconBg: 'bg-[#E9D5FF]',
          iconColor: 'text-[#6B21A8]',
          borderColor: 'border-purple-100',
          linkColor: 'text-[#6B21A8]',
          Icon: Cpu,
        };
      case 'netlinking':
      default:
        return {
          cardBg: 'bg-[#FFF7ED] hover:bg-[#FFEDD5]',
          iconBg: 'bg-[#FED7AA]',
          iconColor: 'text-[#9A3412]',
          borderColor: 'border-orange-100',
          linkColor: 'text-[#9A3412]',
          Icon: Link2,
        };
    }
  };

  return (
    <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Eyebrow matching UX mockup */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <span className="w-6 h-1 bg-[#F5B716] rounded-full inline-block" />
            <span className="text-slate-900 text-xl sm:text-2xl lg:text-3xl font-black tracking-tight">
              Choisissez votre catégorie
            </span>
          </div>
          <p className="text-slate-500 text-sm max-w-xl pl-8 sm:pl-8">
            Des parcours structurés conçus pour tous les profils, du débutant absolu à l'expert technique.
          </p>
        </div>
      </div>

      {/* Category Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {categories.map((cat) => {
          const style = getCategoryStyles(cat.slug, cat.themeColor);
          const IconComp = style.Icon;

          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className={`${style.cardBg} rounded-3xl p-7 sm:p-8 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg border ${style.borderColor} cursor-pointer flex flex-col justify-between group min-h-[220px]`}
            >
              <div>
                {/* Icon Container */}
                <div
                  className={`w-12 h-12 rounded-2xl ${style.iconBg} ${style.iconColor} flex items-center justify-center mb-6 transition-transform group-hover:scale-110 shadow-sm`}
                >
                  <IconComp className="w-6 h-6 stroke-[2.2]" />
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
                  {cat.name}
                </h3>

                {/* Description */}
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {cat.description}
                </p>
              </div>

              {/* Action Link (exact match: Voir les formations ->) */}
              <div
                className={`inline-flex items-center gap-2 font-bold text-sm ${style.linkColor} group-hover:gap-3 transition-all pt-2`}
              >
                <span>Voir les formations</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
