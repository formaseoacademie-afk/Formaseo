import fs from 'fs';
import path from 'path';

export interface CurriculumWeek {
  weekNumber: number;
  title: string;
  focus: string;
  topics: string[];
  tools: string[];
  deliverable: string;
  confirmationStatus: 'proposé' | 'validé';
}

export interface AcademySettings {
  name: string;
  domain: string;
  city: string;
  addressNote: string;
  founderName: string;
  founderRole: string;
  founderStatus: string;
  headline: string;
  subtitle: string;
  formatDescription: string;
  proposedDuration: string;
  proposedPriceNote: string;
  includedItemsNote: string[];
  audiences: { title: string; subtitle: string; description: string; icon: string }[];
  toolsCovered: { name: string; category: string; description: string }[];
  ownerChecklist: { id: string; label: string; status: 'en_attente' | 'confirmé'; notes: string }[];
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  profileType: 'entrepreneur' | 'freelance' | 'etudiant' | 'professionnel' | 'autre';
  goal: string;
  preferredFormat: 'presentiel_casablanca' | 'en_ligne' | 'flexible';
  consent: boolean;
  createdAt: string;
  status: 'new' | 'in_review' | 'contacted';
  notes?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  needsConfirmation?: boolean;
}

const defaultAcademySettings: AcademySettings = {
  name: 'FormaSEO.ma',
  domain: 'formaseo.ma',
  city: 'Casablanca, Maroc',
  addressNote: 'Secteur Avenue Mers Sultan, Casablanca (adresse précise communiquée aux inscrits après confirmation)',
  founderName: 'Wassim Kassy',
  founderRole: 'Fondateur & Consultant SEO',
  founderStatus: 'Détails biographiques soumis à confirmation avec le fondateur',
  headline: 'Apprenez le SEO en créant un vrai projet digital.',
  subtitle: 'Une formation pratique à Casablanca pour apprendre à créer un site WordPress, développer sa visibilité sur Google et mesurer ses résultats.',
  formatDescription: 'Cursus axé sur la pratique concrète : vous construisez, optimisez et référencez votre propre projet de site web avec un accompagnement étape par étape.',
  proposedDuration: 'Cursus structuré en 5 semaines intensives (rythme et horaires exacts à valider selon la session)',
  proposedPriceNote: 'Tarifs et modalités de paiement communiqués sur demande pour la prochaine session',
  includedItemsNote: [
    'Création et personnalisation d’un site WordPress opérationnel',
    'Méthodologie concrète de recherche de mots-clés et rédaction SEO',
    'Configuration des outils officiels Google (Search Console, Analytics)',
    'Optimisation pour la visibilité locale à Casablanca et au Maroc',
    'Accompagnement pratique et revues de projet individuelles'
  ],
  audiences: [
    {
      title: 'Entrepreneurs & Porteurs de projet',
      subtitle: 'Créer son site et acquérir ses premiers clients',
      description: 'Concevez vous-même votre site vitrine ou boutique et positionnez votre activité sur les recherches de vos futurs clients sans dépendre uniquement du budget publicitaire.',
      icon: 'Rocket'
    },
    {
      title: 'Freelances & Rédacteurs',
      subtitle: 'Monétiser des compétences web à forte valeur',
      description: 'Enrichissez vos prestations avec l’audit SEO, l’optimisation de contenu et la création de sites WordPress pour proposer des offres complètes à vos clients.',
      icon: 'Briefcase'
    },
    {
      title: 'Étudiants & En reconversion',
      subtitle: 'Acquérir un savoir-faire digital concret',
      description: 'Sortez des cours théoriques grâce à un projet réel vérifiable à présenter aux recruteurs, démontrant votre maîtrise des outils du référencement naturel.',
      icon: 'GraduationCap'
    },
    {
      title: 'Dirigeants & Responsables Marketing',
      subtitle: 'Piloter et comprendre son acquisition web',
      description: 'Maîtrisez les leviers du Search pour auditer vos prestataires, optimiser le ROI de votre présence digitale et guider vos équipes internes.',
      icon: 'TrendingUp'
    }
  ],
  toolsCovered: [
    { name: 'WordPress', category: 'Création Web', description: 'Le CMS leader mondial pour concevoir et structurer un site professionnel.' },
    { name: 'Google Search Console', category: 'SEO & Indexation', description: 'L’outil officiel de Google pour surveiller le crawl, l’indexation et les requêtes.' },
    { name: 'Google Analytics (GA4)', category: 'Mesure & Données', description: 'Suivi des visiteurs, des conversions et du comportement utilisateur.' },
    { name: 'PageSpeed Insights', category: 'Performance Web', description: 'Mesure des signaux Web essentiels et optimisation de la vitesse sur mobile.' },
    { name: 'Google Keyword Planner', category: 'Recherche Mots-Clés', description: 'Identification des volumes de recherche et de la concurrence réelle.' },
    { name: 'Outils IA & Canva', category: 'Contenu & Visuels', description: 'Assistance à la rédaction de briefs SEO et création de visuels percutants.' }
  ],
  ownerChecklist: [
    { id: 'chk-1', label: 'Dates officielles de la prochaine session (Casablanca / En ligne)', status: 'en_attente', notes: 'À valider avec le responsable pédagogique' },
    { id: 'chk-2', label: 'Tarif officiel en vigueur et modalités de paiement (acompte / échelonné)', status: 'en_attente', notes: 'Confirmation des formules d’inscription' },
    { id: 'chk-3', label: 'Adresse exacte du centre à Casablanca (Avenue Mers Sultan)', status: 'en_attente', notes: 'Confirmer si sessions en présentiel, hybride ou 100% visio' },
    { id: 'chk-4', label: 'Numéro WhatsApp & Téléphone officiel de contact', status: 'en_attente', notes: 'Intégrer le numéro direct vérifié dès réception' },
    { id: 'chk-5', label: 'Biographie & Photo de Wassim Kassy', status: 'en_attente', notes: 'Validation du profil formateur pour la page À Propos' },
    { id: 'chk-6', label: 'Témoignages et projets d’élèves certifiés conformes', status: 'en_attente', notes: 'Remplacement des maquettes par les vrais retours d’expérience' }
  ]
};

