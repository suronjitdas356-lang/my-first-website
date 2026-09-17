import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { db, AdminUser, AdminSession } from './db';

const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'tirthobondhu-admin-session-salt-secret-2026';

export interface AuthenticatedRequest extends Request {
  admin?: AdminSession;
}

export function authenticateAdmin(email: string, password: string): { success: boolean; admin?: AdminUser; message?: string } {
  const normalizedEmail = email.toLowerCase().trim();
  const users = db.get('adminUsers');
  const user = users.find(u => u.email.toLowerCase() === normalizedEmail);

  if (!user) {
    return { success: false, message: 'Invalid email or password' };
  }

  const hash = crypto.scryptSync(password, user.salt, 64).toString('hex');
  if (hash !== user.passwordHash) {
    return { success: false, message: 'Invalid email or password' };
  }

  // Update last login
  user.lastLoginAt = new Date().toISOString();
  db.save();

  return { success: true, admin: user };
}

export function createAdminSession(admin: AdminUser): AdminSession {
  const randomPart = crypto.randomBytes(32).toString('hex');
  const now = Date.now();
  const signature = crypto.createHmac('sha256', SESSION_SECRET)
    .update(`${randomPart}:${admin.id}:${now}`)
    .digest('hex');
  const token = `${randomPart}.${signature}`;

  const session: AdminSession = {
    token,
    adminId: admin.id,
    email: admin.email,
    role: admin.role,
    createdAt: now,
    expiresAt: now + SESSION_DURATION_MS
  };

  const sessions = db.get('adminSessions') || [];
  // Clean up expired sessions
  const validSessions = sessions.filter(s => s.expiresAt > now);
  validSessions.push(session);
  db.set('adminSessions', validSessions);

  return session;
}

export function validateSession(token: string): AdminSession | null {
  if (!token) return null;
  const sessions = db.get('adminSessions') || [];
  const now = Date.now();
  const session = sessions.find(s => s.token === token && s.expiresAt > now);
  if (!session) return null;

  // Cryptographic signature verification with ADMIN_SESSION_SECRET
  if (token.includes('.')) {
    const [randomPart, signature] = token.split('.');
    const expectedSig = crypto.createHmac('sha256', SESSION_SECRET)
      .update(`${randomPart}:${session.adminId}:${session.createdAt}`)
      .digest('hex');
    try {
      if (!crypto.timingSafeEqual(Buffer.from(signature, 'hex'), Buffer.from(expectedSig, 'hex'))) {
        return null;
      }
    } catch {
      return null;
    }
  }

  return session;
}

export function destroySession(token: string): boolean {
  const sessions = db.get('adminSessions') || [];
  const filtered = sessions.filter(s => s.token !== token);
  db.set('adminSessions', filtered);
  return true;
}

export function requireAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized. Admin authorization token required.' });
    return;
  }

  const token = authHeader.split(' ')[1];
  const session = validateSession(token);

  if (!session) {
    res.status(401).json({ error: 'Unauthorized. Session expired or invalid.' });
    return;
  }

  req.admin = session;
  next();
}
