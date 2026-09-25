import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  BookOpen,
  MessageSquare,
  Users,
  Star,
  FileText,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  Clock,
  Mail,
  Phone,
  Search,
  ArrowRight,
  Shield,
  Eye,
  X,
  Sparkles,
  Lock,
  KeyRound,
  AlertCircle,
} from 'lucide-react';
import { Course, Category, Article, Review, User } from '../types';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';

interface AdminPageProps {
  onNavigate: (page: string, param?: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const { user, login } = useAuth();
  const { formatPrice } = useCurrency();

  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [adminAuthError, setAdminAuthError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'contacts' | 'users' | 'reviews' | 'blog'>('overview');

  // State
  const [courses, setCourses] = useState<Course[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State for Course
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [courseFormData, setCourseFormData] = useState({
    title: '',
    shortDescription: '',
    fullDescription: '',
    category: 'seo-debutant',
    categoryName: 'SEO Débutant',
    level: 'Débutant',
    durationHours: 15,
    priceMAD: 1490,
    priceEUR: 139,
    badge: 'Nouveau',
    instructorName: 'Yassine Bennani',
    instructorRole: 'Head of SEO FormaSeo',
    thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
  });

  // Modal State for Blog Article
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [articleFormData, setArticleFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Actualités SEO',
    tags: 'SEO, Maroc, Google',
  });

  const loadAllAdminData = async () => {
    setLoading(true);
    const [cList, ctList, uList, rList, aList] = await Promise.all([
      api.getCourses(),
      api.getAdminContacts(),
      api.getAdminUsers(),
      api.getReviews(),
      api.getArticles(),
    ]);
    setCourses(cList);
    setContacts(ctList);
    setUsers(uList);
    setReviews(rList);
    setArticles(aList);
    setLoading(false);
  };

  useEffect(() => {
    loadAllAdminData();
  }, []);

  // Course Actions
  const handleOpenAddCourse = () => {
    setEditingCourse(null);
    setCourseFormData({
      title: '',
      shortDescription: '',
      fullDescription: '',
      category: 'seo-debutant',
      categoryName: 'SEO Débutant',
      level: 'Débutant',
      durationHours: 15,
      priceMAD: 1490,
      priceEUR: 139,
      badge: 'Nouveau',
      instructorName: 'Yassine Bennani',
      instructorRole: 'Head of SEO FormaSeo',
      thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    });
    setIsCourseModalOpen(true);
  };

  const handleOpenEditCourse = (c: Course) => {
    setEditingCourse(c);
    setCourseFormData({
      title: c.title,
      shortDescription: c.shortDescription,
      fullDescription: c.fullDescription,
      category: c.category,
      categoryName: c.categoryName,
      level: c.level,
      durationHours: c.durationHours,
      priceMAD: c.priceMAD,
      priceEUR: c.priceEUR,
      badge: c.badge || '',
      instructorName: c.instructor.name,
      instructorRole: c.instructor.role,
      thumbnail: c.thumbnail,
    });
    setIsCourseModalOpen(true);
  };

  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...courseFormData,
      instructor: {
        name: courseFormData.instructorName,
        role: courseFormData.instructorRole,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        bio: 'Consultant et formateur FormaSeo.',
      },
    };

    if (editingCourse) {
      await api.updateCourse(editingCourse.id, payload);
    } else {
      await api.createCourse(payload);
    }
    setIsCourseModalOpen(false);
    loadAllAdminData();
  };

