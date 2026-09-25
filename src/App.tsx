import React, { useState, useEffect } from 'react';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { VideoModal } from './components/common/VideoModal';
import { SearchModal } from './components/common/SearchModal';
import { AuthModal } from './components/common/AuthModal';

import { HomePage } from './pages/HomePage';
import { CoursesPage } from './pages/CoursesPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { CourseLearnPage } from './pages/CourseLearnPage';
import { AboutPage } from './pages/AboutPage';
import { PricingPage } from './pages/PricingPage';
import { BlogPage } from './pages/BlogPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { ContactPage } from './pages/ContactPage';
import { DashboardPage } from './pages/DashboardPage';
import { AdminPage } from './pages/AdminPage';

import { AuthProvider } from './context/AuthContext';
import { CurrencyProvider } from './context/CurrencyContext';

// Helper to determine initial page from window location URL
const getPageFromPath = (): { page: string; param?: string } => {
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase().replace('#', '');

  if (path === '/admin' || hash === 'admin' || path.startsWith('/admin')) return { page: 'admin' };
  if (path === '/courses' || path === '/formations' || hash === 'courses') return { page: 'courses' };
  if (path === '/about' || path === '/a-propos' || hash === 'about') return { page: 'about' };
  if (path === '/pricing' || path === '/tarifs' || hash === 'pricing') return { page: 'pricing' };
  if (path === '/blog' || hash === 'blog') return { page: 'blog' };
  if (path === '/contact' || hash === 'contact') return { page: 'contact' };
  if (path === '/dashboard' || path === '/espace-etudiant' || hash === 'dashboard') return { page: 'dashboard' };

  if (path.startsWith('/course/')) {
    const slug = path.replace('/course/', '');
    return { page: 'course-detail', param: slug };
  }
  if (path.startsWith('/learn/')) {
    const slug = path.replace('/learn/', '');
    return { page: 'course-learn', param: slug };
  }
  if (path.startsWith('/blog/')) {
    const slug = path.replace('/blog/', '');
    return { page: 'article-detail', param: slug };
  }

  return { page: 'home' };
};

export const AppContent: React.FC = () => {
  const initial = getPageFromPath();
  const [currentPage, setCurrentPage] = useState(initial.page);
  const [courseSlug, setCourseSlug] = useState<string>(initial.param || 'seo-debutant-fondations');
  const [articleSlug, setArticleSlug] = useState<string>(initial.param || 'guide-seo-maroc-2026');
  const [initialCategory, setInitialCategory] = useState<string>('all');

  // Modals state
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // Sync with browser history and URL bar
  useEffect(() => {
    const onPopState = () => {
      const current = getPageFromPath();
      setCurrentPage(current.page);
      if (current.param) {
        if (current.page === 'course-detail' || current.page === 'course-learn') {
          setCourseSlug(current.param);
        } else if (current.page === 'article-detail') {
          setArticleSlug(current.param);
        }
      }
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const handleNavigate = (page: string, param?: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    let urlPath = '/';
    if (page === 'home') urlPath = '/';
    else if (page === 'admin') urlPath = '/admin';
    else if (page === 'courses') {
      urlPath = '/courses';
      if (param) setInitialCategory(param);
      else setInitialCategory('all');
    }
    else if (page === 'about') urlPath = '/about';
    else if (page === 'pricing') urlPath = '/pricing';
    else if (page === 'blog') urlPath = '/blog';
    else if (page === 'contact') urlPath = '/contact';
    else if (page === 'dashboard') urlPath = '/dashboard';
    else if (page === 'course-detail' && param) {
      setCourseSlug(param);
      urlPath = `/course/${param}`;
    } else if (page === 'article-detail' && param) {
      setArticleSlug(param);
      urlPath = `/blog/${param}`;
    }

    try {
      window.history.pushState(null, '', urlPath);
    } catch (e) {
      // Ignore if pushState blocked
    }

    setCurrentPage(page);
  };

  const handleStartLearning = (slug: string) => {
    setCourseSlug(slug);
    try {
      window.history.pushState(null, '', `/learn/${slug}`);
    } catch (e) {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage('course-learn');
  };

  const isClassroomMode = currentPage === 'course-learn';

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFD] text-slate-900 font-sans selection:bg-[#F5B716] selection:text-slate-950">
      
      {/* Navbar (hidden in focus classroom mode) */}
      {!isClassroomMode && (
        <Navbar
          activePage={currentPage}
          onNavigate={handleNavigate}
          onOpenSearch={() => setIsSearchModalOpen(true)}
        />
      )}

      {/* Main Page View */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenVideo={() => setIsVideoModalOpen(true)}
          />
        )}

        {currentPage === 'courses' && (
          <CoursesPage
            initialCategory={initialCategory}
            onSelectCourse={(slug) => handleNavigate('course-detail', slug)}
          />
        )}

        {currentPage === 'course-detail' && (
          <CourseDetailPage
            courseSlug={courseSlug}
            onNavigate={handleNavigate}
            onStartLearning={handleStartLearning}
          />
        )}

        {currentPage === 'course-learn' && (
          <CourseLearnPage
            courseSlug={courseSlug}
            onBackToCourse={() => handleNavigate('course-detail', courseSlug)}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'pricing' && (
          <PricingPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'blog' && (
          <BlogPage
            onSelectArticle={(slug) => handleNavigate('article-detail', slug)}
          />
        )}

        {currentPage === 'article-detail' && (
          <ArticleDetailPage
            articleSlug={articleSlug}
            onBackToBlog={() => handleNavigate('blog')}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage />
        )}

        {currentPage === 'dashboard' && (
          <DashboardPage
            onStartLearning={handleStartLearning}
            onExploreCourses={() => handleNavigate('courses')}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'admin' && (
          <AdminPage
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Footer (hidden in classroom mode) */}
      {!isClassroomMode && <Footer onNavigate={handleNavigate} />}

      {/* Global Modals */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        onExploreCourses={() => handleNavigate('courses')}
      />

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectCourse={(slug) => handleNavigate('course-detail', slug)}
        onSelectArticle={(slug) => handleNavigate('article-detail', slug)}
      />

      <AuthModal />

    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <CurrencyProvider>
        <AppContent />
      </CurrencyProvider>
    </AuthProvider>
  );
}
