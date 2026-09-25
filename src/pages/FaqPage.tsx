import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  ArrowRight, 
  MessageCircle, 
  FileText, 
  Search,
  CheckCircle2
} from 'lucide-react';
import { useFaqs } from '../services/api';

interface FaqPageProps {
  onNavigate: (page: string, param?: string) => void;
  onOpenApplyModal?: (intent?: 'programme' | 'candidature') => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigate, onOpenApplyModal }) => {
  const { data: faqs, isLoading } = useFaqs();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openIds, setOpenIds] = useState<(string | number)[]>(['1', '2', 1, 2]);

  const toggleFaq = (id: string | number) => {
    if (openIds.includes(id)) {
      setOpenIds(openIds.filter((item) => item !== id));
    } else {
      setOpenIds([...openIds, id]);
    }
  };

  const categories = [
    { id: 'all', label: 'Toutes les questions' },
    { id: 'general', label: 'Organisation & Format' },
    { id: 'programme', label: 'Programme & Outils' },
    { id: 'prerequis', label: 'Prérequis & Matériel' },
    { id: 'tarifs', label: 'Inclusions & Tarifs' },
  ];

  const filteredFaqs = (faqs || []).filter((item) => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-16 pb-20">
      
      {/* Header Banner */}
      <section className="bg-[#082238] text-white py-16 sm:py-20 relative overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F5B716]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-xs text-[#F5B716] font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Centre d'Aide & Questions Fréquentes</span>
          </div>

          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Foire Aux Questions FormaSEO.ma
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed">
              Tout ce que vous devez savoir sur le déroulement de la formation, le matériel inclus, les prérequis et les prochaines sessions à Casablanca.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-xl relative pt-2">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pt-1" />
            <input
              type="text"
              placeholder="Rechercher une question (ex: WordPress, Casablanca, prérequis, prix)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-400 text-xs sm:text-sm outline-none focus:border-[#F5B716] shadow-lg"
            />
          </div>

        </div>
      </section>

      {/* Categories & FAQs */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 sm:gap-3 border-b border-slate-200 pb-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#082238] text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQs List */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 text-sm">
              Aucune question ne correspond à votre recherche. N'hésitez pas à nous contacter directement !
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openIds.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 select-none hover:bg-slate-50/50 transition-colors"
                  >
                    <span className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug">
                      {faq.question}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 sm:px-7 sm:pb-7 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

      </section>

      {/* Still have questions CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#082238] rounded-3xl p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl font-black">
              Vous avez une question spécifique sur votre situation ?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Notre équipe d'orientation est à votre disposition pour vous répondre en toute clarté.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 rounded-full bg-[#F5B716] hover:bg-[#E0A30B] text-slate-950 font-black text-xs transition-all shadow"
            >
              Poser une question
            </button>
            <button
              onClick={() => {
                if (onOpenApplyModal) onOpenApplyModal('candidature');
                else onNavigate('contact');
              }}
              className="px-6 py-3 rounded-full border border-slate-700 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
            >
              Candidater
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
