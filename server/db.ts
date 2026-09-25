import fs from 'fs';
import path from 'path';

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
  password?: string;
  role: 'student' | 'admin';
  avatar: string;
  enrolledCourseIds: string[];
  completedLessonIds: string[];
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  serviceInterest?: string;
  createdAt: string;
  status: 'new' | 'read' | 'replied';
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

// Initial Seed Data
const initialCategories: Category[] = [
  {
    id: 'cat-1',
    slug: 'seo-debutant',
    name: 'SEO Débutant',
    tagline: 'Les bases indispensables',
    description: 'Apprenez les bases du SEO et lancez votre première stratégie.',
    icon: 'GraduationCap',
    themeColor: 'blue',
    coursesCount: 3,
  },
  {
    id: 'cat-2',
    slug: 'seo-avance',
    name: 'SEO Avancé',
    tagline: 'Maîtrise technique & sémantique',
    description: 'Maîtrisez les techniques avancées et passez au niveau supérieur.',
    icon: 'TrendingUp',
    themeColor: 'yellow',
    coursesCount: 4,
  },
  {
    id: 'cat-3',
    slug: 'seo-business',
    name: 'SEO Business',
    tagline: 'Croissance & Conversion B2B / B2C',
    description: 'Utilisez le SEO pour développer votre entreprise ou votre carrière.',
    icon: 'Briefcase',
    themeColor: 'cyan',
    coursesCount: 3,
  },
  {
    id: 'cat-4',
    slug: 'redaction-seo',
    name: 'Rédaction SEO & IA',
    tagline: 'Contenus qui rankent et convertissent',
    description: 'Créez du contenu optimisé qui séduit les moteurs de recherche et les utilisateurs.',
    icon: 'FileText',
    themeColor: 'emerald',
    coursesCount: 2,
  },
  {
    id: 'cat-5',
    slug: 'seo-technique',
    name: 'SEO Technique',
    tagline: 'Crawl, indexation et vitesse web',
    description: 'Optimisez l’architecture, la vitesse mobile et l’indexation de vos sites.',
    icon: 'Cpu',
    themeColor: 'purple',
    coursesCount: 2,
  },
  {
    id: 'cat-6',
    slug: 'netlinking',
    name: 'Netlinking & Autorité',
    tagline: 'Backlinks de haute qualité',
    description: 'Bâtissez une autorité de domaine puissante et durable sans pénalité.',
    icon: 'Link2',
    themeColor: 'orange',
    coursesCount: 2,
  },
];

