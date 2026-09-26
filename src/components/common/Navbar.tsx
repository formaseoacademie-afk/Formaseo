import React, { useState } from 'react';
import { Menu, X, ArrowRight, Search, ChevronDown } from 'lucide-react';
import { Logo } from './Logo';

interface NavbarProps {
  activePage: string;
  onNavigate: (page: string, param?: string) => void;
  onOpenApplyModal: (intent?: 'programme' | 'candidature') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, onNavigate, onOpenApplyModal }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFormationDropdownOpen, setIsFormationDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { id: 'home', path: '/', label: 'Accueil' },
    { 
      id: 'formation', 
      path: '/formation-marketing-digital-casablanca', 
      label: 'Formations',
      hasSubmenu: true,
      submenu: [
        { id: 'formation-marketing-digital-casablanca', path: '/formation-marketing-digital-casablanca', label: 'Marketing Digital & SEO (Casablanca)' },
        { id: 'formation-seo-casablanca', path: '/formation-seo-casablanca', label: 'Formation SEO & Référencement Google' },
        { id: 'formation-wordpress-casablanca', path: '/formation-wordpress-casablanca', label: 'Formation WordPress & Création Web' },
      ]
    },
    { id: 'a-propos', path: '/a-propos', label: 'À propos' },
    { id: 'programme-5-semaines', path: '/programme-5-semaines', label: 'Tarifs' },
    { id: 'ressources-seo', path: '/ressources-seo', label: 'Blog' },
    { id: 'contact', path: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('home');
            }}
            className="flex items-center mr-6 shrink-0"
            title="FormaSEO.ma Académie"
          >
            <Logo variant="dark" size="md" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((item) => {
              const isActive = activePage === item.id || 
                (item.id === 'home' && (activePage === 'home' || activePage === '')) ||
                (item.submenu && item.submenu.some(s => s.id === activePage));

              if (item.hasSubmenu && item.submenu) {
                return (
                  <div
                    key={item.id}
                    className="relative group py-2"
                    onMouseEnter={() => setIsFormationDropdownOpen(true)}
                    onMouseLeave={() => setIsFormationDropdownOpen(false)}
                  >
                    <a
                      href={item.path}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(item.id);
                      }}
                      className={`inline-flex items-center gap-1 text-[15px] font-semibold transition-colors ${
                        isActive ? 'text-slate-950 font-bold' : 'text-slate-700 hover:text-slate-950'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform" />
                    </a>

                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#F5B82E] rounded-full" />
                    )}

                    {/* Submenu dropdown */}
                    <div className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-2.5 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all z-50">
                      {item.submenu.map((sub) => (
                        <a
                          key={sub.id}
                          href={sub.path}
                          onClick={(e) => {
                            e.preventDefault();
                            setIsFormationDropdownOpen(false);
                            onNavigate(sub.id);
                          }}
                          className={`block px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                            activePage === sub.id
                              ? 'bg-amber-50 text-slate-950 font-bold'
                              : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950'
                          }`}
                        >
                          {sub.label}
                        </a>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <a
                  key={item.id}
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(item.id);
                  }}
                  className="relative py-2 text-[15px] font-semibold transition-colors group"
                >
                  <span
                    className={`${
                      isActive
                        ? 'text-slate-950 font-bold'
                        : 'text-slate-700 hover:text-slate-950'
                    }`}
                  >
                    {item.label}
                  </span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#F5B82E] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Rechercher"
              className="w-10 h-10 rounded-full flex items-center justify-center text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <Search className="w-5 h-5 stroke-[2.2]" />
            </button>

            {/* Se connecter outline button */}
            <button
              onClick={() => onOpenApplyModal('programme')}
              className="px-6 py-2.5 rounded-full border border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white font-semibold text-sm transition-all duration-200 cursor-pointer shadow-sm"
            >
              Se connecter
            </button>

            {/* S'inscrire -> yellow filled button */}
            <button
              onClick={() => onOpenApplyModal('candidature')}
              className="px-6 py-2.5 rounded-full bg-[#F5B82E] hover:bg-[#E5A91E] text-slate-950 font-bold text-sm transition-all duration-200 shadow-sm hover:shadow flex items-center gap-1.5 group cursor-pointer"
            >
              <span>S'inscrire</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center lg:hidden gap-2">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
              aria-label="Rechercher"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Search Bar Dropdown */}
        {isSearchOpen && (
          <div className="py-3 px-2 border-t border-slate-100 flex items-center gap-3 animate-fadeIn">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher une formation, un guide SEO, un cours..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm text-slate-900 focus:outline-none focus:border-[#F5B82E] focus:bg-white"
                autoFocus
              />
            </div>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-2"
            >
              Fermer
            </button>
          </div>
        )}
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((item) => {
            if (item.submenu) {
              return (
                <div key={item.id} className="space-y-1 py-1">
                  <div className="px-3 py-1 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {item.label}
                  </div>
                  {item.submenu.map((sub) => (
                    <a
                      key={sub.id}
                      href={sub.path}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(sub.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`block py-2.5 px-3 rounded-xl text-xs font-semibold ${
                        activePage === sub.id ? 'bg-amber-50 text-slate-900 border-l-4 border-[#F5B82E]' : 'text-slate-600'
                      }`}
                    >
                      {sub.label}
                    </a>
                  ))}
                </div>
              );
            }

            return (
              <a
                key={item.id}
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left py-2.5 px-3 rounded-xl text-sm font-semibold ${
                  activePage === item.id ? 'bg-amber-50 text-slate-900 border-l-4 border-[#F5B82E]' : 'text-slate-600'
                }`}
              >
                {item.label}
              </a>
            );
          })}

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenApplyModal('programme');
              }}
              className="w-full py-3 rounded-full border border-slate-900 font-semibold text-slate-900 text-sm"
            >
              Se connecter
            </button>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenApplyModal('candidature');
              }}
              className="w-full py-3.5 rounded-full bg-[#F5B82E] font-bold text-slate-950 text-sm flex items-center justify-center gap-2"
            >
              <span>S'inscrire</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
