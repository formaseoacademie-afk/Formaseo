import React, { useState, useEffect } from 'react';
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
  Sparkles,
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
} from 'lucide-react';
import { api } from '../services/api';
import { AcademySettings, CurriculumWeek, FaqItem, Enquiry } from '../types';
import { fallbackSettings, fallbackCurriculum, fallbackFaqs } from '../config/defaultData';

interface AdminPageProps {
  onNavigate: (page: string, param?: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  // Direct Auth Gate
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'checklist' | 'enquiries' | 'settings' | 'curriculum' | 'faqs'>('checklist');

  // Live Data State
  const [settings, setSettings] = useState<AcademySettings>(fallbackSettings);
  const [curriculum, setCurriculum] = useState<CurriculumWeek[]>(fallbackCurriculum);
  const [faqs, setFaqs] = useState<FaqItem[]>(fallbackFaqs);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [checklist, setChecklist] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // Search & Filter
  const [enquirySearch, setEnquirySearch] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'admin' || passwordInput === 'formaseo2026' || passwordInput === 'admin123') {
      setIsAuthenticated(true);
      setAuthError('');
      loadData();
    } else {
      setAuthError('Mot de passe incorrect. Accès strictement réservé à la direction FormaSEO.ma.');
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [st, cur, fq, enq, chk] = await Promise.all([
        api.getSettings(),
        api.getCurriculum(),
        api.getFaqs(),
        api.getEnquiries(),
        api.getChecklist(),
      ]);
      if (st) setSettings(st);
      if (cur) setCurriculum(cur);
      if (fq) setFaqs(fq);
      if (enq) setEnquiries(enq);
      if (chk) setChecklist(chk);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  // Checklist Update
  const handleToggleChecklist = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'approved' ? 'pending' : 'approved';
    const updated = checklist.map((item) =>
      item.id === id ? { ...item, status: nextStatus } : item
    );
    setChecklist(updated);
    await api.updateChecklist(id, nextStatus);
  };

