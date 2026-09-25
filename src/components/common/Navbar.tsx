import React, { useState } from 'react';
import { Menu, X, ArrowRight, FileText, Send, Sparkles } from 'lucide-react';
import { Logo } from './Logo';

interface NavbarProps {
  activePage: string;
  onNavigate: (page: string, param?: string) => void;
  onOpenApplyModal: (intent?: 'programme' | 'candidature') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, onNavigate, onOpenApplyModal }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Accueil' },
    { id: 'formation', label: 'La Formation' },
    { id: 'programme', label: 'Programme (5 Semaines)' },
    { id: 'about', label: 'À Propos' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Candidater / Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div onClick={() => onNavigate('home')} className="flex items-center">
            <Logo />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className="relative py-2 text-[14px] font-semibold transition-colors group"
                >
                  <span
                    className={`${
                      isActive
                        ? 'text-slate-900 font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {item.label}
                  </span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#F5B716] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => onOpenApplyModal('programme')}
              className="px-4 py-2.5 rounded-full text-xs font-bold text-slate-800 border border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all flex items-center gap-2"
            >
              <FileText className="w-3.5 h-3.5 text-[#F5B716]" />
              <span>Demander le programme</span>
            </button>

            <button
              onClick={() => onOpenApplyModal('candidature')}
              className="px-5 py-2.5 rounded-full text-xs font-black bg-[#F5B716] hover:bg-[#E0A30B] text-slate-950 transition-all shadow-sm hover:shadow flex items-center gap-2 group"
            >
              <span>Candidater</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`block w-full text-left py-2.5 px-3 rounded-xl text-sm font-bold ${
                activePage === item.id ? 'bg-yellow-50 text-slate-900 border-l-4 border-[#F5B716]' : 'text-slate-600'
              }`}
            >
              {item.label}
            </button>
          ))}

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenApplyModal('programme');
              }}
              className="w-full py-3 rounded-full border border-slate-300 font-bold text-slate-800 text-xs flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4 text-[#F5B716]" />
              <span>Demander le programme</span>
            </button>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenApplyModal('candidature');
              }}
              className="w-full py-3 rounded-full bg-[#F5B716] font-black text-slate-950 text-xs flex items-center justify-center gap-2"
            >
              <span>Candidater à la prochaine session</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
