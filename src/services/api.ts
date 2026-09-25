import { useState, useEffect } from 'react';
import { AcademySettings, CurriculumWeek, FaqItem, Enquiry, Course, Category, Review, Article, User, Stats } from '../types';
import { fallbackSettings, fallbackCurriculum, fallbackFaqs } from '../config/defaultData';

const API_BASE = '/api';

export const api = {
  // Settings
  async getSettings(): Promise<AcademySettings> {
    try {
      const res = await fetch(`${API_BASE}/settings`);
      if (!res.ok) throw new Error('API Error');
      const data = await res.json();
      return data.data;
    } catch (e) {
      console.warn('API fallback for settings', e);
      return fallbackSettings;
    }
  },

  async updateSettings(settings: Partial<AcademySettings>): Promise<AcademySettings | null> {
    try {
      const res = await fetch(`${API_BASE}/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      return data.data;
    } catch (e) {
      return null;
    }
  },

  // Curriculum
  async getCurriculum(): Promise<CurriculumWeek[]> {
    try {
      const res = await fetch(`${API_BASE}/curriculum`);
      if (!res.ok) throw new Error('API Error');
      const data = await res.json();
      return data.data;
    } catch (e) {
      console.warn('API fallback for curriculum', e);
      return fallbackCurriculum;
    }
  },

  async updateCurriculumWeek(weekNumber: number, updates: Partial<CurriculumWeek>): Promise<CurriculumWeek | null> {
    try {
      const res = await fetch(`${API_BASE}/curriculum/${weekNumber}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      const data = await res.json();
      return data.data;
    } catch (e) {
      return null;
    }
  },

  // FAQs
  async getFaqs(): Promise<FaqItem[]> {
    try {
      const res = await fetch(`${API_BASE}/faqs`);
      if (!res.ok) throw new Error('API Error');
      const data = await res.json();
      return data.data;
    } catch (e) {
      return fallbackFaqs;
    }
  },

  // Enquiries & Applications
  async getEnquiries(): Promise<Enquiry[]> {
    try {
      const res = await fetch(`${API_BASE}/enquiries`);
      if (!res.ok) throw new Error('API Error');
      const data = await res.json();
      return data.data;
    } catch (e) {
      return [];
    }
  },

  async submitEnquiry(payload: {
    fullName: string;
    email: string;
    phone: string;
    audience?: string;
    preferredFormat?: 'presential' | 'online' | 'hybrid' | 'presentiel_casablanca' | 'en_ligne' | 'flexible';
    goal?: string;
    projectDescription?: string;
    type?: 'programme' | 'candidature' | 'contact';
    consentGiven?: boolean;
  }) {
    try {
      const res = await fetch(`${API_BASE}/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: payload.fullName,
          email: payload.email,
          phone: payload.phone,
          profileType: payload.audience || 'autre',
          preferredFormat: payload.preferredFormat || 'presentiel_casablanca',
          goal: payload.goal || payload.projectDescription || 'Demande information',
          consent: payload.consentGiven ?? true,
        }),
      });
      return await res.json();
    } catch (e) {
      return {
        success: false,
        message: 'Impossible de contacter le serveur pour l’instant. Veuillez réessayer.',
      };
    }
  },

  async sendEnquiry(payload: {
    name: string;
    email: string;
    phone: string;
    profileType: string;
    goal: string;
    preferredFormat: string;
    consent: boolean;
  }) {
    return this.submitEnquiry({
      fullName: payload.name,
      email: payload.email,
      phone: payload.phone,
      audience: payload.profileType,
      goal: payload.goal,
      preferredFormat: payload.preferredFormat as any,
      consentGiven: payload.consent,
    });
  },

  async updateEnquiryStatus(id: string, status: string, notes?: string) {
    try {
      const res = await fetch(`${API_BASE}/enquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, notes }),
      });
      return await res.json();
    } catch (e) {
      return { success: false };
    }
  },

  // Checklist
  async getChecklist(): Promise<any[]> {
    try {
      const res = await fetch(`${API_BASE}/checklist`);
      if (!res.ok) throw new Error('API Error');
      const data = await res.json();
      return data.data;
    } catch (e) {
      return [];
    }
  },

  async updateChecklist(id: string, status: string, notes?: string) {
    try {
      const res = await fetch(`${API_BASE}/checklist/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, notes }),
      });
      return await res.json();
    } catch (e) {
      return { success: false };
    }
  },

  // Backward compatibility helpers
  async getCourses(params?: any): Promise<Course[]> {
    return [];
  },

  async getCourseBySlug(slug: string): Promise<Course | null> {
    return null;
  },

  async getCategories(): Promise<Category[]> {
    return [];
  },

  async getReviews(courseId?: string): Promise<Review[]> {
    return [];
  },

  async addReview(review: any): Promise<any> {
    return { success: true };
  },

  async getArticles(search?: string): Promise<Article[]> {
    return [];
  },

  async getArticleBySlug(slug: string): Promise<any | null> {
    return null;
  },

  async getAdminContacts(): Promise<any[]> {
    return [];
  },

  async getAdminUsers(): Promise<User[]> {
    return [];
  },

  async getStats(): Promise<Stats> {
    return {
      totalStudents: 0,
      satisfactionRate: 100,
      totalHoursTraining: 40,
      certificationsIssued: 0,
      partnerCompanies: 0,
    };
  },

  async getCurrentUser(token?: string): Promise<User | null> {
    return null;
  },

  async login(email: string, password?: string): Promise<{ user: User; token: string } | null> {
    return null;
  },

  async register(name: string, email: string, password?: string): Promise<{ user: User; token: string } | null> {
    return null;
  },

  async enrollInCourse(courseId: string, userId?: string): Promise<boolean> {
    return true;
  },

  async toggleLesson(lessonId: string, userId?: string): Promise<boolean> {
    return true;
  },

  async sendContact(data: any): Promise<{ success: boolean; message: string }> {
    const res = await this.submitEnquiry({
      fullName: data.name,
      email: data.email,
      phone: data.phone || '',
      goal: data.message || data.subject,
      projectDescription: data.message,
      type: 'contact',
      consentGiven: true,
    });
    return { success: res.success ?? true, message: 'Votre message a bien été transmis.' };
  },
};

// React Custom Hooks
export function useAcademySettings() {
  const [data, setData] = useState<AcademySettings>(fallbackSettings);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.getSettings().then((res) => {
      if (res) setData(res);
      setIsLoading(false);
    });
  }, []);

  return { data, isLoading };
}

export function useCurriculum() {
  const [data, setData] = useState<CurriculumWeek[]>(fallbackCurriculum);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.getCurriculum().then((res) => {
      if (res) setData(res);
      setIsLoading(false);
    });
  }, []);

  return { data, isLoading };
}

export function useFaqs() {
  const [data, setData] = useState<FaqItem[]>(fallbackFaqs);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.getFaqs().then((res) => {
      if (res) setData(res);
      setIsLoading(false);
    });
  }, []);

  return { data, isLoading };
}
