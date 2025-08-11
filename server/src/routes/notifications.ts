import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth } from '../middleware/auth';

const prisma = new PrismaClient();
const router = Router();

router.get('/', requireAuth, async (req, res) => {
  const userId = (req as any).user.sub as string;
  const ns = await prisma.notification.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
  res.json(ns);
});

router.post('/read/:id', requireAuth, async (req, res) => {
  const userId = (req as any).user.sub as string;
  const id = req.params.id;
  const item = await prisma.notification.findFirst({ where: { id, userId } });
  if (!item) return res.status(404).json({ message: 'Not found' });
  const updated = await prisma.notification.update({ where: { id }, data: { isRead: true } });
  res.json(updated);
});

router.post('/read-all', requireAuth, async (req, res) => {
  const userId = (req as any).user.sub as string;
  await prisma.notification.updateMany({ where: { userId }, data: { isRead: true } });
  res.json({ ok: true });
});

router.delete('/:id', requireAuth, async (req, res) => {
  const userId = (req as any).user.sub as string;
  const id = req.params.id;
  const item = await prisma.notification.findFirst({ where: { id, userId } });
  if (!item) return res.status(404).json({ message: 'Not found' });
  await prisma.notification.delete({ where: { id } });
  res.json({ id });
});

export default router;

