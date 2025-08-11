import jwt, { Secret, SignOptions } from 'jsonwebtoken';

const JWT_SECRET: Secret = process.env.JWT_SECRET || 'dev-secret';

export function signAccessToken(payload: object, expiresIn: string | number = '15m') {
  const options: SignOptions = { expiresIn: expiresIn as any };
  return jwt.sign(payload as any, JWT_SECRET as Secret, options);
}

export function signRefreshToken(payload: object, expiresIn: string | number = '7d') {
  const options: SignOptions = { expiresIn: expiresIn as any };
  return jwt.sign({ ...(payload as any), type: 'refresh' }, JWT_SECRET as Secret, options);
}

export function verifyAccessToken(token: string): any {
  return jwt.verify(token, JWT_SECRET);
}

export function verifyRefreshToken(token: string): any {
  const decoded = jwt.verify(token, JWT_SECRET) as any;
  if (decoded?.type !== 'refresh') throw new Error('Invalid refresh token');
  return decoded;
}

