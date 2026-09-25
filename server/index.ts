import express from 'express';
import cors from 'cors';
import { db } from './db.ts';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`[API] ${req.method} ${req.url}`);
  next();
});

// Categories
app.get('/api/categories', (req, res) => {
  try {
    const categories = db.getCategories();
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération des catégories' });
  }
});

// Courses
app.get('/api/courses', (req, res) => {
  try {
    const { category, level, search } = req.query as {
      category?: string;
      level?: string;
      search?: string;
    };
    const courses = db.getCourses({ category, level, search });
    res.json({ success: true, count: courses.length, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération des cours' });
  }
});

app.get('/api/courses/:slug', (req, res) => {
  try {
    const course = db.getCourseBySlug(req.params.slug);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Formation introuvable' });
    }
    res.json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

// Articles / Blog
app.get('/api/articles', (req, res) => {
  try {
    const { search } = req.query as { search?: string };
    const articles = db.getArticles(search);
    res.json({ success: true, data: articles });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur blog' });
  }
});

app.get('/api/articles/:slug', (req, res) => {
  try {
    const article = db.getArticleBySlug(req.params.slug);
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article introuvable' });
    }
    res.json({ success: true, data: article });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

// Reviews
app.get('/api/reviews', (req, res) => {
  try {
    const { courseId } = req.query as { courseId?: string };
    const reviews = db.getReviews(courseId);
    res.json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur avis' });
  }
});

app.post('/api/reviews', (req, res) => {
  try {
    const { courseId, userName, userRole, rating, comment } = req.body;
    if (!courseId || !userName || !comment) {
      return res.status(400).json({ success: false, message: 'Champs obligatoires manquants' });
    }
    const newRev = db.addReview({
      courseId,
      userName,
      userRole: userRole || 'Étudiant FormaSeo',
      userAvatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80`,
      rating: Number(rating) || 5,
      comment,
    });
    res.json({ success: true, data: newRev });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur enregistrement avis' });
  }
});

// Auth
app.post('/api/auth/register', (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Nom et email requis' });
    }
    const existing = db.findUserByEmail(email);
    if (existing) {
      return res.status(400).json({ success: false, message: 'Cet email est déjà enregistré' });
    }
    const user = db.createUser(name, email, password);
    const { password: _, ...safeUser } = user;
    res.json({ success: true, data: safeUser, token: 'mock-jwt-' + user.id });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur inscription' });
  }
});

app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email requis' });
    }
    let user = db.findUserByEmail(email);
    if (!user) {
      user = db.createUser(email.split('@')[0], email, password || 'demo');
    }
    const { password: _, ...safeUser } = user;
    res.json({ success: true, data: safeUser, token: 'mock-jwt-' + user.id });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur connexion' });
  }
});

app.get('/api/auth/me', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const userId = authHeader?.replace('Bearer mock-jwt-', '');
    const user = (userId ? db.findUserById(userId) : null) || db.findUserById('usr-1');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Non authentifié' });
    }
    const { password: _, ...safeUser } = user;
    res.json({ success: true, data: safeUser });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur session' });
  }
});

// Enrollments & Progress
app.post('/api/enrollments', (req, res) => {
  try {
    const { userId, courseId } = req.body;
    const targetUserId = userId || 'usr-1';
    const user = db.enrollUserInCourse(targetUserId, courseId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Utilisateur introuvable' });
    }
    const { password: _, ...safeUser } = user;
    res.json({ success: true, message: 'Inscription réussie', data: safeUser });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur inscription cours' });
  }
});

app.post('/api/enrollments/toggle-lesson', (req, res) => {
  try {
    const { userId, lessonId } = req.body;
    const targetUserId = userId || 'usr-1';
    const user = db.toggleLessonCompletion(targetUserId, lessonId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Utilisateur introuvable' });
    }
    const { password: _, ...safeUser } = user;
    res.json({ success: true, data: safeUser });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur mise à jour leçon' });
  }
});

// Contact & Diagnostic SEO Form
app.get('/api/contact', (req, res) => {
  try {
    res.json({ success: true, data: db.getContacts() });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur récupération contacts' });
  }
});

app.post('/api/contact', (req, res) => {
  try {
    const { name, email, phone, subject, message, serviceInterest } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Veuillez remplir les champs obligatoires' });
    }
    const contact = db.addContactMessage({
      name,
      email,
      phone,
      subject: subject || 'Demande de formation / Audit SEO',
      message,
      serviceInterest,
    });
    res.json({
      success: true,
      message: 'Votre message a été transmis avec succès. Notre équipe vous recontactera sous 24h ouvrées.',
      data: contact,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur formulaire de contact' });
  }
});

// ==========================================
// ADMIN ENDPOINTS
// ==========================================

// 1. Overview metrics
app.get('/api/admin/overview', (req, res) => {
  try {
    const courses = db.getCourses();
    const contacts = db.getContacts();
    const users = db.getUsers();
    const reviews = db.getReviews();
    const stats = db.getStats();

    const newContacts = contacts.filter(c => c.status === 'new').length;
    const totalEnrollments = users.reduce((acc, u) => acc + u.enrolledCourseIds.length, 0);

    res.json({
      success: true,
      data: {
        totalCourses: courses.length,
        totalContacts: contacts.length,
        newContactsCount: newContacts,
        totalUsers: users.length,
        totalEnrollments,
        totalReviews: reviews.length,
        satisfactionRate: stats.satisfactionRate,
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur admin overview' });
  }
});

// 2. Contacts management
app.get('/api/admin/contacts', (req, res) => {
  try {
    res.json({ success: true, data: db.getContacts() });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur admin contacts' });
  }
});

app.patch('/api/admin/contacts/:id', (req, res) => {
  try {
    const { status } = req.body;
    const updated = db.updateContactStatus(req.params.id, status);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Message introuvable' });
    }
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur mise à jour message' });
  }
});

// 3. Courses CRUD
app.post('/api/admin/courses', (req, res) => {
  try {
    const newCourse = db.addCourse(req.body);
    res.json({ success: true, data: newCourse });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur création cours' });
  }
});

app.put('/api/admin/courses/:id', (req, res) => {
  try {
    const updated = db.updateCourse(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Cours introuvable' });
    }
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur modification cours' });
  }
});

app.delete('/api/admin/courses/:id', (req, res) => {
  try {
    const deleted = db.deleteCourse(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Cours introuvable' });
    }
    res.json({ success: true, message: 'Cours supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur suppression cours' });
  }
});

// 4. Users list
app.get('/api/admin/users', (req, res) => {
  try {
    const users = db.getUsers().map(u => {
      const { password, ...safe } = u;
      return safe;
    });
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur utilisateurs' });
  }
});

// 5. Reviews moderation
app.delete('/api/admin/reviews/:id', (req, res) => {
  try {
    const ok = db.deleteReview(req.params.id);
    res.json({ success: ok, message: ok ? 'Avis supprimé' : 'Avis non trouvé' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur suppression avis' });
  }
});

// 6. Blog Articles CRUD
app.post('/api/admin/articles', (req, res) => {
  try {
    const newArt = db.addArticle(req.body);
    res.json({ success: true, data: newArt });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur ajout article' });
  }
});

app.delete('/api/admin/articles/:id', (req, res) => {
  try {
    const ok = db.deleteArticle(req.params.id);
    res.json({ success: ok, message: ok ? 'Article supprimé' : 'Article non trouvé' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur suppression article' });
  }
});

// Academy Stats
app.get('/api/stats', (req, res) => {
  try {
    res.json({ success: true, data: db.getStats() });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur stats' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve frontend static build in production or fallback
import path from 'path';
import fs from 'fs';

const distPath = path.join(process.cwd(), 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 FormaSeo API Server running on http://localhost:${PORT}`);
});
