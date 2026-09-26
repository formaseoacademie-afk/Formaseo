import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { db, UserRole, UserEntity } from './database.ts';

const JWT_SECRET = process.env.JWT_SECRET || 'formaseo_super_secret_jwt_key_2026_change_in_production';
const JWT_EXPIRES_IN = '7d';

export interface AuthRequest extends Request {
  user?: UserEntity;
}

export const generateToken = (user: UserEntity): string => {
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
  // 1. Check Authorization Bearer header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.split(' ')[1];
  }
  // 2. Check Cookie
  if (req.cookies && req.cookies.formaseo_token) {
    return req.cookies.formaseo_token;
  }
  return null;
};

// Middleware: Authenticate User
export const requireAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = extractToken(req);
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Authentification requise. Veuillez vous connecter pour accéder à cette ressource.',
    });
  }

  const decoded = verifyToken(token);
  if (!decoded || !decoded.id) {
    return res.status(401).json({
      success: false,
      message: 'Session expirée ou invalide. Veuillez vous reconnecter.',
    });
  }

  const user = db.findUserById(decoded.id);
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Utilisateur introuvable.',
    });
  }

  req.user = user;
  next();
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

// Middleware: Optional auth (attaches user if present, but doesn't block)
export const optionalAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = extractToken(req);
  if (token) {
    const decoded = verifyToken(token);
    if (decoded && decoded.id) {
      const user = db.findUserById(decoded.id);
      if (user) {
        req.user = user;
      }
    }
  }
  next();
};
