import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'INSTRUCTOR' | 'STUDENT';

export interface UserEntity {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: UserRole;
  phone?: string;
  avatarUrl?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LessonEntity {
  id: string;
  moduleId: string;
  title: string;
  summary: string;
  content: string;
  videoUrl?: string;
  durationMinutes: number;
  position: number;
  isFreePreview: boolean;
  resources?: { id: string; title: string; url: string; fileType: string }[];
}

export interface ModuleEntity {
  id: string;
  courseId: string;
  title: string;
  description: string;
  position: number;
  lessons: LessonEntity[];
}

export interface CourseEntity {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  categoryId: string;
  categoryName: string;
  level: string;
  durationHours: number;
  priceMAD: number;
  priceEUR: number;
  rating: number;
  reviewCount: number;
  studentCount: number;
  thumbnail: string;
  instructorId?: string;
  instructorName: string;
  instructorRole: string;
  published: boolean;
  learningOutcomes: string[];
  prerequisites: string[];
  modules: ModuleEntity[];
  createdAt: string;
  updatedAt: string;
}

export interface EnrollmentEntity {
  id: string;
  userId: string;
  courseId: string;
  status: 'active' | 'completed' | 'suspended' | 'cancelled';
  enrolledAt: string;
  completedAt?: string;
}

export interface LessonProgressEntity {
  id: string;
  userId: string;
  lessonId: string;
  courseId: string;
  completed: boolean;
  progressPercent: number;
  lastWatchedSeconds: number;
  completedAt?: string;
  updatedAt: string;
}

export interface CertificateEntity {
  id: string;
  certificateNumber: string;
  userId: string;
  courseId: string;
  studentName: string;
  courseTitle: string;
  issuedAt: string;
  verificationToken: string;
  score: number;
}

export interface PaymentEntity {
  id: string;
  userId: string;
  courseId: string;
  amount: number;
  currency: string;
  provider: string;
  status: 'pending' | 'paid' | 'failed' | 'refunded' | 'cancelled';
  transactionRef: string;
  createdAt: string;
}

export interface EnquiryEntity {
  id: string;
  name: string;
  email: string;
  phone: string;
  profileType: string;
  goal: string;
  preferredFormat: string;
  status: 'new' | 'contacted' | 'enrolled' | 'archived';
  notes?: string;
  createdAt: string;
}

export interface FaqEntity {
  id: string;
  question: string;
  answer: string;
  category: string;
  position: number;
}

export interface CurriculumWeekEntity {
  weekNumber: number;
  title: string;
  hours: string;
  objective: string;
  practicalWorkshop: string;
  topics: string[];
  tools: string[];
  status: 'proposé' | 'validé';
}

export interface DatabaseState {
  users: UserEntity[];
  courses: CourseEntity[];
  enrollments: EnrollmentEntity[];
  progress: LessonProgressEntity[];
  certificates: CertificateEntity[];
  payments: PaymentEntity[];
  enquiries: EnquiryEntity[];
  faqs: FaqEntity[];
  curriculum: CurriculumWeekEntity[];
  settings: Record<string, any>;
}

const DB_FILE_PATH = path.join(process.cwd(), 'server', 'data_store_formaseo.json');

export class ProductionDatabase {
  private data!: DatabaseState;

  constructor() {
    this.initDatabase();
  }

  private initDatabase() {
    try {
      if (fs.existsSync(DB_FILE_PATH)) {
        const raw = fs.readFileSync(DB_FILE_PATH, 'utf-8');
        const parsed = JSON.parse(raw);
        this.data = this.normalizeState(parsed);
      } else {
        this.data = this.createInitialSeed();
        this.save();
      }
    } catch (e) {
      console.error('Failed to load database file, generating seed.', e);
      this.data = this.createInitialSeed();
      this.save();
    }
  }

  private normalizeState(raw: any): DatabaseState {
    const seed = this.createInitialSeed();
    return {
      users: Array.isArray(raw.users) && raw.users.length > 0 ? raw.users : seed.users,
      courses: Array.isArray(raw.courses) && raw.courses.length > 0 ? raw.courses : seed.courses,
      enrollments: Array.isArray(raw.enrollments) ? raw.enrollments : seed.enrollments,
      progress: Array.isArray(raw.progress) ? raw.progress : seed.progress,
      certificates: Array.isArray(raw.certificates) ? raw.certificates : seed.certificates,
      payments: Array.isArray(raw.payments) ? raw.payments : seed.payments,
      enquiries: Array.isArray(raw.enquiries) ? raw.enquiries : seed.enquiries,
      faqs: Array.isArray(raw.faqs) && raw.faqs.length > 0 ? raw.faqs : seed.faqs,
      curriculum: Array.isArray(raw.curriculum) && raw.curriculum.length > 0 ? raw.curriculum : seed.curriculum,
      settings: raw.settings || seed.settings,
    };
  }

