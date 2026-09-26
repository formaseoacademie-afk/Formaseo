import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight, Search, ChevronDown, User, LogOut, LayoutDashboard, Shield, Award, BookOpen } from 'lucide-react';
import { Logo } from './Logo';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  onOpenApplyModal?: (intent?: 'programme' | 'candidature') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenApplyModal }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFormationDropdownOpen, setIsFormationDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const currentPath = location.pathname;

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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      navigate(`/ressources-seo?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center mr-6 shrink-0"
            title="FormaSEO.ma Académie"
          >
            <Logo variant="dark" size="md" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((item) => {
              const isActive = currentPath === item.path || 
                (item.submenu && item.submenu.some(s => s.path === currentPath));

              if (item.hasSubmenu && item.submenu) {
                return (
                  <div
                    key={item.id}
                    className="relative group py-2"
                    onMouseEnter={() => setIsFormationDropdownOpen(true)}
                    onMouseLeave={() => setIsFormationDropdownOpen(false)}
                  >
                    <Link
                      to={item.path}
                      className={`inline-flex items-center gap-1 text-[15px] font-semibold transition-colors ${
                        isActive ? 'text-slate-950 font-bold' : 'text-slate-700 hover:text-slate-950'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform" />
                    </Link>

                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#F5B82E] rounded-full" />
                    )}

                    {/* Submenu dropdown */}
                    <div className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-2.5 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all z-50">
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.id}
                          to={sub.path}
                          className={`block px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                            currentPath === sub.path
                              ? 'bg-amber-50 text-slate-950 font-bold'
                              : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950'
                          }`}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.id}
                  to={item.path}
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
                </Link>
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

            {/* Authenticated User Menu or Auth CTAs */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2.5 p-1.5 pl-3 pr-4 rounded-full bg-slate-100 hover:bg-slate-200/80 transition-all border border-slate-200 cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-brand-primary text-brand-accent flex items-center justify-center font-bold text-xs">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs font-bold text-slate-800 max-w-[120px] truncate">
                    {user.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-fadeIn">
                    <div className="p-3 border-b border-slate-100">
                      <div className="font-bold text-sm text-slate-900 truncate">{user.name}</div>
                      <div className="text-xs text-slate-500 truncate">{user.email}</div>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                        {user.role}
                      </span>
                    </div>

                    <div className="py-1 space-y-1">
                      {['SUPER_ADMIN', 'ADMIN'].includes(user.role) && (
                        <Link
                          to="/admin"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-brand-primary hover:bg-slate-50 transition-colors"
                        >
                          <Shield className="w-4 h-4 text-brand-accent" />
                          <span>Panel d'Administration</span>
                        </Link>
                      )}

                      <Link
                        to="/student/dashboard"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-brand-primary" />
                        <span>Espace Étudiant</span>
                      </Link>

                      <Link
                        to="/student/certificates"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <Award className="w-4 h-4 text-brand-accent" />
                        <span>Mes Certificats</span>
                      </Link>

                      <Link
                        to="/student/profile"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <User className="w-4 h-4 text-slate-500" />
                        <span>Mon Profil</span>
                      </Link>
                    </div>

                    <div className="pt-1 border-t border-slate-100">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Déconnexion</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* Se connecter outline button */}
                <Link
                  to="/login"
                  className="px-6 py-2.5 rounded-full border border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white font-semibold text-sm transition-all duration-200 cursor-pointer shadow-sm"
                >
                  Se connecter
                </Link>

                {/* S'inscrire -> yellow filled button */}
                {onOpenApplyModal ? (
                  <button
                    onClick={() => onOpenApplyModal('candidature')}
                    className="px-6 py-2.5 rounded-full bg-[#F5B82E] hover:bg-[#E5A91E] text-slate-950 font-bold text-sm transition-all duration-200 shadow-sm hover:shadow flex items-center gap-1.5 group cursor-pointer"
                  >
                    <span>S'inscrire</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                ) : (
                  <Link
                    to="/register"
                    className="px-6 py-2.5 rounded-full bg-[#F5B82E] hover:bg-[#E5A91E] text-slate-950 font-bold text-sm transition-all duration-200 shadow-sm hover:shadow flex items-center gap-1.5 group cursor-pointer"
                  >
                    <span>S'inscrire</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                )}
              </>
            )}
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
          <form onSubmit={handleSearchSubmit} className="py-3 px-2 border-t border-slate-100 flex items-center gap-3 animate-fadeIn">
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
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-2"
            >
              Fermer
            </button>
          </form>
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
                    <Link
                      key={sub.id}
                      to={sub.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block py-2.5 px-3 rounded-xl text-xs font-semibold ${
                        currentPath === sub.path ? 'bg-amber-50 text-slate-900 border-l-4 border-[#F5B82E]' : 'text-slate-600'
                      }`}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              );
            }

            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block w-full text-left py-2.5 px-3 rounded-xl text-sm font-semibold ${
                  currentPath === item.path ? 'bg-amber-50 text-slate-900 border-l-4 border-[#F5B82E]' : 'text-slate-600'
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
            {isAuthenticated && user ? (
              <>
                <div className="p-3 bg-slate-50 rounded-xl mb-2">
                  <div className="font-bold text-sm text-slate-900">{user.name}</div>
                  <div className="text-xs text-slate-500">{user.email}</div>
                </div>
                <Link
                  to="/student/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-3 rounded-xl bg-brand-primary text-white font-bold text-sm text-center"
                >
                  Mon Espace Étudiant
                </Link>
                {['SUPER_ADMIN', 'ADMIN'].includes(user.role) && (
                  <Link
                    to="/admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full py-3 rounded-xl bg-slate-800 text-white font-bold text-sm text-center"
                  >
                    Panel Admin
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 text-center text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-3 rounded-full border border-slate-900 font-semibold text-slate-900 text-sm text-center"
                >
                  Se connecter
                </Link>

                <Link
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-3.5 rounded-full bg-[#F5B82E] font-bold text-slate-950 text-sm flex items-center justify-center gap-2"
                >
                  <span>S'inscrire</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
