import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../lib/jwt';

const prisma = new PrismaClient();
const router = Router();

router.post('/register', async (req, res) => {
  const { email, password, firstName, lastName } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({ data: { email, password: hashed, firstName, lastName } });
    const token = signAccessToken({ sub: user.id, email: user.email });
    const refreshToken = signRefreshToken({ sub: user.id, email: user.email });
    return res.json({ user: { id: user.id, email: user.email, firstName, lastName }, token, refreshToken });
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

  // If user's 2FA enabled, require verification step
  if (user.twoFactorEnabled) {
    return res.json({ user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName }, requires2FA: true });
  }

  const token = signAccessToken({ sub: user.id, email: user.email });
  const refreshToken = signRefreshToken({ sub: user.id, email: user.email });
  return res.json({ user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName }, token, refreshToken });
});

router.post('/verify-2fa', async (req, res) => {
  const { email, code } = req.body || {};
  // Demo: accept 123456
  if (code !== '123456') return res.status(401).json({ message: 'Invalid code' });
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(404).json({ message: 'User not found' });
  const token = signAccessToken({ sub: user.id, email: user.email });
  const refreshToken = signRefreshToken({ sub: user.id, email: user.email });
  return res.json({ token, refreshToken });

router.post('/refresh', async (req, res) => {
  const { refreshToken } = req.body || {};
  if (!refreshToken) return res.status(400).json({ message: 'refreshToken required' });
  try {
    const decoded = verifyRefreshToken(refreshToken);
    const token = signAccessToken({ sub: decoded.sub, email: decoded.email });
    return res.json({ token });
  } catch (e: any) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }
});
});

export default router;

