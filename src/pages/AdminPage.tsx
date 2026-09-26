import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  CheckCircle2,
  Clock,
  Mail,
  Phone,
  Search,
  ArrowRight,
  ShieldCheck,
  Lock,
  AlertCircle,
  Save,
  BookOpen,
  Settings,
  HelpCircle,
  UserCheck,
  FileCheck,
  RefreshCw,
  Eye,
  ExternalLink,
  Download,
  Trash2,
  Plus,
  MessageSquare,
  Send,
  Edit3,
  Check,
  X,
  Calendar,
  MapPin,
  Sparkles,
  Users,
  Award,
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { AcademySettings, CurriculumWeek, FaqItem, Enquiry } from '../types';
import { fallbackSettings, fallbackCurriculum, fallbackFaqs } from '../config/defaultData';

interface AdminPageProps {
  onNavigate?: (page: string, param?: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const { user, isAuthenticated } = useAuth();

  // Active Tab
  const [activeTab, setActiveTab] = useState<'checklist' | 'enquiries' | 'settings' | 'curriculum' | 'faqs'>('enquiries');

  // Live Data State
  const [settings, setSettings] = useState<AcademySettings>(fallbackSettings);
  const [curriculum, setCurriculum] = useState<CurriculumWeek[]>(fallbackCurriculum);
  const [faqs, setFaqs] = useState<FaqItem[]>(fallbackFaqs);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [checklist, setChecklist] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [savingWeek, setSavingWeek] = useState<number | null>(null);

  // Filters & Sub-states
  const [enquirySearch, setEnquirySearch] = useState('');
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState<'all' | 'new' | 'contacted' | 'enrolled' | 'archived'>('all');
  const [activeEnquiryNotesId, setActiveEnquiryNotesId] = useState<string | null>(null);
  const [enquiryNotesDraft, setEnquiryNotesDraft] = useState('');

  // FAQ Modal / State
  const [isAddingFaq, setIsAddingFaq] = useState(false);
  const [editingFaqId, setEditingFaqId] = useState<string | null>(null);
  const [faqForm, setFaqForm] = useState({ question: '', answer: '', category: 'Général' });

  // Checklist Add Modal
  const [isAddingChecklist, setIsAddingChecklist] = useState(false);
  const [newChecklistLabel, setNewChecklistLabel] = useState('');
  const [newChecklistCategory, setNewChecklistCategory] = useState('Lancement');

  const loadData = async () => {
    setLoading(true);
    try {
      const [st, cur, fq, enq, chk] = await Promise.all([
        api.settings.get(),
        api.curriculum.get(),
        api.faqs.get(),
        api.enquiries.getAll(),
        api.getChecklist(),
      ]);
      if (st) setSettings(st);
      if (cur) setCurriculum(cur);
      if (fq) setFaqs(fq);
      if (enq) setEnquiries(enq);
      if (chk) setChecklist(chk);
    } catch (e) {
      console.error('Error loading admin data:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const showNotification = (msg: string) => {
    setSaveMessage(msg);
    setTimeout(() => setSaveMessage(''), 4000);
  };

  // --- CHECKLIST ACTIONS ---
  const handleToggleChecklist = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'approved' || currentStatus === 'confirmé' ? 'en_attente' : 'confirmé';
    const updated = checklist.map((item) =>
      item.id === id ? { ...item, status: nextStatus } : item
    );
    setChecklist(updated);
    await api.updateChecklist(id, nextStatus);
    showNotification('Statut de validation mis à jour.');
  };

  const handleAddChecklistItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChecklistLabel.trim()) return;
    const added = await api.addChecklistItem(newChecklistLabel.trim(), newChecklistCategory);
    if (added) {
      setChecklist([...checklist, added]);
      setNewChecklistLabel('');
      setIsAddingChecklist(false);
      showNotification('Élément de checklist ajouté avec succès.');
    }
  };

