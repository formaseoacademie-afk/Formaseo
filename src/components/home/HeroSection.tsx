import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowUp, ArrowDown, Play, X } from 'lucide-react';

interface HeroSectionProps {
  onExploreFormation: () => void;
  onOpenApplyModal: (intent?: 'programme' | 'candidature') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreFormation,
  onOpenApplyModal,
}) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Cards data matching the screenshot
  const heroCards = [
    {
      id: 'debutant',
      title: 'SEO Débutant',
      desc: 'Apprenez les bases du SEO et lancez votre première stratégie.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      alt: 'SEO Débutant FormaSEO',
    },
    {
      id: 'avance',
      title: 'SEO Avancé',
      desc: 'Maîtrisez les techniques avancées et passez au niveau supérieur.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      alt: 'SEO Avancé FormaSEO',
    },
    {
      id: 'redaction',
      title: 'Rédaction SEO',
      desc: 'Créez du contenu optimisé et positionnez vos articles.',
      image: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=600&q=80',
      alt: 'Rédaction SEO FormaSEO',
    },
    {
      id: 'business',
      title: 'SEO E-commerce',
      desc: 'Multipliez vos ventes avec une stratégie de visibilité durable.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      alt: 'SEO Business FormaSEO',
    },
  ];

  const totalCards = heroCards.length;
  // Loop buffer for smooth infinite vertical scrolling
  const allCards = [...heroCards, ...heroCards, ...heroCards];

  const [currentIndex, setCurrentIndex] = useState(totalCards);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Mobile-aware card step: 144px card + 12px gap = 156px
  const CARD_STEP = 156;

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 3800);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  useEffect(() => {
    if (currentIndex >= totalCards * 2) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(totalCards);
      }, 700);
      return () => clearTimeout(timer);
    }
    if (currentIndex < totalCards) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(totalCards * 2 - 1);
      }, 700);
      return () => clearTimeout(timer);
    }
    if (!isTransitioning) {
      const frame = requestAnimationFrame(() => setIsTransitioning(true));
      return () => cancelAnimationFrame(frame);
    }
  }, [currentIndex, totalCards, isTransitioning]);

  const handlePrev = () => {
    setIsAutoPlay(false);
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    setIsAutoPlay(false);
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const activeIdx = currentIndex % totalCards;

  return (
    <section className="relative px-2.5 sm:px-6 lg:px-8 pt-2 pb-6">
      {/* Main Curved Hero Canvas */}
      <div className="relative mx-auto max-w-7xl bg-[#072434] rounded-[2rem] sm:rounded-[2.5rem] lg:rounded-[3rem] p-6 sm:p-10 lg:p-14 text-white shadow-2xl overflow-hidden border border-slate-800/80">
        
        {/* Subtle Ambient Curved Glow & Ripple Vectors */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Top right ambient circle */}
          <div className="absolute -top-48 -right-48 w-[400px] sm:w-[580px] h-[400px] sm:h-[580px] rounded-full border border-sky-500/10 bg-gradient-to-br from-sky-500/5 to-transparent blur-2xl" />
          {/* Bottom left ambient curve */}
          <div className="absolute -bottom-52 -left-52 w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] rounded-full border border-teal-500/10 bg-gradient-to-tr from-[#F5B82E]/5 to-transparent blur-3xl" />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Hero Typography & Actions */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-7">
            
            {/* Tag / Eyebrow */}
            <div className="flex items-center gap-2.5">
              <span className="w-4 sm:w-5 h-1 bg-[#F5B82E] rounded-full inline-block" />
              <span className="text-white font-bold text-[11px] sm:text-[13px] tracking-[0.16em] uppercase">
                FORMATIONS EN LIGNE
              </span>
            </div>

            {/* Big Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.65rem] font-black tracking-tight leading-[1.1] text-white">
              <span className="block text-white">Votre École de</span>
              <span className="block text-[#F5B82E]">SEO en Ligne</span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-300 text-xs sm:text-base lg:text-[1.05rem] font-normal leading-relaxed max-w-lg">
              Formations pratiques, claires et 100% en ligne pour progresser à votre rythme et atteindre vos objectifs.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
              
              {/* Primary Yellow CTA */}
              <button
                onClick={onExploreFormation}
                className="w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-[#F5B82E] hover:bg-[#E5A91E] text-slate-950 font-bold text-xs sm:text-base transition-all duration-200 transform active:scale-98 shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Découvrir les formations</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Secondary Presentation Button */}
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="w-full sm:w-auto px-5 sm:px-6 py-3.5 sm:py-4 rounded-full border border-slate-600/90 bg-slate-900/40 hover:bg-slate-800/80 text-white font-semibold text-xs sm:text-base transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer group"
              >
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-white/80 flex items-center justify-center group-hover:bg-white group-hover:text-slate-900 transition-colors">
                  <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current ml-0.5" />
                </div>
                <span>Voir la présentation</span>
              </button>

            </div>

          </div>

          {/* Right Hero Cards Vertical Carousel & Controls */}
          <div className="lg:col-span-6 relative flex items-center justify-center sm:justify-end gap-3 sm:gap-5 pt-2 lg:pt-0">
            
            {/* Cards Viewport Track */}
            <div
              className="flex-1 max-w-[420px] h-[320px] sm:h-[340px] overflow-hidden relative rounded-2xl sm:rounded-3xl"
              onMouseEnter={() => setIsAutoPlay(false)}
              onMouseLeave={() => setIsAutoPlay(true)}
            >
              {/* Fade Overlays */}
              <div className="absolute top-0 left-0 right-0 h-5 sm:h-6 bg-gradient-to-b from-[#072434] to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-8 sm:h-10 bg-gradient-to-t from-[#072434] to-transparent z-10 pointer-events-none" />

              {/* Slider Track */}
              <div
                className="flex flex-col gap-3"
                style={{
                  transform: `translateY(calc(-${currentIndex} * ${CARD_STEP}px + 8px))`,
                  transition: isTransitioning
                    ? 'transform 650ms cubic-bezier(0.16, 1, 0.3, 1)'
                    : 'none',
                }}
              >
                {allCards.map((card, idx) => {
                  return (
                    <div
                      key={`${card.id}-${idx}`}
                      onClick={onExploreFormation}
                      style={{ height: '144px' }}
                      className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl flex items-center justify-between border border-white/90 cursor-pointer select-none transition-transform duration-300 active:scale-[0.99]"
                    >
                      {/* Card Content (Left) */}
                      <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between h-full min-w-0">
                        <div>
                          <h3 className="text-sm sm:text-base font-black text-slate-950 group-hover:text-amber-600 transition-colors leading-tight truncate">
                            {card.title}
                          </h3>
                          <p className="text-slate-500 text-[11px] sm:text-xs mt-1 line-clamp-2 leading-relaxed">
                            {card.desc}
                          </p>
                        </div>

                        {/* Yellow Round Arrow Button */}
                        <div className="pt-1">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#F5B82E] text-slate-950 flex items-center justify-center transition-transform group-hover:scale-110 shadow-xs">
                            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </div>
                        </div>
                      </div>

                      {/* Card Person Image (Right) */}
                      <div className="w-28 sm:w-40 h-full shrink-0 relative bg-slate-100 overflow-hidden">
                        <img
                          src={card.image}
                          alt={card.alt}
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Vertical Control Bar with Arrows and Track */}
            <div className="flex flex-col items-center justify-center gap-2.5 sm:gap-3 select-none shrink-0">
              
              {/* Up Button */}
              <button
                onClick={handlePrev}
                aria-label="Formation précédente"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-slate-600/80 bg-slate-900/60 hover:bg-[#F5B82E] text-slate-300 hover:text-slate-950 flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-90"
              >
                <ArrowUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              {/* Slider Track with Dot */}
              <div className="h-28 sm:h-36 w-[2px] bg-slate-700/80 rounded-full relative flex flex-col justify-between items-center py-1 my-0.5">
                {heroCards.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setIsAutoPlay(false);
                      setIsTransitioning(true);
                      setCurrentIndex(totalCards + i);
                    }}
                    aria-label={`Aller au slide ${i + 1}`}
                    className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all cursor-pointer ${
                      activeIdx === i
                        ? 'bg-[#F5B82E] ring-4 ring-[#F5B82E]/30 scale-125'
                        : 'bg-transparent hover:bg-slate-500'
                    }`}
                  />
                ))}
              </div>

              {/* Down Button */}
              <button
                onClick={handleNext}
                aria-label="Formation suivante"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-slate-600/80 bg-slate-900/60 hover:bg-[#F5B82E] text-slate-300 hover:text-slate-950 flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-90"
              >
                <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* Video Presentation Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-3xl bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
            <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#F5B82E]" />
                <h4 className="font-bold text-white text-base">Présentation de FormaSEO Académie</h4>
              </div>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6 text-slate-300 text-sm">
              <div className="aspect-video rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center p-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F5B82E]/20 text-[#F5B82E] flex items-center justify-center">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
                <div>
                  <h5 className="text-white font-bold text-lg mb-1">Méthodologie 100% Pratique FormaSEO</h5>
                  <p className="text-slate-400 text-xs max-w-md">
                    Apprenez le référencement naturel en construisant un vrai site WordPress et en le positionnant en haut des résultats Google.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <p className="text-xs text-slate-400">
                  Besoin d'informations personnalisées pour votre projet ?
                </p>
                <button
                  onClick={() => {
                    setIsVideoModalOpen(false);
                    onOpenApplyModal('candidature');
                  }}
                  className="px-6 py-3 rounded-full bg-[#F5B82E] text-slate-950 font-bold text-xs flex items-center gap-2 hover:bg-[#E5A91E] transition-all cursor-pointer"
                >
                  <span>Rejoindre la prochaine session</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