  // Settings Save
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveMessage('');
    const res = await api.updateSettings(settings);
    if (res) {
      setSaveMessage('Paramètres de l’académie enregistrés avec succès !');
      setTimeout(() => setSaveMessage(''), 4000);
    }
  };

  // Curriculum Week Save
  const handleUpdateWeek = async (weekNumber: number, field: string, value: any) => {
    const updated = curriculum.map((w) =>
      w.weekNumber === weekNumber ? { ...w, [field]: value } : w
    );
    setCurriculum(updated);
    const target = updated.find((w) => w.weekNumber === weekNumber);
    if (target) {
      await api.updateCurriculumWeek(weekNumber, target);
    }
  };

  // Enquiry Status Update
  const handleEnquiryStatus = async (id: string, status: string) => {
    const updated = enquiries.map((enq) =>
      enq.id === id ? { ...enq, status: status as any } : enq
    );
    setEnquiries(updated);
    await api.updateEnquiryStatus(id, status);
  };

  // If NOT authenticated, show confidential login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#082238] text-[#F5B716] flex items-center justify-center mx-auto shadow-md">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black text-slate-900">Espace Administration</h1>
            <p className="text-xs text-slate-500">
              Accès protégé réservé à la direction et au propriétaire de <strong>FormaSEO.ma</strong>.
            </p>
          </div>

          {authError && (
            <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Code d'accès administrateur
              </label>
              <input
                type="password"
                required
                placeholder="Entrez le mot de passe..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full p-3.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#F5B716]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-[#082238] hover:bg-slate-800 text-white font-black text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#F5B716]" />
              <span>Déverrouiller le panneau</span>
            </button>
          </form>

          <div className="pt-2 text-center">
            <button
              onClick={() => onNavigate('home')}
              className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
            >
              ← Retour au site public
            </button>
          </div>
        </div>
      </div>
    );
  }

  const filteredEnquiries = enquiries.filter(
    (e) =>
      e.name.toLowerCase().includes(enquirySearch.toLowerCase()) ||
      e.email.toLowerCase().includes(enquirySearch.toLowerCase()) ||
      e.phone.includes(enquirySearch)
  );

  return (
    <div className="min-h-screen bg-slate-100/60 pb-24">
      
      {/* Top Admin Bar */}
      <header className="bg-[#082238] text-white sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#F5B716] text-slate-950 font-black text-sm flex items-center justify-center">
                FS
              </div>
              <div>
                <span className="font-extrabold text-sm tracking-tight">FormaSEO.ma</span>
                <span className="ml-2 text-[10px] font-bold uppercase bg-yellow-500/20 text-[#F5B716] px-2 py-0.5 rounded-full">
                  Admin Panel
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={loadData}
                className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors"
                title="Actualiser les données"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={() => onNavigate('home')}
                className="px-3.5 py-1.5 rounded-full border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors flex items-center gap-1.5"
              >
                <span>Voir le site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="px-3.5 py-1.5 rounded-full bg-red-600/20 hover:bg-red-600/30 text-red-300 text-xs font-bold transition-colors"
              >
                Déconnexion
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Admin Subheader & Navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-2 sm:gap-6 py-3">
            {[
              { id: 'checklist', label: 'Checklist Validation Propriétaire', icon: FileCheck },
              { id: 'enquiries', label: `Candidatures (${enquiries.length})`, icon: UserCheck },
              { id: 'settings', label: 'Paramètres de l’Académie', icon: Settings },
              { id: 'curriculum', label: 'Syllabus (5 Semaines)', icon: BookOpen },
              { id: 'faqs', label: 'FAQ', icon: HelpCircle },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#082238] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#F5B716]' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {saveMessage && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl flex items-center gap-3 text-xs sm:text-sm font-semibold shadow-sm animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{saveMessage}</span>
          </div>
        )}

        {/* TAB 1: OWNER APPROVAL CHECKLIST */}
        {activeTab === 'checklist' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    Checklist de Validation Propriétaire (Pré-Lancement)
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Tous les points requis dans le cahier des charges pour s'assurer qu'aucune information inexacte n'est diffusée sans approbation.
                  </p>
                </div>
                <div className="px-4 py-2 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 font-bold text-xs">
                  {checklist.filter((c) => c.status === 'approved').length} / {checklist.length} Validés
                </div>
              </div>

              {/* Checklist items */}
              <div className="space-y-3 pt-4">
                {checklist.map((item) => {
                  const isDone = item.status === 'approved';
                  return (
                    <div
                      key={item.id}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        isDone
                          ? 'bg-emerald-50/60 border-emerald-200'
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
                            {item.category}
                          </span>
                          <h4 className="font-extrabold text-sm text-slate-900">{item.title}</h4>
                        </div>
                        <p className="text-xs text-slate-600">{item.description}</p>
                        {item.currentValue && (
                          <div className="text-[11px] font-semibold text-slate-500 pt-0.5">
                            Valeur actuelle affichée : <span className="text-slate-800 font-bold">{item.currentValue}</span>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => handleToggleChecklist(item.id, item.status)}
                        className={`px-5 py-2.5 rounded-full text-xs font-black shrink-0 transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          isDone
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                            : 'bg-[#F5B716] hover:bg-[#E0A30B] text-slate-950'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{isDone ? 'Validé par le propriétaire' : 'Marquer comme Validé'}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ENQUIRIES & APPLICATIONS */}
        {activeTab === 'enquiries' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    Candidatures & Demandes de Renseignements ({enquiries.length})
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Prospects qualifiés ayant soumis le formulaire de candidature ou de demande de programme.
                  </p>
                </div>

                {/* Search */}
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Filtrer par nom, email..."
                    value={enquirySearch}
                    onChange={(e) => setEnquirySearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#F5B716]"
                  />
                </div>
              </div>

              {/* Enquiries Table / Cards */}
              <div className="space-y-3 pt-2">
                {filteredEnquiries.length === 0 ? (
                  <div className="p-8 text-center bg-slate-50 rounded-2xl text-slate-500 text-xs">
                    Aucune candidature enregistrée pour le moment.
                  </div>
                ) : (
                  filteredEnquiries.map((enq) => (
                    <div
                      key={enq.id}
                      className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-all shadow-sm space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-3">
                          <span className="w-9 h-9 rounded-xl bg-slate-900 text-white font-extrabold text-xs flex items-center justify-center">
                            {enq.name.charAt(0).toUpperCase()}
                          </span>
                          <div>
                            <h4 className="font-extrabold text-sm text-slate-900">{enq.name}</h4>
                            <div className="text-[11px] text-slate-500">
                              Reçu le {new Date(enq.createdAt).toLocaleDateString('fr-FR')} à {new Date(enq.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                        </div>

                        {/* Status selector */}
                        <div className="flex items-center gap-2">
                          <select
                            value={enq.status}
                            onChange={(e) => handleEnquiryStatus(enq.id, e.target.value)}
                            className="text-xs font-bold py-1.5 px-3 bg-slate-100 rounded-xl border border-slate-200 outline-none cursor-pointer"
                          >
                            <option value="new">Nouveau 🟡</option>
                            <option value="contacted">Contacté 🔵</option>
                            <option value="enrolled">Inscrit / Validé 🟢</option>
                            <option value="archived">Archivé ⚪</option>
                          </select>
                        </div>
                      </div>

                      {/* Details Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div className="flex items-center gap-2 text-slate-700">
                          <Phone className="w-4 h-4 text-[#F5B716] shrink-0" />
                          <a href={`tel:${enq.phone}`} className="font-bold hover:underline">
                            {enq.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-slate-700">
                          <Mail className="w-4 h-4 text-[#F5B716] shrink-0" />
                          <a href={`mailto:${enq.email}`} className="font-bold hover:underline">
                            {enq.email}
                          </a>
                        </div>
                        <div className="text-slate-600">
                          <span className="font-semibold">Format :</span> {enq.preferredFormat || 'Présentiel Casablanca'}
                        </div>
                      </div>

                      {/* Goal / Project description */}
                      {enq.goal && (
                        <div className="p-3 rounded-xl bg-slate-50 text-xs text-slate-700">
                          <span className="font-bold text-slate-900 block mb-0.5">Projet & Objectif :</span>
                          {enq.goal}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ACADEMY SETTINGS */}
        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-4xl">
            <form onSubmit={handleSaveSettings} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Configuration Globale de l'Académie
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Modifiez ici les dates de session, adresses et coordonnées officielles qui s'affichent sur tout le site web.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Nom de l'Académie
                  </label>
                  <input
                    type="text"
                    value={settings.academyName}
                    onChange={(e) => setSettings({ ...settings, academyName: e.target.value })}
                    className="w-full p-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#F5B716]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Prochaine date de session
                  </label>
                  <input
                    type="text"
                    value={settings.nextSessionDate}
                    onChange={(e) => setSettings({ ...settings, nextSessionDate: e.target.value })}
                    className="w-full p-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#F5B716]"
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
                    value={settings.duration}
                    onChange={(e) => setSettings({ ...settings, duration: e.target.value })}
                    className="w-full p-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#F5B716]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Adresse officielle (Casablanca)
                  </label>
                  <input
                    type="text"
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    className="w-full p-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#F5B716]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Email de contact
                  </label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    className="w-full p-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#F5B716]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Numéro WhatsApp / Téléphone officiel
                  </label>
                  <input
                    type="text"
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    className="w-full p-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#F5B716]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Remarque sur les tarifs & facilités
                </label>
                <textarea
                  rows={3}
                  value={settings.priceNote}
                  onChange={(e) => setSettings({ ...settings, priceNote: e.target.value })}
                  className="w-full p-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#F5B716]"
                />
              </div>

              <button
                type="submit"
                className="px-8 py-3.5 rounded-full bg-[#082238] hover:bg-slate-800 text-white font-black text-xs sm:text-sm transition-all shadow flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4 text-[#F5B716]" />
                <span>Enregistrer les paramètres</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: CURRICULUM SYLLABUS */}
        {activeTab === 'curriculum' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Éditeur du Programme 5 Semaines
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Ajustez les titres, objectifs et livrables de chaque semaine de formation.
                </p>
              </div>

              <div className="space-y-6">
                {curriculum.map((week) => (
                  <div key={week.weekNumber} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-[#082238] text-white font-black text-xs flex items-center justify-center">
                          S{week.weekNumber}
                        </span>
                        <input
                          type="text"
                          value={week.title}
                          onChange={(e) => handleUpdateWeek(week.weekNumber, 'title', e.target.value)}
                          className="font-extrabold text-sm sm:text-base text-slate-900 bg-transparent border-b border-dashed border-slate-400 focus:border-[#F5B716] outline-none"
                        />
                      </div>
                      <input
                        type="text"
                        value={week.hours}
                        onChange={(e) => handleUpdateWeek(week.weekNumber, 'hours', e.target.value)}
                        className="text-xs font-semibold px-2 py-1 bg-white border border-slate-200 rounded-lg outline-none w-24 text-center"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        Objectif de la semaine
                      </label>
                      <input
                        type="text"
                        value={week.objective}
                        onChange={(e) => handleUpdateWeek(week.weekNumber, 'objective', e.target.value)}
                        className="w-full p-2.5 text-xs bg-white border border-slate-200 rounded-xl outline-none focus:border-[#F5B716]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        Atelier pratique / Livrable
                      </label>
                      <input
                        type="text"
                        value={week.practicalWorkshop}
                        onChange={(e) => handleUpdateWeek(week.weekNumber, 'practicalWorkshop', e.target.value)}
                        className="w-full p-2.5 text-xs bg-amber-50 border border-amber-200 rounded-xl outline-none focus:border-[#F5B716] font-semibold text-amber-950"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: FAQS */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Questions Fréquentes (FAQ)
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Gestion des réponses officielles apportées aux candidats.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {faqs.map((faq) => (
                  <div key={faq.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="font-extrabold text-xs sm:text-sm text-slate-900">
                      Q : {faq.question}
                    </div>
                    <div className="text-xs text-slate-600">
                      R : {faq.answer}
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