const defaultCurriculum: CurriculumWeek[] = [
  {
    weekNumber: 1,
    title: 'Fondations Web & Création de votre Site WordPress',
    focus: 'Mise en place de l’infrastructure et architecture',
    topics: [
      'Comprendre le fonctionnement d’un site web : nom de domaine, hébergement et DNS',
      'Installation propre de WordPress et configuration des paramètres indispensables',
      'Choix d’un thème léger et ergonomique adapté aux mobiles',
      'Création des pages clés : Accueil, Services/Boutique, À Propos, Contact et Mentions Légales',
      'Sécurisation de base et gestion des extensions indispensables'
    ],
    tools: ['WordPress', 'Gutenberg/Constructeur de pages', 'Hébergement Web'],
    deliverable: 'Votre site web personnel ou professionnel déployé en ligne avec une structure saine.',
    confirmationStatus: 'proposé'
  },
  {
    weekNumber: 2,
    title: 'Recherche de Mots-Clés & Stratégie Éditoriale SEO',
    focus: 'Identifier les requêtes rentables et structurer son contenu',
    topics: [
      'Comprendre les différentes intentions de recherche (informationnelle, transactionnelle, locale)',
      'Méthodologie de recherche de mots-clés avec Google Keyword Planner et Google Suggest',
      'Organisation sémantique des pages et création d’un calendrier éditorial',
      'Rédaction optimisée pour Google : structure Hn, lisibilité et champ lexical',
      'Utilisation responsable des assistants IA pour accélérer la rédaction sans pénalité'
    ],
    tools: ['Google Keyword Planner', 'AnswerThePublic', 'Assistants IA'],
    deliverable: 'Cartographie de 50+ mots-clés cibles et publication de votre premier article optimisé.',
    confirmationStatus: 'proposé'
  },
  {
    weekNumber: 3,
    title: 'Optimisation On-Page & Performance Technique',
    focus: 'Rendre votre site attractif et rapide pour Googlebot',
    topics: [
      'Optimisation chirurgicale des balises Title, Meta Descriptions et URLs',
      'Balisage des images (attributs ALT, compression, formats modernes WebP)',
      'Stratégie de maillage interne pour guider les visiteurs et les robots',
      'Comprendre la vitesse de chargement et tester avec PageSpeed Insights',
      'Création et soumission du fichier sitemap.xml et du fichier robots.txt'
    ],
    tools: ['PageSpeed Insights', 'Extension SEO WordPress (Rank Math / Yoast)', 'Sitemap XML'],
    deliverable: 'Audit technique et optimisation complète des pages stratégiques de votre site.',
    confirmationStatus: 'proposé'
  },
  {
    weekNumber: 4,
    title: 'SEO Local & Visibilité Multi-Canale',
    focus: 'Dominer les recherches géolocalisées et développer sa présence',
    topics: [
      'Création et optimisation complète de votre fiche Google Business Profile (Google Maps)',
      'Techniques pour capter les requêtes locales à Casablanca et dans les villes marocaines',
      'Gestion des avis clients, e-réputation et citations locales (NAP)',
      'Création de visuels simples et professionnels avec Canva pour valoriser son contenu',
      'Synergie entre SEO et réseaux sociaux pour générer des signaux d’engagement'
    ],
    tools: ['Google Business Profile', 'Canva', 'Google Maps'],
    deliverable: 'Fiche Google Maps configurée et plan d’action de visibilité locale activé.',
    confirmationStatus: 'proposé'
  },
  {
    weekNumber: 5,
    title: 'Analytics, Mesure des Résultats & Projet Final',
    focus: 'Analyser son trafic réel et valider ses livrables',
    topics: [
      'Connexion et configuration de Google Search Console pour suivre les impressions et clics',
      'Installation de Google Analytics 4 (GA4) et suivi des actions clés des utilisateurs',
      'Interpréter les données : quelles pages performent et comment itérer',
      'Revue individuelle et audit croisé de votre projet de site',
      'Plan d’action d’optimisation continue sur les 3 prochains mois'
    ],
    tools: ['Google Search Console', 'Google Analytics 4', 'Rapports SEO'],
    deliverable: 'Projet final complet : site en ligne, optimisé, suivi sur Search Console et GA4.',
    confirmationStatus: 'proposé'
  }
];

