import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { db } from './database.ts';
import { User, UserRole } from '../src/types';

// Fail fast at startup if JWT_SECRET is missing in production
if (process.env.NODE_ENV === 'production' && !process.env.JWT_SECRET) {
  throw new Error('FATAL: JWT_SECRET environment variable is required in production');
}

const JWT_SECRET = process.env.JWT_SECRET || 'dev_session_jwt_secret_local_testing_only';
const JWT_EXPIRES_IN = '7d';

export interface AuthRequest extends Request {
  user?: User;
}

export const generateToken = (user: User): string => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
};

export const extractToken = (req: Request): string | null => {
  // 1. Check HTTP-only Cookie first (primary and most secure mechanism)
  if (req.cookies && req.cookies.formaseo_session) {
    return req.cookies.formaseo_session;
  }
  if (req.cookies && req.cookies.formaseo_token) {
    return req.cookies.formaseo_token;
  }
  // 2. Check Authorization Bearer header as secondary fallback for external API clients
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.split(' ')[1];
  }
  return null;
};

// CSRF Verification Middleware for state-changing HTTP requests (POST, PUT, PATCH, DELETE)
export const requireCsrf = (req: Request, res: Response, next: NextFunction) => {
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next();
  }

  // Exempt webhooks with signature verification
  if (req.path.includes('/webhook')) {
    return next();
  }

  // Verify anti-CSRF custom headers
  const customHeader = req.headers['x-requested-with'] || req.headers['x-csrf-token'];
  if (!customHeader) {
    return res.status(403).json({
      success: false,
      message: 'Erreur de sécurité CSRF: En-tête X-Requested-With ou X-CSRF-Token manquant.',
    });
  }

  next();
};

// Middleware: Authenticate User
export const requireAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = extractToken(req);
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Authentification requise. Veuillez vous connecter.',
    });
  }

  const decoded = verifyToken(token);
  if (!decoded || !decoded.id) {
    return res.status(401).json({
      success: false,
      message: 'Session expirée ou invalide. Veuillez vous reconnecter.',
    });
  }

  try {
    const user = await db.getUserById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Utilisateur introuvable.',
      });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Erreur d’authentification serveur' });
  }
};

// Middleware: Require specific RBAC Roles
export const requireRole = (allowedRoles: UserRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Authentification requise.' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Accès refusé. Privilèges insuffisants pour cette action.',
      });
    }

    next();
  };
};

// Middleware: Optional auth (attaches user if valid session cookie present)
export const optionalAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = extractToken(req);
  if (token) {
    const decoded = verifyToken(token);
    if (decoded && decoded.id) {
      try {
        const user = await db.getUserById(decoded.id);
        if (user) {
          req.user = user;
        }
      } catch (err) {
        // ignore optional lookup errors
      }
    }
  }
  next();
};
