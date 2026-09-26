import React from 'react';

interface LogoProps {
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'dark', size = 'md', showSubtitle = true }) => {
  const isDark = variant === 'dark';

  const heightClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-14',
  };

  return (
    <div className="flex items-center select-none group cursor-pointer">
      <img
        src={isDark ? '/logo.png' : '/logo-white.png'}
        alt="FormaSeo Académie - L'Académie N°1 du SEO au Maroc"
        className={`${heightClasses[size]} w-auto object-contain transition-transform group-hover:scale-[1.02]`}
      />
    </div>
  );
};