const initialCourses: Course[] = [
  {
    id: 'course-1',
    slug: 'seo-debutant-fondations',
    title: 'SEO Débutant : Fondations & Premières Positions',
    shortDescription: 'Apprenez les bases du SEO et lancez votre première stratégie concrète sur Google.',
    fullDescription: 'Cette formation complète vous guide pas à pas pour comprendre le fonctionnement des algorithmes de recherche Google, structurer votre site, choisir les bons mots-clés et générer un trafic qualifié durable.',
    category: 'seo-debutant',
    categoryName: 'SEO Débutant',
    level: 'Débutant',
    durationHours: 18,
    totalLessons: 24,
    priceMAD: 1490,
    priceEUR: 139,
    originalPriceMAD: 2200,
    rating: 4.9,
    reviewsCount: 184,
    studentsCount: 1240,
    instructor: {
      name: 'Yassine Bennani',
      role: 'Head of SEO & Fondateur FormaSeo',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      bio: 'Plus de 10 ans d’expérience en référencement naturel, consultant pour les plus grandes marques au Maroc et en Europe.'
    },
    thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    badge: 'Best-Seller',
    featured: true,
    learningOutcomes: [
      'Comprendre le fonctionnement complet de l’algorithme Google et l’indexation',
      'Identifier les mots-clés à fort volume et faible concurrence adaptés à votre niche',
      'Optimiser les balises title, meta descriptions, Hn et le maillage interne',
      'Maîtriser Google Search Console et Google Analytics 4',
      'Créer votre premier plan d’action SEO sur 90 jours'
    ],
    prerequisites: [
      'Aucune connaissance technique préalable requise',
      'Un ordinateur avec connexion Internet'
    ],
    modules: [
      {
        id: 'mod-1',
        title: 'Module 1 : Introduction & Mécaniques de Google',
        lessons: [
          {
            id: 'les-101',
            title: 'Bienvenue chez FormaSeo : Feuille de route',
            duration: '06:15',
            videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
            summary: 'Présentation générale de la formation et des livrables pratiques à accomplir.',
          },
          {
            id: 'les-102',
            title: 'Comment Google crawle, indexe et classe les pages web',
            duration: '14:20',
            videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
            summary: 'Le parcours d’un robot Googlebot : du lien découvert au score de pertinence.',
          },
          {
            id: 'les-103',
            title: 'Les 3 piliers indispensables du SEO moderne',
            duration: '18:45',
            videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
            summary: 'Technique, Contenu et Popularité : comment équilibrer vos efforts.',
          }
        ]
      },
      {
        id: 'mod-2',
        title: 'Module 2 : Recherche de Mots-Clés & Intentions',
        lessons: [
          {
            id: 'les-201',
            title: 'Comprendre l’intention de recherche (Search Intent)',
            duration: '15:10',
            videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
            summary: 'Informationnelle, navigationnelle, commerciale et transactionnelle.',
          },
          {
            id: 'les-202',
            title: 'Atelier Pratique : Trouver 100 mots-clés rentables avec des outils gratuits',
            duration: '22:30',
            videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
            summary: 'Méthodologie concrète étape par étape avec Google Suggest, Ubersuggest et AnswerThePublic.',
          }
        ]
      }
    ]
  },
  {
    id: 'course-2',
    slug: 'seo-avance-technique-semantique',
    title: 'SEO Avancé : Sémantique, Crawl & Stratégies d’Échelle',
    shortDescription: 'Maîtrisez les techniques avancées et passez au niveau supérieur du référencement.',
    fullDescription: 'Conçu pour les professionnels, chefs de projet et référenceurs confirmés souhaitant dominer des marchés ultra-compétitifs grâce aux cocons sémantiques, à l’analyse de logs et au SEO programmatique.',
    category: 'seo-avance',
    categoryName: 'SEO Avancé',
    level: 'Avancé',
    durationHours: 26,
    totalLessons: 36,
    priceMAD: 2990,
    priceEUR: 279,
    originalPriceMAD: 4500,
    rating: 4.95,
    reviewsCount: 142,
    studentsCount: 820,
    instructor: {
      name: 'Mehdi Alami',
      role: 'Directeur Technique SEO & Data Engineer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      bio: 'Spécialiste du SEO à fort trafic (>5M visites/mois), expert Screaming Frog, Python pour SEO et architecture web.'
    },
    thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    badge: 'Expert Pro',
    featured: true,
    learningOutcomes: [
      'Concevoir des architectures en cocons sémantiques et Topic Clusters étanches',
      'Analyser les logs serveurs pour traquer le comportement exact de Googlebot',
      'Automatiser vos audits et scraping SEO avec Python',
      'Optimiser le budget de crawl sur les sites de plus de 50 000 URLs',
      'Mettre en place des stratégies de SEO Programmatique à grande échelle'
    ],
    prerequisites: [
      'Bases solides en SEO ou pratique professionnelle d’au moins 1 an',
      'Connaissance de base de HTML/CSS et de Google Search Console'
    ],
    modules: [
      {
        id: 'mod-201',
        title: 'Module 1 : Architecture Sémantique Avancée',
        lessons: [
          {
            id: 'les-201a',
            title: 'Théorie et modélisation du Cocon Sémantique de Laurent Bourrelly',
            duration: '21:30',
            videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
            summary: 'Calcul du glissement sémantique et règles de maillage descendant et transversal.',
          }
        ]
      }
    ]
  },
  {
    id: 'course-3',
    slug: 'redaction-seo-ia',
    title: 'Rédaction SEO & Copywriting Hybride IA',
    shortDescription: 'Créez du contenu hautement optimisé qui surpasse la concurrence et captive vos lecteurs.',
    fullDescription: 'Apprenez à rédiger des articles et landing pages qui se positionnent en top 3 Google tout en générant des conversions massives, en exploitant l’IA comme un co-pilote ultra-performant.',
    category: 'redaction-seo',
    categoryName: 'Rédaction SEO & IA',
    level: 'Intermédiaire',
    durationHours: 15,
    totalLessons: 20,
    priceMAD: 1290,
    priceEUR: 119,
    originalPriceMAD: 1900,
    rating: 4.88,
    reviewsCount: 96,
    studentsCount: 650,
    instructor: {
      name: 'Salma Tazi',
      role: 'Lead Content Strategist & Formatrice SEO',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
      bio: 'Auteure et consultante éditoriale, spécialisée dans la création de contenus engageants à haute valeur ajoutée.'
    },
    thumbnail: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80',
    badge: 'Tendance 2026',
    featured: true,
    learningOutcomes: [
      'Rédiger des briefs SEO percutants et structurés pour le SEO',
      'Optimiser vos scores sémantiques avec YourTextGuru et 1.fr',
      'Maîtriser les prompts d’ingénierie pour ChatGPT, Claude et Gemini'
    ],
    prerequisites: ['Bonne maîtrise de la langue française écrite'],
    modules: [
      {
        id: 'mod-301',
        title: 'Module 1 : Les Fondations de l’Écriture pour le Web',
        lessons: [
          {
            id: 'les-301a',
            title: 'Comment Google lit un texte : TF-IDF et entités nommées',
            duration: '16:15',
            videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
            summary: 'Comprendre l’analyse sémantique latente et l’importance du champ lexical.',
          }
        ]
      }
    ]
  },
  {
    id: 'course-4',
    slug: 'seo-business-ecommerce',
    title: 'SEO Business & E-Commerce : Du Trafic au Chiffre d’Affaires',
    shortDescription: 'Utilisez le SEO pour développer votre entreprise, acquérir des clients qualifiés et booster votre ROI.',
    fullDescription: 'La formation orientée business et e-commerce. Découvrez comment transformer Google en canal d’acquisition numéro 1 sans dépendre de la publicité payante.',
    category: 'seo-business',
    categoryName: 'SEO Business',
    level: 'Tous niveaux',
    durationHours: 20,
    totalLessons: 28,
    priceMAD: 2490,
    priceEUR: 229,
    originalPriceMAD: 3800,
    rating: 4.92,
    reviewsCount: 110,
    studentsCount: 540,
    instructor: {
      name: 'Yassine Bennani',
      role: 'Head of SEO & Fondateur FormaSeo',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      bio: 'Plus de 10 ans d’expérience en référencement naturel, consultant pour les plus grandes marques au Maroc et en Europe.'
    },
    thumbnail: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
    badge: 'Top Business',
    featured: false,
    learningOutcomes: [
      'Optimiser des fiches produits et catégories Shopify et WooCommerce',
      'Mettre en place une stratégie de SEO local au Maroc (Google Business Profile)'
    ],
    prerequisites: ['Posséder ou gérer un site vitrine, blog ou boutique e-commerce'],
    modules: [
      {
        id: 'mod-401',
        title: 'Module 1 : Stratégie Business & SEO E-commerce',
        lessons: [
          {
            id: 'les-401a',
            title: 'L’entonnoir de conversion SEO : de l’information à l’achat',
            duration: '18:10',
            videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
            summary: 'Aligner vos pages cibles avec les intentions transactionnelles.',
          }
        ]
      }
    ]
  },
  {
    id: 'course-5',
    slug: 'seo-technique-core-web-vitals',
    title: 'SEO Technique & Core Web Vitals : Vitesse et Indexation',
    shortDescription: 'Optimisez l’architecture, la performance web et la vitesse pour séduire Googlebot.',
    fullDescription: 'Un cours technique pointu pour maîtriser le rendu JavaScript, le protocole HTTPS/HTTP3, les données structurées Schema.org avancées.',
    category: 'seo-technique',
    categoryName: 'SEO Technique',
    level: 'Avancé',
    durationHours: 22,
    totalLessons: 30,
    priceMAD: 2690,
    priceEUR: 249,
    originalPriceMAD: 3900,
    rating: 4.97,
    reviewsCount: 78,
    studentsCount: 410,
    instructor: {
      name: 'Mehdi Alami',
      role: 'Directeur Technique SEO & Data Engineer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      bio: 'Spécialiste du SEO à fort trafic (>5M visites/mois).'
    },
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    featured: false,
    learningOutcomes: ['Diagnostiquer et optimiser les signaux Web essentiels (LCP, INP, CLS)'],
    prerequisites: ['Connaissance des technologies web (HTML, JavaScript, serveur)'],
    modules: [
      {
        id: 'mod-501',
        title: 'Module 1 : Performance Web & Google PageSpeed',
        lessons: [
          {
            id: 'les-501a',
            title: 'Comprendre et maîtriser le trio LCP, INP et CLS',
            duration: '22:00',
            videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
            summary: 'Mesure sur le terrain vs mesure en laboratoire.',
          }
        ]
      }
    ]
  },
  {
    id: 'course-6',
    slug: 'netlinking-strategie-autorite',
    title: 'Netlinking & Autorité : Acquisition de Backlinks Puissants',
    shortDescription: 'Bâtissez une stratégie de liens solides et pérennes sans risquer de pénalité Google.',
    fullDescription: 'Découvrez les méthodes white-hat pour obtenir des backlinks à fort Trust Flow et monter des campagnes de relations presse digitales.',
    category: 'netlinking',
    categoryName: 'Netlinking & Autorité',
    level: 'Intermédiaire',
    durationHours: 14,
    totalLessons: 18,
    priceMAD: 1890,
    priceEUR: 175,
    originalPriceMAD: 2800,
    rating: 4.86,
    reviewsCount: 65,
    studentsCount: 390,
    instructor: {
      name: 'Yassine Bennani',
      role: 'Head of SEO & Fondateur FormaSeo',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      bio: 'Plus de 10 ans d’expérience en référencement naturel.'
    },
    thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80',
    featured: false,
    learningOutcomes: ['Évaluer la qualité réelle d’un site distant', 'Mettre en place des campagnes d’outreach'],
    prerequisites: ['Avoir un site avec des pages de contenu déjà indexées'],
    modules: [
      {
        id: 'mod-601',
        title: 'Module 1 : Fondements du PageRank et des Liens',
        lessons: [
          {
            id: 'les-601a',
            title: 'Comment le PageRank transmet le jus de lien (Link Juice)',
            duration: '17:30',
            videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
            summary: 'Dofollow, Nofollow, Sponsored, UGC : comment les utiliser judicieusement.',
          }
        ]
      }
    ]
  }
];

