export interface CurriculumWeek {
  weekNumber: number;
  title: string;
  focus?: string;
  hours?: string;
  objective?: string;
  topics: string[];
  tools?: string[];
  deliverable?: string;
  practicalWorkshop?: string;
  confirmationStatus?: 'proposé' | 'validé';
}

export interface AcademySettings {
  name?: string;
  academyName?: string;
  domain?: string;
  city?: string;
  address?: string;
  addressNote?: string;
  founderName?: string;
  founderRole?: string;
  founderStatus?: string;
  headline?: string;
  subtitle?: string;
  formatDescription?: string;
  proposedDuration?: string;
  duration?: string;
  nextSessionDate?: string;
  proposedPriceNote?: string;
  priceNote?: string;
  email?: string;
  phone?: string;
  includedItemsNote?: string[];
  audiences?: { title: string; subtitle: string; description: string; icon: string }[];
  toolsCovered?: { name: string; category: string; description: string }[];
  ownerChecklist?: { id: string; label?: string; title?: string; category?: string; status: 'en_attente' | 'confirmé' | 'approved' | 'pending'; notes?: string; currentValue?: string; description?: string }[];
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  profileType: 'entrepreneur' | 'freelance' | 'etudiant' | 'professionnel' | 'student' | 'business_owner' | 'autre';
  goal: string;
  preferredFormat: 'presentiel_casablanca' | 'en_ligne' | 'flexible' | 'presential' | 'online' | 'hybrid';
  consent?: boolean;
  createdAt: string;
  status: 'new' | 'in_review' | 'contacted' | 'enrolled' | 'archived';
  notes?: string;
}

export interface FaqItem {
  id: string | number;
  question: string;
  answer: string;
  category: string;
  needsConfirmation?: boolean;
}

// Backward compatibility types
export interface Lesson {
  id: string;
  title: string;
  durationMinutes?: number;
  duration?: string;
  summary?: string;
  videoUrl?: string;
  type?: 'video' | 'quiz' | 'workshop';
}

export interface Module {
  id: string;
  title: string;
  durationHours?: number;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  categoryName: string;
  level: string;
  durationHours: number;
  priceMAD: number;
  originalPriceMAD?: number;
  priceEUR: number;
  rating: number;
  reviewCount: number;
  reviewsCount?: number;
  studentCount: number;
  studentsCount?: number;
  totalLessons?: number;
  badge?: string;
  instructorName?: string;
  instructorRole?: string;
  instructor?: {
    name: string;
    role: string;
    avatar: string;
    bio?: string;
  };
  thumbnail: string;
  learningOutcomes: string[];
  prerequisites: string[];
  modules: Module[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  iconName?: string;
  icon?: string;
  courseCount: number;
}

export interface Review {
  id: string;
  studentName?: string;
  studentRole?: string;
  userName?: string;
  rating: number;
  comment: string;
  date: string;
  courseTitle?: string;
  avatarUrl?: string;
  userAvatar?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date?: string;
  publishedAt?: string;
  readTimeMinutes?: number;
  readTime?: string;
  imageUrl?: string;
  coverImage?: string;
  tags: string[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'instructor' | 'admin';
  avatar?: string;
  enrolledCourseIds: string[];
  completedLessonIds: string[];
}

export interface Stats {
  totalStudents: number;
  satisfactionRate: number;
  totalHoursTraining: number;
  certificationsIssued: number;
  partnerCompanies: number;
}
