export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  summary: string;
  resources?: { name: string; url: string; size: string }[];
}

export interface Module {
  id: string;
  title: string;
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
  level: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Tous niveaux';
  durationHours: number;
  totalLessons: number;
  priceMAD: number;
  priceEUR: number;
  originalPriceMAD: number;
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  instructor: {
    name: string;
    role: string;
    avatar: string;
    bio: string;
  };
  thumbnail: string;
  badge?: string;
  featured: boolean;
  learningOutcomes: string[];
  prerequisites: string[];
  modules: Module[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  themeColor: 'blue' | 'yellow' | 'cyan' | 'emerald' | 'purple' | 'orange';
  coursesCount: number;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  publishedAt: string;
  readTimeMinutes: number;
  thumbnail: string;
  tags: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  avatar: string;
  enrolledCourseIds: string[];
  completedLessonIds: string[];
  createdAt: string;
}

export interface Review {
  id: string;
  courseId: string;
  userName: string;
  userRole: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Stats {
  totalStudents: number;
  satisfactionRate: number;
  totalHoursTraining: number;
  certificationsIssued: number;
  partnerCompanies: number;
}