const initialArticles: Article[] = [
  {
    id: 'art-1',
    slug: 'guide-seo-maroc-2026',
    title: 'Comment Réussir son Référencement Naturel au Maroc en 2026',
    excerpt: 'Le marché marocain du Search est en pleine mutation. Découvrez les particularités locales, le multilinguisme (FR/AR/Darija) et les opportunités SEO inexploitées.',
    content: `Le SEO au Maroc présente des spécificités uniques que peu d'agences internationales maîtrisent réellement. Entre la cohabitation du Français et de l'Arabe dans les requêtes de recherche, l'essor fulgurant du commerce en ligne local et l'importance cruciale du SEO local sur Google Maps à Casablanca, Rabat, Marrakech et Tanger, les opportunités n'ont jamais été aussi grandes.`,
    category: 'SEO Local & Stratégie',
    author: {
      name: 'Yassine Bennani',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      role: 'Fondateur FormaSeo'
    },
    publishedAt: '2026-03-15',
    readTimeMinutes: 7,
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    tags: ['SEO Maroc', 'SEO Local', 'Stratégie']
  },
  {
    id: 'art-2',
    slug: 'ia-generative-impact-seo',
    title: 'L’IA Générative et les Moteurs de Réponse : Quel Avenir pour le Trafic SEO ?',
    excerpt: 'Google AI Overviews, SearchGPT, Gemini : comment adapter sa stratégie de contenu pour continuer à capturer du trafic qualifié sans craindre le zéro-clic.',
    content: `L'intégration des résumés d'intelligence artificielle dans les pages de résultats bouscule les certitudes historiques du Search. Voici comment structurer vos pages pour devenir la source citée par les LLMs tout en conservant une audience fidèle.`,
    category: 'Innovation & IA',
    author: {
      name: 'Salma Tazi',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
      role: 'Lead Content Strategist'
    },
    publishedAt: '2026-02-28',
    readTimeMinutes: 5,
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    tags: ['IA', 'Google SGE', 'Avenir SEO']
  }
];

