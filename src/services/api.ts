import { useState, useEffect } from 'react';
import {
  AcademySettings,
  CurriculumWeek,
  FaqItem,
  Enquiry,
  Course,
  Lesson,
  Module,
  User,
  Certificate,
  LessonProgress,
  CourseProgressStats,
} from '../types';
import { fallbackSettings, fallbackCurriculum, fallbackFaqs } from '../config/defaultData';

const API_BASE = '/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('formaseo_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const api = {
  // ==========================================
  // AUTHENTICATION
  // ==========================================
  auth: {
    async login(email: string, password: string): Promise<{ success: boolean; data?: { user: User; token: string }; message?: string } | null> {
      try {
        const res = await fetch(`${API_BASE}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        return data;
      } catch (e) {
        return { success: false, message: 'Erreur de connexion au serveur.' };
      }
    },

    async register(userData: { name: string; email: string; password: string; phone?: string }): Promise<{ success: boolean; data?: { user: User; token: string }; message?: string } | null> {
      try {
        const res = await fetch(`${API_BASE}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        });
        const data = await res.json();
        return data;
      } catch (e) {
        return { success: false, message: 'Erreur de connexion au serveur.' };
      }
    },

    async logout(): Promise<void> {
      try {
        await fetch(`${API_BASE}/auth/logout`, { method: 'POST', headers: getAuthHeaders() });
      } catch (e) {
        // ignore
      }
    },

    async getCurrentUser(): Promise<{ user: User; enrollments: any[]; certificatesCount: number } | null> {
      try {
        const res = await fetch(`${API_BASE}/auth/me`, { headers: getAuthHeaders() });
        if (!res.ok) return null;
        const data = await res.json();
        return data.data;
      } catch (e) {
        return null;
      }
    },

    async updateProfile(updates: Partial<User>): Promise<User | null> {
      try {
        const res = await fetch(`${API_BASE}/auth/profile`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify(updates),
        });
        const data = await res.json();
        return data.data;
      } catch (e) {
        return null;
      }
    },

    async updatePassword(params: { currentPassword?: string; newPassword: string }): Promise<{ success: boolean; message?: string }> {
      try {
        const res = await fetch(`${API_BASE}/auth/password`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify(params),
        });
        return await res.json();
      } catch (e) {
        return { success: false, message: 'Erreur mise à jour mot de passe.' };
      }
    },
  },

  // Flat auth shortcuts
  async login(email: string, password: string) {
    return this.auth.login(email, password);
  },
  async register(name: string, email: string, password: string, phone?: string) {
    return this.auth.register({ name, email, password, phone });
  },
  async logout() {
    return this.auth.logout();
  },
  async getCurrentUser() {
    return this.auth.getCurrentUser();
  },
  async updateProfile(updates: Partial<User>) {
    return this.auth.updateProfile(updates);
  },

  // ==========================================
  // COURSES & LMS
  // ==========================================
  courses: {
    async getAll(): Promise<Course[]> {
      try {
        const res = await fetch(`${API_BASE}/courses`);
        if (!res.ok) throw new Error('API Error');
        const data = await res.json();
        return data.data || [];
      } catch (e) {
        return [];
      }
    },

    async getBySlug(slug: string): Promise<Course | null> {
      try {
        const res = await fetch(`${API_BASE}/courses/${slug}`, { headers: getAuthHeaders() });
        if (!res.ok) return null;
        const data = await res.json();
        return data.data;
      } catch (e) {
        return null;
      }
    },
  },

  async getCourses() {
    return this.courses.getAll();
  },
  async getCourseBySlug(slug: string) {
    return this.courses.getBySlug(slug);
  },

  // ==========================================
  // STUDENT PORTAL (LMS)
  // ==========================================
  student: {
    async getDashboard(): Promise<{
      enrollments: any[];
      courses: Course[];
      certificates: Certificate[];
    }> {
      try {
        const res = await fetch(`${API_BASE}/student/dashboard`, { headers: getAuthHeaders() });
        if (!res.ok) return { enrollments: [], courses: [], certificates: [] };
        const data = await res.json();
        const payload = data.data || {};
        
        const enrollments = (payload.enrolledCourses || []).map((item: any) => ({
          ...item.enrollment,
          course: item.course,
          progressPercentage: item.progress?.percent || 0,
        }));

        return {
          enrollments,
          courses: (payload.enrolledCourses || []).map((item: any) => item.course),
          certificates: payload.certificates || [],
        };
      } catch (e) {
        return { enrollments: [], courses: [], certificates: [] };
      }
    },

    async getProgress(courseId: string): Promise<LessonProgress[]> {
      try {
        const res = await fetch(`${API_BASE}/student/courses/${courseId}/progress`, {
          headers: getAuthHeaders(),
        });
        if (!res.ok) return [];
        const data = await res.json();
        return data.data || [];
      } catch (e) {
        return [];
      }
    },

    async updateProgress(params: {
      lessonId: string;
      courseId: string;
      completed: boolean;
      progressPercent?: number;
    }): Promise<any> {
      try {
        const res = await fetch(`${API_BASE}/student/progress`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(params),
        });
        return await res.json();
      } catch (e) {
        return { success: false };
      }
    },

    async getCertificates(): Promise<Certificate[]> {
      try {
        const res = await fetch(`${API_BASE}/student/certificates`, { headers: getAuthHeaders() });
        if (!res.ok) return [];
        const data = await res.json();
        return data.data || [];
      } catch (e) {
        return [];
      }
    },
  },

  // ==========================================
  // CERTIFICATES
  // ==========================================
  certificates: {
    async verify(certificateNumber: string): Promise<Certificate | null> {
      try {
        const res = await fetch(`${API_BASE}/certificates/${certificateNumber}`);
        if (!res.ok) return null;
        const data = await res.json();
        return data.data;
      } catch (e) {
        return null;
      }
    },
  },

  // ==========================================
  // CHECKOUT & PAYMENTS
  // ==========================================
  checkout: {
    async create(courseId: string): Promise<any> {
      try {
        const res = await fetch(`${API_BASE}/checkout/create`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify({ courseId }),
        });
        return await res.json();
      } catch (e) {
        return { success: false, message: 'Erreur paiement' };
      }
    },

    async verify(transactionRef: string): Promise<any> {
      try {
        const res = await fetch(`${API_BASE}/checkout/verify`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify({ transactionRef }),
        });
        return await res.json();
      } catch (e) {
        return { success: false, message: 'Erreur vérification' };
      }
    },
  },

  // ==========================================
  // SETTINGS & CHECKLIST
  // ==========================================
  settings: {
    async get(): Promise<AcademySettings> {
      try {
        const res = await fetch(`${API_BASE}/settings`);
        if (!res.ok) throw new Error('API Error');
        const data = await res.json();
        return data.data || fallbackSettings;
      } catch (e) {
        return fallbackSettings;
      }
    },

    async update(settings: Partial<AcademySettings>): Promise<AcademySettings | null> {
      try {
        const res = await fetch(`${API_BASE}/settings`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify(settings),
        });
        const data = await res.json();
        return data.data;
      } catch (e) {
        return null;
      }
    },
  },

  async getSettings() {
    return this.settings.get();
  },
  async updateSettings(settings: Partial<AcademySettings>) {
    return this.settings.update(settings);
  },

  async getChecklist(): Promise<any[]> {
    try {
      const res = await fetch(`${API_BASE}/checklist`);
      if (!res.ok) throw new Error('API Error');
      const data = await res.json();
      return data.data || [];
    } catch (e) {
      return [];
    }
  },

  async updateChecklist(id: string, status: string): Promise<boolean> {
    try {
      await fetch(`${API_BASE}/checklist/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status }),
      });
      return true;
    } catch (e) {
      return false;
    }
  },

  async addChecklistItem(label: string, category: string): Promise<any | null> {
    try {
      const res = await fetch(`${API_BASE}/checklist`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ label, category }),
      });
      const data = await res.json();
      return data.data;
    } catch (e) {
      return null;
    }
  },

  async deleteChecklistItem(id: string): Promise<boolean> {
    try {
      await fetch(`${API_BASE}/checklist/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      return true;
    } catch (e) {
      return false;
    }
  },

  // ==========================================
  // CURRICULUM
  // ==========================================
  curriculum: {
    async get(): Promise<CurriculumWeek[]> {
      try {
        const res = await fetch(`${API_BASE}/curriculum`);
        if (!res.ok) throw new Error('API Error');
        const data = await res.json();
        return data.data || fallbackCurriculum;
      } catch (e) {
        return fallbackCurriculum;
      }
    },

    async update(curriculum: CurriculumWeek[]): Promise<boolean> {
      try {
        await fetch(`${API_BASE}/curriculum`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify(curriculum),
        });
        return true;
      } catch (e) {
        return false;
      }
    },

    async updateWeek(weekNumber: number, weekData: Partial<CurriculumWeek>): Promise<boolean> {
      try {
        await fetch(`${API_BASE}/curriculum/${weekNumber}`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify(weekData),
        });
        return true;
      } catch (e) {
        return false;
      }
    },
  },

  async getCurriculum() {
    return this.curriculum.get();
  },
  async updateCurriculum(curriculum: CurriculumWeek[]) {
    return this.curriculum.update(curriculum);
  },
  async updateCurriculumWeek(weekNumber: number, weekData: Partial<CurriculumWeek>) {
    return this.curriculum.updateWeek(weekNumber, weekData);
  },

  // ==========================================
  // FAQS
  // ==========================================
  faqs: {
    async get(): Promise<FaqItem[]> {
      try {
        const res = await fetch(`${API_BASE}/faqs`);
        if (!res.ok) throw new Error('API Error');
        const data = await res.json();
        return data.data || fallbackFaqs;
      } catch (e) {
        return fallbackFaqs;
      }
    },

    async add(faq: Omit<FaqItem, 'id'>): Promise<FaqItem | null> {
      try {
        const res = await fetch(`${API_BASE}/faqs`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(faq),
        });
        const data = await res.json();
        return data.data;
      } catch (e) {
        return null;
      }
    },

    async update(id: string, faq: Partial<FaqItem>): Promise<boolean> {
      try {
        await fetch(`${API_BASE}/faqs/${id}`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify(faq),
        });
        return true;
      } catch (e) {
        return false;
      }
    },

    async delete(id: string): Promise<boolean> {
      try {
        await fetch(`${API_BASE}/faqs/${id}`, {
          method: 'DELETE',
          headers: getAuthHeaders(),
        });
        return true;
      } catch (e) {
        return false;
      }
    },
  },

  async getFaqs() {
    return this.faqs.get();
  },
  async addFaq(faq: Omit<FaqItem, 'id'>) {
    return this.faqs.add(faq);
  },
  async updateFaq(id: string, faq: Partial<FaqItem>) {
    return this.faqs.update(id, faq);
  },
  async deleteFaq(id: string) {
    return this.faqs.delete(id);
  },

  // ==========================================
  // ENQUIRIES / LEADS
  // ==========================================
  enquiries: {
    async submit(enquiry: {
      name?: string;
      fullName?: string;
      email: string;
      phone: string;
      profileType?: string;
      goal?: string;
      preferredFormat?: string;
    }): Promise<{ success: boolean; data?: any; message?: string }> {
      try {
        const payload = {
          name: enquiry.name || enquiry.fullName || 'Candidat',
          email: enquiry.email,
          phone: enquiry.phone,
          profileType: enquiry.profileType,
          goal: enquiry.goal,
          preferredFormat: enquiry.preferredFormat,
        };
        const res = await fetch(`${API_BASE}/enquiries`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        return await res.json();
      } catch (e) {
        return { success: false, message: 'Erreur réseau lors de la soumission de la candidature.' };
      }
    },

    async getAll(): Promise<Enquiry[]> {
      try {
        const res = await fetch(`${API_BASE}/enquiries`, { headers: getAuthHeaders() });
        if (!res.ok) throw new Error('API Error');
        const data = await res.json();
        return data.data || [];
      } catch (e) {
        return [];
      }
    },

    async updateStatus(id: string, status: string, notes?: string): Promise<boolean> {
      try {
        await fetch(`${API_BASE}/enquiries/${id}`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify({ status, notes }),
        });
        return true;
      } catch (e) {
        return false;
      }
    },

    async delete(id: string): Promise<boolean> {
      try {
        await fetch(`${API_BASE}/enquiries/${id}`, {
          method: 'DELETE',
          headers: getAuthHeaders(),
        });
        return true;
      } catch (e) {
        return false;
      }
    },
  },

  async submitEnquiry(enquiry: any) {
    return this.enquiries.submit(enquiry);
  },
  async sendEnquiry(enquiry: any) {
    return this.enquiries.submit(enquiry);
  },
  async getEnquiries() {
    return this.enquiries.getAll();
  },
  async updateEnquiryStatus(id: string, status: string, notes?: string) {
    return this.enquiries.updateStatus(id, status, notes);
  },
  async deleteEnquiry(id: string) {
    return this.enquiries.delete(id);
  },
};

// ==========================================
// REACT HOOKS FOR COMPONENTS
// ==========================================
export function useAcademySettings(): { data: AcademySettings; isLoading: boolean } {
  const [data, setData] = useState<AcademySettings>(fallbackSettings);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    api.settings.get().then((res) => {
      if (res) setData(res);
      setIsLoading(false);
    });
  }, []);

  return { data, isLoading };
}

export function useCurriculum(): { data: CurriculumWeek[]; isLoading: boolean } {
  const [data, setData] = useState<CurriculumWeek[]>(fallbackCurriculum);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    api.curriculum.get().then((res) => {
      if (res && res.length > 0) setData(res);
      setIsLoading(false);
    });
  }, []);

  return { data, isLoading };
}

export function useFaqs(): { data: FaqItem[]; isLoading: boolean } {
  const [data, setData] = useState<FaqItem[]>(fallbackFaqs);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    api.faqs.get().then((res) => {
      if (res && res.length > 0) setData(res);
      setIsLoading(false);
    });
  }, []);

  return { data, isLoading };
}
