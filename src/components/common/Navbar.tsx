import React, { useState } from 'react';
import { Search, ArrowRight, Menu, X, User as UserIcon, BookOpen, LogOut } from 'lucide-react';
import { Logo } from './Logo';
import { useAuth } from '../../context/AuthContext';
import { useCurrency } from '../../context/CurrencyContext';

interface NavbarProps {
  activePage: string;
  onNavigate: (page: string, param?: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, onNavigate, onOpenSearch }) => {
  const { user, logout, openAuthModal } = useAuth();
  const { currency, setCurrency } = useCurrency();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Accueil' },
    { id: 'courses', label: 'Formations' },
    { id: 'about', label: 'À propos' },
    { id: 'pricing', label: 'Tarifs' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div onClick={() => onNavigate('home')} className="flex items-center">
            <Logo />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className="relative py-2 text-[15px] font-semibold transition-colors group"
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
                  {/* Active yellow bar indicator (exact match to mockup) */}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[3.5px] bg-[#F5B716] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Search Button */}
            <button
              onClick={onOpenSearch}
              aria-label="Rechercher une formation"
              className="p-2.5 text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-full transition-colors"
            >
              <Search className="w-5 h-5 stroke-[2.2]" />
            </button>

            {/* Currency Selector */}
            <div className="flex items-center bg-slate-100 rounded-full p-0.5 text-xs font-bold text-slate-600">
              <button
                onClick={() => setCurrency('MAD')}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  currency === 'MAD' ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-900'
                }`}
              >
                DH
              </button>
              <button
                onClick={() => setCurrency('EUR')}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  currency === 'EUR' ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-900'
                }`}
              >
                €
              </button>
            </div>

            {/* User Auth state */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-slate-200 hover:border-slate-300 transition-all bg-white"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border border-brand-accent"
                  />
                  <span className="text-sm font-bold text-slate-800 max-w-[120px] truncate">
                    {user.name}
                  </span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs text-slate-400 font-medium">Connecté en tant que</p>
                      <p className="text-sm font-bold text-slate-800 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onNavigate('dashboard');
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2.5"
                    >
                      <BookOpen className="w-4 h-4 text-brand-accent" />
                      Espace Étudiant
                    </button>
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2.5"
                    >
                      <LogOut className="w-4 h-4" />
                      Se déconnecter
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                {/* Se connecter */}
                <button
                  onClick={() => openAuthModal('login')}
                  className="px-5 py-2.5 rounded-full text-[14px] font-semibold text-slate-800 border border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all"
                >
                  Se connecter
                </button>

                {/* S'inscrire -> (exact button from UX) */}
                <button
                  onClick={() => openAuthModal('register')}
                  className="px-5 py-2.5 rounded-full text-[14px] font-bold bg-[#F5B716] hover:bg-[#E0A30B] text-slate-950 transition-all shadow-sm hover:shadow flex items-center gap-2 group"
                >
                  <span>S'inscrire</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-full"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`block w-full text-left py-2.5 px-3 rounded-xl text-base font-semibold ${
                activePage === item.id ? 'bg-yellow-50 text-slate-900 border-l-4 border-[#F5B716]' : 'text-slate-600'
              }`}
            >
              {item.label}
            </button>
          ))}
          {user ? (
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <button
                onClick={() => {
                  onNavigate('dashboard');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-3 text-center bg-slate-900 text-white font-bold rounded-full"
              >
                Mon Espace Étudiant
              </button>
              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-2 text-center text-red-600 font-semibold"
              >
                Se déconnecter
              </button>
            </div>
          ) : (
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  openAuthModal('login');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-full border border-slate-300 font-bold text-slate-800"
              >
                Se connecter
              </button>
              <button
                onClick={() => {
                  openAuthModal('register');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-full bg-[#F5B716] font-bold text-slate-950 flex items-center justify-center gap-2"
              >
                <span>S'inscrire</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
