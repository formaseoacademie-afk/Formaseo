import React, { useState } from 'react';
import { Star, Clock, BookOpen, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Course } from '../../types';
import { useCurrency } from '../../context/CurrencyContext';

interface FeaturedCoursesProps {
  courses: Course[];
  onSelectCourse: (slug: string) => void;
  onExploreAll: () => void;
}

export const FeaturedCourses: React.FC<FeaturedCoursesProps> = ({
  courses,
  onSelectCourse,
  onExploreAll,
}) => {
  const { formatPrice } = useCurrency();
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filterTabs = [
    { id: 'all', label: 'Toutes les formations' },
    { id: 'seo-debutant', label: 'Débutant' },
    { id: 'seo-avance', label: 'Avancé' },
    { id: 'redaction-seo', label: 'Rédaction & IA' },
    { id: 'seo-business', label: 'Business & E-com' },
  ];

  const filtered = selectedFilter === 'all'
    ? courses
    : courses.filter((c) => c.category === selectedFilter);

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-1 bg-[#F5B716] rounded-full inline-block" />
            <span className="text-xs font-black uppercase tracking-wider text-slate-500">
              Catalogue FormaSeo
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Les formations les plus plébiscitées
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-2xl">
            Du contenu 100% actionnable, conçu avec des audits réels et mis à jour continuellement selon les derniers algorithmes de Google.
          </p>
        </div>

        <button
          onClick={onExploreAll}
          className="self-start md:self-auto px-6 py-3 rounded-full border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white font-extrabold text-sm transition-all flex items-center gap-2 group"
        >
          <span>Voir tout le catalogue</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 pb-2">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedFilter(tab.id)}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
              selectedFilter === tab.id
                ? 'bg-slate-900 text-white shadow'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((course) => (
          <div
            key={course.id}
            onClick={() => onSelectCourse(course.slug)}
            className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1"
          >
            {/* Thumbnail Header */}
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {course.badge && (
                <span className="absolute top-3 left-3 bg-[#F5B716] text-slate-950 text-xs font-black px-3 py-1 rounded-full shadow">
                  {course.badge}
                </span>
              )}
              <span className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full">
                {course.level}
              </span>
            </div>

            {/* Course Content */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                {/* Meta details */}
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2.5">
                  <span className="font-bold text-[#0B3A60] bg-blue-50 px-2 py-0.5 rounded-md">
                    {course.categoryName}
                  </span>
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{course.rating}</span>
                    <span className="text-slate-400 font-normal">({course.reviewsCount})</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-black text-slate-900 group-hover:text-brand-dark transition-colors line-clamp-2 mb-2">
                  {course.title}
                </h3>

                {/* Short description */}
                <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 mb-4 leading-relaxed">
                  {course.shortDescription}
                </p>

                {/* Stats indicators */}
                <div className="flex items-center gap-4 text-xs text-slate-500 py-3 border-y border-slate-100 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{course.durationHours}h de formation</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                    <span>{course.totalLessons} leçons</span>
                  </div>
                </div>
              </div>

              {/* Instructor & Price Row */}
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <img
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    className="w-7 h-7 rounded-full object-cover border border-slate-200"
                  />
                  <span className="text-xs font-bold text-slate-700 truncate">
                    {course.instructor.name}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div>
                    <span className="text-lg font-black text-slate-900">
                      {formatPrice(course.priceMAD, course.priceEUR)}
                    </span>
                    {course.originalPriceMAD && (
                      <span className="text-xs text-slate-400 line-through ml-2">
                        {formatPrice(course.originalPriceMAD, Math.round(course.originalPriceMAD / 10.8))}
                      </span>
                    )}
                  </div>

                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-800 group-hover:bg-[#F5B716] group-hover:text-slate-950 flex items-center justify-center transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
