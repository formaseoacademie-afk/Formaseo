import { AcademySettings, CurriculumWeek, FaqItem } from '../types';

export const fallbackSettings: AcademySettings = {
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

export const fallbackCurriculum: CurriculumWeek[] = [
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

export const fallbackFaqs: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'En quoi cette formation est-elle différente d’un cours théorique ?',
    answer: 'La formation FormaSEO.ma repose sur la pratique concrète. Vous ne vous contentez pas d’écouter des cours magistraux : vous concevez, paramétrez et référencez votre propre site web tout au long du programme.',
    category: 'Pédagogie'
  },
  {
    id: 'faq-2',
    question: 'Faut-il avoir des connaissances préalables en code ou en informatique ?',
    answer: 'Non. Aucun prérequis en programmation informatique n’est nécessaire. Nous utilisons WordPress et des interfaces visuelles claires pour que vous soyez totalement autonome sur la gestion de votre site.',
    category: 'Prérequis'
  },
  {
    id: 'faq-3',
    question: 'La formation se déroule-t-elle à Casablanca ou en ligne ?',
    answer: 'FormaSEO.ma propose des formats adaptés (en présentiel à Casablanca dans le secteur Mers Sultan, ou en session à distance interactive avec accompagnement). Les détails exacts de la prochaine session sont confirmés lors de votre candidature.',
    category: 'Format',
    needsConfirmation: true
  },
  {
    id: 'faq-4',
    question: 'Quel est le résultat concret à la fin des 5 semaines ?',
    answer: 'Vous disposez d’un site web WordPress en ligne, structuré selon les bonnes pratiques SEO, avec une recherche de mots-clés validée, une fiche Google Maps optimisée et vos outils de mesure (Google Search Console & Analytics) connectés.',
    category: 'Résultats'
  },
  {
    id: 'faq-5',
    question: 'Comment connaître les dates et tarifs de la prochaine session ?',
    answer: 'Les dates et tarifs exacts de la prochaine promotion sont communiqués directement par email ou WhatsApp aux personnes ayant rempli le formulaire de demande de programme.',
    category: 'Inscriptions',
    needsConfirmation: true
  }
];