  private createInitialSeed(): DatabaseState {
    // Bcrypt hashed passwords for seeds:
    // Admin: FormaSEO@2026!Admin -> hashed
    // Student: Student@2026!Demo -> hashed
    const adminHash = bcrypt.hashSync('FormaSEO@2026!Admin', 10);
    const demoAdminHash = bcrypt.hashSync('admin123', 10);
    const studentHash = bcrypt.hashSync('Student@2026!Demo', 10);

    const initialUsers: UserEntity[] = [
      {
        id: 'usr-admin-1',
        email: 'admin@formaseo.ma',
        passwordHash: adminHash,
        name: 'Direction FormaSEO',
        role: 'SUPER_ADMIN',
        phone: '+212 6 00 00 00 00',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        bio: 'Direction Pédagogique et Fondateur de l’Académie FormaSEO.ma',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'usr-instructor-1',
        email: 'wassim@formaseo.ma',
        passwordHash: adminHash,
        name: 'Wassim Kassy',
        role: 'INSTRUCTOR',
        phone: '+212 6 11 22 33 44',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        bio: 'Consultant SEO & Formateur Référencement Naturel à Casablanca',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'usr-student-1',
        email: 'etudiant@formaseo.ma',
        passwordHash: studentHash,
        name: 'Karim Mansouri',
        role: 'STUDENT',
        phone: '+212 6 99 88 77 66',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        bio: 'Étudiant en reconversion Marketing Digital & SEO',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    const initialCourses: CourseEntity[] = [
      {
        id: 'crs-digital-1',
        slug: 'formation-marketing-digital-casablanca',
        title: 'Formation Marketing Digital & SEO Casablanca',
        shortDescription: 'Programme complet de 5 semaines pour créer votre site WordPress professionnel et le positionner sur Google.',
        fullDescription: 'La formation phare de FormaSEO.ma à Casablanca. Vous apprenez en pratiquant directement sur un projet réel déployé sur votre propre nom de domaine.',
        categoryId: 'cat-seo',
        categoryName: 'SEO & Marketing Digital',
        level: 'Tous niveaux (Débutant à Intermédiaire)',
        durationHours: 40,
        priceMAD: 3500,
        priceEUR: 320,
        rating: 4.95,
        reviewCount: 48,
        studentCount: 142,
        thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
        instructorId: 'usr-instructor-1',
        instructorName: 'Wassim Kassy',
        instructorRole: 'Consultant & Formateur SEO',
        published: true,
        learningOutcomes: [
          'Créer et administrer un site WordPress rapide et sécurisé',
          'Réaliser une recherche de mots-clés rentable sur le marché marocain',
          'Rédiger des pages et articles optimisés pour le référencement naturel',
          'Configurer Google Search Console et Google Analytics GA4',
          'Dominer les recherches locales sur Google Maps à Casablanca',
        ],
        prerequisites: ['Savoir naviguer sur un ordinateur', 'Avoir une idée de projet ou d’activité'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        modules: [
          {
            id: 'mod-1',
            courseId: 'crs-digital-1',
            title: 'Semaine 01 : Création de Site WordPress & Infrastructure',
            description: 'Nom de domaine, hébergement, architecture et mise en ligne complète.',
            position: 1,
            lessons: [
              {
                id: 'les-1-1',
                moduleId: 'mod-1',
                title: 'Introduction & Choix du Nom de Domaine',
                summary: 'Comprendre le fonctionnement des DNS, serveurs et noms de domaine.',
                content: 'Dans cette leçon, nous configurons votre nom de domaine et votre hébergement web optimisé pour WordPress.',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                durationMinutes: 25,
                position: 1,
                isFreePreview: true,
                resources: [
                  { id: 'res-1', title: 'Checklist Nom de Domaine SEO (PDF)', url: '/ressources-seo', fileType: 'pdf' },
                ],
              },
              {
                id: 'les-1-2',
                moduleId: 'mod-1',
                title: 'Installation Propre de WordPress & Thème Léger',
                summary: 'Installation pas à pas, configuration des permaliens et choix de thème.',
                content: 'Guide pratique pour installer WordPress sans surcharge et configurer les options indispensables.',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                durationMinutes: 35,
                position: 2,
                isFreePreview: false,
              },
              {
                id: 'les-1-3',
                moduleId: 'mod-1',
                title: 'Création des Pages Stratégiques (Accueil, Services, Contact)',
                summary: 'Structure des pages clés et ergonomie de conversion.',
                content: 'Construction visuelle des gabarits essentiels de votre site vitrine ou e-commerce.',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                durationMinutes: 40,
                position: 3,
                isFreePreview: false,
              },
            ],
          },
          {
            id: 'mod-2',
            courseId: 'crs-digital-1',
            title: 'Semaine 02 : Recherche Mots-Clés & Rédaction SEO',
            description: 'Intentions de recherche, Google Keyword Planner et cocon sémantique.',
            position: 2,
            lessons: [
              {
                id: 'les-2-1',
                moduleId: 'mod-2',
                title: 'Comprendre les Intentions de Recherche Google',
                summary: 'Requêtes informationnelles, transactionnelles et navigationnelles.',
                content: 'Analyse des SERP Google pour identifier ce que Google attend pour chaque requête.',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                durationMinutes: 30,
                position: 1,
                isFreePreview: true,
              },
              {
                id: 'les-2-2',
                moduleId: 'mod-2',
                title: 'Cartographie de 50+ Mots-Clés Cibles',
                summary: 'Utilisation de Google Keyword Planner et AnswerThePublic.',
                content: 'Extraction des volumes de recherche et construction de la matrice de mots-clés.',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                durationMinutes: 45,
                position: 2,
                isFreePreview: false,
              },
              {
                id: 'les-2-3',
                moduleId: 'mod-2',
                title: 'Rédaction d’un Article Optimisé sans Sur-Optimisation',
                summary: 'Structure Hn, balises Alt, maillage et champ sémantique.',
                content: 'Méthodologie pas à pas pour rédiger un article captivant qui se positionne durablement.',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                durationMinutes: 50,
                position: 3,
                isFreePreview: false,
              },
            ],
          },
          {
            id: 'mod-3',
            courseId: 'crs-digital-1',
            title: 'Semaine 03 : Optimisation On-Page & Performance Technique',
            description: 'Balises SEO, maillage interne, Core Web Vitals et indexation Google.',
            position: 3,
            lessons: [
              {
                id: 'les-3-1',
                moduleId: 'mod-3',
                title: 'Audit Technique & Balisage Title / Meta Description',
                summary: 'Optimisation chirurgicale des métadonnées pour booster le taux de clic.',
                content: 'Règles d’or pour des balises Title percutantes et des URL propres.',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                durationMinutes: 30,
                position: 1,
                isFreePreview: false,
              },
              {
                id: 'les-3-2',
                moduleId: 'mod-3',
                title: 'Vitesse de Chargement & PageSpeed Insights 90+',
                summary: 'Compression WebP, mise en cache et Core Web Vitals.',
                content: 'Optimisation de la vitesse de votre site WordPress pour mobile et desktop.',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                durationMinutes: 40,
                position: 2,
                isFreePreview: false,
              },
            ],
          },
          {
            id: 'mod-4',
            courseId: 'crs-digital-1',
            title: 'Semaine 04 : SEO Local & Google Maps Casablanca',
            description: 'Fiche Google Business Profile, avis clients et visibilité géolocalisée.',
            position: 4,
            lessons: [
              {
                id: 'les-4-1',
                moduleId: 'mod-4',
                title: 'Création et Optimisation Google Business Profile',
                summary: 'Balisage de la fiche Maps, catégories, horaires et photos.',
                content: 'Comment apparaître dans le pack local de Google sur les requêtes à Casablanca.',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                durationMinutes: 35,
                position: 1,
                isFreePreview: false,
              },
            ],
          },
          {
            id: 'mod-5',
            courseId: 'crs-digital-1',
            title: 'Semaine 05 : Analytics GA4, Search Console & Projet Final',
            description: 'Mesure du trafic réel, suivi des positions et validation du certificat.',
            position: 5,
            lessons: [
              {
                id: 'les-5-1',
                moduleId: 'mod-5',
                title: 'Configuration Google Search Console & Suivi de Crawl',
                summary: 'Soumission du sitemap.xml et analyse des impressions de recherche.',
                content: 'Interprétation des rapports d’indexation et des performances de recherche.',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                durationMinutes: 40,
                position: 1,
                isFreePreview: false,
              },
              {
                id: 'les-5-2',
                moduleId: 'mod-5',
                title: 'Installation Google Analytics 4 & Suivi des Conversions',
                summary: 'Configuration des événements clés et des objectifs business.',
                content: 'Mesure précise des visiteurs et du retour sur investissement.',
                videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                durationMinutes: 45,
                position: 2,
                isFreePreview: false,
              },
            ],
          },
        ],
      },
      {
        id: 'crs-seo-2',
        slug: 'formation-seo-casablanca',
        title: 'Formation SEO & Référencement Google Casablanca',
        shortDescription: 'Maîtrisez les techniques avancées du référencement naturel pour dominer la 1ère page de Google.',
        fullDescription: 'Programme intensif dédié à la stratégie sémantique, à l’audit technique et au netlinking.',
        categoryId: 'cat-seo',
        categoryName: 'SEO & Référencement',
        level: 'Intermédiaire à Avancé',
        durationHours: 30,
        priceMAD: 3000,
        priceEUR: 280,
        rating: 4.9,
        reviewCount: 32,
        studentCount: 95,
        thumbnail: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=600&q=80',
        instructorId: 'usr-instructor-1',
        instructorName: 'Wassim Kassy',
        instructorRole: 'Consultant SEO',
        published: true,
        learningOutcomes: ['Audit SEO technique complet', 'Cocon sémantique et maillage', 'Stratégie de netlinking éthique'],
        prerequisites: ['Connaissances de base du web'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        modules: [],
      },
      {
        id: 'crs-wp-3',
        slug: 'formation-wordpress-casablanca',
        title: 'Formation WordPress & Création Web Casablanca',
        shortDescription: 'Apprenez à concevoir des sites web professionnels, responsives et rapides avec WordPress.',
        fullDescription: 'Ateliers 100% pratiques pour maîtriser WordPress, Gutenberg, WooCommerce et la sécurité web.',
        categoryId: 'cat-wp',
        categoryName: 'Création de Sites Web',
        level: 'Débutant',
        durationHours: 25,
        priceMAD: 2800,
        priceEUR: 260,
        rating: 4.88,
        reviewCount: 26,
        studentCount: 88,
        thumbnail: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=600&q=80',
        instructorId: 'usr-instructor-1',
        instructorName: 'Wassim Kassy',
        instructorRole: 'Expert WordPress',
        published: true,
        learningOutcomes: ['Concevoir un site WordPress de A à Z', 'Personnaliser le design', 'Sécuriser son site'],
        prerequisites: ['Aucun prérequis en code'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        modules: [],
      },
    ];

    const initialEnrollments: EnrollmentEntity[] = [
      {
        id: 'enr-1',
        userId: 'usr-student-1',
        courseId: 'crs-digital-1',
        status: 'active',
        enrolledAt: new Date().toISOString(),
      },
    ];

    const initialProgress: LessonProgressEntity[] = [
      {
        id: 'prg-1',
        userId: 'usr-student-1',
        lessonId: 'les-1-1',
        courseId: 'crs-digital-1',
        completed: true,
        progressPercent: 100,
        lastWatchedSeconds: 1500,
        completedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'prg-2',
        userId: 'usr-student-1',
        lessonId: 'les-1-2',
        courseId: 'crs-digital-1',
        completed: true,
        progressPercent: 100,
        lastWatchedSeconds: 2100,
        completedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    const initialCertificates: CertificateEntity[] = [
      {
        id: 'cert-1',
        certificateNumber: 'FSA-2026-0042',
        userId: 'usr-student-1',
        courseId: 'crs-digital-1',
        studentName: 'Karim Mansouri',
        courseTitle: 'Formation Marketing Digital & SEO Casablanca',
        issuedAt: new Date().toISOString(),
        verificationToken: 'vtok_' + Math.random().toString(36).substring(2, 12),
        score: 95,
      },
    ];

    const initialPayments: PaymentEntity[] = [
      {
        id: 'pay-1',
        userId: 'usr-student-1',
        courseId: 'crs-digital-1',
        amount: 3500,
        currency: 'MAD',
        provider: 'CMI_MAROC',
        status: 'paid',
        transactionRef: 'TXN-984210',
        createdAt: new Date().toISOString(),
      },
    ];

    const initialEnquiries: EnquiryEntity[] = [
      {
        id: 'enq-1',
        name: 'Youssef El Amrani',
        email: 'youssef@example.com',
        phone: '+212 6 61 00 00 00',
        profileType: 'entrepreneur',
        goal: 'Lancer un site e-commerce et être visible sur Casablanca',
        preferredFormat: 'presentiel_casablanca',
        status: 'new',
        notes: 'Intéressé par la session du samedi',
        createdAt: new Date().toISOString(),
      },
    ];

    const initialFaqs: FaqEntity[] = [
      {
        id: 'faq-1',
        question: 'En quoi cette formation est-elle différente d’un cours théorique ?',
        answer: 'La formation FormaSEO.ma repose sur la pratique concrète. Vous travaillez directement sur la conception, l’optimisation et le référencement de votre propre site web ou projet professionnel.',
        category: 'Pédagogie',
        position: 1,
      },
      {
        id: 'faq-2',
        question: 'Faut-il savoir coder pour suivre la formation ?',
        answer: 'Non, aucun prérequis en programmation n’est nécessaire. Nous utilisons WordPress et des outils visuels accessibles pour vous apprendre à bâtir un site professionnel et optimisé de façon autonome.',
        category: 'Prérequis',
        position: 2,
      },
      {
        id: 'faq-3',
        question: 'La formation a-t-elle lieu en présentiel à Casablanca ou en ligne ?',
        answer: 'FormaSEO.ma propose des formats adaptés : présentiel à Casablanca (secteur Avenue Mers Sultan) ou sessions en ligne en direct avec accompagnement individuel.',
        category: 'Format',
        position: 3,
      },
      {
        id: 'faq-4',
        question: 'Que vais-je concrètement obtenir à la fin de la formation ?',
        answer: 'Vous repartez avec un site WordPress fonctionnel en ligne, votre recherche de mots-clés effectuée, vos pages optimisées pour le SEO, votre fiche Google Maps configurée et vos outils de mesure (Search Console, Analytics) connectés.',
        category: 'Résultats',
        position: 4,
      },
    ];

    const initialCurriculum: CurriculumWeekEntity[] = [
      {
        weekNumber: 1,
        title: 'Création de Site WordPress & Infrastructure',
        hours: '8h Pratique',
        objective: 'Mise en place de l’infrastructure, installation propre de WordPress et déploiement.',
        practicalWorkshop: 'Votre site web déployé sur votre nom de domaine avec structure saine.',
        topics: ['Nom de domaine & hébergement', 'Installation de WordPress', 'Architecture des pages clés'],
        tools: ['WordPress', 'Gutenberg', 'Hébergement Web'],
        status: 'validé',
      },
      {
        weekNumber: 2,
        title: 'Recherche Mots-Clés & Rédaction SEO',
        hours: '8h Pratique',
        objective: 'Identifier les requêtes rentables et structurer son contenu pour Google.',
        practicalWorkshop: 'Cartographie de 50+ mots-clés cibles et 1er article publié.',
        topics: ['Intentions de recherche', 'Google Keyword Planner', 'Rédaction optimisée'],
        tools: ['Keyword Planner', 'AnswerThePublic', 'IA'],
        status: 'validé',
      },
      {
        weekNumber: 3,
        title: 'Optimisation On-Page & Performance Technique',
        hours: '8h Pratique',
        objective: 'Optimiser la vitesse, les balises Title, les images et l’indexation.',
        practicalWorkshop: 'Audit technique et score PageSpeed 90+ sur mobile.',
        topics: ['Balises Title & Meta', 'Vitesse Core Web Vitals', 'Sitemap XML & Robots.txt'],
        tools: ['PageSpeed Insights', 'Rank Math', 'Sitemap'],
        status: 'validé',
      },
      {
        weekNumber: 4,
        title: 'SEO Local & Google Maps Casablanca',
        hours: '8h Pratique',
        objective: 'Capter les requêtes géolocalisées à Casablanca et au Maroc.',
        practicalWorkshop: 'Fiche Google Business Profile optimisée et avis activés.',
        topics: ['Google Maps & Pack Local', 'Gestion des avis clients', 'Visuels Canva'],
        tools: ['Google Business Profile', 'Canva'],
        status: 'validé',
      },
      {
        weekNumber: 5,
        title: 'Analytics GA4, Search Console & Projet Final',
        hours: '8h Pratique',
        objective: 'Mesurer son trafic réel et valider l’ensemble des livrables.',
        practicalWorkshop: 'Projet complet certifié : site en production suivi sur Search Console.',
        topics: ['Google Search Console', 'Google Analytics 4', 'Plan d’action à 3 mois'],
        tools: ['Search Console', 'GA4', 'Rapports'],
        status: 'validé',
      },
    ];

    const initialSettings = {
      academyName: 'FormaSEO.ma',
      name: 'FormaSEO.ma',
      domain: 'formaseo.ma',
      city: 'Casablanca, Maroc',
      address: 'Secteur Avenue Mers Sultan, Casablanca 20250, Maroc',
      addressNote: 'Secteur Avenue Mers Sultan, Casablanca',
      founderName: 'Wassim Kassy',
      founderRole: 'Fondateur & Consultant SEO',
      nextSessionDate: 'Session 2026 (Inscriptions Ouvertes)',
      duration: '5 semaines intensives (Présentiel Casablanca & En Ligne)',
      email: 'contact@formaseo.ma',
      phone: '+212 6 00 00 00 00',
      priceNote: 'Tarifs et facilités de paiement communiqués sur demande pour chaque session.',
      ownerChecklist: [
        { id: 'chk-1', label: 'Dates officielles de la session 2026', category: 'Lancement', status: 'confirmé', notes: 'Validé' },
        { id: 'chk-2', label: 'Tarif officiel et facilités de paiement', category: 'Tarifs', status: 'confirmé', notes: 'Validé' },
        { id: 'chk-3', label: 'Adresse exacte du centre à Casablanca (Mers Sultan)', category: 'Lancement', status: 'confirmé', notes: 'Validé' },
        { id: 'chk-4', label: 'Numéro WhatsApp officiel de contact', category: 'Légal', status: 'confirmé', notes: 'Validé' },
        { id: 'chk-5', label: 'Syllabus complet 5 semaines', category: 'Pédagogie', status: 'confirmé', notes: 'Validé' },
      ],
    };

    return {
      users: initialUsers,
      courses: initialCourses,
      enrollments: initialEnrollments,
      progress: initialProgress,
      certificates: initialCertificates,
      payments: initialPayments,
      enquiries: initialEnquiries,
      faqs: initialFaqs,
      curriculum: initialCurriculum,
      settings: initialSettings,
    };
  }

  private save() {
    try {
      const dir = path.dirname(DB_FILE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DB_FILE_PATH, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to write to database file', err);
    }
  }

  // --- USERS & AUTH ---
  findUserByEmail(email: string): UserEntity | undefined {
    return this.data.users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
  }

  findUserById(id: string): UserEntity | undefined {
    return this.data.users.find((u) => u.id === id);
  }

  createUser(payload: { email: string; password: string; name: string; role?: UserRole; phone?: string }): UserEntity {
    const passwordHash = bcrypt.hashSync(payload.password, 10);
    const newUser: UserEntity = {
      id: 'usr-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      email: payload.email.trim().toLowerCase(),
      passwordHash,
      name: payload.name.trim(),
      role: payload.role || 'STUDENT',
      phone: payload.phone || '',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.data.users.push(newUser);
    this.save();
    return newUser;
  }

  updateUserProfile(id: string, updates: Partial<Pick<UserEntity, 'name' | 'phone' | 'avatarUrl' | 'bio'>>): UserEntity | null {
    const user = this.findUserById(id);
    if (!user) return null;
    Object.assign(user, updates, { updatedAt: new Date().toISOString() });
    this.save();
    return user;
  }

  updateUserPassword(id: string, newPassword: string): boolean {
    const user = this.findUserById(id);
    if (!user) return false;
    user.passwordHash = bcrypt.hashSync(newPassword, 10);
    user.updatedAt = new Date().toISOString();
    this.save();
    return true;
  }

  getAllUsers(): UserEntity[] {
    return this.data.users;
  }

  // --- COURSES & LMS ---
  getCourses(): CourseEntity[] {
    return this.data.courses.filter((c) => c.published);
  }

  getAllCoursesAdmin(): CourseEntity[] {
    return this.data.courses;
  }

  getCourseBySlug(slug: string): CourseEntity | undefined {
    return this.data.courses.find((c) => c.slug === slug);
  }

  getCourseById(id: string): CourseEntity | undefined {
    return this.data.courses.find((c) => c.id === id);
  }

  updateCourse(id: string, updates: Partial<CourseEntity>): CourseEntity | null {
    const course = this.getCourseById(id);
    if (!course) return null;
    Object.assign(course, updates, { updatedAt: new Date().toISOString() });
    this.save();
    return course;
  }

  // --- ENROLLMENTS & PROGRESS ---
  getEnrollmentsByUser(userId: string): EnrollmentEntity[] {
    return this.data.enrollments.filter((e) => e.userId === userId && e.status === 'active');
  }

  isUserEnrolled(userId: string, courseId: string): boolean {
    return this.data.enrollments.some((e) => e.userId === userId && e.courseId === courseId && e.status === 'active');
  }

  enrollUser(userId: string, courseId: string): EnrollmentEntity {
    const existing = this.data.enrollments.find((e) => e.userId === userId && e.courseId === courseId);
    if (existing) {
      existing.status = 'active';
      this.save();
      return existing;
    }
    const newEnrollment: EnrollmentEntity = {
      id: 'enr-' + Date.now(),
      userId,
      courseId,
      status: 'active',
      enrolledAt: new Date().toISOString(),
    };
    this.data.enrollments.push(newEnrollment);

    // Increment course student count
    const course = this.getCourseById(courseId);
    if (course) {
      course.studentCount = (course.studentCount || 0) + 1;
    }

    this.save();
    return newEnrollment;
  }

  getUserProgress(userId: string, courseId?: string): LessonProgressEntity[] {
    if (courseId) {
      return this.data.progress.filter((p) => p.userId === userId && p.courseId === courseId);
    }
    return this.data.progress.filter((p) => p.userId === userId);
  }

  updateLessonProgress(userId: string, lessonId: string, courseId: string, completed: boolean, progressPercent: number = 100): LessonProgressEntity {
    let item = this.data.progress.find((p) => p.userId === userId && p.lessonId === lessonId);
    if (item) {
      item.completed = completed;
      item.progressPercent = progressPercent;
      item.updatedAt = new Date().toISOString();
      if (completed && !item.completedAt) {
        item.completedAt = new Date().toISOString();
      }
    } else {
      item = {
        id: 'prg-' + Date.now(),
        userId,
        lessonId,
        courseId,
        completed,
        progressPercent,
        lastWatchedSeconds: 0,
        completedAt: completed ? new Date().toISOString() : undefined,
        updatedAt: new Date().toISOString(),
      };
      this.data.progress.push(item);
    }
    this.save();
    return item;
  }

  calculateCourseCompletion(userId: string, courseId: string): { totalLessons: number; completedLessons: number; percent: number } {
    const course = this.getCourseById(courseId);
    if (!course) return { totalLessons: 0, completedLessons: 0, percent: 0 };
    
    let total = 0;
    const lessonIds: string[] = [];
    course.modules.forEach((m) => {
      m.lessons.forEach((l) => {
        total++;
        lessonIds.push(l.id);
      });
    });

    if (total === 0) return { totalLessons: 0, completedLessons: 0, percent: 0 };

    const completed = this.data.progress.filter(
      (p) => p.userId === userId && lessonIds.includes(p.lessonId) && p.completed
    ).length;

    return {
      totalLessons: total,
      completedLessons: completed,
      percent: Math.round((completed / total) * 100),
    };
  }

  // --- CERTIFICATES ---
  getCertificatesByUser(userId: string): CertificateEntity[] {
    return this.data.certificates.filter((c) => c.userId === userId);
  }

  getCertificateByNumber(certificateNumber: string): CertificateEntity | undefined {
    return this.data.certificates.find((c) => c.certificateNumber.toLowerCase() === certificateNumber.toLowerCase());
  }

  issueCertificate(userId: string, courseId: string): CertificateEntity | null {
    const user = this.findUserById(userId);
    const course = this.getCourseById(courseId);
    if (!user || !course) return null;

    const existing = this.data.certificates.find((c) => c.userId === userId && c.courseId === courseId);
    if (existing) return existing;

    const certNumber = 'FSA-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
    const cert: CertificateEntity = {
      id: 'cert-' + Date.now(),
      certificateNumber: certNumber,
      userId,
      courseId,
      studentName: user.name,
      courseTitle: course.title,
      issuedAt: new Date().toISOString(),
      verificationToken: 'vtok_' + Math.random().toString(36).substring(2, 12),
      score: 100,
    };
    this.data.certificates.push(cert);
    this.save();
    return cert;
  }

  // --- ENQUIRIES & LEADS ---
  getEnquiries(): EnquiryEntity[] {
    return this.data.enquiries;
  }

  addEnquiry(payload: Omit<EnquiryEntity, 'id' | 'createdAt' | 'status'>): EnquiryEntity {
    const newEnquiry: EnquiryEntity = {
      ...payload,
      id: 'enq-' + Date.now(),
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    this.data.enquiries.unshift(newEnquiry);
    this.save();
    return newEnquiry;
  }

  updateEnquiryStatus(id: string, status: 'new' | 'contacted' | 'enrolled' | 'archived', notes?: string): EnquiryEntity | null {
    const enq = this.data.enquiries.find((e) => e.id === id);
    if (!enq) return null;
    enq.status = status;
    if (notes !== undefined) enq.notes = notes;
    this.save();
    return enq;
  }

  deleteEnquiry(id: string): boolean {
    const initialLen = this.data.enquiries.length;
    this.data.enquiries = this.data.enquiries.filter((e) => e.id !== id);
    this.save();
    return this.data.enquiries.length < initialLen;
  }

  // --- FAQS ---
  getFaqs(): FaqEntity[] {
    return this.data.faqs;
  }

  addFaq(faq: Omit<FaqEntity, 'id' | 'position'>): FaqEntity {
    const newFaq: FaqEntity = {
      ...faq,
      id: 'faq-' + Date.now(),
      position: this.data.faqs.length + 1,
    };
    this.data.faqs.push(newFaq);
    this.save();
    return newFaq;
  }

  updateFaq(id: string, updates: Partial<FaqEntity>): FaqEntity | null {
    const faq = this.data.faqs.find((f) => f.id === id);
    if (!faq) return null;
    Object.assign(faq, updates);
    this.save();
    return faq;
  }

  deleteFaq(id: string): boolean {
    const initialLen = this.data.faqs.length;
    this.data.faqs = this.data.faqs.filter((f) => f.id !== id);
    this.save();
    return this.data.faqs.length < initialLen;
  }

  // --- CURRICULUM ---
  getCurriculum(): CurriculumWeekEntity[] {
    return this.data.curriculum;
  }

  updateCurriculumWeek(weekNumber: number, updates: Partial<CurriculumWeekEntity>): CurriculumWeekEntity | null {
    const week = this.data.curriculum.find((w) => w.weekNumber === weekNumber);
    if (!week) return null;
    Object.assign(week, updates);
    this.save();
    return week;
  }

  // --- SETTINGS & CHECKLIST ---
  getSettings(): Record<string, any> {
    return this.data.settings;
  }

  updateSettings(updates: Record<string, any>): Record<string, any> {
    this.data.settings = { ...this.data.settings, ...updates };
    this.save();
    return this.data.settings;
  }

  getChecklist() {
    return this.data.settings.ownerChecklist || [];
  }

  addChecklistItem(label: string, category: string = 'Lancement') {
    if (!this.data.settings.ownerChecklist) this.data.settings.ownerChecklist = [];
    const item = {
      id: 'chk-' + Date.now(),
      label,
      category,
      status: 'en_attente',
      notes: '',
    };
    this.data.settings.ownerChecklist.push(item);
    this.save();
    return item;
  }

  updateChecklistItem(id: string, status: string, notes?: string) {
    if (!this.data.settings.ownerChecklist) return [];
    const item = this.data.settings.ownerChecklist.find((c: any) => c.id === id);
    if (item) {
      item.status = status;
      if (notes !== undefined) item.notes = notes;
      this.save();
    }
    return this.data.settings.ownerChecklist;
  }

  deleteChecklistItem(id: string): boolean {
    if (!this.data.settings.ownerChecklist) return false;
    const initialLen = this.data.settings.ownerChecklist.length;
    this.data.settings.ownerChecklist = this.data.settings.ownerChecklist.filter((c: any) => c.id !== id);
    this.save();
    return this.data.settings.ownerChecklist.length < initialLen;
  }
}

export const db = new ProductionDatabase();
