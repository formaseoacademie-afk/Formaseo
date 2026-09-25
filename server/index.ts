import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { db } from './db.ts';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`[API] ${req.method} ${req.url}`);
  next();
});

// 1. Academy Settings & Profile
app.get('/api/settings', (req, res) => {
  try {
    res.json({ success: true, data: db.getSettings() });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération des paramètres' });
  }
});

app.put('/api/settings', (req, res) => {
  try {
    const updated = db.updateSettings(req.body);
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de la mise à jour des paramètres' });
  }
});

// 2. Week-by-Week Curriculum
app.get('/api/curriculum', (req, res) => {
  try {
    res.json({ success: true, data: db.getCurriculum() });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur programme' });
  }
});

app.put('/api/curriculum/:weekNumber', (req, res) => {
  try {
    const weekNumber = parseInt(req.params.weekNumber, 10);
    const updated = db.updateCurriculumWeek(weekNumber, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Semaine de programme introuvable' });
    }
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur mise à jour programme' });
  }
});

// 3. FAQs
app.get('/api/faqs', (req, res) => {
  try {
    res.json({ success: true, data: db.getFaqs() });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur FAQs' });
  }
});

// 4. Candidate Enquiries / Applications (with spam protection & validation)
app.get('/api/enquiries', (req, res) => {
  try {
    res.json({ success: true, data: db.getEnquiries() });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur candidatures' });
  }
});

app.post('/api/enquiries', (req, res) => {
  try {
    const { name, email, phone, profileType, goal, preferredFormat, consent } = req.body;

    if (!name || !email || !phone || !goal) {
      return res.status(400).json({
        success: false,
        message: 'Veuillez renseigner votre nom, email, téléphone et objectif pour recevoir le programme.'
      });
    }

    if (!consent) {
      return res.status(400).json({
        success: false,
        message: 'Veuillez accepter d’être contacté pour recevoir les détails de la formation.'
      });
    }

    // Email format validation
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
      consent: true
    });

    res.json({
      success: true,
      message: 'Votre demande a bien été enregistrée ! Un conseiller pédagogique FormaSEO.ma vous transmettra le programme complet et les prochaines dates sous 24h ouvrées.',
      data: newEnquiry
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur enregistrement de candidature' });
  }
});

app.patch('/api/enquiries/:id', (req, res) => {
  try {
    const { status, notes } = req.body;
    const updated = db.updateEnquiryStatus(req.params.id, status, notes);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Candidature introuvable' });
    }
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur mise à jour candidature' });
  }
});

// 5. Owner Checklist
app.patch('/api/checklist/:id', (req, res) => {
  try {
    const { status, notes } = req.body;
    const updatedList = db.updateChecklistItem(req.params.id, status, notes);
    res.json({ success: true, data: updatedList });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur checklist' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', academy: 'FormaSEO.ma', timestamp: new Date().toISOString() });
});

// Serve frontend static build on all other paths
const distPath = path.join(process.cwd(), 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 FormaSEO.ma API Server running on http://localhost:${PORT}`);
});