const defaultFaqs: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'En quoi cette formation est-elle différente d’un cours classique ?',
    answer: 'La formation FormaSEO.ma repose sur la pratique concrète. Plutôt que d’écouter de la théorie passive, vous travaillez directement sur la conception, l’optimisation et le référencement de votre propre site web ou projet professionnel.',
    category: 'Pédagogie'
  },
  {
    id: 'faq-2',
    question: 'Faut-il savoir coder pour suivre la formation ?',
    answer: 'Non, aucun prérequis en programmation informatique n’est nécessaire. Nous utilisons WordPress et des outils visuels accessibles pour vous apprendre à bâtir un site professionnel et optimisé de façon autonome.',
    category: 'Prérequis'
  },
  {
    id: 'faq-3',
    question: 'La formation a-t-elle lieu en présentiel à Casablanca ou en ligne ?',
    answer: 'FormaSEO.ma propose des formats adaptés (présentiel à Casablanca dans le secteur Mers Sultan, ou sessions à distance avec accompagnement). Les modalités exactes de la prochaine session sont confirmées lors de votre demande de programme.',
    category: 'Format',
    needsConfirmation: true
  },
  {
    id: 'faq-4',
    question: 'Que vais-je concrètement obtenir à la fin de la formation ?',
    answer: 'Vous repartez avec un site WordPress fonctionnel, votre recherche de mots-clés effectuée, vos pages optimisées pour le SEO, votre fiche Google Maps configurée et vos outils de mesure (Search Console, Analytics) connectés.',
    category: 'Résultats'
  },
  {
    id: 'faq-5',
    question: 'Quels sont les tarifs et dates de la prochaine session ?',
    answer: 'Les dates précises, horaires et tarifs de la session à venir vous sont envoyés par email et WhatsApp dès réception de votre formulaire de candidature, afin de vous garantir des informations à jour.',
    category: 'Inscriptions',
    needsConfirmation: true
  }
];

const DATA_FILE = path.join(process.cwd(), 'server', 'data_store_formaseo.json');

interface FormaSeoDataStore {
  settings: AcademySettings;
  curriculum: CurriculumWeek[];
  faqs: FaqItem[];
  enquiries: Enquiry[];
}

class Database {
  private data: FormaSeoDataStore;

  constructor() {
    this.data = this.loadData();
  }