const initialReviews: Review[] = [
  {
    id: 'rev-1',
    courseId: 'course-1',
    userName: 'Kenza Chraibi',
    userRole: 'Responsable Marketing Digital @ Casablanca',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    comment: 'La meilleure formation SEO que j’ai pu suivre au Maroc ! Des exemples concrets sur le marché local et un support très réactif.',
    date: 'Il y a 2 semaines'
  },
  {
    id: 'rev-2',
    courseId: 'course-2',
    userName: 'Omar El Fassi',
    userRole: 'Fondateur E-commerce & Consultant',
    userAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    comment: 'Le module sur l’analyse de logs et les cocons sémantiques a transformé notre approche. Nous avons multiplié par 3 notre trafic organique.',
    date: 'Il y a 1 mois'
  }
];

const initialUsers: User[] = [
  {
    id: 'usr-admin',
    name: 'Administrateur FormaSeo',
    email: 'admin@formaseo.ma',
    password: 'admin',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    enrolledCourseIds: ['course-1', 'course-2', 'course-3', 'course-4', 'course-5', 'course-6'],
    completedLessonIds: ['les-101', 'les-102', 'les-201', 'les-301a'],
    createdAt: '2026-01-01T08:00:00.000Z'
  },
  {
    id: 'usr-1',
    name: 'Karim Mansouri',
    email: 'student@formaseo.ma',
    password: 'demo',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    enrolledCourseIds: ['course-1', 'course-3'],
    completedLessonIds: ['les-101', 'les-102'],
    createdAt: '2026-01-10T10:00:00.000Z'
  }
];

