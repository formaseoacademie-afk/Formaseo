import React, { useState, useEffect } from 'react';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ApplicationModal } from './components/common/ApplicationModal';

import { HomePage } from './pages/HomePage';
import { FormationDigitalPage } from './pages/FormationDigitalPage';
import { FormationSeoPage } from './pages/FormationSeoPage';
import { FormationWordPressPage } from './pages/FormationWordPressPage';
import { ProgrammePage } from './pages/ProgrammePage';
import { ResourcesPage } from './pages/ResourcesPage';
import { AboutPage } from './pages/AboutPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';

// Helper to determine initial page from browser path
const getPageFromPath = (): { page: string; param?: string } => {
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase().replace('#', '');

  if (path === '/admin' || hash === 'admin' || path.startsWith('/admin')) return { page: 'admin' };
  
  // Flagship Marketing Digital Casablanca
  if (
    path === '/formation-marketing-digital-casablanca' ||
    path === '/formation-marketing-digital-maroc' ||
    path === '/formation' ||
    path === '/formations' ||
    hash === 'formation'
  ) {
    return { page: 'formation-marketing-digital-casablanca' };
  }

  // SEO Page
  if (
    path === '/formation-seo-casablanca' ||
    path === '/formation-seo-maroc' ||
    path === '/formation-seo' ||
    path === '/cours-seo' ||
    hash === 'seo'
  ) {
    return { page: 'formation-seo-casablanca' };
  }

  // WordPress Page
  if (
    path === '/formation-wordpress-casablanca' ||
    path === '/formation-wordpress-maroc' ||
    path === '/formation-wordpress' ||
    hash === 'wordpress'
  ) {
    return { page: 'formation-wordpress-casablanca' };
  }

  // Programme
  if (path === '/programme-5-semaines' || path === '/programme' || path === '/syllabus' || hash === 'programme') {
    return { page: 'programme-5-semaines' };
  }

  // Resources
  if (path === '/ressources-seo' || path === '/ressources' || path === '/guides' || hash === 'ressources') {
    return { page: 'ressources-seo' };
  }

  // About
  if (path === '/a-propos' || path === '/about' || hash === 'about') {
    return { page: 'a-propos' };
  }

  // FAQ
  if (path === '/faq' || path === '/questions' || hash === 'faq') {
    return { page: 'faq' };
  }

  // Contact
  if (path === '/contact' || path === '/candidater' || path === '/inscription' || hash === 'contact') {
    return { page: 'contact' };
  }

  return { page: 'home' };
};

export const AppContent: React.FC = () => {
  const initial = getPageFromPath();
  const [currentPage, setCurrentPage] = useState(initial.page);

  // Application Modal state
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applyModalIntent, setApplyModalIntent] = useState<'programme' | 'candidature'>('candidature');

  const openApplyModal = (intent: 'programme' | 'candidature' = 'candidature') => {
    setApplyModalIntent(intent);
    setIsApplyModalOpen(true);
  };

  // Sync with browser back/forward buttons
  useEffect(() => {
    const onPopState = () => {
      const current = getPageFromPath();
      setCurrentPage(current.page);
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const handleNavigate = (page: string, param?: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    let urlPath = '/';
    if (page === 'home') urlPath = '/';
    else if (page === 'formation' || page === 'formation-marketing-digital-casablanca') urlPath = '/formation-marketing-digital-casablanca';
    else if (page === 'formation-seo-casablanca') urlPath = '/formation-seo-casablanca';
    else if (page === 'formation-wordpress-casablanca') urlPath = '/formation-wordpress-casablanca';
    else if (page === 'programme' || page === 'programme-5-semaines') urlPath = '/programme-5-semaines';
    else if (page === 'ressources-seo') urlPath = '/ressources-seo';
    else if (page === 'about' || page === 'a-propos') urlPath = '/a-propos';
    else if (page === 'faq') urlPath = '/faq';
    else if (page === 'contact') urlPath = '/contact';
    else if (page === 'admin') urlPath = '/admin';

    try {
      window.history.pushState(null, '', urlPath);
    } catch (e) {
      // fallback
    }

    setCurrentPage(page);
  };

  const isAdmin = currentPage === 'admin';

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFD] text-slate-900 font-sans selection:bg-[#F5B716] selection:text-slate-950">
      
      {/* Navbar (hidden in admin mode) */}
      {!isAdmin && (
        <Navbar
          activePage={currentPage}
          onNavigate={handleNavigate}
          onOpenApplyModal={openApplyModal}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenApplyModal={openApplyModal}
          />
        )}

        {(currentPage === 'formation' || currentPage === 'formation-marketing-digital-casablanca') && (
          <FormationDigitalPage
            onNavigate={handleNavigate}
            onOpenApplyModal={openApplyModal}
          />
        )}

        {currentPage === 'formation-seo-casablanca' && (
          <FormationSeoPage
            onNavigate={handleNavigate}
            onOpenApplyModal={openApplyModal}
          />
        )}

        {currentPage === 'formation-wordpress-casablanca' && (
          <FormationWordPressPage
            onNavigate={handleNavigate}
            onOpenApplyModal={openApplyModal}
          />
        )}

        {(currentPage === 'programme' || currentPage === 'programme-5-semaines') && (
          <ProgrammePage
            onNavigate={handleNavigate}
            onOpenApplyModal={openApplyModal}
          />
        )}

        {currentPage === 'ressources-seo' && (
          <ResourcesPage
            onNavigate={handleNavigate}
            onOpenApplyModal={openApplyModal}
          />
        )}

        {(currentPage === 'about' || currentPage === 'a-propos') && (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenApplyModal={openApplyModal}
          />
        )}

        {currentPage === 'faq' && (
          <FaqPage
            onNavigate={handleNavigate}
            onOpenApplyModal={openApplyModal}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage />
        )}

        {currentPage === 'admin' && (
          <AdminPage
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Footer (hidden in admin mode) */}
      {!isAdmin && <Footer onNavigate={handleNavigate} onOpenApplyModal={openApplyModal} />}

      {/* Reusable Lead & Application Modal */}
      <ApplicationModal
        isOpen={isApplyModalOpen}
        intent={applyModalIntent}
        onClose={() => setIsApplyModalOpen(false)}
      />

    </div>
  );
};

export default function App() {
  return <AppContent />;
}