  private loadData(): FormaSeoDataStore {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');
        return JSON.parse(fileContent);
      }
    } catch (err) {
      console.warn('Could not read persistent data file, using defaults.', err);
    }
    const defaultData: FormaSeoDataStore = {
      settings: defaultAcademySettings,
      curriculum: defaultCurriculum,
      faqs: defaultFaqs,
      enquiries: [
        {
          id: 'enq-1',
          name: 'Youssef El Amrani',
          email: 'youssef@example.com',
          phone: '+212 6 00 00 00 00',
          profileType: 'entrepreneur',
          goal: 'Lancer un site e-commerce et être visible sur Casablanca',
          preferredFormat: 'presentiel_casablanca',
          consent: true,
          createdAt: new Date().toISOString(),
          status: 'new',
        }
      ]
    };
    this.saveData(defaultData);
    return defaultData;
  }

  private saveData(dataToSave?: FormaSeoDataStore) {
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

  getSettings(): AcademySettings {
    return this.data.settings;
  }

  updateSettings(updates: Partial<AcademySettings>): AcademySettings {
    this.data.settings = { ...this.data.settings, ...updates };
    this.saveData();
    return this.data.settings;
  }

  getCurriculum(): CurriculumWeek[] {
    return this.data.curriculum;
  }

  updateCurriculumWeek(weekNumber: number, updates: Partial<CurriculumWeek>): CurriculumWeek | null {
    const idx = this.data.curriculum.findIndex(w => w.weekNumber === weekNumber);
    if (idx === -1) return null;
    this.data.curriculum[idx] = { ...this.data.curriculum[idx], ...updates };
    this.saveData();
    return this.data.curriculum[idx];
  }

  getFaqs(): FaqItem[] {
    return this.data.faqs;
  }

  getEnquiries(): Enquiry[] {
    return this.data.enquiries;
  }

  addEnquiry(enquiry: Omit<Enquiry, 'id' | 'createdAt' | 'status'>): Enquiry {
    const newEnquiry: Enquiry = {
      ...enquiry,
      id: 'enq-' + Date.now(),
      createdAt: new Date().toISOString(),
      status: 'new'
    };
    this.data.enquiries.unshift(newEnquiry);
    this.saveData();
    return newEnquiry;
  }

  updateEnquiryStatus(id: string, status: 'new' | 'in_review' | 'contacted', notes?: string): Enquiry | null {
    const item = this.data.enquiries.find(e => e.id === id);
    if (!item) return null;
    item.status = status;
    if (notes !== undefined) item.notes = notes;
    this.saveData();
    return item;
  }

  getChecklist() {
    return this.data.settings.ownerChecklist || [];
  }

  addChecklistItem(label: string, category: string = 'Lancement') {
    if (!this.data.settings.ownerChecklist) this.data.settings.ownerChecklist = [];
    const newItem = {
      id: 'chk-' + Date.now(),
      label,
      category,
      status: 'en_attente' as const,
      notes: ''
    };
    this.data.settings.ownerChecklist.push(newItem);
    this.saveData();
    return newItem;
  }

  updateChecklistItem(id: string, status: 'en_attente' | 'confirmé' | 'approved' | 'pending', notes?: string) {
    if (!this.data.settings.ownerChecklist) return [];
    const item = this.data.settings.ownerChecklist.find(c => c.id === id);
    if (item) {
      item.status = (status === 'approved' || status === 'confirmé') ? 'confirmé' : 'en_attente';
      if (notes !== undefined) item.notes = notes;
      this.saveData();
    }
    return this.data.settings.ownerChecklist;
  }

  deleteChecklistItem(id: string) {
    if (!this.data.settings.ownerChecklist) return false;
    const initialLen = this.data.settings.ownerChecklist.length;
    this.data.settings.ownerChecklist = this.data.settings.ownerChecklist.filter(c => c.id !== id);
    this.saveData();
    return this.data.settings.ownerChecklist.length < initialLen;
  }

  // FAQs CRUD
  addFaq(faq: Omit<FaqItem, 'id'>): FaqItem {
    const newFaq: FaqItem = {
      ...faq,
      id: 'faq-' + Date.now(),
    };
    this.data.faqs.push(newFaq);
    this.saveData();
    return newFaq;
  }

  updateFaq(id: string, updates: Partial<FaqItem>): FaqItem | null {
    const idx = this.data.faqs.findIndex(f => f.id === id);
    if (idx === -1) return null;
    this.data.faqs[idx] = { ...this.data.faqs[idx], ...updates };
    this.saveData();
    return this.data.faqs[idx];
  }

  deleteFaq(id: string): boolean {
    const initialLen = this.data.faqs.length;
    this.data.faqs = this.data.faqs.filter(f => f.id !== id);
    this.saveData();
    return this.data.faqs.length < initialLen;
  }

  // Enquiries CRUD
  deleteEnquiry(id: string): boolean {
    const initialLen = this.data.enquiries.length;
    this.data.enquiries = this.data.enquiries.filter(e => e.id !== id);
    this.saveData();
    return this.data.enquiries.length < initialLen;
  }
}

export const db = new Database();
