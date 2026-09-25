import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { AudiencesSection } from '../components/home/AudiencesSection';
import { DeliverablesSection } from '../components/home/DeliverablesSection';
import { CurriculumPreview } from '../components/home/CurriculumPreview';
import { ToolsSection } from '../components/home/ToolsSection';
import { HowItWorksSection } from '../components/home/HowItWorksSection';
import { FounderSpotlight } from '../components/home/FounderSpotlight';
import { FaqSection } from '../components/home/FaqSection';
import { ApplicationFormSection } from '../components/home/ApplicationFormSection';

interface HomePageProps {
  onNavigate: (page: string, param?: string) => void;
  onOpenApplyModal: (intent?: 'programme' | 'candidature') => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenApplyModal }) => {
  return (
    <div className="space-y-12 sm:space-y-16 pb-12">
      {/* 1. Hero Section */}
      <HeroSection
        onExploreFormation={() => onNavigate('formation')}
        onOpenApplyModal={onOpenApplyModal}
      />

      {/* 2. Target Audiences */}
      <AudiencesSection onOpenApplyModal={onOpenApplyModal} />

      {/* 3. Practical Deliverables: What Learners Build */}
      <DeliverablesSection onOpenApplyModal={onOpenApplyModal} />

      {/* 4. 5-Week Curriculum Preview */}
      <CurriculumPreview
        onExploreFullCurriculum={() => onNavigate('programme')}
        onOpenApplyModal={onOpenApplyModal}
      />

      {/* 5. Tools Mastered */}
      <ToolsSection />

      {/* 6. Learning Format & Methodology */}
      <HowItWorksSection onOpenApplyModal={onOpenApplyModal} />

      {/* 7. Founder Spotlight (Wassim Kassy) */}
      <FounderSpotlight onLearnMore={() => onNavigate('about')} />

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
