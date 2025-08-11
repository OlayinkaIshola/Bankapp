import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../lib/jwt';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorized' });
  const token = authHeader.slice('Bearer '.length);
  try {
    const payload = verifyAccessToken(token);
    (req as any).user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

