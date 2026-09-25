import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowUp, ArrowDown, Play, Sparkles, CheckCircle, ChevronRight } from 'lucide-react';
import { Course } from '../../types';

interface HeroSectionProps {
  courses: Course[];
  onExploreCourses: () => void;
  onOpenVideo: () => void;
  onSelectCourse: (slug: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  courses,
  onExploreCourses,
  onOpenVideo,
  onSelectCourse,
}) => {
  // Slider cards for the hero
  const heroSliderCards = [
    {
      id: 'slide-1',
      title: 'SEO Débutant',
      slug: 'seo-debutant-fondations',
      desc: 'Apprenez les bases du SEO et lancez votre première stratégie.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      badge: 'Indispensable',
    },
    {
      id: 'slide-2',
      title: 'SEO Avancé',
      slug: 'seo-avance-technique-semantique',
      desc: 'Maîtrisez les techniques avancées et passez au niveau supérieur.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      badge: 'Expert',
    },
    {
      id: 'slide-3',
      title: 'Rédaction SEO',
      slug: 'redaction-seo-ia',
      desc: 'Créez du contenu optimisé qui séduit Google et convertit.',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80',
      badge: 'IA & Copywriting',
    },
    {
      id: 'slide-4',
      title: 'SEO Business',
      slug: 'seo-business-ecommerce',
      desc: 'Utilisez le SEO pour développer votre entreprise ou votre carrière.',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80',
      badge: 'E-commerce & B2B',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Auto rotation
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroSliderCards.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlay, heroSliderCards.length]);

  const handlePrev = () => {
    setIsAutoPlay(false);
    setActiveIndex((prev) => (prev - 1 + heroSliderCards.length) % heroSliderCards.length);
  };

  const handleNext = () => {
    setIsAutoPlay(false);
    setActiveIndex((prev) => (prev + 1) % heroSliderCards.length);
  };

  // Reorder cards so the active card is always at the top followed by next items
  const visibleCards = [
    heroSliderCards[activeIndex],
    heroSliderCards[(activeIndex + 1) % heroSliderCards.length],
    heroSliderCards[(activeIndex + 2) % heroSliderCards.length],
  ];

  return (
    <section className="relative px-3 sm:px-6 lg:px-8 pt-3 pb-8">
      {/* Dark Navy Fluid Curved Container matching mockup */}
      <div className="relative mx-auto max-w-[1340px] bg-[#0A263B] rounded-3xl lg:rounded-[3rem] overflow-hidden shadow-2xl border border-slate-800/80">
        {/* Subtle mesh light orbs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#F5B716]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Hero Copy & Actions */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 z-10">
            
            {/* Eyebrow badge: - FORMATIONS EN LIGNE (exact UX format) */}
            <div className="inline-flex items-center gap-2.5">
              <span className="w-6 h-1 bg-[#F5B716] rounded-full inline-block" />
              <span className="text-[#F5B716] text-xs sm:text-sm font-extrabold uppercase tracking-[0.18em]">
                Formations en ligne
              </span>
            </div>

            {/* Main Heading: Votre École de SEO en Ligne (exact UX copy & highlighting) */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black tracking-tight text-white leading-[1.12]">
              Votre École de <br className="hidden sm:inline" />
              <span className="text-[#F5B716]">SEO en Ligne</span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
              Formations pratiques, claires et 100% en ligne pour progresser à votre rythme et atteindre vos objectifs.
            </p>

            {/* Action Buttons: Découvrir les formations -> and Voir la présentation */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              
              {/* Primary Yellow Button */}
              <button
                onClick={onExploreCourses}
                className="px-7 py-4 rounded-full bg-[#F5B716] hover:bg-[#E0A30B] text-slate-950 font-extrabold text-base transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-yellow-500/20 flex items-center justify-center gap-2.5 group"
              >
                <span>Découvrir les formations</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5" />
              </button>

              {/* Secondary Presentation Button (exact UX pill with play button) */}
              <button
                onClick={onOpenVideo}
                className="px-6 py-4 rounded-full border border-slate-600/80 bg-slate-900/40 hover:bg-slate-800/80 text-white font-bold text-base transition-all flex items-center justify-center gap-3 group backdrop-blur-sm"
              >
                <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#F5B716] group-hover:text-slate-950 transition-colors">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </span>
                <span>Voir la présentation</span>
              </button>
            </div>

            {/* Social Trust Indicators */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-300 border-t border-slate-800/80">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#F5B716]" />
                <span>2 850+ étudiants formés</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#F5B716]" />
                <span>Accès à vie & Mises à jour 2026</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Vertical Course Carousel (exact UX match) */}
          <div className="lg:col-span-6 relative flex items-center gap-4 sm:gap-6">
            
            {/* Cards Stack */}
            <div
              className="flex-1 space-y-4"
              onMouseEnter={() => setIsAutoPlay(false)}
              onMouseLeave={() => setIsAutoPlay(true)}
            >
              {visibleCards.map((slide, idx) => {
                const isPrimary = idx === 0;
                return (
                  <div
                    key={`${slide.id}-${idx}`}
                    onClick={() => onSelectCourse(slide.slug)}
                    className={`group relative bg-white rounded-3xl p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer transition-all duration-300 shadow-xl ${
                      isPrimary
                        ? 'opacity-100 scale-100 ring-2 ring-[#F5B716]/60 shadow-yellow-500/10'
                        : idx === 1
                        ? 'opacity-95 scale-[0.98] hover:opacity-100'
                        : 'opacity-70 scale-[0.96] hover:opacity-90 hidden sm:flex'
                    }`}
                  >
                    {/* Left text in card */}
                    <div className="flex-1 min-w-0 pr-2">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-4 h-1 bg-[#F5B716] rounded-full inline-block" />
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                          {slide.badge}
                        </span>
                      </div>
                      
                      <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 group-hover:text-brand-dark transition-colors">
                        {slide.title}
                      </h3>
                      
                      <p className="text-slate-600 text-xs sm:text-sm mt-1 line-clamp-2 leading-snug">
                        {slide.desc}
                      </p>

                      {/* Yellow Circle Arrow Button inside card (exact match to UX) */}
                      <div className="mt-3 inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#F5B716] text-slate-950 group-hover:bg-[#E0A30B] group-hover:scale-110 transition-all shadow">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Right photo in card (exact photography style) */}
                    <div className="relative w-28 h-28 sm:w-36 sm:h-32 shrink-0 rounded-2xl overflow-hidden shadow-inner bg-slate-100">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Vertical Pagination Bar on the far right (exact match to UX) */}
            <div className="hidden sm:flex flex-col items-center justify-center gap-4 py-2 select-none">
              
              {/* Up arrow */}
              <button
                onClick={handlePrev}
                aria-label="Formation précédente"
                className="w-10 h-10 rounded-full bg-slate-800/80 hover:bg-[#F5B716] text-slate-300 hover:text-slate-950 border border-slate-700 flex items-center justify-center transition-all"
              >
                <ArrowUp className="w-5 h-5" />
              </button>

              {/* Vertical dotted bar with active yellow indicator */}
              <div className="relative flex flex-col items-center gap-2.5 py-2">
                <div className="w-[2px] h-24 bg-slate-800 rounded-full absolute" />
                {heroSliderCards.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setIsAutoPlay(false);
                      setActiveIndex(i);
                    }}
                    aria-label={`Aller au slide ${i + 1}`}
                    className={`relative z-10 transition-all rounded-full ${
                      activeIndex === i
                        ? 'w-3 h-3 bg-[#F5B716] ring-4 ring-[#F5B716]/30'
                        : 'w-2 h-2 bg-slate-600 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>

              {/* Down arrow */}
              <button
                onClick={handleNext}
                aria-label="Formation suivante"
                className="w-10 h-10 rounded-full bg-slate-800/80 hover:bg-[#F5B716] text-slate-300 hover:text-slate-950 border border-slate-700 flex items-center justify-center transition-all"
              >
                <ArrowDown className="w-5 h-5" />
              </button>
            </div>

          </div>

        </div>

        {/* Bottom decorative smooth wave curve */}
        <div className="w-full h-4 bg-gradient-to-r from-transparent via-[#F5B716]/20 to-transparent" />
      </div>
    </section>
  );
};
