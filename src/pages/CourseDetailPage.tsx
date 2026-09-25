import React, { useState, useEffect } from 'react';
import {
  Star,
  Clock,
  BookOpen,
  Users,
  CheckCircle2,
  Play,
  Award,
  ChevronDown,
  ShieldCheck,
  Share2,
  Lock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Course, Review } from '../types';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';

interface CourseDetailPageProps {
  courseSlug: string;
  onNavigate: (page: string, param?: string) => void;
  onStartLearning: (courseSlug: string) => void;
}

export const CourseDetailPage: React.FC<CourseDetailPageProps> = ({
  courseSlug,
  onNavigate,
  onStartLearning,
}) => {
  const { user, enrollInCourse } = useAuth();
  const { formatPrice } = useCurrency();
  const [course, setCourse] = useState<Course | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [openModuleId, setOpenModuleId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  // New review form state
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      const c = await api.getCourseBySlug(courseSlug);
      if (c) {
        setCourse(c);
        if (c.modules.length > 0) {
          setOpenModuleId(c.modules[0].id);
        }
        const revs = await api.getReviews(c.id);
        setReviews(revs);
      }
      setLoading(false);
    };
    fetchCourse();
  }, [courseSlug]);

  if (loading) {
    return <div className="py-32 text-center text-slate-500 font-bold">Chargement de la formation...</div>;
  }

  if (!course) {
    return (
      <div className="py-24 text-center max-w-lg mx-auto px-4">
        <h2 className="text-2xl font-black text-slate-900 mb-2">Formation non trouvée</h2>
        <p className="text-slate-500 text-sm mb-6">Cette formation n'existe pas ou a été déplacée.</p>
        <button
          onClick={() => onNavigate('courses')}
          className="px-6 py-3 bg-[#F5B716] text-slate-950 font-bold rounded-full text-sm"
        >
          Retourner au catalogue
        </button>
      </div>
    );
  }

  const isEnrolled = user?.enrolledCourseIds.includes(course.id);

  const handleEnroll = async () => {
    setEnrolling(true);
    const ok = await enrollInCourse(course.id);
    setEnrolling(false);
    if (ok) {
      onStartLearning(course.slug);
    }
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;
    const rev = await api.addReview({
      courseId: course.id,
      userName: user ? user.name : 'Étudiant Anonyme',
      userRole: 'Apprenant FormaSeo',
      rating: newReviewRating,
      comment: newReviewText,
    });
    if (rev) {
      setReviews([rev, ...reviews]);
      setNewReviewText('');
      setReviewSubmitted(true);
      setTimeout(() => setReviewSubmitted(false), 4000);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Dark Header Banner */}
      <div className="bg-[#0A263B] text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 relative border-b border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <button onClick={() => onNavigate('home')} className="hover:text-white">Accueil</button>
              <span>/</span>
              <button onClick={() => onNavigate('courses')} className="hover:text-white">Formations</button>
              <span>/</span>
              <span className="text-[#F5B716] font-bold">{course.categoryName}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {course.title}
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl">
              {course.shortDescription}
            </p>

            {/* Badges & Meta */}
            <div className="flex flex-wrap items-center gap-4 text-xs pt-2">
              <div className="flex items-center gap-1.5 text-[#F5B716] font-bold bg-yellow-500/10 px-3 py-1.5 rounded-full border border-yellow-500/30">
                <Star className="w-4 h-4 fill-current" />
                <span>{course.rating} / 5</span>
                <span className="text-slate-300 font-normal">({course.reviewsCount} avis)</span>
              </div>
              <span className="bg-slate-800 text-slate-300 px-3 py-1.5 rounded-full font-bold">
                {course.level}
              </span>
              <span className="text-slate-400 flex items-center gap-1">
                <Users className="w-3.5 h-3.5" /> {course.studentsCount.toLocaleString()} étudiants inscrits
              </span>
              <span className="text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Mis à jour : Février 2026
              </span>
            </div>

            {/* Instructor snippet */}
            <div className="flex items-center gap-3 pt-3">
              <img
                src={course.instructor.avatar}
                alt={course.instructor.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-[#F5B716]"
              />
              <div>
                <p className="text-xs text-slate-400">Formation créée par</p>
                <p className="text-sm font-bold text-white">{course.instructor.name} <span className="text-xs text-[#F5B716] font-normal">({course.instructor.role})</span></p>
              </div>
            </div>
          </div>

          {/* Right Mobile / Tablet Preview Card */}
          <div className="lg:hidden bg-white text-slate-900 rounded-3xl p-6 shadow-xl border border-slate-200">
            <img src={course.thumbnail} alt={course.title} className="w-full aspect-video rounded-2xl object-cover mb-4" />
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-3xl font-black">{formatPrice(course.priceMAD, course.priceEUR)}</span>
              {course.originalPriceMAD && (
                <span className="text-sm text-slate-400 line-through">
                  {formatPrice(course.originalPriceMAD, Math.round(course.originalPriceMAD / 10.8))}
                </span>
              )}
            </div>
            {isEnrolled ? (
              <button
                onClick={() => onStartLearning(course.slug)}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-full"
              >
                Continuer la formation (Espace de cours)
              </button>
            ) : (
              <button
                onClick={handleEnroll}
                disabled={enrolling}
                className="w-full py-3.5 bg-[#F5B716] hover:bg-[#E0A30B] text-slate-950 font-black rounded-full shadow"
              >
                {enrolling ? 'Inscription...' : "S'inscrire maintenant"}
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left / Main Column (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* 1. Ce que vous allez apprendre */}
            <div className="bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/90 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#F5B716]" />
                Ce que vous allez maîtriser
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {course.learningOutcomes.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-yellow-100 text-yellow-800 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-slate-700 text-sm font-medium leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Syllabus / Programme Détaillé */}
            <div className="bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/90 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">Programme de la formation</h2>
                  <p className="text-xs text-slate-500 mt-1">
                    {course.modules.length} modules • {course.totalLessons} leçons • {course.durationHours} heures au total
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {course.modules.map((mod, mIdx) => {
                  const isOpen = openModuleId === mod.id;
                  return (
                    <div
                      key={mod.id}
                      className="border border-slate-200 rounded-2xl overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => setOpenModuleId(isOpen ? null : mod.id)}
                        className="w-full text-left p-4 sm:p-5 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base"
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-[#0B253A] font-black">#{mIdx + 1}</span>
                          <span>{mod.title}</span>
                        </span>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-xs text-slate-400 font-normal">
                            {mod.lessons.length} leçons
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-[#F5B716]' : ''}`}
                          />
                        </div>
                      </button>

                      {isOpen && (
                        <div className="divide-y divide-slate-100 bg-white px-4 py-2">
                          {mod.lessons.map((les) => (
                            <div
                              key={les.id}
                              className="py-3 flex items-center justify-between gap-3 text-xs sm:text-sm text-slate-700"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <Play className="w-4 h-4 text-slate-400 shrink-0" />
                                <span className="truncate">{les.title}</span>
                              </div>
                              <span className="text-slate-400 text-xs shrink-0 font-medium">{les.duration}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Description Complète & Prérequis */}
            <div className="bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
              <div>
                <h3 className="text-xl font-black text-slate-900 mb-3">À propos de cette formation</h3>
                <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                  {course.fullDescription}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <h4 className="text-base font-bold text-slate-900 mb-3">Prérequis recommandés</h4>
                <ul className="space-y-2">
                  {course.prerequisites.map((req, i) => (
                    <li key={i} className="text-slate-600 text-xs sm:text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F5B716]" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 4. Formateur */}
            <div className="bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row gap-6 items-start">
              <img
                src={course.instructor.avatar}
                alt={course.instructor.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-[#F5B716] shadow-sm shrink-0"
              />
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#F5B716] bg-yellow-50 px-2.5 py-1 rounded-md">
                  Instructeur Principal
                </span>
                <h3 className="text-xl font-black text-slate-900">{course.instructor.name}</h3>
                <p className="text-xs font-bold text-slate-500">{course.instructor.role}</p>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed pt-1">
                  {course.instructor.bio}
                </p>
              </div>
            </div>

            {/* 5. Avis & Évaluations */}
            <div className="bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-slate-900">
                  Avis des étudiants ({reviews.length})
                </h3>
              </div>

              {/* Add a review */}
              <form onSubmit={handleAddReview} className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
                <h4 className="text-xs font-bold text-slate-700">Laisser un avis sur cette formation</h4>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">Votre note :</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        type="button"
                        key={num}
                        onClick={() => setNewReviewRating(num)}
                        className={`text-sm ${num <= newReviewRating ? 'text-[#F5B716]' : 'text-slate-300'}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  required
                  rows={2}
                  placeholder="Partagez votre retour d'expérience..."
                  value={newReviewText}
                  onChange={(e) => setNewReviewText(e.target.value)}
                  className="w-full text-xs p-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#F5B716]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
                >
                  Publier mon avis
                </button>
                {reviewSubmitted && (
                  <p className="text-xs text-emerald-600 font-bold">Merci ! Votre avis a été enregistré.</p>
                )}
              </form>

              <div className="space-y-4 divide-y divide-slate-100">
                {reviews.map((r) => (
                  <div key={r.id} className="pt-4 first:pt-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <img src={r.userAvatar} alt={r.userName} className="w-8 h-8 rounded-full object-cover" />
                        <div>
                          <p className="text-xs font-bold text-slate-900">{r.userName}</p>
                          <p className="text-[10px] text-slate-400">{r.date}</p>
                        </div>
                      </div>
                      <div className="flex text-[#F5B716] text-xs">
                        {[...Array(r.rating)].map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm italic">"{r.comment}"</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Pricing & Enrollment Card (Desktop, 4 cols) */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-28 bg-white rounded-3xl p-7 border border-slate-200/90 shadow-xl space-y-6">
              
              {/* Media preview */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-950 group cursor-pointer">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#F5B716] text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Price */}
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-black text-slate-900">
                    {formatPrice(course.priceMAD, course.priceEUR)}
                  </span>
                  {course.originalPriceMAD && (
                    <span className="text-sm text-slate-400 line-through">
                      {formatPrice(course.originalPriceMAD, Math.round(course.originalPriceMAD / 10.8))}
                    </span>
                  )}
                </div>
                <p className="text-xs text-emerald-600 font-bold mt-1">Paiement unique • Accès à vie garanti</p>
              </div>

              {/* CTA */}
              {isEnrolled ? (
                <button
                  onClick={() => onStartLearning(course.slug)}
                  className="w-full py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm transition-all shadow flex items-center justify-center gap-2"
                >
                  <span>Accéder à l'espace de cours</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleEnroll}
                  disabled={enrolling}
                  className="w-full py-4 rounded-full bg-[#F5B716] hover:bg-[#E0A30B] text-slate-950 font-black text-sm transition-all transform hover:-translate-y-0.5 shadow-lg flex items-center justify-center gap-2"
                >
                  <span>{enrolling ? 'Inscription en cours...' : "S'inscrire maintenant"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              {/* Inclusions checklist */}
              <div className="space-y-3 pt-4 border-t border-slate-100 text-xs text-slate-600">
                <p className="font-bold text-slate-900 uppercase text-[11px] tracking-wider">Cette formation comprend :</p>
                <div className="flex items-center gap-2.5">
                  <Play className="w-4 h-4 text-[#F5B716]" /> {course.durationHours}h de vidéos HD à la demande
                </div>
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4 text-[#F5B716]" /> {course.totalLessons} leçons & exercices pratiques
                </div>
                <div className="flex items-center gap-2.5">
                  <Award className="w-4 h-4 text-[#F5B716]" /> Certificat officiel de réussite
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#F5B716]" /> Garantie 14 jours satisfait ou remboursé
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
