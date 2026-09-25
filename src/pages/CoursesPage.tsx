import React, { useState, useEffect } from 'react';
import { Search, Filter, Star, Clock, BookOpen, ArrowRight, Sparkles, SlidersHorizontal } from 'lucide-react';
import { Course, Category } from '../types';
import { api } from '../services/api';
import { useCurrency } from '../context/CurrencyContext';

interface CoursesPageProps {
  initialCategory?: string;
  onSelectCourse: (slug: string) => void;
}

export const CoursesPage: React.FC<CoursesPageProps> = ({ initialCategory, onSelectCourse }) => {
  const { formatPrice } = useCurrency();
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'price-asc' | 'price-desc'>('popular');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      const [cList, catList] = await Promise.all([
        api.getCourses({
          category: selectedCategory === 'all' ? undefined : selectedCategory,
          level: selectedLevel === 'all' ? undefined : selectedLevel,
          search: search || undefined,
        }),
        api.getCategories(),
      ]);
      setCourses(cList);
      setCategories(catList);
      setLoading(false);
    };
    fetchCourses();
  }, [selectedCategory, selectedLevel, search]);

  const sortedCourses = [...courses].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'price-asc') return a.priceMAD - b.priceMAD;
    if (sortBy === 'price-desc') return b.priceMAD - a.priceMAD;
    return b.studentsCount - a.studentsCount;
  });

  return (
    <div className="min-h-screen py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="bg-[#0A263B] text-white rounded-3xl p-8 sm:p-12 mb-10 relative overflow-hidden border border-slate-800">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-5 h-1 bg-[#F5B716] rounded-full inline-block" />
            <span className="text-xs font-black uppercase tracking-wider text-[#F5B716]">
              Catalogue Officiel
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-3">
            Toutes nos Formations SEO & Digital
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Trouvez la formation idéale pour vos objectifs professionnels, du premier audit de site jusqu'à l'ingénierie sémantique avancée.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-sm mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Field */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher par mot-clé, module..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#F5B716] outline-none"
            />
          </div>

          {/* Level Filter & Sort */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="text-xs font-bold px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 outline-none cursor-pointer"
            >
              <option value="all">Tous les niveaux</option>
              <option value="Débutant">Niveau Débutant</option>
              <option value="Intermédiaire">Niveau Intermédiaire</option>
              <option value="Avancé">Niveau Avancé</option>
              <option value="Tous niveaux">Tous niveaux</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs font-bold px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 outline-none cursor-pointer"
            >
              <option value="popular">Trier par : Popularité</option>
              <option value="rating">Trier par : Meilleures notes</option>
              <option value="price-asc">Prix : Moins cher</option>
              <option value="price-desc">Prix : Plus cher</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white shadow'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Toutes les catégories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                selectedCategory === cat.slug
                  ? 'bg-[#F5B716] text-slate-950 shadow'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-500 font-bold">Chargement des formations...</div>
      ) : sortedCourses.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
          <p className="text-base font-bold text-slate-700 mb-2">Aucune formation ne correspond à vos critères</p>
          <p className="text-xs text-slate-500 mb-6">Essayez de modifier votre recherche ou de réinitialiser les filtres.</p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('all');
              setSelectedLevel('all');
            }}
            className="px-6 py-2.5 bg-[#F5B716] text-slate-950 rounded-full font-bold text-xs"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedCourses.map((course) => (
            <div
              key={course.id}
              onClick={() => onSelectCourse(course.slug)}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1"
            >
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

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
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

                  <h3 className="text-lg font-black text-slate-900 group-hover:text-brand-dark transition-colors line-clamp-2 mb-2">
                    {course.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 mb-4 leading-relaxed">
                    {course.shortDescription}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-slate-500 py-3 border-y border-slate-100 mb-4">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{course.durationHours}h de cours</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                      <span>{course.totalLessons} leçons</span>
                    </div>
                  </div>
                </div>

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
      )}
    </div>
  );
};
