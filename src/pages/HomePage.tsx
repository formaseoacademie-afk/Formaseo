import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { CategoryCardsSection } from '../components/home/CategoryCardsSection';
import { AudiencesSection } from '../components/home/AudiencesSection';
import { DeliverablesSection } from '../components/home/DeliverablesSection';
import { CurriculumPreview } from '../components/home/CurriculumPreview';
import { ToolsSection } from '../components/home/ToolsSection';
import { HowItWorksSection } from '../components/home/HowItWorksSection';
import { FounderSpotlight } from '../components/home/FounderSpotlight';
import { FaqSection } from '../components/home/FaqSection';
import { ApplicationFormSection } from '../components/home/ApplicationFormSection';
import { SEOHead } from '../components/common/SEOHead';
import { getOrganizationSchema, getLocalBusinessSchema } from '../config/seoSchemas';

interface HomePageProps {
  onNavigate: (page: string, param?: string) => void;
  onOpenApplyModal: (intent?: 'programme' | 'candidature') => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenApplyModal }) => {
  const orgSchema = getOrganizationSchema();
  const localSchema = getLocalBusinessSchema();

  return (
    <div className="space-y-6 sm:space-y-8 pb-12">
      <SEOHead
        title="FormaSEO.ma | Formation SEO & Marketing Digital à Casablanca"
        description="Académie pratique de référencement naturel (SEO) et création de site WordPress à Casablanca. Apprenez en créant votre propre site et en le positionnant sur Google."
        canonicalPath="/"
        schema={[orgSchema, localSchema]}
      />

      {/* 1. Hero Section */}
      <HeroSection
        onExploreFormation={() => onNavigate('formation-marketing-digital-casablanca')}
        onOpenApplyModal={onOpenApplyModal}
      />

      {/* 2. Category Cards Section ("Choisissez votre catégorie") */}
      <CategoryCardsSection
        onSelectCategory={(route) => onNavigate(route)}
        onOpenApplyModal={onOpenApplyModal}
      />

      {/* 3. Target Audiences */}
      <AudiencesSection onOpenApplyModal={onOpenApplyModal} />

      {/* 3. Practical Deliverables: What Learners Build */}
      <DeliverablesSection onOpenApplyModal={onOpenApplyModal} />

      {/* 4. 5-Week Curriculum Preview */}
      <CurriculumPreview
        onExploreFullCurriculum={() => onNavigate('programme-5-semaines')}
        onOpenApplyModal={onOpenApplyModal}
      />

      {/* 5. Tools Mastered */}
      <ToolsSection />

      {/* 6. Learning Format & Methodology */}
      <HowItWorksSection onOpenApplyModal={onOpenApplyModal} />

      {/* 7. Founder Spotlight (Wassim Kassy) */}
      <FounderSpotlight onLearnMore={() => onNavigate('a-propos')} />

      {/* 8. FAQ Section */}
      <FaqSection
        onViewAllFaqs={() => onNavigate('faq')}
        onOpenApplyModal={onOpenApplyModal}
      />

      {/* 9. Direct On-Page Enquiry & Application Form */}
      <ApplicationFormSection />
    </div>
  );
};