  const handleDeleteCourse = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
      await api.deleteCourse(id);
      loadAllAdminData();
    }
  };

  // Contact Status
  const handleUpdateContactStatus = async (id: string, newStatus: string) => {
    await api.updateContactStatus(id, newStatus);
    setContacts(contacts.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };

  // Review Delete
  const handleDeleteReview = async (id: string) => {
    if (window.confirm('Supprimer cet avis ?')) {
      await api.deleteReview(id);
      setReviews(reviews.filter(r => r.id !== id));
    }
  };

  // Article Actions
  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: articleFormData.title,
      excerpt: articleFormData.excerpt,
      content: articleFormData.content,
      category: articleFormData.category,
      tags: articleFormData.tags.split(',').map(t => t.trim()),
    };
    await api.createBlogArticle(payload);
    setIsArticleModalOpen(false);
    loadAllAdminData();
  };

  const handleDeleteArticle = async (id: string) => {
    if (window.confirm('Supprimer cet article ?')) {
      await api.deleteBlogArticle(id);
      setArticles(articles.filter(a => a.id !== id));
    }
  };

  const handleAdminUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminAuthError('');
    setIsVerifying(true);

    const validPass = ['admin', 'admin123', 'formaseo2026', 'demo'];
    if (validPass.includes(adminPasswordInput.trim().toLowerCase())) {
      const ok = await login('admin@formaseo.ma', 'admin');
      if (ok) {
        loadAllAdminData();
      } else {
        setAdminAuthError('Identifiants administrateur incorrects.');
      }
    } else {
      setAdminAuthError('Mot de passe administrateur incorrect. Accès refusé.');
    }
    setIsVerifying(false);
  };

  // Calculations
  const newContactsCount = contacts.filter(c => c.status === 'new').length;
  const totalEnrollments = users.reduce((acc, u) => acc + (u.enrolledCourseIds?.length || 0), 0);

  // If user is not authenticated as admin, show secure gate
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-[85vh] flex items-center justify-center p-4 bg-slate-950 text-white">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#F5B716]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 text-[#F5B716] border border-yellow-500/30 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-white">Accès Restreint</h2>
            <p className="text-xs text-slate-400 mt-1">
              Cette page est strictement réservée à l'équipe de direction FormaSeo.
            </p>
          </div>

          {adminAuthError && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{adminAuthError}</span>
            </div>
          )}

          <form onSubmit={handleAdminUnlock} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Code d'accès / Mot de passe Admin
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="Entrez le code administrateur..."
                  value={adminPasswordInput}
                  onChange={(e) => setAdminPasswordInput(e.target.value)}
                  autoFocus
                  className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 outline-none focus:border-[#F5B716] focus:ring-1 focus:ring-[#F5B716]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-3.5 bg-[#F5B716] hover:bg-[#E0A30B] text-slate-950 font-black rounded-xl text-sm transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <span>{isVerifying ? 'Vérification...' : 'Déverrouiller l’espace admin'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-center pt-4 border-t border-slate-800">
            <button
              onClick={() => onNavigate('home')}
              className="text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              ← Retourner à l'accueil du site
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100/70 pb-20">
      
      {/* Top Admin Header */}
      <div className="bg-[#082238] text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F5B716] text-slate-950 flex items-center justify-center font-black">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white">Espace d'Administration FormaSeo</h1>
                <span className="text-[10px] bg-[#F5B716] text-slate-950 px-2 py-0.5 rounded-md font-bold uppercase">
                  Accès Total
                </span>
              </div>
              <p className="text-xs text-slate-400">Gestion du catalogue, des étudiants, des leads et des contenus.</p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('home')}
            className="self-start sm:self-auto px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-full text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Voir le site public</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto gap-2 border-t border-slate-800/80 pt-2">
          {[
            { id: 'overview', label: 'Vue d’ensemble', icon: LayoutDashboard },
            { id: 'courses', label: `Formations (${courses.length})`, icon: BookOpen },
            { id: 'contacts', label: `Leads & Contacts (${newContactsCount} nvx)`, icon: MessageSquare, badge: newContactsCount },
            { id: 'users', label: `Étudiants (${users.length})`, icon: Users },
            { id: 'reviews', label: `Avis & Notes (${reviews.length})`, icon: Star },
            { id: 'blog', label: `Blog (${articles.length})`, icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-4 text-xs font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-all ${
                  isActive
                    ? 'border-[#F5B716] text-[#F5B716] bg-slate-900/60'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge ? (
                  <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold">
                    {tab.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Contents */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* 1. OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-500 uppercase">Catalogue Actif</span>
                  <div className="p-2 rounded-xl bg-yellow-50 text-[#F5B716]">
                    <BookOpen className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-3xl font-black text-slate-900">{courses.length} formations</p>
                <p className="text-xs text-slate-400 mt-1">6 catégories actives</p>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-500 uppercase">Leads & Demandes</span>
                  <div className="p-2 rounded-xl bg-red-50 text-red-600">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-3xl font-black text-slate-900">{contacts.length}</p>
                <p className="text-xs text-red-500 font-bold mt-1">{newContactsCount} demandes en attente de réponse</p>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-500 uppercase">Apprenants Inscrits</span>
                  <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                    <Users className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-3xl font-black text-slate-900">2,850+</p>
                <p className="text-xs text-slate-400 mt-1">{totalEnrollments} inscriptions totales aux cours</p>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-500 uppercase">Satisfaction Élèves</span>
                  <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                    <Star className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-3xl font-black text-slate-900">4.92 / 5</p>
                <p className="text-xs text-emerald-600 font-bold mt-1">98.4% de taux de recommandation</p>
              </div>
            </div>

            {/* Quick Actions & Recent Inquiries */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-black text-slate-900 text-lg">Dernières Demandes de Contact / Audit</h3>
                  <button onClick={() => setActiveTab('contacts')} className="text-xs font-bold text-[#0B253A] hover:underline">
                    Voir tout ({contacts.length})
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {contacts.slice(0, 4).map((c) => (
                    <div key={c.id} className="py-3.5 flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">{c.name}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            c.status === 'new' ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {c.status === 'new' ? 'Nouveau' : 'Traité'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">{c.email} • {c.phone || 'Sans tel'}</p>
                        <p className="text-xs text-slate-700 line-clamp-1 mt-1 font-medium">"{c.message}"</p>
                      </div>
                      <span className="text-[10px] text-slate-400 shrink-0">{c.serviceInterest}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-black text-slate-900 text-lg">Actions Rapides</h3>
                <div className="space-y-3">
                  <button
                    onClick={handleOpenAddCourse}
                    className="w-full py-3 px-4 bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 text-slate-950 font-bold rounded-2xl text-xs flex items-center justify-between transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Plus className="w-4 h-4 text-[#F5B716]" />
                      Ajouter une nouvelle formation au catalogue
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      setArticleFormData({
                        title: '',
                        excerpt: '',
                        content: '',
                        category: 'Actualités SEO',
                        tags: 'SEO, Maroc, Google',
                      });
                      setIsArticleModalOpen(true);
                    }}
                    className="w-full py-3 px-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 font-bold rounded-2xl text-xs flex items-center justify-between transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-sky-600" />
                      Publier un nouvel article sur le blog
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setActiveTab('contacts')}
                    className="w-full py-3 px-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 font-bold rounded-2xl text-xs flex items-center justify-between transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-emerald-600" />
                      Traiter les {newContactsCount} demandes entrantes
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. COURSES TAB */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">Gestion des Formations</h2>
                <p className="text-xs text-slate-500">Ajoutez, modifiez le prix, les modules ou supprimez des cours.</p>
              </div>
              <button
                onClick={handleOpenAddCourse}
                className="px-5 py-2.5 bg-[#F5B716] hover:bg-[#E0A30B] text-slate-950 font-bold text-xs rounded-full flex items-center gap-2 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>Créer une formation</span>
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-[11px] font-black uppercase text-slate-400 bg-slate-50/70">
                    <th className="py-4 px-6">Formation</th>
                    <th className="py-4 px-4">Catégorie</th>
                    <th className="py-4 px-4">Niveau</th>
                    <th className="py-4 px-4">Prix (MAD / EUR)</th>
                    <th className="py-4 px-4">Inscrits</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                  {courses.map((course) => (
                    <tr key={course.id} className="hover:bg-slate-50/60">
                      <td className="py-4 px-6 flex items-center gap-3">
                        <img src={course.thumbnail} alt={course.title} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                        <div>
                          <p className="font-bold text-slate-900 max-w-xs truncate">{course.title}</p>
                          <p className="text-[11px] text-slate-400">{course.durationHours}h • {course.totalLessons} leçons</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-semibold">{course.categoryName}</td>
                      <td className="py-4 px-4">
                        <span className="px-2.5 py-1 bg-slate-100 rounded-full font-bold text-[10px]">
                          {course.level}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-bold text-slate-900">
                        {course.priceMAD} DH / {course.priceEUR} €
                      </td>
                      <td className="py-4 px-4">{course.studentsCount}</td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEditCourse(course)}
                          className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteCourse(course.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. CONTACTS & LEADS TAB */}
        {activeTab === 'contacts' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">Demandes de Contact & Audits ({contacts.length})</h2>
                <p className="text-xs text-slate-500">Gérez les demandes de devis et questions des prospects.</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="divide-y divide-slate-100">
                {contacts.map((c) => (
                  <div key={c.id} className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="space-y-1 max-w-2xl">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-slate-900 text-sm">{c.name}</span>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          c.status === 'new' ? 'bg-red-100 text-red-800' : c.status === 'read' ? 'bg-yellow-100 text-yellow-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {c.status === 'new' ? 'Nouveau' : c.status === 'read' ? 'En cours' : 'Traité'}
                        </span>
                        <span className="text-xs font-bold text-[#0B253A] bg-blue-50 px-2 py-0.5 rounded-md">
                          {c.serviceInterest || 'Général'}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                        <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {c.email}</span>
                        {c.phone && <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {c.phone}</span>}
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {new Date(c.createdAt).toLocaleDateString('fr-FR')}</span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 mt-2">
                        {c.message}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <select
                        value={c.status}
                        onChange={(e) => handleUpdateContactStatus(c.id, e.target.value)}
                        className="text-xs font-bold p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                      >
                        <option value="new">🔴 Nouveau</option>
                        <option value="read">🟡 En cours</option>
                        <option value="replied">🟢 Traité / Répondu</option>
                      </select>
                      <a
                        href={`mailto:${c.email}?subject=Réponse FormaSeo : ${c.subject || 'Votre demande'}`}
                        className="px-4 py-2 bg-[#0B253A] hover:bg-[#123E61] text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Répondre</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 4. USERS TAB */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">Étudiants & Utilisateurs ({users.length})</h2>
              <p className="text-xs text-slate-500">Consultez la progression et les cours des étudiants inscrits.</p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-[11px] font-black uppercase text-slate-400 bg-slate-50/70">
                    <th className="py-4 px-6">Utilisateur</th>
                    <th className="py-4 px-4">Rôle</th>
                    <th className="py-4 px-4">Formations Inscrites</th>
                    <th className="py-4 px-4">Leçons Terminées</th>
                    <th className="py-4 px-6">Date Inscription</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/60">
                      <td className="py-4 px-6 flex items-center gap-3">
                        <img src={u.avatar} alt={u.name} className="w-9 h-9 rounded-full object-cover border border-slate-200" />
                        <div>
                          <p className="font-bold text-slate-900">{u.name}</p>
                          <p className="text-xs text-slate-400">{u.email}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                          u.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {u.role === 'admin' ? 'Administrateur' : 'Étudiant'}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-bold">{u.enrolledCourseIds?.length || 0} cours</td>
                      <td className="py-4 px-4 font-bold text-emerald-600">{u.completedLessonIds?.length || 0} leçons</td>
                      <td className="py-4 px-6 text-slate-400">{new Date(u.createdAt).toLocaleDateString('fr-FR')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 5. REVIEWS TAB */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">Modération des Avis ({reviews.length})</h2>
              <p className="text-xs text-slate-500">Validez ou supprimez les retours d'expérience des élèves.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((rev) => (
                <div key={rev.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <img src={rev.userAvatar} alt={rev.userName} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{rev.userName}</p>
                          <p className="text-xs text-slate-400">{rev.userRole}</p>
                        </div>
                      </div>
                      <div className="flex text-[#F5B716] text-xs">
                        {[...Array(rev.rating)].map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 italic">"{rev.comment}"</p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
                    <span className="text-[10px] text-slate-400">{rev.date}</span>
                    <button
                      onClick={() => handleDeleteReview(rev.id)}
                      className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-xs font-bold transition-colors"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. BLOG TAB */}
        {activeTab === 'blog' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">Gestion du Blog ({articles.length})</h2>
                <p className="text-xs text-slate-500">Rédigez et publiez de nouveaux guides SEO.</p>
              </div>
              <button
                onClick={() => {
                  setArticleFormData({
                    title: '',
                    excerpt: '',
                    content: '',
                    category: 'Actualités SEO',
                    tags: 'SEO, Maroc, Google',
                  });
                  setIsArticleModalOpen(true);
                }}
                className="px-5 py-2.5 bg-[#F5B716] hover:bg-[#E0A30B] text-slate-950 font-bold text-xs rounded-full flex items-center gap-2 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>Rédiger un article</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((art) => (
                <div key={art.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <img src={art.thumbnail} alt={art.title} className="w-full aspect-video object-cover" />
                    <div className="p-6">
                      <span className="text-[10px] font-bold text-[#F5B716] uppercase">{art.category}</span>
                      <h3 className="font-bold text-slate-900 text-base mt-1 line-clamp-2">{art.title}</h3>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-2">{art.excerpt}</p>
                    </div>
                  </div>
                  <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between mt-2">
                    <span className="text-xs text-slate-400">{art.publishedAt}</span>
                    <button
                      onClick={() => handleDeleteArticle(art.id)}
                      className="text-xs font-bold text-red-600 hover:underline"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Course Create / Edit Modal */}
      {isCourseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-slate-900">
                {editingCourse ? 'Modifier la formation' : 'Créer une nouvelle formation'}
              </h3>
              <button onClick={() => setIsCourseModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSaveCourse} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Titre de la formation *</label>
                <input
                  type="text"
                  required
                  value={courseFormData.title}
                  onChange={(e) => setCourseFormData({ ...courseFormData, title: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#F5B716]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Catégorie *</label>
                  <select
                    value={courseFormData.category}
                    onChange={(e) => {
                      const names: any = {
                        'seo-debutant': 'SEO Débutant',
                        'seo-avance': 'SEO Avancé',
                        'seo-business': 'SEO Business',
                        'redaction-seo': 'Rédaction SEO & IA',
                        'seo-technique': 'SEO Technique',
                        'netlinking': 'Netlinking & Autorité',
                      };
                      setCourseFormData({
                        ...courseFormData,
                        category: e.target.value,
                        categoryName: names[e.target.value] || 'SEO Débutant',
                      });
                    }}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                  >
                    <option value="seo-debutant">SEO Débutant</option>
                    <option value="seo-avance">SEO Avancé</option>
                    <option value="seo-business">SEO Business</option>
                    <option value="redaction-seo">Rédaction SEO & IA</option>
                    <option value="seo-technique">SEO Technique</option>
                    <option value="netlinking">Netlinking</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Niveau *</label>
                  <select
                    value={courseFormData.level}
                    onChange={(e) => setCourseFormData({ ...courseFormData, level: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                  >
                    <option value="Débutant">Débutant</option>
                    <option value="Intermédiaire">Intermédiaire</option>
                    <option value="Avancé">Avancé</option>
                    <option value="Tous niveaux">Tous niveaux</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Prix MAD (DH) *</label>
                  <input
                    type="number"
                    required
                    value={courseFormData.priceMAD}
                    onChange={(e) => setCourseFormData({ ...courseFormData, priceMAD: Number(e.target.value) })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Prix EUR (€) *</label>
                  <input
                    type="number"
                    required
                    value={courseFormData.priceEUR}
                    onChange={(e) => setCourseFormData({ ...courseFormData, priceEUR: Number(e.target.value) })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Durée (heures)</label>
                  <input
                    type="number"
                    value={courseFormData.durationHours}
                    onChange={(e) => setCourseFormData({ ...courseFormData, durationHours: Number(e.target.value) })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description courte *</label>
                <textarea
                  rows={2}
                  required
                  value={courseFormData.shortDescription}
                  onChange={(e) => setCourseFormData({ ...courseFormData, shortDescription: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description complète</label>
                <textarea
                  rows={4}
                  value={courseFormData.fullDescription}
                  onChange={(e) => setCourseFormData({ ...courseFormData, fullDescription: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCourseModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-bold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#F5B716] text-slate-950 font-black rounded-xl shadow"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Article Create Modal */}
      {isArticleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-slate-900">Rédiger un nouvel article</h3>
              <button onClick={() => setIsArticleModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Titre de l'article *</label>
                <input
                  type="text"
                  required
                  value={articleFormData.title}
                  onChange={(e) => setArticleFormData({ ...articleFormData, title: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#F5B716]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Catégorie</label>
                <input
                  type="text"
                  value={articleFormData.category}
                  onChange={(e) => setArticleFormData({ ...articleFormData, category: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Extrait / Résumé *</label>
                <textarea
                  rows={2}
                  required
                  value={articleFormData.excerpt}
                  onChange={(e) => setArticleFormData({ ...articleFormData, excerpt: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Contenu complet *</label>
                <textarea
                  rows={6}
                  required
                  value={articleFormData.content}
                  onChange={(e) => setArticleFormData({ ...articleFormData, content: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Tags (séparés par des virgules)</label>
                <input
                  type="text"
                  value={articleFormData.tags}
                  onChange={(e) => setArticleFormData({ ...articleFormData, tags: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsArticleModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-bold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#F5B716] text-slate-950 font-black rounded-xl shadow"
                >
                  Publier l'article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