const initialContacts: ContactMessage[] = [
  {
    id: 'msg-1',
    name: 'Mehdi Benjelloun',
    email: 'm.benjelloun@digitmaroc.ma',
    phone: '+212 6 61 23 45 67',
    subject: 'Formation pour une équipe de 6 personnes',
    message: 'Bonjour, nous souhaitons former notre équipe marketing au SEO avancé et rédaction avec IA. Pourrions-nous obtenir une convention de formation pour le mois prochain ?',
    serviceInterest: 'Formation Entreprise',
    createdAt: '2026-03-24T14:30:00.000Z',
    status: 'new',
  },
  {
    id: 'msg-2',
    name: 'Sara Kabbaj',
    email: 'sara.kabbaj@ecommerce.ma',
    phone: '+212 6 62 88 99 00',
    subject: 'Audit SEO & Pass Illimité',
    message: 'Je lance une boutique de cosmétiques bio au Maroc et je cherche à optimiser mes fiches catégories pour ranker devant la concurrence.',
    serviceInterest: 'SEO Business',
    createdAt: '2026-03-22T09:15:00.000Z',
    status: 'read',
  }
];

// Persistent File Store Helper
const DATA_FILE = path.join(process.cwd(), 'server', 'data_store.json');

interface DBData {
  categories: Category[];
  courses: Course[];
  articles: Article[];
  reviews: Review[];
  users: User[];
  contacts: ContactMessage[];
}

class Database {
  private data: DBData;

  constructor() {
    this.data = this.loadData();
  }

