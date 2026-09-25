import React, { useEffect, useState } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { CategoriesSection } from '../components/home/CategoriesSection';
import { StatsSection } from '../components/home/StatsSection';
import { FeaturedCourses } from '../components/home/FeaturedCourses';
import { WhyUsSection } from '../components/home/WhyUsSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { PricingPreviewSection } from '../components/home/PricingPreviewSection';
import { FaqSection } from '../components/home/FaqSection';
import { CtaBanner } from '../components/home/CtaBanner';
import { Course, Category, Review, Stats } from '../types';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

interface HomePageProps {
  onNavigate: (page: string, param?: string) => void;
  onOpenVideo: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenVideo }) => {
  const { openAuthModal } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalStudents: 2850,
    satisfactionRate: 98.4,
    totalHoursTraining: 120,
    certificationsIssued: 1940,
    partnerCompanies: 65,
  });

  useEffect(() => {
    const loadData = async () => {
      const [cList, catList, revList, st] = await Promise.all([
        api.getCourses(),
        api.getCategories(),
        api.getReviews(),
        api.getStats(),
      ]);
      setCourses(cList);
      setCategories(catList);
      setReviews(revList);
      setStats(st);
    };
    loadData();
  }, []);

  return (
    <div className="space-y-4">
      {/* 1. Hero Section (Pixel-perfect UX reproduction) */}
      <HeroSection
        courses={courses}
        onExploreCourses={() => onNavigate('courses')}
        onOpenVideo={onOpenVideo}
        onSelectCourse={(slug) => onNavigate('course-detail', slug)}
      />

      {/* 2. Choose Category Section (Exact UX reproduction) */}
      <CategoriesSection
        categories={categories}
        onSelectCategory={(categorySlug) => onNavigate('courses', categorySlug)}
      />

      {/* 3. Academy Impact Stats */}
      <StatsSection stats={stats} />

      {/* 4. Featured Courses with live filters */}
      <FeaturedCourses
        courses={courses}
        onSelectCourse={(slug) => onNavigate('course-detail', slug)}
        onExploreAll={() => onNavigate('courses')}
      />

      {/* 5. Why Choose FormaSeo */}
      <WhyUsSection />

      {/* 6. Real Student Testimonials */}
      <TestimonialsSection reviews={reviews} />

      {/* 7. Pricing Preview */}
      <PricingPreviewSection
        onSelectPlan={(plan) => onNavigate('pricing')}
        onExplorePricing={() => onNavigate('pricing')}
      />

      {/* 8. FAQ */}
      <FaqSection onContactClick={() => onNavigate('contact')} />

      {/* 9. Final CTA */}
      <CtaBanner
        onRegisterClick={() => openAuthModal('register')}
        onExploreCourses={() => onNavigate('courses')}
      />
    </div>
  );
};
