import React, { useState, useEffect } from 'react';
import {
  Play,
  CheckCircle2,
  Circle,
  ArrowLeft,
  BookOpen,
  FileText,
  Award,
  HelpCircle,
  Download,
  Sparkles,
  ChevronRight,
  MessageSquare,
} from 'lucide-react';
import { Course, Lesson } from '../types';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

interface CourseLearnPageProps {
  courseSlug: string;
  onBackToCourse: () => void;
  onNavigate: (page: string) => void;
}

export const CourseLearnPage: React.FC<CourseLearnPageProps> = ({
  courseSlug,
  onBackToCourse,
  onNavigate,
}) => {
  const { user, toggleLesson } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [activeTab, setActiveTab] = useState<'summary' | 'notes' | 'quiz' | 'resources'>('summary');
  const [studentNotes, setStudentNotes] = useState('');
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: number]: number }>({});
  const [showCertificate, setShowCertificate] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      const c = await api.getCourseBySlug(courseSlug);
      if (c) {
        setCourse(c);
        if (c.modules.length > 0 && c.modules[0].lessons.length > 0) {
          setActiveLesson(c.modules[0].lessons[0]);
        }
      }
    };
    fetchCourse();
  }, [courseSlug]);

  // Load student personal notes
  useEffect(() => {
    if (activeLesson) {
      const saved = localStorage.getItem(`notes_${courseSlug}_${activeLesson.id}`);
      setStudentNotes(saved || '');
    }
  }, [activeLesson, courseSlug]);

  const handleSaveNotes = (val: string) => {
    setStudentNotes(val);
    if (activeLesson) {
      localStorage.setItem(`notes_${courseSlug}_${activeLesson.id}`, val);
    }
  };

  if (!course || !activeLesson) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 font-bold">
        Chargement de votre espace d'apprentissage...
      </div>
    );
  }

  // Calculate completed lessons in this course
  const allCourseLessonIds = course.modules.flatMap((m) => m.lessons.map((l) => l.id));
  const completedCount = allCourseLessonIds.filter((id) =>
    user?.completedLessonIds.includes(id)
  ).length;
  const progressPercent = Math.round((completedCount / (allCourseLessonIds.length || 1)) * 100);

  const isCurrentLessonDone = user?.completedLessonIds.includes(activeLesson.id);

  // Mock Quiz data for the lesson
  const quizQuestions = [
    {
      id: 1,
      question: "Quel est l'objectif principal de la recherche d'intention (Search Intent) en SEO ?",
      options: [
        "Acheter des mots-clés Google Ads au meilleur coût",
        "Comprendre exactement ce que l'utilisateur espère trouver afin d'y répondre parfaitement",
        "Remplir le texte avec un maximum de répétitions de mots-clés (Keyword stuffing)",
        "Réduire la taille des images",
      ],
      correct: 1,
    },
    {
      id: 2,
      question: "Quelle balise HTML est la plus déterminante pour le titre principal d'une page ?",
      options: ["<title> et <h1>", "<p> et <span>", "<meta-keywords>", "<b>"],
      correct: 0,
    },
  ];

  const handleEvaluateQuiz = () => {
    let score = 0;
    quizQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correct) score += 50;
    });
    setQuizScore(score);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      
      {/* Top Classroom Bar */}
      <div className="bg-slate-950 border-b border-slate-800 px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <button
            onClick={onBackToCourse}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Quitter la salle de cours</span>
          </button>
          <div className="h-4 w-[1px] bg-slate-800 hidden sm:block" />
          <h2 className="text-sm sm:text-base font-bold text-white truncate">
            {course.title}
          </h2>
        </div>

        {/* Course Progress */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="hidden sm:flex items-center gap-3">
            <div className="w-32 bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-[#F5B716] h-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-xs font-bold text-[#F5B716]">{progressPercent}%</span>
          </div>

          {progressPercent === 100 && (
            <button
              onClick={() => setShowCertificate(true)}
              className="px-3 py-1.5 bg-[#F5B716] text-slate-950 rounded-full text-xs font-black flex items-center gap-1.5 animate-bounce"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Voir mon certificat</span>
            </button>
          )}
        </div>
      </div>

      {/* Classroom Content Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        
        {/* Left / Center: Video and Notes/Summary Tabs (8 cols) */}
        <div className="lg:col-span-8 flex flex-col overflow-y-auto max-h-[calc(100vh-60px)]">
          
          {/* Video Player */}
          <div className="relative aspect-video bg-black flex items-center justify-center">
            <iframe
              className="w-full h-full"
              src={`${activeLesson.videoUrl}?autoplay=0`}
              title={activeLesson.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Lesson Control & Completion Bar */}
          <div className="p-4 sm:p-6 bg-slate-950/60 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold text-[#F5B716] uppercase tracking-wider">
                Leçon en cours
              </span>
              <h1 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                {activeLesson.title}
              </h1>
            </div>

            <button
              onClick={() => toggleLesson(activeLesson.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                isCurrentLessonDone
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30'
                  : 'bg-[#F5B716] hover:bg-[#E0A30B] text-slate-950 font-black'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isCurrentLessonDone ? 'Leçon terminée ✓' : 'Marquer comme terminée'}</span>
            </button>
          </div>

          {/* Lesson Tabs */}
          <div className="flex border-b border-slate-800 px-6 bg-slate-950/30">
            <button
              onClick={() => setActiveTab('summary')}
              className={`py-3 px-4 text-xs font-bold border-b-2 transition-all ${
                activeTab === 'summary' ? 'border-[#F5B716] text-[#F5B716]' : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Résumé & Objectifs
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`py-3 px-4 text-xs font-bold border-b-2 transition-all ${
                activeTab === 'notes' ? 'border-[#F5B716] text-[#F5B716]' : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Mes Notes de cours
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`py-3 px-4 text-xs font-bold border-b-2 transition-all ${
                activeTab === 'quiz' ? 'border-[#F5B716] text-[#F5B716]' : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Auto-évaluation Quiz
            </button>
          </div>

          {/* Tab Panes */}
          <div className="p-6 flex-1 bg-slate-900">
            {activeTab === 'summary' && (
              <div className="space-y-4 max-w-3xl">
                <h3 className="text-sm font-bold text-slate-200">Points clés de cette leçon :</h3>
                <p className="text-slate-300 text-sm leading-relaxed bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
                  {activeLesson.summary}
                </p>
                <div className="pt-2 text-xs text-slate-400">
                  <p className="font-semibold text-slate-300 mb-1">💡 Conseil FormaSeo :</p>
                  <p>Mettez en pratique les concepts abordés directement sur votre Search Console ou votre site test avant de passer à la leçon suivante.</p>
                </div>
              </div>
            )}

            {activeTab === 'notes' && (
              <div className="space-y-3 max-w-3xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-200">Votre bloc-notes personnel</h3>
                  <span className="text-[11px] text-emerald-400">Sauvegarde automatique</span>
                </div>
                <textarea
                  rows={6}
                  placeholder="Notez ici vos idées, questions pour le live et mots-clés découverts..."
                  value={studentNotes}
                  onChange={(e) => handleSaveNotes(e.target.value)}
                  className="w-full text-xs p-4 bg-slate-950 border border-slate-700 rounded-2xl text-white outline-none focus:border-[#F5B716]"
                />
              </div>
            )}

            {activeTab === 'quiz' && (
              <div className="space-y-6 max-w-3xl">
                <h3 className="text-sm font-bold text-slate-200">Validez vos acquis sur ce module</h3>
                {quizQuestions.map((q, idx) => (
                  <div key={q.id} className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700 space-y-3">
                    <p className="text-xs sm:text-sm font-bold text-white">
                      Question {idx + 1} : {q.question}
                    </p>
                    <div className="space-y-2">
                      {q.options.map((opt, oIdx) => (
                        <label
                          key={oIdx}
                          className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer text-xs transition-colors ${
                            selectedAnswers[q.id] === oIdx
                              ? 'bg-yellow-500/20 text-[#F5B716] border border-yellow-500/40'
                              : 'bg-slate-900 text-slate-300 hover:bg-slate-750'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`q_${q.id}`}
                            checked={selectedAnswers[q.id] === oIdx}
                            onChange={() =>
                              setSelectedAnswers({ ...selectedAnswers, [q.id]: oIdx })
                            }
                            className="text-[#F5B716] focus:ring-0"
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="flex items-center gap-4">
                  <button
                    onClick={handleEvaluateQuiz}
                    className="px-6 py-2.5 bg-[#F5B716] hover:bg-[#E0A30B] text-slate-950 text-xs font-black rounded-full"
                  >
                    Vérifier mes réponses
                  </button>
                  {quizScore !== null && (
                    <span className="text-sm font-bold text-emerald-400">
                      Score : {quizScore} / 100 {quizScore === 100 ? '🎉 Excellent !' : 'Continuez vos efforts !'}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Modules & Lessons Navigation Sidebar (4 cols) */}
        <div className="lg:col-span-4 bg-slate-950 border-l border-slate-800 overflow-y-auto max-h-[calc(100vh-60px)]">
          <div className="p-4 border-b border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Contenu du cours
            </h3>
          </div>

          <div className="divide-y divide-slate-800/60">
            {course.modules.map((module, mIdx) => (
              <div key={module.id} className="py-2">
                <div className="px-4 py-2 text-xs font-bold text-slate-300 flex items-center justify-between">
                  <span>{module.title}</span>
                </div>
                <div className="space-y-0.5">
                  {module.lessons.map((les) => {
                    const isSelected = activeLesson.id === les.id;
                    const isDone = user?.completedLessonIds.includes(les.id);

                    return (
                      <button
                        key={les.id}
                        onClick={() => setActiveLesson(les)}
                        className={`w-full text-left px-4 py-2.5 flex items-center justify-between gap-3 text-xs transition-colors ${
                          isSelected
                            ? 'bg-[#0B253A] text-[#F5B716] font-bold border-l-4 border-[#F5B716]'
                            : 'text-slate-400 hover:text-white hover:bg-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 text-slate-600 shrink-0" />
                          )}
                          <span className="truncate">{les.title}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 shrink-0">{les.duration}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Official Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white text-slate-900 rounded-3xl p-8 max-w-2xl w-full border-4 border-[#F5B716] shadow-2xl relative text-center">
            <div className="inline-block p-4 bg-yellow-50 rounded-full text-[#F5B716] mb-4">
              <Award className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-black text-[#0B253A]">CERTIFICAT DE RÉUSSITE</h3>
            <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">FormaSeo Académie Officielle</p>
            
            <div className="my-6 py-6 border-y border-slate-100">
              <p className="text-sm text-slate-600">Ce certificat atteste que</p>
              <h4 className="text-2xl font-extrabold text-slate-900 my-1">{user?.name || 'Étudiant FormaSeo'}</h4>
              <p className="text-sm text-slate-600">a complété avec succès le cursus professionnel</p>
              <p className="text-base font-bold text-[#0B253A] mt-1">{course.title}</p>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 mb-6">
              <span>Date : {new Date().toLocaleDateString('fr-FR')}</span>
              <span>ID Certificat : FS-2026-{Math.floor(100000 + Math.random() * 900000)}</span>
              <span>Instructeur : {course.instructor.name}</span>
            </div>

            <button
              onClick={() => setShowCertificate(false)}
              className="px-6 py-2.5 bg-slate-900 text-white rounded-full text-xs font-bold"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
