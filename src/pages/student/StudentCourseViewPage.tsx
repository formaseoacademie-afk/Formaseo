import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { Course, LessonProgress } from '../../types';
import { 
  BookOpen, 
  CheckCircle2, 
  Circle, 
  Play, 
  Clock, 
  ArrowLeft, 
  Award, 
  Lock, 
  FileText,
  Video,
  Sparkles,
  Layers
} from 'lucide-react';

export const StudentCourseViewPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [progress, setProgress] = useState<LessonProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseData = async () => {
      if (!slug) return;
      try {
        const courseData = await api.courses.getBySlug(slug);
        setCourse(courseData);

        // Fetch user progress for this course
        if (courseData && courseData.id) {
          const userProgress = await api.student.getProgress(courseData.id);
          setProgress(userProgress);
        }
      } catch (err: any) {
        setError(err.message || 'Impossible de charger la formation');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#082238] border-t-[#F5B82E] rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center max-w-md">
          <h2 className="text-xl font-bold text-slate-800 mb-2">Formation introuvable</h2>
          <p className="text-sm text-slate-600 mb-6">{error || 'Cette formation n\'existe pas ou vous n\'y avez pas accès.'}</p>
          <Link
            to="/student/dashboard"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#082238] text-white text-sm font-bold rounded-xl"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à mon tableau de bord
          </Link>
        </div>
      </div>
    );
  }

  // Calculate progress stats
  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessonIds = new Set(progress.filter(p => p.completed).map(p => p.lessonId));
  const completedCount = completedLessonIds.size;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // Find first uncompleted lesson or first lesson
  let nextLessonId = course.modules[0]?.lessons[0]?.id;
  for (const mod of course.modules) {
    for (const les of mod.lessons) {
      if (!completedLessonIds.has(les.id)) {
        nextLessonId = les.id;
        break;
      }
    }
    if (nextLessonId) break;
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header Banner */}
      <div className="bg-[#082238] text-white py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <Link
            to="/student/dashboard"
            className="inline-flex items-center gap-2 text-slate-300 hover:text-[#F5B82E] text-sm font-semibold mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Tableau de bord</span>
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 bg-[#F5B82E]/20 text-[#F5B82E] text-xs font-bold rounded-md mb-3 border border-[#F5B82E]/30">
                {course.category || course.categoryName}
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {course.title}
              </h1>
              <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                {course.shortDescription}
              </p>

              <div className="flex flex-wrap items-center gap-6 mt-6 text-xs text-slate-300">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#F5B82E]" />
                  <span>Durée : {course.duration || '30h'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-[#F5B82E]" />
                  <span>{course.modules.length} Modules ({totalLessons} leçons)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#F5B82E]" />
                  <span>Niveau : {course.level || 'Tous niveaux'}</span>
                </div>
              </div>
            </div>

            {/* Resume / Start Card */}
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 lg:w-80 flex-shrink-0">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Votre Progression</div>
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-3xl font-black text-white">{progressPercent}%</span>
                <span className="text-xs text-slate-300 font-medium">
                  {completedCount} / {totalLessons} terminées
                </span>
              </div>
              <div className="w-full bg-black/30 rounded-full h-2.5 mb-6 overflow-hidden">
                <div
                  className="bg-[#F5B82E] h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {nextLessonId && (
                <Link
                  to={`/student/courses/${course.slug}/lesson/${nextLessonId}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#F5B82E] hover:bg-[#E5A91E] text-[#082238] font-bold text-sm rounded-xl transition-all shadow-lg"
                >
                  <Play className="w-4 h-4 fill-[#082238]" />
                  <span>{progressPercent > 0 ? 'Continuer le cours' : 'Commencer le cours'}</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Course Curriculum Modules & Lessons */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-black text-[#082238] tracking-tight">
            Programme pédagogique & Leçons
          </h2>
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            Accès illimité
          </span>
        </div>

        <div className="space-y-6">
          {course.modules.map((module, mIdx) => (
            <div
              key={module.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm"
            >
              <div className="p-6 bg-slate-50/70 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-extrabold text-[#F5B82E] uppercase tracking-wider">
                    Module {mIdx + 1}
                  </div>
                  <h3 className="text-lg font-black text-[#082238] mt-1">
                    {module.title}
                  </h3>
                  {module.description && (
                    <p className="text-xs text-slate-500 mt-1">{module.description}</p>
                  )}
                </div>
                <div className="text-xs font-semibold text-slate-500 bg-white px-3 py-1 rounded-lg border border-slate-200 self-start sm:self-center">
                  {module.lessons.length} leçons
                </div>
              </div>

              {/* Lessons List */}
              <div className="divide-y divide-slate-100">
                {module.lessons.map((lesson, lIdx) => {
                  const isCompleted = completedLessonIds.has(lesson.id);

                  return (
                    <Link
                      key={lesson.id}
                      to={`/student/courses/${course.slug}/lesson/${lesson.id}`}
                      className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0">
                          {isCompleted ? (
                            <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                              <CheckCircle2 className="w-5 h-5" />
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-[#082238] group-hover:text-[#F5B82E] text-slate-400 flex items-center justify-center transition-colors">
                              <Play className="w-3.5 h-3.5 ml-0.5" />
                            </div>
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-400">
                              {mIdx + 1}.{lIdx + 1}
                            </span>
                            <h4 className="text-sm font-bold text-slate-800 group-hover:text-[#082238] transition-colors">
                              {lesson.title}
                            </h4>
                          </div>
                          <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-400" />
                              {lesson.duration || '20 min'}
                            </span>
                            {lesson.resources && lesson.resources.length > 0 && (
                              <span className="flex items-center gap-1 text-[#082238]">
                                <FileText className="w-3 h-3" />
                                {lesson.resources.length} ressource(s)
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {isCompleted && (
                          <span className="hidden sm:inline-block text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-md">
                            Terminé
                          </span>
                        )}
                        <span className="text-xs font-bold text-[#082238] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                          Voir la leçon →
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