  const handleDeleteChecklistItem = async (id: string) => {
    if (!confirm('Supprimer cet élément de la checklist ?')) return;
    setChecklist(checklist.filter((c) => c.id !== id));
    await api.deleteChecklistItem(id);
    showNotification('Élément supprimé.');
  };

  // --- ENQUIRIES ACTIONS ---
  const handleEnquiryStatus = async (id: string, status: string) => {
    const updated = enquiries.map((enq) =>
      enq.id === id ? { ...enq, status: status as any } : enq
    );
    setEnquiries(updated);
    await api.updateEnquiryStatus(id, status);
    showNotification('Statut de la candidature mis à jour.');
  };

  const handleSaveEnquiryNotes = async (id: string) => {
    const updated = enquiries.map((enq) =>
      enq.id === id ? { ...enq, notes: enquiryNotesDraft } : enq
    );
    setEnquiries(updated);
    await api.updateEnquiryStatus(id, updated.find(e => e.id === id)?.status || 'new', enquiryNotesDraft);
    setActiveEnquiryNotesId(null);
    showNotification('Note de suivi enregistrée.');
  };

  const handleDeleteEnquiry = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette candidature ?')) return;
    setEnquiries(enquiries.filter((e) => e.id !== id));
    await api.deleteEnquiry(id);
    showNotification('Candidature supprimée.');
  };

  const exportEnquiriesToCSV = () => {
    if (enquiries.length === 0) {
      alert('Aucune candidature à exporter.');
      return;
    }

    const headers = ['ID', 'Nom Complet', 'Email', 'Téléphone', 'Profil', 'Objectif', 'Format', 'Statut', 'Date Création', 'Notes'];
    const rows = enquiries.map((e) => [
      e.id,
      `"${e.name.replace(/"/g, '""')}"`,
      `"${e.email.replace(/"/g, '""')}"`,
      `"${e.phone.replace(/"/g, '""')}"`,
      `"${(e.profileType || '').replace(/"/g, '""')}"`,
      `"${(e.goal || '').replace(/"/g, '""')}"`,
      `"${(e.preferredFormat || '').replace(/"/g, '""')}"`,
      e.status,
      `"${new Date(e.createdAt).toLocaleString('fr-FR')}"`,
      `"${(e.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `formaseo-candidatures-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- SETTINGS ACTIONS ---
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveMessage('');
    const res = await api.updateSettings(settings);
    if (res) {
      showNotification('Paramètres de l’académie enregistrés avec succès !');
    }
  };

  // --- CURRICULUM ACTIONS ---
  const handleSaveWeek = async (weekNumber: number) => {
    setSavingWeek(weekNumber);
    const target = curriculum.find((w) => w.weekNumber === weekNumber);
    if (target) {
      await api.updateCurriculumWeek(weekNumber, target);
      showNotification(`Semaine ${weekNumber} enregistrée avec succès !`);
    }
    setSavingWeek(null);
  };

  const handleUpdateWeekField = (weekNumber: number, field: string, value: any) => {
    setCurriculum((prev) =>
      prev.map((w) => (w.weekNumber === weekNumber ? { ...w, [field]: value } : w))
    );
  };

  // --- FAQ ACTIONS ---
  const handleSaveFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqForm.question.trim() || !faqForm.answer.trim()) return;

    if (editingFaqId) {
      const ok = await api.updateFaq(editingFaqId, faqForm);
      if (ok) {
        setFaqs(faqs.map((f) => (f.id === editingFaqId ? { ...f, ...faqForm } : f)));
        showNotification('Question FAQ mise à jour.');
      }
    } else {
      const added = await api.addFaq(faqForm);
      if (added) {
        setFaqs([...faqs, added]);
        showNotification('Nouvelle question FAQ ajoutée.');
      }
    }

    setIsAddingFaq(false);
    setEditingFaqId(null);
    setFaqForm({ question: '', answer: '', category: 'Général' });
  };

  const handleDeleteFaq = async (id: string) => {
    if (!confirm('Supprimer cette question FAQ ?')) return;
    setFaqs(faqs.filter((f) => f.id !== id));
    await api.deleteFaq(id);
    showNotification('Question FAQ supprimée.');
  };

  // If NOT authenticated, show message to login
  if (!isAuthenticated || !user || !['SUPER_ADMIN', 'ADMIN'].includes(user.role)) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#082238] text-[#F5B82E] flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900">Accès Restreint</h1>
            <p className="text-xs text-slate-500 mt-2">
              Vous devez être connecté avec un compte Administrateur pour accéder à ce panneau.
            </p>
          </div>

          <Link
            to="/login?redirect=/admin"
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-brand-primary hover:bg-slate-800 text-white font-bold text-sm transition-all shadow-md"
          >
            <ShieldCheck className="w-4 h-4 text-brand-accent" />
            <span>Se connecter en tant qu'administrateur</span>
          </Link>

          <div className="pt-2">
            <Link
              to="/"
              className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
            >
              ← Retour au site public
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Enquiries filtering
  const filteredEnquiries = enquiries.filter((e) => {
    const matchesSearch =
      e.name.toLowerCase().includes(enquirySearch.toLowerCase()) ||
      e.email.toLowerCase().includes(enquirySearch.toLowerCase()) ||
      e.phone.includes(enquirySearch) ||
      (e.goal && e.goal.toLowerCase().includes(enquirySearch.toLowerCase()));

    if (enquiryStatusFilter === 'all') return matchesSearch;
    return matchesSearch && e.status === enquiryStatusFilter;
  });

  const countNew = enquiries.filter((e) => e.status === 'new').length;
  const countContacted = enquiries.filter((e) => e.status === 'contacted' || (e.status as any) === 'in_review').length;
  const countEnrolled = enquiries.filter((e) => e.status === 'enrolled').length;
  const checklistApproved = checklist.filter((c) => c.status === 'approved' || c.status === 'confirmé').length;

  return (
    <div className="min-h-screen bg-slate-100/70 pb-24">
      {/* Top Admin Header */}
      <header className="bg-[#082238] text-white sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#F5B82E] text-slate-950 font-black text-sm flex items-center justify-center shadow">
                FS
              </div>
              <div>
                <span className="font-extrabold text-sm sm:text-base tracking-tight">FormaSEO.ma</span>
                <span className="ml-2 text-[10px] font-bold uppercase bg-yellow-500/20 text-[#F5B82E] px-2 py-0.5 rounded-full border border-yellow-500/30">
                  Panel Direction
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={loadData}
                className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Actualiser les données en temps réel"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#F5B82E]' : ''}`} />
              </button>
              <Link
                to="/"
                className="px-3.5 py-2 rounded-full border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Voir le site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => {
                  api.auth.logout();
                  window.location.href = '/';
                }}
                className="px-3.5 py-2 rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-bold transition-colors cursor-pointer"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Admin KPI Quick Stats Bar */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-black text-sm">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-black text-slate-900">{enquiries.length}</div>
                <div className="text-[11px] font-semibold text-slate-500">Candidatures totales</div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F5B82E] text-slate-950 flex items-center justify-center font-black text-sm">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-black text-amber-950">{countNew}</div>
                <div className="text-[11px] font-bold text-amber-800">À contacter (Nouveaux)</div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-sm">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-black text-emerald-950">{countEnrolled}</div>
                <div className="text-[11px] font-bold text-emerald-800">Inscrits confirmés</div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-sky-50/70 border border-sky-200/80 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#082238] text-white flex items-center justify-center font-black text-sm">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-black text-slate-900">
                  {checklistApproved} / {checklist.length || 6}
                </div>
                <div className="text-[11px] font-semibold text-slate-500">Validation pré-lancement</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-2 sm:gap-4 py-2.5">
            {[
              { id: 'enquiries', label: `Candidatures (${enquiries.length})`, icon: UserCheck, badge: countNew > 0 ? countNew : null },
              { id: 'checklist', label: `Checklist Validation (${checklistApproved}/${checklist.length || 6})`, icon: FileCheck },
              { id: 'settings', label: 'Paramètres Académie', icon: Settings },
              { id: 'curriculum', label: 'Programme 5 Semaines', icon: BookOpen },
              { id: 'faqs', label: `FAQ (${faqs.length})`, icon: HelpCircle },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#082238] text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#F5B82E]' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="px-2 py-0.5 rounded-full bg-[#F5B82E] text-slate-950 font-black text-[10px]">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Floating Success Notification */}
        {saveMessage && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-950 rounded-2xl flex items-center gap-3 text-xs sm:text-sm font-bold shadow-md animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{saveMessage}</span>
          </div>
        )}

        {/* TAB 1: ENQUIRIES & APPLICATIONS MANAGEMENT */}
        {activeTab === 'enquiries' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    Candidatures & Inscriptions Reçues ({filteredEnquiries.length})
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Consultez, contactez par WhatsApp/Téléphone et gérez le statut de chaque candidat.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {/* Export CSV Button */}
                  <button
                    onClick={exportEnquiriesToCSV}
                    className="px-4 py-2.5 rounded-2xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer transition-colors"
                  >
                    <Download className="w-4 h-4 text-slate-600" />
                    <span>Exporter CSV</span>
                  </button>

                  {/* Search Input */}
                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Rechercher nom, tel..."
                      value={enquirySearch}
                      onChange={(e) => setEnquirySearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-[#F5B82E]"
                    />
                  </div>
                </div>
              </div>

              {/* Status Filter Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-1 border-b border-slate-100 pb-4">
                {[
                  { id: 'all', label: `Toutes (${enquiries.length})` },
                  { id: 'new', label: `Nouveaux (${countNew})` },
                  { id: 'contacted', label: `Contactés (${countContacted})` },
                  { id: 'enrolled', label: `Inscrits (${countEnrolled})` },
                  { id: 'archived', label: 'Archivés' },
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setEnquiryStatusFilter(st.id as any)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      enquiryStatusFilter === st.id
                        ? 'bg-[#082238] text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>

              {/* Enquiries List */}
              <div className="space-y-4 pt-2">
                {filteredEnquiries.length === 0 ? (
                  <div className="p-12 text-center bg-slate-50 rounded-3xl text-slate-500 text-sm space-y-2">
                    <Users className="w-8 h-8 text-slate-400 mx-auto" />
                    <p className="font-semibold">Aucune candidature ne correspond à votre filtre.</p>
                  </div>
                ) : (
                  filteredEnquiries.map((enq) => {
                    const cleanPhone = enq.phone.replace(/[^0-9+]/g, '');
                    const whatsappUrl = `https://wa.me/${cleanPhone.startsWith('+') ? cleanPhone.slice(1) : cleanPhone}?text=${encodeURIComponent(
                      `Bonjour ${enq.name}, suite à votre demande sur FormaSEO.ma pour la formation SEO & Marketing Digital, je me permets de vous contacter...`
                    )}`;

                    return (
                      <div
                        key={enq.id}
                        className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 hover:border-slate-300 transition-all shadow-sm space-y-4"
                      >
                        {/* Header Row */}
                        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                          <div className="flex items-center gap-3.5">
                            <span className="w-11 h-11 rounded-2xl bg-[#082238] text-[#F5B82E] font-black text-sm flex items-center justify-center shadow-sm">
                              {enq.name.charAt(0).toUpperCase()}
                            </span>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-black text-base text-slate-900">{enq.name}</h4>
                                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                                  {enq.profileType || 'Candidat'}
                                </span>
                              </div>
                              <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>
                                  Reçu le {new Date(enq.createdAt).toLocaleDateString('fr-FR')} à{' '}
                                  {new Date(enq.createdAt).toLocaleTimeString('fr-FR', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Quick Actions & Status Changer */}
                          <div className="flex flex-wrap items-center gap-2">
                            {/* WhatsApp Direct Action */}
                            <a
                              href={whatsappUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>WhatsApp</span>
                            </a>

                            {/* Direct Call */}
                            <a
                              href={`tel:${enq.phone}`}
                              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                              title="Appeler directement"
                            >
                              <Phone className="w-4 h-4" />
                            </a>

                            {/* Direct Email */}
                            <a
                              href={`mailto:${enq.email}`}
                              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                              title="Envoyer un email"
                            >
                              <Mail className="w-4 h-4" />
                            </a>

                            {/* Status Selector */}
                            <select
                              value={enq.status}
                              onChange={(e) => handleEnquiryStatus(enq.id, e.target.value)}
                              className={`text-xs font-extrabold py-2 px-3 rounded-xl border outline-none cursor-pointer ${
                                enq.status === 'new'
                                  ? 'bg-amber-100 border-amber-300 text-amber-950'
                                  : enq.status === 'enrolled'
                                  ? 'bg-emerald-100 border-emerald-300 text-emerald-950'
                                  : enq.status === 'contacted'
                                  ? 'bg-sky-100 border-sky-300 text-sky-950'
                                  : 'bg-slate-100 border-slate-200 text-slate-700'
                              }`}
                            >
                              <option value="new">🟡 Nouveau</option>
                              <option value="contacted">🔵 Contacté</option>
                              <option value="enrolled">🟢 Inscrit / Validé</option>
                              <option value="archived">⚪ Archivé</option>
                            </select>

                            {/* Delete button */}
                            <button
                              onClick={() => handleDeleteEnquiry(enq.id)}
                              className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                              title="Supprimer la candidature"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Candidate Details Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-50/80 p-4 rounded-2xl border border-slate-100">
                          <div>
                            <span className="text-slate-400 font-semibold block mb-0.5">Téléphone :</span>
                            <span className="font-bold text-slate-900">{enq.phone}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 font-semibold block mb-0.5">Email :</span>
                            <span className="font-bold text-slate-900">{enq.email}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 font-semibold block mb-0.5">Format préféré :</span>
                            <span className="font-bold text-slate-900">
                              {enq.preferredFormat === 'presentiel_casablanca'
                                ? 'Présentiel Casablanca'
                                : enq.preferredFormat === 'en_ligne'
                                ? 'En Ligne'
                                : 'Flexible'}
                            </span>
                          </div>
                        </div>

                        {/* Project Goal */}
                        {enq.goal && (
                          <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-100 text-xs text-slate-800">
                            <span className="font-extrabold text-amber-950 block mb-1">
                              Objectif & Projet Digital :
                            </span>
                            {enq.goal}
                          </div>
                        )}

                        {/* Notes / Comments for internal follow-up */}
                        <div className="pt-1">
                          {activeEnquiryNotesId === enq.id ? (
                            <div className="space-y-2 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                              <label className="block text-xs font-bold text-slate-700">
                                Note interne sur le candidat :
                              </label>
                              <textarea
                                rows={2}
                                value={enquiryNotesDraft}
                                onChange={(e) => setEnquiryNotesDraft(e.target.value)}
                                placeholder="Ex: Appelé le 14/10, intéressé par la session de samedi..."
                                className="w-full p-2.5 text-xs bg-white border border-slate-300 rounded-xl outline-none focus:border-[#F5B82E]"
                              />
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => setActiveEnquiryNotesId(null)}
                                  className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-200"
                                >
                                  Annuler
                                </button>
                                <button
                                  onClick={() => handleSaveEnquiryNotes(enq.id)}
                                  className="px-4 py-1.5 rounded-lg bg-[#082238] text-white text-xs font-bold flex items-center gap-1.5"
                                >
                                  <Save className="w-3.5 h-3.5" />
                                  <span>Enregistrer</span>
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between text-xs">
                              <div className="text-slate-500 italic">
                                {enq.notes ? `Note : ${enq.notes}` : 'Aucune note interne ajoutée.'}
                              </div>
                              <button
                                onClick={() => {
                                  setActiveEnquiryNotesId(enq.id);
                                  setEnquiryNotesDraft(enq.notes || '');
                                }}
                                className="text-xs font-bold text-slate-700 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                                <span>{enq.notes ? 'Modifier la note' : '+ Ajouter une note'}</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: OWNER PRE-LAUNCH CHECKLIST */}
        {activeTab === 'checklist' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    Checklist de Validation Propriétaire
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Validation obligatoire avant lancement public pour certifier l’exactitude de chaque information diffusée.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsAddingChecklist(true)}
                    className="px-4 py-2.5 rounded-2xl bg-[#082238] text-white font-bold text-xs flex items-center gap-2 hover:bg-slate-800 transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-[#F5B82E]" />
                    <span>Ajouter un point</span>
                  </button>
                  <div className="px-4 py-2 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 font-black text-xs">
                    {checklistApproved} / {checklist.length} Validés
                  </div>
                </div>
              </div>

              {/* Add checklist item form */}
              {isAddingChecklist && (
                <form
                  onSubmit={handleAddChecklistItem}
                  className="p-5 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-3 animate-in fade-in"
                >
                  <h4 className="text-xs font-black text-amber-950 uppercase tracking-wide">
                    Nouveau point de vérification
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <input
                        type="text"
                        required
                        placeholder="Ex: Validation de la formule de paiement échelonné..."
                        value={newChecklistLabel}
                        onChange={(e) => setNewChecklistLabel(e.target.value)}
                        className="w-full p-2.5 text-xs bg-white border border-slate-200 rounded-xl outline-none focus:border-[#F5B82E]"
                      />
                    </div>
                    <div>
                      <select
                        value={newChecklistCategory}
                        onChange={(e) => setNewChecklistCategory(e.target.value)}
                        className="w-full p-2.5 text-xs bg-white border border-slate-200 rounded-xl outline-none"
                      >
                        <option value="Lancement">Lancement</option>
                        <option value="Tarifs">Tarifs</option>
                        <option value="Pédagogie">Pédagogie</option>
                        <option value="Légal">Légal & Contact</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingChecklist(false)}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-1.5 rounded-xl bg-[#082238] text-white text-xs font-black"
                    >
                      Ajouter
                    </button>
                  </div>
                </form>
              )}

              {/* Checklist list */}
              <div className="space-y-3">
                {checklist.map((item) => {
                  const isDone = item.status === 'approved' || item.status === 'confirmé';
                  return (
                    <div
                      key={item.id}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        isDone
                          ? 'bg-emerald-50/70 border-emerald-200 shadow-xs'
                          : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                              isDone ? 'bg-emerald-200 text-emerald-900' : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {item.category || 'Général'}
                          </span>
                          <h4 className="font-extrabold text-sm text-slate-900">
                            {item.label || item.title}
                          </h4>
                        </div>
                        {item.notes && <p className="text-xs text-slate-600">{item.notes}</p>}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleToggleChecklist(item.id, item.status)}
                          className={`px-5 py-2.5 rounded-full text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                            isDone
                              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                              : 'bg-[#F5B82E] hover:bg-[#E5A91E] text-slate-950'
                          }`}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{isDone ? 'Validé par le propriétaire' : 'Marquer comme Validé'}</span>
                        </button>
                        <button
                          onClick={() => handleDeleteChecklistItem(item.id)}
                          className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-200 transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ACADEMY CONFIGURATION */}
        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-4xl">
            <form onSubmit={handleSaveSettings} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Configuration & Coordonnées Officielles
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Les modifications apportées ici sont immédiatement répercutées sur l’ensemble du site FormaSEO.ma.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Nom de l'Académie
                  </label>
                  <input
                    type="text"
                    value={settings.academyName || (settings as any).name || 'FormaSEO.ma'}
                    onChange={(e) => setSettings({ ...settings, academyName: e.target.value })}
                    className="w-full p-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#F5B82E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Prochaine date de session
                  </label>
                  <input
                    type="text"
                    value={settings.nextSessionDate || 'Session 2026 (Inscriptions Ouvertes)'}
                    onChange={(e) => setSettings({ ...settings, nextSessionDate: e.target.value })}
                    className="w-full p-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#F5B82E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Durée & Format
                  </label>
                  <input
                    type="text"
                    value={settings.duration || '5 semaines intensives (Présentiel & En Ligne)'}
                    onChange={(e) => setSettings({ ...settings, duration: e.target.value })}
                    className="w-full p-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#F5B82E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Adresse physique officielle (Casablanca)
                  </label>
                  <input
                    type="text"
                    value={settings.address || (settings as any).addressNote || 'Avenue Mers Sultan, Casablanca, Maroc'}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    className="w-full p-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#F5B82E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Email officiel de contact
                  </label>
                  <input
                    type="email"
                    value={settings.email || 'contact@formaseo.ma'}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    className="w-full p-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#F5B82E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Téléphone & WhatsApp officiel
                  </label>
                  <input
                    type="text"
                    value={settings.phone || '+212 6 00 00 00 00'}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    className="w-full p-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#F5B82E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Modalités & Tarifs (Note affichée)
                </label>
                <textarea
                  rows={3}
                  value={settings.priceNote || 'Tarifs et facilités de paiement communiqués sur demande pour chaque cohorte.'}
                  onChange={(e) => setSettings({ ...settings, priceNote: e.target.value })}
                  className="w-full p-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#F5B82E]"
                />
              </div>

              <button
                type="submit"
                className="px-8 py-3.5 rounded-full bg-[#082238] hover:bg-slate-800 text-white font-black text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4 text-[#F5B82E]" />
                <span>Enregistrer les paramètres</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: CURRICULUM SYLLABUS EDITOR */}
        {activeTab === 'curriculum' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Éditeur du Programme Pratique (5 Semaines)
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Modifiez les modules, objectifs et ateliers livrables de chaque semaine de formation.
                </p>
              </div>

              <div className="space-y-6">
                {curriculum.map((week) => (
                  <div
                    key={week.weekNumber}
                    className="p-5 sm:p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4 shadow-xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
                      <div className="flex items-center gap-3 flex-1">
                        <span className="w-10 h-10 rounded-xl bg-[#082238] text-[#F5B82E] font-black text-xs sm:text-sm flex items-center justify-center shrink-0">
                          S0{week.weekNumber}
                        </span>
                        <input
                          type="text"
                          value={week.title}
                          onChange={(e) => handleUpdateWeekField(week.weekNumber, 'title', e.target.value)}
                          className="font-black text-sm sm:text-base text-slate-900 bg-white border border-slate-200 rounded-xl px-3 py-2 w-full outline-none focus:border-[#F5B82E]"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={(week as any).hours || '8h Pratique'}
                          onChange={(e) => handleUpdateWeekField(week.weekNumber, 'hours', e.target.value)}
                          className="text-xs font-bold px-3 py-2 bg-white border border-slate-200 rounded-xl outline-none w-28 text-center"
                        />
                        <button
                          onClick={() => handleSaveWeek(week.weekNumber)}
                          disabled={savingWeek === week.weekNumber}
                          className="px-4 py-2 rounded-xl bg-[#082238] hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <Save className="w-3.5 h-3.5 text-[#F5B82E]" />
                          <span>{savingWeek === week.weekNumber ? 'Enregistrement...' : 'Sauvegarder'}</span>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          Objectif de la semaine
                        </label>
                        <input
                          type="text"
                          value={week.objective || (week as any).focus || ''}
                          onChange={(e) => handleUpdateWeekField(week.weekNumber, 'objective', e.target.value)}
                          className="w-full p-2.5 text-xs bg-white border border-slate-200 rounded-xl outline-none focus:border-[#F5B82E]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-amber-900 mb-1">
                          Atelier pratique / Livrable concret
                        </label>
                        <input
                          type="text"
                          value={week.practicalWorkshop || (week as any).deliverable || ''}
                          onChange={(e) => handleUpdateWeekField(week.weekNumber, 'practicalWorkshop', e.target.value)}
                          className="w-full p-2.5 text-xs bg-amber-50 border border-amber-200 rounded-xl outline-none focus:border-[#F5B82E] font-bold text-amber-950"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: FAQS MANAGEMENT */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    Gestion des Questions Fréquentes (FAQ)
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Ajoutez, modifiez ou supprimez les réponses officielles apportées aux candidats.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setEditingFaqId(null);
                    setFaqForm({ question: '', answer: '', category: 'Général' });
                    setIsAddingFaq(true);
                  }}
                  className="px-5 py-2.5 rounded-2xl bg-[#082238] text-white font-bold text-xs flex items-center gap-2 hover:bg-slate-800 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-[#F5B82E]" />
                  <span>Nouvelle question</span>
                </button>
              </div>

              {/* Add / Edit FAQ Modal Form */}
              {isAddingFaq && (
                <form
                  onSubmit={handleSaveFaq}
                  className="p-6 bg-slate-50 border border-slate-200 rounded-3xl space-y-4 animate-in fade-in"
                >
                  <h4 className="text-sm font-black text-slate-900">
                    {editingFaqId ? 'Modifier la question FAQ' : 'Ajouter une question FAQ'}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">Question</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: La formation est-elle finançable ?"
                        value={faqForm.question}
                        onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                        className="w-full p-2.5 text-xs bg-white border border-slate-300 rounded-xl outline-none focus:border-[#F5B82E]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Catégorie</label>
                      <input
                        type="text"
                        value={faqForm.category}
                        onChange={(e) => setFaqForm({ ...faqForm, category: e.target.value })}
                        placeholder="Pédagogie, Tarifs, Inscriptions..."
                        className="w-full p-2.5 text-xs bg-white border border-slate-300 rounded-xl outline-none focus:border-[#F5B82E]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Réponse détaillée</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Expliquez la réponse clairement..."
                      value={faqForm.answer}
                      onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                      className="w-full p-2.5 text-xs bg-white border border-slate-300 rounded-xl outline-none focus:border-[#F5B82E]"
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingFaq(false)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-xl bg-[#082238] text-white text-xs font-black flex items-center gap-1.5"
                    >
                      <Save className="w-3.5 h-3.5 text-[#F5B82E]" />
                      <span>{editingFaqId ? 'Mettre à jour' : 'Ajouter la FAQ'}</span>
                    </button>
                  </div>
                </form>
              )}

              {/* FAQ List */}
              <div className="space-y-3">
                {faqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 hover:border-slate-300 transition-all flex flex-col justify-between"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-200 text-slate-700">
                          {faq.category || 'Général'}
                        </span>
                        <h4 className="font-extrabold text-sm text-slate-900 mt-1">
                          Q : {faq.question}
                        </h4>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          R : {faq.answer}
                        </p>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => {
                            setEditingFaqId(String(faq.id));
                            setFaqForm({
                              question: faq.question,
                              answer: faq.answer,
                              category: faq.category || 'Général',
                            });
                            setIsAddingFaq(true);
                          }}
                          className="p-2 text-slate-600 hover:text-slate-950 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                          title="Modifier"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteFaq(String(faq.id))}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
