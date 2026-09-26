import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ApplicationModal } from './components/common/ApplicationModal';

// Public Pages
import { HomePage } from './pages/HomePage';
import { FormationDigitalPage } from './pages/FormationDigitalPage';
import { FormationSeoPage } from './pages/FormationSeoPage';
import { FormationWordPressPage } from './pages/FormationWordPressPage';
import { ProgrammePage } from './pages/ProgrammePage';
import { ResourcesPage } from './pages/ResourcesPage';
import { AboutPage } from './pages/AboutPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { CertificateVerifyPage } from './pages/CertificateVerifyPage';

// Student LMS Pages
import { StudentDashboardPage } from './pages/student/StudentDashboardPage';
import { StudentCourseViewPage } from './pages/student/StudentCourseViewPage';
import { StudentLessonPlayerPage } from './pages/student/StudentLessonPlayerPage';
import { StudentCertificatesPage } from './pages/student/StudentCertificatesPage';
import { StudentProfilePage } from './pages/student/StudentProfilePage';

// Admin CRM & Settings
import { AdminPage } from './pages/AdminPage';

// ScrollToTop on route change helper
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Layout with Navbar and Footer
const MainLayout: React.FC<{ children: React.ReactNode; onOpenApplyModal: (intent?: 'programme' | 'candidature') => void }> = ({
  children,
  onOpenApplyModal,
}) => {
  const location = useLocation();
  const isLessonPlayer = location.pathname.includes('/lesson/');
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFD] text-slate-900 font-sans selection:bg-[#F5B716] selection:text-slate-950">
      {!isLessonPlayer && !isAdminPage && <Navbar onOpenApplyModal={onOpenApplyModal} />}
      <main className="flex-1">{children}</main>
      {!isLessonPlayer && !isAdminPage && <Footer onOpenApplyModal={onOpenApplyModal} />}
    </div>
  );
};

export const AppContent: React.FC = () => {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applyModalIntent, setApplyModalIntent] = useState<'programme' | 'candidature'>('candidature');
  const navigate = useNavigate();

  const openApplyModal = (intent: 'programme' | 'candidature' = 'candidature') => {
    setApplyModalIntent(intent);
    setIsApplyModalOpen(true);
  };

  // Compatibility navigation function for child components expecting onNavigate prop
  const handleNavigate = (page: string) => {
    switch (page) {
      case 'home':
        navigate('/');
        break;
      case 'formation':
      case 'formation-marketing-digital-casablanca':
        navigate('/formation-marketing-digital-casablanca');
        break;
      case 'formation-seo-casablanca':
        navigate('/formation-seo-casablanca');
        break;
      case 'formation-wordpress-casablanca':
        navigate('/formation-wordpress-casablanca');
        break;
      case 'programme':
      case 'programme-5-semaines':
        navigate('/programme-5-semaines');
        break;
      case 'ressources-seo':
      case 'ressources':
        navigate('/ressources-seo');
        break;
      case 'about':
      case 'a-propos':
        navigate('/a-propos');
        break;
      case 'faq':
        navigate('/faq');
        break;
      case 'contact':
        navigate('/contact');
        break;
      case 'admin':
        navigate('/admin');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <MainLayout onOpenApplyModal={openApplyModal}>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={<HomePage onNavigate={handleNavigate} onOpenApplyModal={openApplyModal} />}
        />
        <Route
          path="/formation-marketing-digital-casablanca"
          element={<FormationDigitalPage onNavigate={handleNavigate} onOpenApplyModal={openApplyModal} />}
        />
        <Route
          path="/formation-seo-casablanca"
          element={<FormationSeoPage onNavigate={handleNavigate} onOpenApplyModal={openApplyModal} />}
        />
        <Route
          path="/formation-wordpress-casablanca"
          element={<FormationWordPressPage onNavigate={handleNavigate} onOpenApplyModal={openApplyModal} />}
        />
        <Route
          path="/formations"
          element={<Navigate to="/formation-marketing-digital-casablanca" replace />}
        />
        <Route
          path="/programme-5-semaines"
          element={<ProgrammePage onNavigate={handleNavigate} onOpenApplyModal={openApplyModal} />}
        />
        <Route
          path="/ressources-seo"
          element={<ResourcesPage onNavigate={handleNavigate} onOpenApplyModal={openApplyModal} />}
        />
        <Route
          path="/a-propos"
          element={<AboutPage onNavigate={handleNavigate} onOpenApplyModal={openApplyModal} />}
        />
        <Route
          path="/faq"
          element={<FaqPage onNavigate={handleNavigate} onOpenApplyModal={openApplyModal} />}
        />
        <Route
          path="/contact"
          element={<ContactPage />}
        />
        <Route
          path="/login"
          element={<LoginPage />}
        />
        <Route
          path="/register"
          element={<RegisterPage />}
        />
        <Route
          path="/certificates/:certificateNumber"
          element={<CertificateVerifyPage />}
        />

        {/* Student Protected LMS Routes */}
        <Route
          path="/student"
          element={
            <ProtectedRoute>
              <Navigate to="/student/dashboard" replace />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute>
              <StudentDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/courses"
          element={
            <ProtectedRoute>
              <Navigate to="/student/dashboard" replace />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/courses/:slug"
          element={
            <ProtectedRoute>
              <StudentCourseViewPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/courses/:slug/lesson/:lessonId"
          element={
            <ProtectedRoute>
              <StudentLessonPlayerPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/certificates"
          element={
            <ProtectedRoute>
              <StudentCertificatesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/profile"
          element={
            <ProtectedRoute>
              <StudentProfilePage />
            </ProtectedRoute>
          }
        />

        {/* Admin Protected Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN']}>
              <AdminPage onNavigate={handleNavigate} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN']}>
              <AdminPage onNavigate={handleNavigate} />
            </ProtectedRoute>
          }
        />

        {/* Fallback 404 Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Global Application Modal */}
      <ApplicationModal
        isOpen={isApplyModalOpen}
        intent={applyModalIntent}
        onClose={() => setIsApplyModalOpen(false)}
      />
    </MainLayout>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}
