import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Clock, Share2, Tag, ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { Article } from '../types';
import { api } from '../services/api';

interface ArticleDetailPageProps {
  articleSlug: string;
  onBackToBlog: () => void;
  onNavigate: (page: string) => void;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({
  articleSlug,
  onBackToBlog,
  onNavigate,
}) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      const art = await api.getArticleBySlug(articleSlug);
      setArticle(art);
      setLoading(false);
    };
    fetchArticle();
  }, [articleSlug]);

  if (loading) {
    return <div className="py-32 text-center text-slate-500 font-bold">Chargement de l'article...</div>;
  }

  if (!article) {
    return (
      <div className="py-24 text-center max-w-lg mx-auto px-4">
        <h2 className="text-2xl font-black text-slate-900 mb-2">Article introuvable</h2>
        <button
          onClick={onBackToBlog}
          className="px-6 py-2.5 bg-[#F5B716] text-slate-950 font-bold rounded-full text-xs mt-4"
        >
          Retour au blog
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Back button */}
      <button
        onClick={onBackToBlog}
        className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Retour à tous les articles</span>
      </button>

      {/* Article Header */}
      <div className="space-y-4">
        <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-900 text-xs font-black rounded-full">
          {article.category}
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          {article.title}
        </h1>

        <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <p className="font-bold text-slate-900">{article.author.name}</p>
              <p className="text-[10px] text-slate-400">{article.author.role}</p>
            </div>
          </div>
          <span className="text-slate-300">|</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> {article.publishedAt}
          </span>
          <span className="text-slate-300">|</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {article.readTimeMinutes} min de lecture
          </span>
        </div>
      </div>

      {/* Thumbnail */}
      <div className="aspect-[16/9] rounded-3xl overflow-hidden shadow-lg bg-slate-100">
        <img src={article.thumbnail} alt={article.title} className="w-full h-full object-cover" />
      </div>

      {/* Body Content */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base whitespace-pre-line">
        {article.content}
        
        {/* Additional contextual deep-dive */}
        <div className="p-6 bg-slate-50 rounded-2xl border-l-4 border-[#F5B716] my-6 space-y-2">
          <h4 className="font-bold text-slate-900 text-sm">Ce qu'il faut retenir :</h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Le référencement moderne récompense l'expérience humaine réelle, la vitesse d'affichage irréprochable et un ciblage sémantique chirurgical. Prenez le temps de bâtir des fondations saines avant d'investir massivement en netlinking.
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-100">
          {article.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Recommended Academy CTA Box */}
      <div className="bg-[#0A263B] text-white p-8 rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h4 className="text-xl font-black text-white">Vous souhaitez aller plus loin ?</h4>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Apprenez à appliquer ces stratégies sur vos propres projets avec notre accompagnement personnalisé.
          </p>
        </div>
        <button
          onClick={() => onNavigate('courses')}
          className="px-6 py-3 bg-[#F5B716] hover:bg-[#E0A30B] text-slate-950 font-black rounded-full text-xs shrink-0 flex items-center gap-2"
        >
          <span>Voir nos formations</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
