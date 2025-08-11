import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth } from '../middleware/auth';

const prisma = new PrismaClient();
const router = Router();

router.get('/', requireAuth, async (req, res) => {
  const userId = (req as any).user.sub as string;
  const accounts = await prisma.account.findMany({ where: { userId } });
  res.json(accounts);
});

router.get('/:id', requireAuth, async (req, res) => {
  const userId = (req as any).user.sub as string;
  const account = await prisma.account.findFirst({ where: { id: req.params.id, userId } });
  if (!account) return res.status(404).json({ message: 'Not found' });
  res.json(account);
});

export default router;

