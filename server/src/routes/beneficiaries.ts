import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth } from '../middleware/auth';

const prisma = new PrismaClient();
const router = Router();

router.get('/', requireAuth, async (req, res) => {
  const userId = (req as any).user.sub as string;
  const list = await prisma.beneficiary.findMany({ where: { userId } });
  res.json(list);
});

router.post('/', requireAuth, async (req, res) => {
  const userId = (req as any).user.sub as string;
  const { name, bank, accountNumber, type } = req.body || {};
  const b = await prisma.beneficiary.create({ data: { userId, name, bank, accountNumber, type } });
  res.json(b);
});

router.delete('/:id', requireAuth, async (req, res) => {
  const userId = (req as any).user.sub as string;
  const id = req.params.id;
  const b = await prisma.beneficiary.findFirst({ where: { id, userId } });
  if (!b) return res.status(404).json({ message: 'Not found' });
  await prisma.beneficiary.delete({ where: { id } });
  res.json({ id });
});

export default router;

