import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, ArrowRight, FileText, Tag, Sparkles } from 'lucide-react';
import { Course, Article } from '../../types';
import { api } from '../../services/api';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCourse: (slug: string) => void;
  onSelectArticle: (slug: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectCourse,
  onSelectArticle,
}) => {
  const [query, setQuery] = useState('');
  const [courses, setCourses] = useState<Course[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      return;
    }
    const fetchAll = async () => {
      setLoading(true);
      const [cList, aList] = await Promise.all([api.getCourses(), api.getArticles()]);
      setCourses(cList);
      setArticles(aList);
      setLoading(false);
    };
    fetchAll();
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredCourses = query.trim()
    ? courses.filter(
        (c) =>
          c.title.toLowerCase().includes(query.toLowerCase()) ||
          c.shortDescription.toLowerCase().includes(query.toLowerCase()) ||
          c.categoryName.toLowerCase().includes(query.toLowerCase())
      )
    : courses.slice(0, 3);

  const filteredArticles = query.trim()
    ? articles.filter(
        (a) =>
          a.title.toLowerCase().includes(query.toLowerCase()) ||
          a.excerpt.toLowerCase().includes(query.toLowerCase())
      )
    : articles.slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        {/* Search Input Bar */}
        <div className="relative flex items-center px-6 py-4 border-b border-slate-100">
          <Search className="w-6 h-6 text-[#F5B716] mr-3 shrink-0" />
          <input
            type="text"
            placeholder="Rechercher une formation, un cours, un mot-clé (ex: débutant, cocons sémantiques)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full text-slate-800 placeholder-slate-400 text-base font-medium outline-none bg-transparent"
          />
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results */}
        <div className="max-h-[70vh] overflow-y-auto p-6 space-y-6">
          {/* Quick Suggestions Tags */}
          {!query && (
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#F5B716]" /> Recherches populaires
              </p>
              <div className="flex flex-wrap gap-2">
                {['SEO Débutant', 'SEO Avancé', 'Rédaction IA', 'Cocon Sémantique', 'SEO E-commerce', 'Netlinking'].map(
                  (tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="text-xs font-semibold px-3 py-1.5 bg-slate-100 hover:bg-yellow-100 hover:text-slate-950 text-slate-700 rounded-full transition-colors"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {/* Courses List */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-brand-accent" /> Formations ({filteredCourses.length})
              </h4>
            </div>

            {filteredCourses.length === 0 ? (
              <p className="text-sm text-slate-400 py-3 text-center">Aucune formation trouvée pour "{query}"</p>
            ) : (
              <div className="space-y-2.5">
                {filteredCourses.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => {
                      onSelectCourse(c.slug);
                      onClose();
                    }}
                    className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 cursor-pointer transition-all group"
                  >
                    <img
                      src={c.thumbnail}
                      alt={c.title}
                      className="w-14 h-14 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800">
                          {c.categoryName}
                        </span>
                        <span className="text-xs text-slate-400">{c.level}</span>
                      </div>
                      <h5 className="text-sm font-bold text-slate-800 group-hover:text-brand-dark truncate mt-0.5">
                        {c.title}
                      </h5>
                      <p className="text-xs text-slate-500 truncate">{c.shortDescription}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#F5B716] group-hover:translate-x-1 transition-all shrink-0" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Blog Articles */}
          {filteredArticles.length > 0 && (
            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-sky-500" /> Articles & Guides ({filteredArticles.length})
              </h4>
              <div className="space-y-2">
                {filteredArticles.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => {
                      onSelectArticle(art.slug);
                      onClose();
                    }}
                    className="p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <h5 className="text-sm font-bold text-slate-800 hover:text-sky-600 transition-colors">
                      {art.title}
                    </h5>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{art.excerpt}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
