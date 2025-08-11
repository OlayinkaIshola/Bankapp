import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth } from '../middleware/auth';

const prisma = new PrismaClient();
const router = Router();

router.get('/', requireAuth, async (req, res) => {
  const userId = (req as any).user.sub as string;
  const cards = await prisma.card.findMany({ where: { userId } });
  res.json(cards);
});

router.post('/request', requireAuth, async (req, res) => {
  const userId = (req as any).user.sub as string;
  const { type } = req.body || {};
  const card = await prisma.card.create({ data: {
    userId,
    type: type || 'debit',
    number: '**** **** **** ' + Math.floor(1000 + Math.random() * 9000),
    status: 'active',
    limit: 1000,
  }});
  res.json(card);
});

router.post('/:id/toggle-block', requireAuth, async (req, res) => {
  const userId = (req as any).user.sub as string;
  const id = req.params.id;
  const card = await prisma.card.findFirst({ where: { id, userId } });
  if (!card) return res.status(404).json({ message: 'Not found' });
  const updated = await prisma.card.update({ where: { id }, data: { status: card.status === 'active' ? 'blocked' : 'active' } });
  res.json(updated);
});

router.post('/:id/limit', requireAuth, async (req, res) => {
  const userId = (req as any).user.sub as string;
  const id = req.params.id;
  const { limit } = req.body || {};
  const card = await prisma.card.findFirst({ where: { id, userId } });
  if (!card) return res.status(404).json({ message: 'Not found' });
  const updated = await prisma.card.update({ where: { id }, data: { limit: Number(limit) || 0 } });
  res.json(updated);
});

export default router;

