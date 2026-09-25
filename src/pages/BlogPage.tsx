import React, { useState, useEffect } from 'react';
import { Search, Calendar, Clock, ArrowRight, BookOpen, Tag } from 'lucide-react';
import { Article } from '../types';
import { api } from '../services/api';

interface BlogPageProps {
  onSelectArticle: (slug: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onSelectArticle }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      const list = await api.getArticles(search || undefined);
      setArticles(list);
      setLoading(false);
    };
    fetchArticles();
  }, [search]);

  return (
    <div className="min-h-screen py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Header */}
      <div className="bg-[#0A263B] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-slate-800">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-5 h-1 bg-[#F5B716] rounded-full inline-block" />
            <span className="text-xs font-black uppercase tracking-wider text-[#F5B716]">
              Le Blog FormaSeo
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
            Analyses, Études de Cas & Actualités Google
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Restez à la pointe du SEO avec nos décryptages d'algorithmes, guides pratiques et retours d'expérience sur le marché marocain et international.
          </p>
        </div>
      </div>

      {/* Search bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher un article ou un mot-clé..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-2xl outline-none focus:border-[#F5B716] shadow-sm"
          />
        </div>
      </div>

      {/* Articles Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-500 font-bold">Chargement des articles...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((art) => (
            <article
              key={art.id}
              onClick={() => onSelectArticle(art.slug)}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={art.thumbnail}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-[#F5B716] text-[11px] font-bold px-3 py-1 rounded-full">
                    {art.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {art.publishedAt}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {art.readTimeMinutes} min de lecture
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 group-hover:text-brand-dark transition-colors line-clamp-2 mb-2">
                    {art.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <img
                      src={art.author.avatar}
                      alt={art.author.name}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <span className="text-xs font-bold text-slate-700">{art.author.name}</span>
                  </div>
                  <div className="text-xs font-bold text-[#F5B716] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    <span>Lire</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

    </div>
  );
};
