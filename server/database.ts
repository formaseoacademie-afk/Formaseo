import pg from 'pg';
import { Course, Module, Lesson, User, Certificate, LessonProgress, CourseProgressStats, AcademySettings, CurriculumWeek, FaqItem, Enquiry } from '../src/types';
import { fallbackSettings, fallbackCurriculum, fallbackFaqs } from '../src/config/defaultData';

const { Pool } = pg;

// Connection pool configuration
const databaseUrl = process.env.DATABASE_URL;

export const pool = databaseUrl
  ? new Pool({
      connectionString: databaseUrl,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    })
  : null;

if (pool) {
  pool.on('error', (err) => {
    console.error('Unexpected error on idle PostgreSQL client', err);
  });
}

// ==========================================
// SEED & CATALOG DATA DEFINITIONS
// ==========================================
const SEED_CATEGORIES = [
  { id: 'cat-seo', name: 'SEO & Référencement', slug: 'seo', description: 'Techniques de positionnement Google' },
  { id: 'cat-marketing', name: 'Marketing Digital', slug: 'marketing-digital', description: 'Acquisition digitale multicanale' },
  { id: 'cat-wordpress', name: 'Création Web & CMS', slug: 'creation-web', description: 'Déploiement de sites WordPress optimisés' },
];

const SEED_COURSES: Course[] = [
  {
    id: 'course-seo-casablanca',
    slug: 'formation-seo-casablanca',
    title: 'Formation SEO & Référencement Google à Casablanca',
    shortDescription: 'Maîtrisez les algorithmes de Google, le SEO on-page, technique et le netlinking avec des ateliers pratiques sur des cas réels au Maroc.',
    fullDescription: 'Programme complet de 5 semaines axé sur les leviers concrets du référencement naturel. Vous auditerez des sites en direct, déploierez des stratégies de mots-clés locales et mesurerez le trafic organique avec Google Search Console et GA4.',
    categoryId: 'cat-seo',
    categoryName: 'SEO & Référencement',
    category: 'SEO & Référencement',
    level: 'Tous niveaux (Débutant à Intermédiaire)',
    duration: '5 semaines (30h)',
    durationHours: 30,
    priceMAD: 4500,
    priceEUR: 420,
    originalPriceMAD: 6000,
    rating: 4.9,
    reviewCount: 48,
    studentCount: 120,
    thumbnail: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=1200&q=80',
    instructorId: 'usr-wassim-kassy',
    instructorName: 'Wassim Kassy',
    instructorRole: 'Consultant SEO Sénior & Formateur',
    instructor: {
      name: 'Wassim Kassy',
      role: 'Consultant SEO & Formateur à Casablanca',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      bio: 'Plus de 8 ans d’expérience en référencement naturel et pilotage de stratégies d’acquisition web au Maroc et à l’international.',
    },
    published: true,
    badge: 'Formation Phare',
    learningOutcomes: [
      'Maîtriser le fonctionnement des moteurs de recherche et l’indexation Google',
      'Effectuer une recherche de mots-clés à fort ROI pour le marché marocain',
      'Optimiser la structure sémantique (Hn, balises, maillage interne)',
      'Configurer et analyser Google Search Console et Google Analytics GA4',
      'Construire une stratégie de netlinking éthique et durable',
    ],
    prerequisites: ['Utilisation de base d’un ordinateur et d’un navigateur web', 'Aucune connaissance préalable en programmation requise'],
    modules: [
      {
        id: 'mod-1',
        courseId: 'course-seo-casablanca',
        title: 'Fondations du Web & Stratégie de Mots-Clés',
        description: 'Comprendre l’écosystème Google et cibler les requêtes génératrices de valeur.',
        durationHours: 6,
        position: 1,
        lessons: [
          {
            id: 'l-1-1',
            moduleId: 'mod-1',
            title: 'Comment fonctionne l’algorithme Google en 2026',
            summary: 'Comprendre le crawl, l’indexation et le classement des pages web.',
            description: 'Dans cette leçon introductive, nous décortiquons les étapes clés du fonctionnement des moteurs de recherche : robots d’indexation (Googlebot), rendu JavaScript, et critères de pertinence algorithmique.',
            content: 'Le SEO (Search Engine Optimization) repose sur 3 piliers fondamentaux : la technique, le contenu sémantique, et la popularité (backlinks). Lors de cette session, nous posons les bases pour auditer n’importe quel site web.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            duration: '25 min',
            durationMinutes: 25,
            position: 1,
            isFreePreview: true,
            type: 'video',
            resources: [
              { id: 'r-1', title: 'Guide Officiel Google SEO Starter (PDF)', url: 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide', type: 'pdf', fileSize: '2.4 MB' },
              { id: 'r-2', title: 'Checklist des 20 critères d’indexation (Cheat Sheet)', url: '#', type: 'pdf', fileSize: '850 KB' },
            ],
          },
          {
            id: 'l-1-2',
            moduleId: 'mod-1',
            title: 'Recherche de Mots-Clés & Intentions de Recherche',
            summary: 'Trouver les requêtes exactes tapées par vos prospects cibles.',
            description: 'Apprenez à classifier les intentions (informationnelle, navigationnelle, transactionnelle) et à utiliser Google Keyword Planner, Google Trends et les suggestions automatiques.',
            content: 'Découvrez la méthodologie pour bâtir une liste de plus de 100 mots-clés pertinents avec volume, difficulté et potentiel commercial.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            duration: '35 min',
            durationMinutes: 35,
            position: 2,
            isFreePreview: false,
            type: 'video',
            resources: [
              { id: 'r-3', title: 'Matrice de Mots-Clés Excel / Google Sheets', url: '#', type: 'xlsx', fileSize: '1.1 MB' },
            ],
          },
        ],
      },
      {
        id: 'mod-2',
        courseId: 'course-seo-casablanca',
        title: 'Optimisation On-Page & Rédaction Sémantique',
        description: 'Rédiger et structurer du contenu qui se positionne en première page.',
        durationHours: 6,
        position: 2,
        lessons: [
          {
            id: 'l-2-1',
            moduleId: 'mod-2',
            title: 'Balises Titres, Meta Descriptions et Structure Hn',
            summary: 'Les balises HTML prioritaires pour communiquer avec les moteurs.',
            description: 'Règles typographiques, longueurs optimales en pixels et intégration naturelle des expressions clés.',
            content: 'Atelier de rédaction directe sur WordPress avec prévisualisation des snippets Google.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            duration: '30 min',
            durationMinutes: 30,
            position: 1,
            isFreePreview: false,
            type: 'video',
            resources: [
              { id: 'r-4', title: 'Template de balisage On-Page (PDF)', url: '#', type: 'pdf', fileSize: '500 KB' },
            ],
          },
          {
            id: 'l-2-2',
            moduleId: 'mod-2',
            title: 'Maillage Interne & Siloing Thématique',
            summary: 'Distribuer le jus de lien et guider les robots vers vos pages piliers.',
            description: 'Structure en silos et cocons sémantiques adaptés aux sites e-commerce et vitrines de services.',
            content: 'Schématisation d’une architecture de site à fort impact SEO.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            duration: '40 min',
            durationMinutes: 40,
            position: 2,
            isFreePreview: false,
            type: 'video',
            resources: [],
          },
        ],
      },
      {
        id: 'mod-3',
        courseId: 'course-seo-casablanca',
        title: 'SEO Technique & Signaux Web Essentiels',
        description: 'Vitesse de chargement, indexabilité, robots.txt et sitemaps XML.',
        durationHours: 6,
        position: 3,
        lessons: [
          {
            id: 'l-3-1',
            moduleId: 'mod-3',
            title: 'Audit Technique avec Google Search Console',
            summary: 'Détecter les erreurs 404, redirections et problèmes d’exploration.',
            description: 'Configuration complète de la Search Console par enregistrement DNS et analyse des rapports d’indexation.',
            content: 'Guide pas à pas pour corriger les pages exclues ou non indexées.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            duration: '45 min',
            durationMinutes: 45,
            position: 1,
            isFreePreview: false,
            type: 'video',
            resources: [],
          },
        ],
      },
      {
        id: 'mod-4',
        courseId: 'course-seo-casablanca',
        title: 'SEO Local à Casablanca & Visibilité Google Maps',
        description: 'Positionner votre fiche Google Business Profile et capter des clients locaux.',
        durationHours: 6,
        position: 4,
        lessons: [
          {
            id: 'l-4-1',
            moduleId: 'mod-4',
            title: 'Optimisation Complète Google Business Profile',
            summary: 'Apparaître dans le pack local Google Maps à Casablanca.',
            description: 'Gestion des catégories, avis clients, photos géolocalisées et signaux de confiance locaux.',
            content: 'Plan d’action pour dominer les recherches de proximité.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            duration: '35 min',
            durationMinutes: 35,
            position: 1,
            isFreePreview: false,
            type: 'video',
            resources: [],
          },
        ],
      },
      {
        id: 'mod-5',
        courseId: 'course-seo-casablanca',
        title: 'Mesure de Résultats, GA4 & Certification',
        description: 'Suivre les conversions, générer des rapports et valider votre certificat.',
        durationHours: 6,
        position: 5,
        lessons: [
          {
            id: 'l-5-1',
            moduleId: 'mod-5',
            title: 'Tableaux de Bord Google Analytics 4 (GA4)',
            summary: 'Mesurer le trafic organique réel et les demandes de devis.',
            description: 'Configuration des événements clés, objectifs de formulaires et rapports personnalisés.',
            content: 'Création d’un dashboard clair pour vos clients ou votre direction.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            duration: '40 min',
            durationMinutes: 40,
            position: 1,
            isFreePreview: false,
            type: 'video',
            resources: [],
          },
        ],
      },
    ],
  },
  {
    id: 'course-marketing-digital',
    slug: 'formation-marketing-digital-casablanca',
    title: 'Formation Marketing Digital & Acquisition à Casablanca',
    shortDescription: 'Programme intensif combinant création de site web WordPress, SEO Google et stratégie d’acquisition digitale.',
    fullDescription: 'Un cursus transversal pour maîtriser l’ensemble de la chaîne de valeur digitale : de la mise en ligne d’un site vitrine ou e-commerce jusqu’au référencement et à la conversion de prospects en clients.',
    categoryId: 'cat-marketing',
    categoryName: 'Marketing Digital',
    category: 'Marketing Digital',
    level: 'Tous niveaux',
    duration: '5 semaines (35h)',
    durationHours: 35,
    priceMAD: 4900,
    priceEUR: 450,
    originalPriceMAD: 6500,
    rating: 4.9,
    reviewCount: 36,
    studentCount: 95,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    instructorId: 'usr-wassim-kassy',
    instructorName: 'Wassim Kassy',
    instructorRole: 'Consultant & Formateur',
    published: true,
    badge: 'Complet & Pratique',
    learningOutcomes: [
      'Créer et déployer un site WordPress complet',
      'Optimiser le référencement naturel pour Google',
      'Mettre en place des campagnes d’acquisition digitale',
      'Mesurer les retours sur investissement avec GA4',
    ],
    prerequisites: ['Aucun prérequis technique'],
    modules: [],
  },
  {
    id: 'course-wordpress-casablanca',
    slug: 'formation-wordpress-casablanca',
    title: 'Formation WordPress & Création de Site Web',
    shortDescription: 'Apprenez à concevoir, sécuriser et administrer un site web professionnel sans coder avec WordPress et Gutenberg.',
    fullDescription: 'Ateliers pratiques étape par étape : nom de domaine, hébergement, installation, personnalisation visuelle, formulaires de contact et optimisation mobile.',
    categoryId: 'cat-wordpress',
    categoryName: 'Création Web & CMS',
    category: 'Création Web & CMS',
    level: 'Débutant',
    duration: '3 semaines (20h)',
    durationHours: 20,
    priceMAD: 3500,
    priceEUR: 320,
    originalPriceMAD: 4500,
    rating: 4.8,
    reviewCount: 29,
    studentCount: 80,
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    instructorId: 'usr-wassim-kassy',
    instructorName: 'Wassim Kassy',
    instructorRole: 'Consultant & Formateur',
    published: true,
    badge: 'Pratique 100%',
    learningOutcomes: [
      'Installer et configurer un CMS WordPress professionnel',
      'Créer des pages d’accueil, services et formulaires modernes',
      'Optimiser la sécurité et la vitesse de chargement',
    ],
    prerequisites: ['Utilisation standard d’un ordinateur'],
    modules: [],
  },
];

// In-Memory state for development / fallback if PostgreSQL pool is not connected
interface MemoryStore {
  users: (User & { passwordHash: string })[];
  courses: Course[];
  enrollments: { id: string; userId: string; courseId: string; status: string; enrolledAt: string; completedAt?: string }[];
  lessonProgress: LessonProgress[];
  certificates: Certificate[];
  payments: any[];
  enquiries: Enquiry[];
  faqs: FaqItem[];
  curriculum: CurriculumWeek[];
  settings: AcademySettings;
  checklist: any[];
}

const memoryStore: MemoryStore = {
  users: [],
  courses: JSON.parse(JSON.stringify(SEED_COURSES)),
  enrollments: [],
  lessonProgress: [],
  certificates: [],
  payments: [],
  enquiries: [],
  faqs: JSON.parse(JSON.stringify(fallbackFaqs)),
  curriculum: JSON.parse(JSON.stringify(fallbackCurriculum)),
  settings: JSON.parse(JSON.stringify(fallbackSettings)),
  checklist: JSON.parse(JSON.stringify(fallbackSettings.ownerChecklist || [])),
};

// ==========================================
// DATABASE INTERFACE & POSTGRESQL IMPLEMENTATION
// ==========================================
export const db = {
  async init(): Promise<void> {
    if (!pool) {
      console.log('ℹ️ Running in memory database mode (configure DATABASE_URL for PostgreSQL/Supabase)');
      return;
    }

    try {
      const client = await pool.connect();
      console.log('✅ Connected to PostgreSQL database');
      client.release();
    } catch (err: any) {
      console.warn('⚠️ PostgreSQL connection warning, using memory persistence fallback:', err.message);
    }
  },

  // USERS
  async getUserByEmail(email: string): Promise<(User & { passwordHash: string }) | null> {
    const cleanEmail = email.trim().toLowerCase();
    if (pool) {
      try {
        const res = await pool.query('SELECT id, email, password_hash as "passwordHash", name, role, phone, bio, created_at as "createdAt" FROM users WHERE LOWER(email) = $1', [cleanEmail]);
        if (res.rows.length > 0) return res.rows[0];
      } catch (err) {
        console.error('PostgreSQL getUserByEmail error:', err);
      }
    }
    const user = memoryStore.users.find((u) => u.email.toLowerCase() === cleanEmail);
    return user || null;
  },

  async getUserById(id: string): Promise<User | null> {
    if (pool) {
      try {
        const res = await pool.query('SELECT id, email, name, role, phone, bio, created_at as "createdAt" FROM users WHERE id = $1', [id]);
        if (res.rows.length > 0) return res.rows[0];
      } catch (err) {
        console.error('PostgreSQL getUserById error:', err);
      }
    }
    const u = memoryStore.users.find((x) => x.id === id);
    if (!u) return null;
    const { passwordHash, ...safeUser } = u;
    return safeUser;
  },

  async createUser(userData: { email: string; passwordHash: string; name: string; role?: string; phone?: string; bio?: string }): Promise<User> {
    const id = `usr-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
    const role = (userData.role || 'STUDENT') as any;
    const cleanEmail = userData.email.trim().toLowerCase();
    const newUser = {
      id,
      email: cleanEmail,
      name: userData.name,
      role,
      phone: userData.phone,
      bio: userData.bio,
      passwordHash: userData.passwordHash,
      createdAt: new Date().toISOString(),
    };

    if (pool) {
      try {
        await pool.query(
          'INSERT INTO users (id, email, password_hash, name, role, phone, bio) VALUES ($1, $2, $3, $4, $5, $6, $7)',
          [id, cleanEmail, userData.passwordHash, userData.name, role, userData.phone || null, userData.bio || null]
        );
      } catch (err) {
        console.error('PostgreSQL createUser error:', err);
      }
    }

    memoryStore.users.push(newUser);

    // Auto-enroll student into flagship SEO course for seamless learning
    if (role === 'STUDENT') {
      await this.enrollUser(id, 'course-seo-casablanca');
    }

    const { passwordHash, ...safeUser } = newUser;
    return safeUser;
  },

  async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    if (pool) {
      try {
        await pool.query(
          'UPDATE users SET name = COALESCE($1, name), phone = COALESCE($2, phone), bio = COALESCE($3, bio), updated_at = NOW() WHERE id = $4',
          [updates.name || null, updates.phone || null, updates.bio || null, id]
        );
      } catch (err) {
        console.error('PostgreSQL updateUser error:', err);
      }
    }

    const idx = memoryStore.users.findIndex((u) => u.id === id);
    if (idx !== -1) {
      memoryStore.users[idx] = { ...memoryStore.users[idx], ...updates };
      const { passwordHash, ...safe } = memoryStore.users[idx];
      return safe;
    }
    return this.getUserById(id);
  },

  async updateUserPassword(id: string, newPasswordHash: string): Promise<boolean> {
    if (pool) {
      try {
        await pool.query('UPDATE users SET password_hash = $1, updated_at = NOW() WHERE id = $2', [newPasswordHash, id]);
      } catch (err) {
        console.error('PostgreSQL updateUserPassword error:', err);
      }
    }
    const user = memoryStore.users.find((u) => u.id === id);
    if (user) {
      user.passwordHash = newPasswordHash;
      return true;
    }
    return true;
  },

  // COURSES & LMS
  getCourses(): Course[] {
    return memoryStore.courses;
  },

  getCourseBySlug(slug: string): Course | null {
    return memoryStore.courses.find((c) => c.slug === slug) || null;
  },

  getCourseById(id: string): Course | null {
    return memoryStore.courses.find((c) => c.id === id) || null;
  },

  // ENROLLMENTS
  async getUserEnrollments(userId: string): Promise<any[]> {
    if (pool) {
      try {
        const res = await pool.query('SELECT * FROM enrollments WHERE user_id = $1', [userId]);
        return res.rows;
      } catch (err) {
        console.error('PostgreSQL getUserEnrollments error:', err);
      }
    }
    return memoryStore.enrollments.filter((e) => e.userId === userId);
  },

  async isUserEnrolled(userId: string, courseId: string): Promise<boolean> {
    if (pool) {
      try {
        const res = await pool.query('SELECT 1 FROM enrollments WHERE user_id = $1 AND course_id = $2', [userId, courseId]);
        return res.rows.length > 0;
      } catch (err) {
        console.error('PostgreSQL isUserEnrolled error:', err);
      }
    }
    return memoryStore.enrollments.some((e) => e.userId === userId && e.courseId === courseId);
  },

  async enrollUser(userId: string, courseId: string): Promise<boolean> {
    const isEnrolled = await this.isUserEnrolled(userId, courseId);
    if (isEnrolled) return true;

    const enrollment = {
      id: `enr-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      userId,
      courseId,
      status: 'active',
      enrolledAt: new Date().toISOString(),
    };

    if (pool) {
      try {
        await pool.query(
          'INSERT INTO enrollments (id, user_id, course_id, status) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING',
          [enrollment.id, userId, courseId, 'active']
        );
      } catch (err) {
        console.error('PostgreSQL enrollUser error:', err);
      }
    }

    memoryStore.enrollments.push(enrollment);
    return true;
  },

  // LESSON PROGRESS
  getUserProgress(userId: string, courseId: string): LessonProgress[] {
    return memoryStore.lessonProgress.filter((p) => p.userId === userId && p.courseId === courseId);
  },

  updateLessonProgress(
    userId: string,
    lessonId: string,
    courseId: string,
    completed: boolean,
    progressPercent: number = 100
  ): LessonProgress {
    const existingIdx = memoryStore.lessonProgress.findIndex(
      (p) => p.userId === userId && p.lessonId === lessonId
    );

    const record: LessonProgress = {
      id: existingIdx !== -1 ? memoryStore.lessonProgress[existingIdx].id : `prg-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      userId,
      lessonId,
      courseId,
      completed,
      progressPercent,
      completedAt: completed ? new Date().toISOString() : undefined,
      updatedAt: new Date().toISOString(),
    };

    if (existingIdx !== -1) {
      memoryStore.lessonProgress[existingIdx] = record;
    } else {
      memoryStore.lessonProgress.push(record);
    }

    return record;
  },

  calculateCourseCompletion(userId: string, courseId: string): CourseProgressStats {
    const course = this.getCourseById(courseId);
    if (!course || !course.modules || course.modules.length === 0) {
      return { totalLessons: 0, completedLessons: 0, percent: 0 };
    }

    let totalLessons = 0;
    course.modules.forEach((mod) => {
      totalLessons += mod.lessons ? mod.lessons.length : 0;
    });

    if (totalLessons === 0) {
      return { totalLessons: 0, completedLessons: 0, percent: 100 };
    }

    const progressList = this.getUserProgress(userId, courseId);
    const completedCount = progressList.filter((p) => p.completed).length;
    const percent = Math.min(100, Math.round((completedCount / totalLessons) * 100));

    return {
      totalLessons,
      completedLessons: completedCount,
      percent,
    };
  },

  // CERTIFICATES
  issueCertificate(userId: string, courseId: string): Certificate {
    const existing = memoryStore.certificates.find((c) => c.userId === userId && c.courseId === courseId);
    if (existing) return existing;

    const user = memoryStore.users.find((u) => u.id === userId);
    const course = this.getCourseById(courseId);

    const certificateNumber = `FSEO-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const verificationToken = `vtok_${Math.random().toString(36).substr(2, 10)}${Math.random().toString(36).substr(2, 10)}`;

    const cert: Certificate = {
      id: `cert-${Date.now()}`,
      certificateNumber,
      userId,
      courseId,
      studentName: user?.name || 'Étudiant FormaSEO',
      userName: user?.name || 'Étudiant FormaSEO',
      courseTitle: course?.title || 'Formation Certifiante FormaSEO',
      issuedAt: new Date().toISOString(),
      verificationToken,
      score: 100,
    };

    memoryStore.certificates.push(cert);
    return cert;
  },

  getCertificateByNumber(certificateNumber: string): Certificate | null {
    return memoryStore.certificates.find((c) => c.certificateNumber.toUpperCase() === certificateNumber.toUpperCase()) || null;
  },

  getUserCertificates(userId: string): Certificate[] {
    return memoryStore.certificates.filter((c) => c.userId === userId);
  },

  // ENQUIRIES & CRM
  getEnquiries(): Enquiry[] {
    return memoryStore.enquiries;
  },

  addEnquiry(data: { name: string; email: string; phone: string; profileType?: string; goal?: string; preferredFormat?: string }): Enquiry {
    const enquiry: Enquiry = {
      id: `enq-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      profileType: data.profileType,
      goal: data.goal,
      preferredFormat: data.preferredFormat,
      status: 'new',
      notes: '',
      createdAt: new Date().toISOString(),
    };
    memoryStore.enquiries.unshift(enquiry);
    return enquiry;
  },

  updateEnquiryStatus(id: string, status: string, notes?: string): Enquiry | null {
    const enq = memoryStore.enquiries.find((e) => e.id === id);
    if (!enq) return null;
    enq.status = status as any;
    if (notes !== undefined) enq.notes = notes;
    return enq;
  },

  deleteEnquiry(id: string): boolean {
    const idx = memoryStore.enquiries.findIndex((e) => e.id === id);
    if (idx === -1) return false;
    memoryStore.enquiries.splice(idx, 1);
    return true;
  },

  // SETTINGS & CURRICULUM & FAQS
  getSettings(): AcademySettings {
    return memoryStore.settings;
  },

  updateSettings(newSettings: Partial<AcademySettings>): AcademySettings {
    memoryStore.settings = { ...memoryStore.settings, ...newSettings };
    return memoryStore.settings;
  },

  getCurriculum(): CurriculumWeek[] {
    return memoryStore.curriculum;
  },

  updateCurriculum(curriculum: CurriculumWeek[]): boolean {
    memoryStore.curriculum = curriculum;
    return true;
  },

  updateCurriculumWeek(weekNumber: number, weekData: Partial<CurriculumWeek>): CurriculumWeek | null {
    const idx = memoryStore.curriculum.findIndex((w) => w.weekNumber === weekNumber);
    if (idx === -1) return null;
    memoryStore.curriculum[idx] = { ...memoryStore.curriculum[idx], ...weekData };
    return memoryStore.curriculum[idx];
  },

  getFaqs(): FaqItem[] {
    return memoryStore.faqs;
  },

  addFaq(faq: Omit<FaqItem, 'id'>): FaqItem {
    const newFaq: FaqItem = {
      id: `faq-${Date.now()}`,
      question: faq.question,
      answer: faq.answer,
      category: faq.category || 'Général',
      order: memoryStore.faqs.length + 1,
    };
    memoryStore.faqs.push(newFaq);
    return newFaq;
  },

  updateFaq(id: string, updates: Partial<FaqItem>): boolean {
    const idx = memoryStore.faqs.findIndex((f) => f.id === id);
    if (idx === -1) return false;
    memoryStore.faqs[idx] = { ...memoryStore.faqs[idx], ...updates };
    return true;
  },

  deleteFaq(id: string): boolean {
    const idx = memoryStore.faqs.findIndex((f) => f.id === id);
    if (idx === -1) return false;
    memoryStore.faqs.splice(idx, 1);
    return true;
  },

  // OWNER CHECKLIST
  getChecklist(): any[] {
    return memoryStore.checklist;
  },

  updateChecklistItem(id: string, status: string, notes?: string): any {
    const item = memoryStore.checklist.find((c) => c.id === id);
    if (!item) return null;
    item.status = status;
    if (notes !== undefined) item.notes = notes;
    return item;
  },

  addChecklistItem(label: string, category: string = 'Lancement'): any {
    const item = {
      id: `chk-${Date.now()}`,
      label,
      status: 'en_attente',
      notes: '',
      category,
    };
    memoryStore.checklist.push(item);
    return item;
  },

  deleteChecklistItem(id: string): boolean {
    const idx = memoryStore.checklist.findIndex((c) => c.id === id);
    if (idx === -1) return false;
    memoryStore.checklist.splice(idx, 1);
    return true;
  },

  // PAYMENTS
  createPayment(paymentData: { transactionRef: string; userId: string; courseId: string; amount: number; currency: string; provider: string; status?: string }): any {
    const payment = {
      id: `pay-${Date.now()}`,
      ...paymentData,
      status: paymentData.status || 'pending',
      createdAt: new Date().toISOString(),
    };
    memoryStore.payments.push(payment);
    return payment;
  },

  getPaymentByRef(transactionRef: string): any | null {
    return memoryStore.payments.find((p) => p.transactionRef === transactionRef) || null;
  },

  updatePaymentStatus(transactionRef: string, status: string, rawResponse?: any): any | null {
    const payment = this.getPaymentByRef(transactionRef);
    if (!payment) return null;
    payment.status = status;
    if (rawResponse) payment.rawResponse = rawResponse;
    return payment;
  },
};
