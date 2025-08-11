import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth } from '../middleware/auth';

const prisma = new PrismaClient();
const router = Router();

router.get('/', requireAuth, async (req, res) => {
  const userId = (req as any).user.sub as string;
  const list = await prisma.payee.findMany({ where: { userId } });
  res.json(list);
});

router.post('/', requireAuth, async (req, res) => {
  const userId = (req as any).user.sub as string;
  const { name, category, accountNumber } = req.body || {};
  const p = await prisma.payee.create({ data: { userId, name, category, accountNumber } });
  res.json(p);
});

router.delete('/:id', requireAuth, async (req, res) => {
  const userId = (req as any).user.sub as string;
  const id = req.params.id;
  const p = await prisma.payee.findFirst({ where: { id, userId } });
  if (!p) return res.status(404).json({ message: 'Not found' });
  await prisma.payee.delete({ where: { id } });
  res.json({ id });
});

export default router;

