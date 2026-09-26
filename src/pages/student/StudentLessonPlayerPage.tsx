import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { Course, Lesson, Module, LessonProgress } from '../../types';
import { 
  CheckCircle2, 
  Circle, 
  ArrowLeft, 
  ArrowRight, 
  Play, 
  FileText, 
  Download, 
  Layers, 
  Check, 
  Clock, 
  Menu, 
  X,
  ExternalLink,
  Award
} from 'lucide-react';

export const StudentLessonPlayerPage: React.FC = () => {
  const { slug, lessonId } = useParams<{ slug: string; lessonId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [currentModule, setCurrentModule] = useState<Module | null>(null);
  const [progress, setProgress] = useState<LessonProgress[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [marking, setMarking] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadLessonData = async () => {
      if (!slug || !lessonId) return;
      try {
        const courseData = await api.courses.getBySlug(slug);
        setCourse(courseData);

        // Find the lesson & module
        let foundLesson: Lesson | null = null;
        let foundModule: Module | null = null;

        if (courseData && courseData.modules) {
          for (const mod of courseData.modules) {
            const l = mod.lessons.find((item: Lesson) => item.id === lessonId);
            if (l) {
              foundLesson = l;
              foundModule = mod;
              break;
            }
          }
        }

        setCurrentLesson(foundLesson);
        setCurrentModule(foundModule);

        // Load progress
        if (courseData && courseData.id) {
          const userProgress = await api.student.getProgress(courseData.id);
          setProgress(userProgress);
          const currentProg = userProgress.find((p: LessonProgress) => p.lessonId === lessonId);
          setIsCompleted(!!currentProg?.completed);
        }
      } catch (err) {
        console.error('Error loading lesson player:', err);
      } finally {
        setLoading(false);
      }
    };

    loadLessonData();
  }, [slug, lessonId]);

  const handleToggleComplete = async () => {
    if (!currentLesson || !course) return;
    setMarking(true);

    try {
      const nextState = !isCompleted;
      await api.student.updateProgress({
        lessonId: currentLesson.id,
        courseId: course.id,
        completed: nextState
      });

      setIsCompleted(nextState);
      setProgress((prev) => {
        const filtered = prev.filter((p) => p.lessonId !== currentLesson.id);
        const updatedProg: LessonProgress = {
          lessonId: currentLesson.id,
          courseId: course.id,
          completed: nextState,
          updatedAt: new Date().toISOString()
        };
        return [...filtered, updatedProg];
      });
    } catch (err) {
      console.error('Error updating progress:', err);
    } finally {
      setMarking(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <div className="w-10 h-10 border-4 border-white/20 border-t-brand-accent rounded-full animate-spin" />
      </div>
    );
  }

  if (!course || !currentLesson) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 text-white">
        <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 text-center max-w-md">
          <h2 className="text-xl font-bold mb-2">Leçon introuvable</h2>
          <p className="text-sm text-slate-400 mb-6">Cette leçon n'a pas pu être chargée.</p>
          <Link
            to={slug ? `/student/courses/${slug}` : '/student/dashboard'}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-accent text-brand-primary font-bold rounded-xl text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à la formation
          </Link>
        </div>
      </div>
    );
  }

  // Calculate flatten lessons list for previous/next
  const allLessons: { lesson: Lesson; moduleTitle: string }[] = [];
  course.modules.forEach((mod) => {
    mod.lessons.forEach((les) => {
      allLessons.push({ lesson: les, moduleTitle: mod.title });
    });
  });

  const currentIndex = allLessons.findIndex((item) => item.lesson.id === currentLesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1].lesson : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1].lesson : null;
  const completedLessonIds = new Set(progress.filter((p) => p.completed).map((p) => p.lessonId));

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Top Bar Navigation */}
      <header className="h-16 bg-slate-950 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <Link
            to={`/student/courses/${course.slug}`}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Quitter la leçon</span>
          </Link>
          <div className="h-4 w-px bg-slate-800 hidden sm:block" />
          <h1 className="text-sm font-bold text-slate-200 truncate max-w-xs sm:max-w-md lg:max-w-xl">
            {course.title}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleToggleComplete}
            disabled={marking}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
              isCompleted
                ? 'bg-green-600/20 text-green-400 border border-green-500/30 hover:bg-green-600/30'
                : 'bg-brand-accent text-brand-primary hover:bg-brand-accent-hover'
            }`}
          >
            {isCompleted ? (
              <>
                <Check className="w-4 h-4 text-green-400" />
                <span>Terminée</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Marquer comme terminée</span>
              </>
            )}
          </button>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Main Layout Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left / Center: Video and Lesson Content */}
        <main className="flex-1 overflow-y-auto bg-slate-900 p-4 sm:p-8 lg:p-10">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Video Player Container */}
            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
              {currentLesson.videoUrl && currentLesson.videoUrl.includes('embed') ? (
                <iframe
                  src={currentLesson.videoUrl}
                  title={currentLesson.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-slate-950 to-slate-900">
                  <div className="w-16 h-16 rounded-full bg-brand-accent/10 text-brand-accent flex items-center justify-center mb-4 border border-brand-accent/20">
                    <Play className="w-8 h-8 ml-1 fill-brand-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{currentLesson.title}</h3>
                  <p className="text-xs text-slate-400 max-w-md">
                    Session vidéo pédagogique et atelier pratique en présentiel / direct avec nos consultants SEO séniors.
                  </p>
                </div>
              )}
            </div>

            {/* Lesson Title & Module Meta */}
            <div className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-bold text-brand-accent uppercase tracking-wider mb-2">
                <span>{currentModule?.title}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  {currentLesson.duration}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {currentLesson.title}
              </h2>
              {currentLesson.description && (
                <p className="mt-4 text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                  {currentLesson.description}
                </p>
              )}
            </div>

            {/* Downloadable Resources */}
            {currentLesson.resources && currentLesson.resources.length > 0 && (
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
                <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-brand-accent" />
                  <span>Ressources téléchargeables & Fichiers d'exercice</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentLesson.resources.map((res) => (
                    <a
                      key={res.id}
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-brand-accent/10 text-brand-accent flex items-center justify-center">
                          <Download className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-200 group-hover:text-brand-accent transition-colors">
                            {res.title}
                          </div>
                          <div className="text-[10px] text-slate-400 uppercase font-semibold">
                            {res.type}
                          </div>
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Prev / Next Lesson Navigation Bar */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-800">
              {prevLesson ? (
                <Link
                  to={`/student/courses/${course.slug}/lesson/${prevLesson.id}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Leçon précédente</span>
                </Link>
              ) : (
                <div />
              )}

              {nextLesson ? (
                <Link
                  to={`/student/courses/${course.slug}/lesson/${nextLesson.id}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-accent hover:bg-brand-accent-hover text-brand-primary font-bold text-xs transition-colors shadow-md shadow-brand-accent/20"
                >
                  <span>Leçon suivante</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <Link
                  to={`/student/courses/${course.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold text-xs transition-colors shadow-md"
                >
                  <Award className="w-4 h-4" />
                  <span>Terminer la formation</span>
                </Link>
              )}
            </div>
          </div>
        </main>

        {/* Right Sidebar: Syllabus & Lesson Navigation */}
        <aside
          className={`fixed inset-y-16 right-0 w-80 bg-slate-950 border-l border-slate-800 overflow-y-auto z-20 transition-transform duration-300 lg:static lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-4 border-b border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Contenu de la formation
            </h3>
            <p className="text-sm font-extrabold text-white mt-1">
              {completedLessonIds.size} / {allLessons.length} leçons complétées
            </p>
          </div>

          <div className="divide-y divide-slate-800/60">
            {course.modules.map((mod, mIdx) => (
              <div key={mod.id} className="p-3">
                <div className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-accent">
                  Module {mIdx + 1} : {mod.title}
                </div>
                <div className="mt-1 space-y-1">
                  {mod.lessons.map((les) => {
                    const active = les.id === currentLesson.id;
                    const done = completedLessonIds.has(les.id);

                    return (
                      <Link
                        key={les.id}
                        to={`/student/courses/${course.slug}/lesson/${les.id}`}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center justify-between p-2.5 rounded-xl text-xs transition-all ${
                          active
                            ? 'bg-brand-primary border border-brand-accent/40 text-white font-bold'
                            : 'text-slate-300 hover:bg-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          {done ? (
                            <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 text-slate-500 flex-shrink-0" />
                          )}
                          <span className="truncate">{les.title}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono ml-2 flex-shrink-0">
                          {les.duration}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};
