import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { 
  BookOpen, 
  Award, 
  Clock, 
  CheckCircle2, 
  Play, 
  TrendingUp, 
  FileText, 
  ArrowRight,
  Sparkles,
  Search
} from 'lucide-react';
import { Course, Enrollment, Certificate } from '../../types';

export const StudentDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<{
    enrollments: Enrollment[];
    courses: Course[];
    certificates: Certificate[];
  }>({
    enrollments: [],
    courses: [],
    certificates: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await api.student.getDashboard();
        setDashboardData(data);
      } catch (err) {
        console.error('Error loading dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#082238] border-t-[#F5B82E] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Chargement de votre espace formation...</p>
        </div>
      </div>
    );
  }

  const { enrollments, courses, certificates } = dashboardData;

  // Calculate overall metrics
  const totalCourses = enrollments.length;
  const completedCourses = enrollments.filter(e => e.status === 'COMPLETED' || e.status === 'completed').length;
  const inProgressCourses = enrollments.filter(e => e.status === 'ACTIVE' || e.status === 'active').length;
  const totalCertificates = certificates.length;

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      {/* Header Banner */}
      <div className="bg-[#082238] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F5B82E_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5B82E]/20 text-[#F5B82E] text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                Espace Académie FormaSEO
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Bienvenue, {user?.name} 👋
              </h1>
              <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-2xl">
                Suivez vos formations en cours, complétez vos modules pratiques et téléchargez vos certifications officielles.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Link
                to="/student/certificates"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-all border border-white/10 backdrop-blur-sm"
              >
                <Award className="w-4 h-4 text-[#F5B82E]" />
                <span>Mes Certificats ({totalCertificates})</span>
              </Link>
              <Link
                to="/student/profile"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F5B82E] hover:bg-[#E5A91E] text-[#082238] font-bold text-sm transition-all shadow-md"
              >
                <span>Mon Profil</span>
              </Link>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/10">
            <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
              <div className="text-xs text-slate-300 font-semibold uppercase tracking-wider">Formations Inscrites</div>
              <div className="text-2xl font-black text-white mt-1">{totalCourses}</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
              <div className="text-xs text-slate-300 font-semibold uppercase tracking-wider">En Cours</div>
              <div className="text-2xl font-black text-[#F5B82E] mt-1">{inProgressCourses}</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
              <div className="text-xs text-slate-300 font-semibold uppercase tracking-wider">Complétées</div>
              <div className="text-2xl font-black text-green-400 mt-1">{completedCourses}</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
              <div className="text-xs text-slate-300 font-semibold uppercase tracking-wider">Certifications</div>
              <div className="text-2xl font-black text-[#F5B82E] mt-1">{totalCertificates}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-[#082238] tracking-tight">
            Vos Formations en cours
          </h2>
        </div>

        {enrollments.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 shadow-sm max-w-xl mx-auto">
            <div className="w-16 h-16 bg-[#082238]/5 rounded-2xl flex items-center justify-center text-[#082238] mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-[#082238]" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Aucune formation active pour le moment</h3>
            <p className="text-sm text-slate-600 mb-6">
              Découvrez nos programmes intensifs certifiants à Casablanca et lancez votre montée en compétences.
            </p>
            <Link
              to="/#formations"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#082238] text-white font-bold rounded-xl hover:bg-[#0B2C47] transition-all shadow-md"
            >
              <span>Découvrir le catalogue</span>
              <ArrowRight className="w-4 h-4 text-[#F5B82E]" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrollments.map((enrollment) => {
              const course = enrollment.course;
              if (!course) return null;

              return (
                <div
                  key={enrollment.id}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  <div className="relative h-48 overflow-hidden bg-slate-900">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 bg-[#082238]/90 text-[#F5B82E] text-xs font-bold px-2.5 py-1 rounded-lg backdrop-blur-sm border border-[#F5B82E]/20">
                      {course.category || course.categoryName}
                    </span>
                    <span className="absolute bottom-3 right-3 text-white text-xs font-semibold flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-sm">
                      <Clock className="w-3.5 h-3.5 text-[#F5B82E]" />
                      {course.duration || '30h'}
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-black text-[#082238] group-hover:text-[#F5B82E] transition-colors line-clamp-2">
                        {course.title}
                      </h3>
                      <p className="mt-2 text-xs text-slate-600 line-clamp-2">
                        {course.shortDescription}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100">
                      <div className="flex items-center justify-between text-xs font-bold mb-2">
                        <span className="text-slate-600">Progression globale</span>
                        <span className="text-[#082238]">{enrollment.progressPercentage}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-[#082238] to-[#F5B82E] h-2 rounded-full transition-all duration-500"
                          style={{ width: `${enrollment.progressPercentage}%` }}
                        />
                      </div>

                      <div className="mt-5 flex items-center justify-between">
                        <Link
                          to={`/student/courses/${course.slug}`}
                          className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#082238] hover:bg-[#0B2C47] text-white font-bold text-xs transition-all shadow-md group/btn"
                        >
                          <Play className="w-3.5 h-3.5 text-[#F5B82E] fill-[#F5B82E]" />
                          <span>Reprendre la formation</span>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
