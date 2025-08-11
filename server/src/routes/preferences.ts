import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth } from '../middleware/auth';

const prisma = new PrismaClient();
const router = Router();

router.get('/', requireAuth, async (req, res) => {
  const userId = (req as any).user.sub as string;
  let prefs = await prisma.notificationPreferences.findUnique({ where: { userId } });
  if (!prefs) {
    prefs = await prisma.notificationPreferences.create({ data: { userId } });
  }
  res.json(prefs);
});

router.patch('/', requireAuth, async (req, res) => {
  const userId = (req as any).user.sub as string;
  const data = req.body || {};
  const prefs = await prisma.notificationPreferences.upsert({
    where: { userId },
    create: { userId, ...data },
    update: { ...data },
  });
  res.json(prefs);
});

export default router;

