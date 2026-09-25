import { Course, Category, Article, Review, User, Stats } from '../types';

const API_BASE = '/api';

export const api = {
  // Categories
  async getCategories(): Promise<Category[]> {
    try {
      const res = await fetch(`${API_BASE}/categories`);
      if (!res.ok) throw new Error('API Error');
      const data = await res.json();
      return data.data;
    } catch (e) {
      console.warn('API fallback for categories', e);
      return [];
    }
  },

  // Courses
  async getCourses(params?: { category?: string; level?: string; search?: string }): Promise<Course[]> {
    try {
      const query = new URLSearchParams();
      if (params?.category) query.append('category', params.category);
      if (params?.level) query.append('level', params.level);
      if (params?.search) query.append('search', params.search);

      const res = await fetch(`${API_BASE}/courses?${query.toString()}`);
      if (!res.ok) throw new Error('API Error');
      const data = await res.json();
      return data.data;
    } catch (e) {
      console.warn('API fallback for courses', e);
      return [];
    }
  },

  async getCourseBySlug(slug: string): Promise<Course | null> {
    try {
      const res = await fetch(`${API_BASE}/courses/${slug}`);
      if (!res.ok) throw new Error('API Error');
      const data = await res.json();
      return data.data;
    } catch (e) {
      console.warn('API fallback for course detail', e);
      return null;
    }
  },

  // Articles
  async getArticles(search?: string): Promise<Article[]> {
    try {
      const query = search ? `?search=${encodeURIComponent(search)}` : '';
      const res = await fetch(`${API_BASE}/articles${query}`);
      if (!res.ok) throw new Error('API Error');
      const data = await res.json();
      return data.data;
    } catch (e) {
      console.warn('API fallback for articles', e);
      return [];
    }
  },

  async getArticleBySlug(slug: string): Promise<Article | null> {
    try {
      const res = await fetch(`${API_BASE}/articles/${slug}`);
      if (!res.ok) throw new Error('API Error');
      const data = await res.json();
      return data.data;
    } catch (e) {
      return null;
    }
  },

  // Reviews
  async getReviews(courseId?: string): Promise<Review[]> {
    try {
      const query = courseId ? `?courseId=${courseId}` : '';
      const res = await fetch(`${API_BASE}/reviews${query}`);
      if (!res.ok) throw new Error('API Error');
      const data = await res.json();
      return data.data;
    } catch (e) {
      return [];
    }
  },

  async addReview(review: { courseId: string; userName: string; userRole?: string; rating: number; comment: string }): Promise<Review | null> {
    try {
      const res = await fetch(`${API_BASE}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review),
      });
      const data = await res.json();
      return data.data;
    } catch (e) {
      return null;
    }
  },

  // Auth & User
  async getCurrentUser(token?: string): Promise<User | null> {
    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) return null;
      const data = await res.json();
      return data.data;
    } catch (e) {
      return null;
    }
  },

  async login(email: string, password?: string): Promise<{ user: User; token: string } | null> {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) return null;
      const data = await res.json();
      return { user: data.data, token: data.token };
    } catch (e) {
      return null;
    }
  },

  async register(name: string, email: string, password?: string): Promise<{ user: User; token: string } | null> {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      if (!res.ok) return null;
      const data = await res.json();
      return { user: data.data, token: data.token };
    } catch (e) {
      return null;
    }
  },

  // Enrollments
  async enroll(courseId: string, userId?: string): Promise<User | null> {
    try {
      const res = await fetch(`${API_BASE}/enrollments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId, userId }),
      });
      const data = await res.json();
      return data.data;
    } catch (e) {
      return null;
    }
  },

  async toggleLesson(lessonId: string, userId?: string): Promise<User | null> {
    try {
      const res = await fetch(`${API_BASE}/enrollments/toggle-lesson`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId, userId }),
      });
      const data = await res.json();
      return data.data;
    } catch (e) {
      return null;
    }
  },

  // Contact / Audit
  async sendContact(payload: { name: string; email: string; phone?: string; subject?: string; message: string; serviceInterest?: string }) {
    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return await res.json();
    } catch (e) {
      return { success: false, message: 'Erreur de connexion' };
    }
  },

  // Stats
  async getStats(): Promise<Stats> {
    try {
      const res = await fetch(`${API_BASE}/stats`);
      const data = await res.json();
      return data.data;
    } catch (e) {
      return {
        totalStudents: 2850,
        satisfactionRate: 98.4,
        totalHoursTraining: 120,
        certificationsIssued: 1940,
        partnerCompanies: 65,
      };
    }
  },
};
