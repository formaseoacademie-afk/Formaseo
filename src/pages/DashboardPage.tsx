import React, { useState, useEffect } from 'react';
import { BookOpen, CheckCircle2, Play, Award, Clock, ArrowRight, Sparkles, User, LogOut } from 'lucide-react';
import { Course } from '../types';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

interface DashboardPageProps {
  onStartLearning: (courseSlug: string) => void;
  onExploreCourses: () => void;
  onNavigate: (page: string, param?: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onStartLearning,
  onExploreCourses,
  onNavigate,
}) => {
  const { user, logout, openAuthModal } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      const list = await api.getCourses();
      setCourses(list);
      setLoading(false);
    };
    fetchCourses();
  }, []);

  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-yellow-100 text-[#F5B716] flex items-center justify-center mb-4">
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">Espace Étudiant</h2>
        <p className="text-sm text-slate-500 max-w-sm mb-6">
          Veuillez vous connecter pour accéder à vos cours inscrits, votre progression et vos certifications.
        </p>
        <button
          onClick={() => openAuthModal('login')}
          className="px-8 py-3.5 bg-[#F5B716] hover:bg-[#E0A30B] text-slate-950 font-black rounded-full text-sm shadow"
        >
          Se connecter
        </button>
      </div>
    );
  }

  const enrolledCourses = courses.filter((c) => user.enrolledCourseIds.includes(c.id));
  const otherCourses = courses.filter((c) => !user.enrolledCourseIds.includes(c.id));

  // Compute stats
  const totalCompletedLessons = user.completedLessonIds.length;
  const certificatesEarned = enrolledCourses.filter((c) => {
    const allLessonIds = c.modules.flatMap((m) => m.lessons.map((l) => l.id));
    return allLessonIds.length > 0 && allLessonIds.every((id) => user.completedLessonIds.includes(id));
  }).length;

  return (
    <div className="min-h-screen py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Welcome Banner */}
      <div className="bg-[#0A263B] text-white rounded-3xl p-8 sm:p-10 border border-slate-800 relative overflow-hidden shadow-xl">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-[#F5B716]"
            />
            <div>
              <span className="text-xs font-bold text-[#F5B716] uppercase tracking-wider">
                Tableau de Bord Apprenant
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                Bienvenue, {user.name} 👋
              </h1>
              <p className="text-xs text-slate-300 mt-0.5">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={logout}
              className="px-4 py-2 rounded-full border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>

        {/* User Stats Row */}
        <div className="grid grid-cols-3 gap-4 pt-8 mt-6 border-t border-slate-800/80 text-center sm:text-left">
          <div>
            <p className="text-2xl font-black text-white">{enrolledCourses.length}</p>
            <p className="text-xs text-slate-400">Formations inscrites</p>
          </div>
          <div>
            <p className="text-2xl font-black text-[#F5B716]">{totalCompletedLessons}</p>
            <p className="text-xs text-slate-400">Leçons validées</p>
          </div>
          <div>
            <p className="text-2xl font-black text-emerald-400">{certificatesEarned}</p>
            <p className="text-xs text-slate-400">Certificats obtenus</p>
          </div>
        </div>
      </div>

      {/* My Enrolled Courses Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[#0B253A]" />
            Mes Formations en cours ({enrolledCourses.length})
          </h2>
        </div>

        {enrolledCourses.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
            <p className="text-base font-bold text-slate-700 mb-2">Vous n'êtes encore inscrit à aucune formation</p>
            <p className="text-xs text-slate-500 mb-6">Découvrez notre catalogue et lancez votre apprentissage dès maintenant.</p>
            <button
              onClick={onExploreCourses}
              className="px-6 py-3 bg-[#F5B716] text-slate-950 font-bold rounded-full text-xs"
            >
              Parcourir le catalogue
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => {
              const allLessons = course.modules.flatMap((m) => m.lessons.map((l) => l.id));
              const doneCount = allLessons.filter((id) => user.completedLessonIds.includes(id)).length;
              const percent = Math.round((doneCount / (allLessons.length || 1)) * 100);

              return (
                <div
                  key={course.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-video">
                      <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                      <span className="absolute top-3 left-3 bg-[#0B253A] text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                        {course.categoryName}
                      </span>
                    </div>

                    <div className="p-6">
                      <h3 className="font-bold text-slate-900 line-clamp-1 mb-2 text-base">
                        {course.title}
                      </h3>
                      
                      {/* Progress bar */}
                      <div className="space-y-1.5 pt-2">
                        <div className="flex justify-between text-xs font-bold text-slate-500">
                          <span>Progression</span>
                          <span className="text-[#0B253A]">{percent}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-[#F5B716] h-full transition-all duration-500"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <p className="text-[11px] text-slate-400 pt-1">
                          {doneCount} / {allLessons.length} leçons terminées
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button
                      onClick={() => onStartLearning(course.slug)}
                      className="w-full py-3 bg-[#0B253A] hover:bg-[#123E61] text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{percent === 0 ? 'Commencer' : percent === 100 ? 'Revoir le cours' : 'Continuer'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Recommended Courses to expand skills */}
      {otherCourses.length > 0 && (
        <div className="space-y-6 pt-6 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#F5B716]" />
                Formations recommandées pour votre profil
              </h2>
              <p className="text-xs text-slate-500">Complétez votre expertise avec nos modules avancés.</p>
            </div>
            <button
              onClick={onExploreCourses}
              className="text-xs font-bold text-[#0B253A] hover:underline"
            >
              Voir tout
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherCourses.slice(0, 3).map((c) => (
              <div
                key={c.id}
                onClick={() => onNavigate('course-detail', c.slug)}
                className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm hover:shadow-md cursor-pointer transition-all flex items-center gap-4 group"
              >
                <img src={c.thumbnail} alt={c.title} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-bold text-[#F5B716] uppercase">{c.categoryName}</span>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-brand-dark truncate">{c.title}</h4>
                  <p className="text-[11px] text-slate-500">{c.durationHours}h • {c.level}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#F5B716] shrink-0" />
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
