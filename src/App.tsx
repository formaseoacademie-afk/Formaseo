import React, { useState, useEffect } from 'react';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ApplicationModal } from './components/common/ApplicationModal';

import { HomePage } from './pages/HomePage';
import { FormationPage } from './pages/FormationPage';
import { ProgrammePage } from './pages/ProgrammePage';
import { AboutPage } from './pages/AboutPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';

// Helper to determine initial page from URL
const getPageFromPath = (): { page: string; param?: string } => {
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase().replace('#', '');

  if (path === '/admin' || hash === 'admin' || path.startsWith('/admin')) return { page: 'admin' };
  if (path === '/formation' || path === '/formations' || hash === 'formation') return { page: 'formation' };
  if (path === '/programme' || path === '/syllabus' || hash === 'programme') return { page: 'programme' };
  if (path === '/about' || path === '/a-propos' || hash === 'about') return { page: 'about' };
  if (path === '/faq' || path === '/questions' || hash === 'faq') return { page: 'faq' };
  if (path === '/contact' || path === '/candidater' || hash === 'contact') return { page: 'contact' };

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
    else if (page === 'formation') urlPath = '/formation';
    else if (page === 'programme') urlPath = '/programme';
    else if (page === 'about') urlPath = '/about';
    else if (page === 'faq') urlPath = '/faq';
    else if (page === 'contact') urlPath = '/contact';
    else if (page === 'admin') urlPath = '/admin';

    try {
      window.history.pushState(null, '', urlPath);
    } catch (e) {
      // pushState fallback
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

        {currentPage === 'formation' && (
          <FormationPage
            onNavigate={handleNavigate}
            onOpenApplyModal={openApplyModal}
          />
        )}

        {currentPage === 'programme' && (
          <ProgrammePage
            onNavigate={handleNavigate}
            onOpenApplyModal={openApplyModal}
          />
        )}

        {currentPage === 'about' && (
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
      {!isAdmin && <Footer onNavigate={handleNavigate} />}

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
