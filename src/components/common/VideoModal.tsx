import React from 'react';
import { X, Play, CheckCircle2, Award, Users, BookOpen } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExploreCourses: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, onExploreCourses }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-700/60"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <h3 className="text-white font-bold text-base sm:text-lg">
              Présentation FormaSeo : L'Académie N°1 du SEO au Maroc
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Video Player Box */}
        <div className="relative aspect-video bg-black flex items-center justify-center">
          <iframe
            className="w-full h-full"
            src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0"
            title="Présentation FormaSeo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Video Key Takeaways & CTA */}
        <div className="p-6 bg-slate-900 grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-slate-800">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-yellow-500/10 text-[#F5B716]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Certification Reconnue</h4>
              <p className="text-slate-400 text-xs mt-0.5">Certificat officiel FormaSeo valorisé sur LinkedIn et en entreprise.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-blue-500/10 text-sky-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Communauté VIP</h4>
              <p className="text-slate-400 text-xs mt-0.5">Accès privé Discord / WhatsApp avec les formateurs et 2,800+ référenceurs.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Cas Réels Maroc & Monde</h4>
              <p className="text-slate-400 text-xs mt-0.5">Études de cas concrètes sur l'e-commerce et les services locaux.</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800">
          <p className="text-xs text-slate-400 text-center sm:text-left">
            Prêt à propulser vos sites en première position sur Google ?
          </p>
          <button
            onClick={() => {
              onClose();
              onExploreCourses();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#F5B716] text-slate-950 font-bold text-sm hover:bg-[#E0A30B] transition-all"
          >
            Découvrir toutes les formations
          </button>
        </div>
      </div>
    </div>
  );
};
