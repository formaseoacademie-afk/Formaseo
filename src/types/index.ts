export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'INSTRUCTOR' | 'STUDENT';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  avatarUrl?: string;
  bio?: string;
  enrolledCourseIds?: string[];
  completedLessonIds?: string[];
  createdAt?: string;
}

export interface LessonResource {
  id: string;
  title: string;
  url: string;
  type?: string;
  fileType?: string;
  fileSize?: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  summary?: string;
  description?: string;
  content?: string;
  videoUrl?: string;
  durationMinutes?: number;
  duration?: string;
  position: number;
  isFreePreview?: boolean;
  type?: 'video' | 'quiz' | 'workshop' | string;
  resources?: LessonResource[];
}

export interface Module {
  id: string;
  courseId?: string;
  title: string;
  description?: string;
  durationHours?: number;
  position: number;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription?: string;
  categoryId?: string;
  categoryName?: string;
  category?: string;
  level?: string;
  duration?: string;
  durationHours?: number;
  priceMAD?: number;
  priceEUR?: number;
  originalPriceMAD?: number;
  rating?: number;
  reviewCount?: number;
  studentCount?: number;
  thumbnail: string;
  instructorId?: string;
  instructorName?: string;
  instructorRole?: string;
  instructor?: {
    name: string;
    role: string;
    avatar: string;
    bio?: string;
  };
  published?: boolean;
  badge?: string;
  learningOutcomes?: string[];
  prerequisites?: string[];
  modules: Module[];
  isEnrolled?: boolean;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  status: 'active' | 'completed' | 'suspended' | 'cancelled' | 'ACTIVE' | 'COMPLETED';
  enrolledAt: string;
  completedAt?: string;
  course?: Course;
  progressPercentage?: number;
}

export interface LessonProgress {
  id?: string;
  userId?: string;
  lessonId: string;
  courseId?: string;
  completed: boolean;
  progressPercent?: number;
  lastWatchedSeconds?: number;
  completedAt?: string;
  updatedAt?: string;
}

export interface CourseProgressStats {
  totalLessons: number;
  completedLessons: number;
  percent: number;
}

export interface Certificate {
  id: string;
  certificateNumber: string;
  userId: string;
  courseId: string;
  studentName?: string;
  userName?: string;
  courseTitle: string;
  issuedAt: string;
  verificationToken: string;
  score?: number;
}

export interface AudienceItem {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
}

export interface ToolCoveredItem {
  name: string;
  category: string;
  description: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
  status: 'en_attente' | 'confirmé' | 'approved' | string;
  notes?: string;
  category?: string;
}

export interface AcademySettings {
  name?: string;
  academyName?: string;
  tagline?: string;
  domain?: string;
  city?: string;
  address?: string;
  addressNote?: string;
  founderName?: string;
  founderRole?: string;
  founderStatus?: string;
  founderBio?: string;
  headline?: string;
  heroHeadline?: string;
  subtitle?: string;
  heroSubheadline?: string;
  formatDescription?: string;
  duration?: string;
  proposedDuration?: string;
  priceNote?: string;
  proposedPriceNote?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  priceMAD?: number;
  priceEUR?: number;
  nextCohortDate?: string;
  nextSessionDate?: string;
  seatsTotal?: number;
  seatsRemaining?: number;
  activePromotion?: boolean;
  promoDiscountMAD?: number;
  instructorName?: string;
  instructorBio?: string;
  instructorRole?: string;
  bannerMessage?: string;
  enableLiveChat?: boolean;
  includedItemsNote?: string[];
  audiences?: AudienceItem[];
  toolsCovered?: ToolCoveredItem[];
  ownerChecklist?: ChecklistItem[];
}

export interface CurriculumWeek {
  id?: string;
  weekNumber: number;
  title: string;
  subtitle?: string;
  focus?: string;
  objective?: string;
  tag?: string;
  description?: string;
  topics?: string[];
  bulletPoints?: string[];
  tools?: string[];
  hours?: string;
  practicalWorkshop?: string;
  deliverable?: string;
  estimatedHours?: number;
  status?: string;
  confirmationStatus?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  order?: number;
  needsConfirmation?: boolean;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  fullName?: string;
  profileType?: string;
  goal?: string;
  preferredFormat?: string;
  status: 'new' | 'contacted' | 'in_review' | 'enrolled' | 'archived';
  notes?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  authorName: string;
  authorRole: string;
  authorCompany?: string;
  authorAvatar?: string;
  rating: number;
  comment: string;
  courseSlug: string;
  date: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  publishedAt: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  tags: string[];
}
