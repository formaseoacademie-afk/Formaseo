import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcryptjs';
import { db } from './database.ts';
import { generateToken, requireAuth, requireRole, optionalAuth, AuthRequest } from './auth.ts';
import { paymentProvider } from './paymentProvider.ts';

const app = express();
const PORT = process.env.PORT || 5001;

// CORS configuration supporting cookies & authorization header
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Request logging in development
app.use((req, res, next) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[API] ${req.method} ${req.url}`);
  }
  next();
});

// ==========================================
// 1. AUTHENTICATION & USER MANAGEMENT (RBAC)
// ==========================================

// Register new student account
app.post('/api/auth/register', (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Nom, email et mot de passe requis.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Le mot de passe doit contenir au moins 6 caractères.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Adresse email invalide.' });
    }

    const existing = db.findUserByEmail(email);
    if (existing) {
      return res.status(400).json({ success: false, message: 'Un compte existe déjà avec cette adresse email.' });
    }

    const newUser = db.createUser({
      name,
      email,
      password,
      phone,
      role: 'STUDENT',
    });

    const token = generateToken(newUser);

    // Set secure HTTP-only cookie
    res.cookie('formaseo_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    const { passwordHash, ...userWithoutPassword } = newUser;
    res.json({
      success: true,
      message: 'Compte créé avec succès ! Bienvenue sur FormaSEO Académie.',
      data: { user: userWithoutPassword, token },
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la création du compte.' });
  }
});

// Login (Student, Instructor, Admin, SuperAdmin)
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Veuillez saisir votre email et mot de passe.' });
    }

    const user = db.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Identifiants incorrects (email ou mot de passe invalide).' });
    }

    // Verify bcrypt password hash
    const isMatch = bcrypt.compareSync(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Identifiants incorrects (email ou mot de passe invalide).' });
    }

    const token = generateToken(user);

    // Set secure cookie
    res.cookie('formaseo_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const { passwordHash, ...userWithoutPassword } = user;
    const enrollments = db.getEnrollmentsByUser(user.id);

    res.json({
      success: true,
      message: `Connexion réussie. Bienvenue, ${user.name} !`,
      data: {
        user: {
          ...userWithoutPassword,
          enrolledCourseIds: enrollments.map((e) => e.courseId),
        },
        token,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la connexion.' });
  }
});

// Logout
app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('formaseo_token');
  res.json({ success: true, message: 'Déconnexion réussie.' });
});

// Get Current Authenticated Profile (/api/auth/me)
app.get('/api/auth/me', requireAuth, (req: AuthRequest, res) => {
  if (!req.user) return res.status(401).json({ success: false, message: 'Non authentifié' });

  const { passwordHash, ...userWithoutPassword } = req.user;
  const enrollments = db.getEnrollmentsByUser(req.user.id);
  const certificates = db.getCertificatesByUser(req.user.id);
  const progressList = db.getUserProgress(req.user.id);

  res.json({
    success: true,
    data: {
      user: {
        ...userWithoutPassword,
        enrolledCourseIds: enrollments.map((e) => e.courseId),
        completedLessonIds: progressList.filter((p) => p.completed).map((p) => p.lessonId),
      },
      enrollments,
      certificatesCount: certificates.length,
    },
  });
});

// Update Profile
app.put('/api/auth/profile', requireAuth, (req: AuthRequest, res) => {
  if (!req.user) return res.status(401).json({ success: false });
  const { name, phone, bio } = req.body;
  const updated = db.updateUserProfile(req.user.id, { name, phone, bio });
  if (!updated) return res.status(404).json({ success: false, message: 'Utilisateur introuvable' });
  const { passwordHash, ...safeUser } = updated;
  res.json({ success: true, data: safeUser });
});

// Change Password
app.put('/api/auth/password', requireAuth, (req: AuthRequest, res) => {
  if (!req.user) return res.status(401).json({ success: false });
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword || newPassword.length < 6) {
    return res.status(400).json({ success: false, message: 'Nouveau mot de passe invalide (min. 6 caractères).' });
  }

  const isMatch = bcrypt.compareSync(currentPassword, req.user.passwordHash);
  if (!isMatch) {
    return res.status(400).json({ success: false, message: 'Mot de passe actuel incorrect.' });
  }

  db.updateUserPassword(req.user.id, newPassword);
  res.json({ success: true, message: 'Mot de passe mis à jour avec succès.' });
});

// ==========================================
// 2. PUBLIC COURSES & LMS CATALOG
// ==========================================

// Public courses list
app.get('/api/courses', (req, res) => {
  try {
    const courses = db.getCourses();
    res.json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur cours' });
  }
});

// Course details by slug
app.get('/api/courses/:slug', optionalAuth, (req: AuthRequest, res) => {
  try {
    const slug = String(req.params.slug);
    const course = db.getCourseBySlug(slug);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Formation introuvable' });
    }

    const isEnrolled = req.user ? db.isUserEnrolled(req.user.id, course.id) : false;

    // Filter modules / lessons if not enrolled (hide sensitive lesson content, keep titles and previews)
    const sanitizedModules = course.modules.map((m) => ({
      ...m,
      lessons: m.lessons.map((l) => ({
        id: l.id,
        moduleId: l.moduleId,
        title: l.title,
        summary: l.summary,
        durationMinutes: l.durationMinutes,
        position: l.position,
        isFreePreview: l.isFreePreview,
        // Only include videoUrl and full content if user is enrolled or it's a free preview
        videoUrl: isEnrolled || l.isFreePreview ? l.videoUrl : undefined,
        content: isEnrolled || l.isFreePreview ? l.content : undefined,
        resources: isEnrolled ? l.resources : [],
      })),
    }));

    res.json({
      success: true,
      data: {
        ...course,
        modules: sanitizedModules,
        isEnrolled,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur détail formation' });
  }
});

// ==========================================
// 3. STUDENT PORTAL (LMS PROTECTED API)
// ==========================================

// Student Dashboard Overview
app.get('/api/student/dashboard', requireAuth, (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const enrollments = db.getEnrollmentsByUser(userId);
    const certificates = db.getCertificatesByUser(userId);

    const enrolledCoursesDetails = enrollments.map((enr) => {
      const course = db.getCourseById(enr.courseId);
      const completion = db.calculateCourseCompletion(userId, enr.courseId);

      // Find next unwatched lesson
      let nextLesson = null;
      if (course) {
        for (const mod of course.modules) {
          for (const les of mod.lessons) {
            const prg = db.getUserProgress(userId, course.id).find((p) => p.lessonId === les.id);
            if (!prg || !prg.completed) {
              nextLesson = {
                lessonId: les.id,
                lessonTitle: les.title,
                moduleTitle: mod.title,
                courseSlug: course.slug,
              };
              break;
            }
          }
          if (nextLesson) break;
        }
      }

      return {
        enrollment: enr,
        course,
        progress: completion,
        nextLesson,
      };
    });

    res.json({
      success: true,
      data: {
        user: { id: req.user!.id, name: req.user!.name, email: req.user!.email, role: req.user!.role },
        enrolledCourses: enrolledCoursesDetails,
        certificates,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur tableau de bord étudiant' });
  }
});

// Protected Lesson Player API (Requires active enrollment)
app.get('/api/student/courses/:slug/lessons/:lessonId', requireAuth, (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const slug = String(req.params.slug);
    const lessonId = String(req.params.lessonId);
    const course = db.getCourseBySlug(slug);
    if (!course) return res.status(404).json({ success: false, message: 'Formation introuvable' });

    // Check enrollment
    const isEnrolled = db.isUserEnrolled(userId, course.id) || req.user!.role === 'SUPER_ADMIN' || req.user!.role === 'ADMIN';
    if (!isEnrolled) {
      return res.status(403).json({
        success: false,
        message: 'Accès restreint. Vous devez être inscrit à cette formation pour visionner cette leçon.',
      });
    }

    // Find lesson across modules
    let targetLesson = null;
    let targetModule = null;
    for (const m of course.modules) {
      const found = m.lessons.find((l) => l.id === lessonId);
      if (found) {
        targetLesson = found;
        targetModule = m;
        break;
      }
    }

    if (!targetLesson) {
      return res.status(404).json({ success: false, message: 'Leçon introuvable' });
    }

    const progressList = db.getUserProgress(userId, course.id);
    const completionStats = db.calculateCourseCompletion(userId, course.id);

    res.json({
      success: true,
      data: {
        course: { id: course.id, title: course.title, slug: course.slug },
        module: { id: targetModule?.id, title: targetModule?.title },
        lesson: targetLesson,
        modules: course.modules,
        progressList,
        completionStats,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur chargement de la leçon' });
  }
});

// Mark Lesson Progress / Complete
app.post('/api/student/progress', requireAuth, (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const { lessonId, courseId, completed, progressPercent } = req.body;

    if (!lessonId || !courseId) {
      return res.status(400).json({ success: false, message: 'Identifiants requis' });
    }

    const updated = db.updateLessonProgress(userId, lessonId, courseId, completed ?? true, progressPercent || 100);
    const stats = db.calculateCourseCompletion(userId, courseId);

    // If 100% completed, auto-issue certificate
    let certificate = null;
    if (stats.percent === 100) {
      certificate = db.issueCertificate(userId, courseId);
    }

    res.json({
      success: true,
      data: {
        progress: updated,
        completionStats: stats,
        certificate,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur enregistrement de progression' });
  }
});

// Claim Certificate
app.post('/api/student/courses/:courseId/claim-certificate', requireAuth, (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const courseId = String(req.params.courseId);
    const stats = db.calculateCourseCompletion(userId, courseId);

    if (stats.percent < 100 && req.user!.role !== 'SUPER_ADMIN') {
      return res.status(400).json({
        success: false,
        message: `Vous avez complété ${stats.percent}% de la formation. Complétez toutes les leçons pour débloquer votre certificat officiel.`,
      });
    }

    const cert = db.issueCertificate(userId, courseId);
    res.json({ success: true, data: cert });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur certificat' });
  }
});

// Public Certificate Verification Endpoint
app.get('/api/certificates/:certificateNumber', (req, res) => {
  try {
    const cert = db.getCertificateByNumber(String(req.params.certificateNumber));
    if (!cert) {
      return res.status(404).json({
        success: false,
        message: 'Certificat non valide ou introuvable dans le registre officiel FormaSEO.ma.',
      });
    }

    res.json({
      success: true,
      data: {
        certificateNumber: cert.certificateNumber,
        studentName: cert.studentName,
        courseTitle: cert.courseTitle,
        issuedAt: cert.issuedAt,
        isValid: true,
        verificationToken: cert.verificationToken,
        academy: 'FormaSEO Académie Casablanca',
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur vérification certificat' });
  }
});

// ==========================================
// 4. CHECKOUT & ENROLLMENT (PAYMENT)
// ==========================================

app.post('/api/checkout/create', requireAuth, async (req: AuthRequest, res) => {
  try {
    const { courseId } = req.body;
    const course = db.getCourseById(courseId);
    if (!course) return res.status(404).json({ success: false, message: 'Formation introuvable' });

    const result = await paymentProvider.createCheckout(req.user!.id, course.id, course.priceMAD, 'MAD');
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur paiement' });
  }
});

app.post('/api/checkout/verify', requireAuth, async (req: AuthRequest, res) => {
  try {
    const { transactionRef } = req.body;
    const result = await paymentProvider.verifyPayment(transactionRef);
    res.json({ success: result.verified, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur vérification' });
  }
});

// ==========================================
// 5. PUBLIC ENQUIRIES / LEADS (CRM)
// ==========================================

app.post('/api/enquiries', (req, res) => {
  try {
    const { name, email, phone, profileType, goal, preferredFormat, consent } = req.body;

    if (!name || !email || !phone || !goal) {
      return res.status(400).json({
        success: false,
        message: 'Veuillez renseigner votre nom, email, téléphone et objectif.',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Adresse email invalide.' });
    }

    const newEnquiry = db.addEnquiry({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      profileType: profileType || 'autre',
      goal: goal.trim(),
      preferredFormat: preferredFormat || 'presentiel_casablanca',
    });

    res.json({
      success: true,
      message: 'Votre demande a bien été enregistrée ! Un conseiller pédagogique FormaSEO.ma prendra contact avec vous sous 24h ouvrées.',
      data: newEnquiry,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur enregistrement de candidature' });
  }
});

// ==========================================
// 6. PROTECTED ADMIN API (RBAC RESTRICTED)
// ==========================================

// Enquiries CRM
app.get('/api/enquiries', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), (req, res) => {
  res.json({ success: true, data: db.getEnquiries() });
});

app.patch('/api/enquiries/:id', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), (req, res) => {
  const { status, notes } = req.body;
  const updated = db.updateEnquiryStatus(String(req.params.id), status, notes);
  if (!updated) return res.status(404).json({ success: false, message: 'Candidature introuvable' });
  res.json({ success: true, data: updated });
});

app.delete('/api/enquiries/:id', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), (req, res) => {
  const ok = db.deleteEnquiry(String(req.params.id));
  res.json({ success: ok });
});

// Academy Settings
app.get('/api/settings', (req, res) => {
  res.json({ success: true, data: db.getSettings() });
});

app.put('/api/settings', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), (req, res) => {
  const updated = db.updateSettings(req.body);
  res.json({ success: true, data: updated });
});

// Curriculum Syllabus
app.get('/api/curriculum', (req, res) => {
  res.json({ success: true, data: db.getCurriculum() });
});

app.put('/api/curriculum/:weekNumber', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), (req, res) => {
  const weekNumber = parseInt(String(req.params.weekNumber), 10);
  const updated = db.updateCurriculumWeek(weekNumber, req.body);
  if (!updated) return res.status(404).json({ success: false, message: 'Semaine introuvable' });
  res.json({ success: true, data: updated });
});

// FAQs
app.get('/api/faqs', (req, res) => {
  res.json({ success: true, data: db.getFaqs() });
});

app.post('/api/faqs', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), (req, res) => {
  const { question, answer, category } = req.body;
  const newFaq = db.addFaq({ question, answer, category: category || 'Général' });
  res.json({ success: true, data: newFaq });
});

app.put('/api/faqs/:id', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), (req, res) => {
  const updated = db.updateFaq(String(req.params.id), req.body);
  if (!updated) return res.status(404).json({ success: false, message: 'FAQ introuvable' });
  res.json({ success: true, data: updated });
});

app.delete('/api/faqs/:id', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), (req, res) => {
  const ok = db.deleteFaq(String(req.params.id));
  res.json({ success: ok });
});

// Owner Checklist
app.get('/api/checklist', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), (req, res) => {
  res.json({ success: true, data: db.getChecklist() });
});

app.post('/api/checklist', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), (req, res) => {
  const item = db.addChecklistItem(req.body.label, req.body.category);
  res.json({ success: true, data: item });
});

app.patch('/api/checklist/:id', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), (req, res) => {
  const updated = db.updateChecklistItem(String(req.params.id), req.body.status, req.body.notes);
  res.json({ success: true, data: updated });
});

app.delete('/api/checklist/:id', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), (req, res) => {
  const ok = db.deleteChecklistItem(String(req.params.id));
  res.json({ success: ok });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', academy: 'FormaSEO.ma', timestamp: new Date().toISOString() });
});

// ==========================================
// 7. CLEAN 301 PERMANENT REDIRECTS (NO LOOPS)
// ==========================================
const redirectMap: Record<string, string> = {
  '/formation-marketing-digital-maroc': '/formation-marketing-digital-casablanca',
  '/formation-seo-maroc': '/formation-seo-casablanca',
  '/formation-seo': '/formation-seo-casablanca',
  '/cours-seo': '/formation-seo-casablanca',
  '/formation-wordpress-maroc': '/formation-wordpress-casablanca',
  '/formation-wordpress': '/formation-wordpress-casablanca',
  '/formation': '/formation-marketing-digital-casablanca',
  '/formations': '/formation-marketing-digital-casablanca',
  '/cours': '/formation-marketing-digital-casablanca',
  '/programme': '/programme-5-semaines',
  '/syllabus': '/programme-5-semaines',
  '/about': '/a-propos',
  '/inscription': '/contact',
  '/candidater': '/contact',
  '/questions': '/faq',
};

Object.entries(redirectMap).forEach(([oldUrl, newUrl]) => {
  if (oldUrl !== newUrl) {
    app.get(oldUrl, (req, res) => {
      res.redirect(301, newUrl);
    });
  }
});

// Serve frontend static build
const distPath = path.join(process.cwd(), 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 FormaSEO.ma Production API Server running on http://localhost:${PORT}`);
});
