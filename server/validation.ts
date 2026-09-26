import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

// 1. AUTH SCHEMAS
export const loginSchema = z.object({
  email: z.string().email('Format d’adresse email invalide'),
  password: z.string().min(1, 'Le mot de passe est obligatoire'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Le nom complet doit comporter au moins 2 caractères'),
  email: z.string().email('Format d’adresse email invalide'),
  password: z.string().min(6, 'Le mot de passe doit comporter au moins 6 caractères'),
  phone: z.string().optional(),
});

export const profileSchema = z.object({
  name: z.string().min(2, 'Le nom doit comporter au moins 2 caractères').optional(),
  phone: z.string().optional(),
  bio: z.string().max(1000, 'La biographie ne doit pas dépasser 1000 caractères').optional(),
});

export const passwordChangeSchema = z.object({
  currentPassword: z.string().min(1, 'Le mot de passe actuel est requis'),
  newPassword: z.string().min(6, 'Le nouveau mot de passe doit comporter au moins 6 caractères'),
});

// 2. ENQUIRY / LEAD SCHEMA
export const enquirySchema = z.object({
  name: z.string().min(2, 'Le nom est requis'),
  email: z.string().email('Email valide requis'),
  phone: z.string().min(6, 'Numéro de téléphone requis'),
  profileType: z.string().optional(),
  goal: z.string().optional(),
  preferredFormat: z.string().optional(),
});

// 3. LMS PROGRESS SCHEMA
export const progressSchema = z.object({
  lessonId: z.string().min(1, 'lessonId est requis'),
  courseId: z.string().min(1, 'courseId est requis'),
  completed: z.boolean().default(true),
  progressPercent: z.number().min(0).max(100).optional(),
});

// 4. FAQ SCHEMA
export const faqSchema = z.object({
  question: z.string().min(3, 'La question doit comporter au moins 3 caractères'),
  answer: z.string().min(3, 'La réponse doit comporter au moins 3 caractères'),
  category: z.string().optional(),
});

// 5. CHECKOUT & PAYMENT SCHEMAS
export const checkoutSchema = z.object({
  courseId: z.string().min(1, 'courseId est requis'),
});

export const verifyPaymentSchema = z.object({
  transactionRef: z.string().min(1, 'Référence de transaction requise'),
});

// VALIDATION MIDDLEWARE GENERATOR
export const validateBody = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errorMessages = result.error.issues.map((err) => `${err.path.join('.')}: ${err.message}`).join(', ');
      return res.status(400).json({
        success: false,
        message: `Données de formulaire invalides: ${errorMessages}`,
        errors: result.error.flatten(),
      });
    }
    req.body = result.data;
    next();
  };
};