  private loadData(): DBData {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');
        const parsed = JSON.parse(fileContent);
        // Ensure admin user exists
        if (!parsed.users.some((u: User) => u.email === 'admin@formaseo.ma')) {
          parsed.users.unshift(initialUsers[0]);
        }
        if (!parsed.contacts || parsed.contacts.length === 0) {
          parsed.contacts = initialContacts;
        }
        return parsed;
      }
    } catch (err) {
      console.warn('Could not read persistent data file, using defaults.', err);
    }
    const defaultData: DBData = {
      categories: initialCategories,
      courses: initialCourses,
      articles: initialArticles,
      reviews: initialReviews,
      users: initialUsers,
      contacts: initialContacts,
    };
    this.saveData(defaultData);
    return defaultData;
  }

  private saveData(dataToSave?: DBData) {
    try {
      const data = dataToSave || this.data;
      const dir = path.dirname(DATA_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error saving data to file:', err);
    }
  }

  // Categories
  getCategories(): Category[] {
    return this.data.categories;
  }

  // Courses
  getCourses(filters?: { category?: string; search?: string; level?: string }): Course[] {
    let list = [...this.data.courses];
    if (filters?.category && filters.category !== 'all') {
      list = list.filter(c => c.category === filters.category);
    }
    if (filters?.level && filters.level !== 'all') {
      list = list.filter(c => c.level === filters.level);
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(c => 
        c.title.toLowerCase().includes(q) || 
        c.shortDescription.toLowerCase().includes(q) ||
        c.categoryName.toLowerCase().includes(q)
      );
    }
    return list;
  }

  getCourseBySlug(slug: string): Course | undefined {
    return this.data.courses.find(c => c.slug === slug || c.id === slug);
  }

  addCourse(courseData: Partial<Course>): Course {
    const slug = courseData.slug || courseData.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'course-' + Date.now();
    const newCourse: Course = {
      id: 'course-' + Date.now(),
      slug,
      title: courseData.title || 'Nouvelle Formation SEO',
      shortDescription: courseData.shortDescription || 'Description courte de la formation.',
      fullDescription: courseData.fullDescription || 'Description complète détaillée.',
      category: courseData.category || 'seo-debutant',
      categoryName: courseData.categoryName || 'SEO Débutant',
      level: courseData.level || 'Tous niveaux',
      durationHours: Number(courseData.durationHours) || 12,
      totalLessons: Number(courseData.totalLessons) || 15,
      priceMAD: Number(courseData.priceMAD) || 1490,
      priceEUR: Number(courseData.priceEUR) || 139,
      originalPriceMAD: Number(courseData.originalPriceMAD) || 2200,
      rating: 5.0,
      reviewsCount: 1,
      studentsCount: 0,
      instructor: courseData.instructor || {
        name: 'Yassine Bennani',
        role: 'Head of SEO FormaSeo',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        bio: 'Consultant & Formateur SEO.',
      },
      thumbnail: courseData.thumbnail || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
      badge: courseData.badge || 'Nouveau',
      featured: courseData.featured || false,
      learningOutcomes: courseData.learningOutcomes || ['Maîtriser les principes clés du SEO'],
      prerequisites: courseData.prerequisites || ['Aucun prérequis technique'],
      modules: courseData.modules || [
        {
          id: 'mod-init',
          title: 'Module 1 : Introduction & Fondamentaux',
          lessons: [
            {
              id: 'les-init-1',
              title: 'Introduction au programme',
              duration: '10:00',
              videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
              summary: 'Bienvenue dans ce cours.',
            }
          ]
        }
      ]
    };
    this.data.courses.unshift(newCourse);
    this.saveData();
    return newCourse;
  }

  updateCourse(id: string, updates: Partial<Course>): Course | null {
    const idx = this.data.courses.findIndex(c => c.id === id || c.slug === id);
    if (idx === -1) return null;
    this.data.courses[idx] = { ...this.data.courses[idx], ...updates };
    this.saveData();
    return this.data.courses[idx];
  }

  deleteCourse(id: string): boolean {
    const initialLen = this.data.courses.length;
    this.data.courses = this.data.courses.filter(c => c.id !== id && c.slug !== id);
    if (this.data.courses.length !== initialLen) {
      this.saveData();
      return true;
    }
    return false;
  }

  // Articles
  getArticles(search?: string): Article[] {
    let list = [...this.data.articles];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(a => a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q));
    }
    return list;
  }

  getArticleBySlug(slug: string): Article | undefined {
    return this.data.articles.find(a => a.slug === slug || a.id === slug);
  }

  addArticle(art: Partial<Article>): Article {
    const slug = art.slug || art.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'article-' + Date.now();
    const newArt: Article = {
      id: 'art-' + Date.now(),
      slug,
      title: art.title || 'Nouvel article SEO',
      excerpt: art.excerpt || 'Résumé de l’article...',
      content: art.content || 'Contenu détaillé de l’article...',
      category: art.category || 'Actualités SEO',
      author: art.author || {
        name: 'Équipe FormaSeo',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        role: 'Rédaction & Stratégie'
      },
      publishedAt: new Date().toISOString().split('T')[0],
      readTimeMinutes: art.readTimeMinutes || 6,
      thumbnail: art.thumbnail || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      tags: art.tags || ['SEO', 'Maroc', 'Visibilité']
    };
    this.data.articles.unshift(newArt);
    this.saveData();
    return newArt;
  }

  deleteArticle(id: string): boolean {
    const len = this.data.articles.length;
    this.data.articles = this.data.articles.filter(a => a.id !== id && a.slug !== id);
    if (this.data.articles.length !== len) {
      this.saveData();
      return true;
    }
    return false;
  }

  // Reviews
  getReviews(courseId?: string): Review[] {
    if (courseId) {
      return this.data.reviews.filter(r => r.courseId === courseId);
    }
    return this.data.reviews;
  }

  addReview(review: Omit<Review, 'id' | 'date'>): Review {
    const newRev: Review = {
      ...review,
      id: 'rev-' + Date.now(),
      date: 'À l’instant'
    };
    this.data.reviews.unshift(newRev);
    this.saveData();
    return newRev;
  }

  deleteReview(id: string): boolean {
    const len = this.data.reviews.length;
    this.data.reviews = this.data.reviews.filter(r => r.id !== id);
    if (this.data.reviews.length !== len) {
      this.saveData();
      return true;
    }
    return false;
  }

  // Users & Auth
  getUsers(): User[] {
    return this.data.users;
  }

  findUserByEmail(email: string): User | undefined {
    return this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  findUserById(id: string): User | undefined {
    return this.data.users.find(u => u.id === id);
  }

  createUser(name: string, email: string, password?: string): User {
    const isAdmin = email.toLowerCase().includes('admin');
    const newUser: User = {
      id: 'usr-' + Date.now(),
      name,
      email,
      password: password || 'demo123',
      role: isAdmin ? 'admin' : 'student',
      avatar: isAdmin
        ? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80'
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      enrolledCourseIds: isAdmin ? ['course-1', 'course-2', 'course-3', 'course-4', 'course-5', 'course-6'] : [],
      completedLessonIds: [],
      createdAt: new Date().toISOString()
    };
    this.data.users.push(newUser);
    this.saveData();
    return newUser;
  }

  enrollUserInCourse(userId: string, courseId: string): User | null {
    const user = this.data.users.find(u => u.id === userId);
    if (!user) return null;
    if (!user.enrolledCourseIds.includes(courseId)) {
      user.enrolledCourseIds.push(courseId);
      this.saveData();
    }
    return user;
  }

  toggleLessonCompletion(userId: string, lessonId: string): User | null {
    const user = this.data.users.find(u => u.id === userId);
    if (!user) return null;
    if (user.completedLessonIds.includes(lessonId)) {
      user.completedLessonIds = user.completedLessonIds.filter(id => id !== lessonId);
    } else {
      user.completedLessonIds.push(lessonId);
    }
    this.saveData();
    return user;
  }

  // Contact
  getContacts(): ContactMessage[] {
    return this.data.contacts;
  }

  addContactMessage(msg: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>): ContactMessage {
    const newMsg: ContactMessage = {
      ...msg,
      id: 'msg-' + Date.now(),
      createdAt: new Date().toISOString(),
      status: 'new'
    };
    this.data.contacts.unshift(newMsg);
    this.saveData();
    return newMsg;
  }

  updateContactStatus(id: string, status: 'new' | 'read' | 'replied'): ContactMessage | null {
    const contact = this.data.contacts.find(c => c.id === id);
    if (!contact) return null;
    contact.status = status;
    this.saveData();
    return contact;
  }

  getStats() {
    return {
      totalStudents: 2850,
      satisfactionRate: 98.4,
      totalHoursTraining: 120,
      certificationsIssued: 1940,
      partnerCompanies: 65,
    };
  }
}

export const db = new Database();
