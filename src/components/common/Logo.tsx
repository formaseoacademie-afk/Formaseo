import React from 'react';
import { Sparkles } from 'lucide-react';

interface LogoProps {
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'dark', size = 'md', showSubtitle = true }) => {
  const isDark = variant === 'dark';

  const textSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  const subTextSizes = {
    sm: 'text-[9px]',
    md: 'text-[11px]',
    lg: 'text-xs',
  };

  return (
    <div className="flex flex-col select-none group cursor-pointer">
      <div className="flex items-center gap-0.5 relative">
        <span className={`font-black tracking-tight ${textSizes[size]} ${isDark ? 'text-[#0B253A]' : 'text-white'}`}>
          Forma
        </span>
        <span className={`font-black tracking-tight ${textSizes[size]} text-[#F5B716] relative`}>
          Seo
          {/* Yellow sunburst / sparkle icon */}
          <span className="absolute -top-1.5 -right-3.5 text-[#F5B716] animate-pulse">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2L14.4 8.6L21 11L14.4 13.4L12 20L9.6 13.4L3 11L9.6 8.6L12 2Z" />
            </svg>
          </span>
        </span>
      </div>
      {showSubtitle && (
        <span
          className={`font-semibold tracking-normal mt-0.5 ${subTextSizes[size]} ${
            isDark ? 'text-slate-600' : 'text-slate-300'
          }`}
        >
          L'Académie N°1 du SEO au Maroc
        </span>
      )}
    </div>
  );
};
