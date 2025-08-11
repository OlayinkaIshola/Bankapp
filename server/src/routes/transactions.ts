import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth } from '../middleware/auth';

const prisma = new PrismaClient();
const router = Router();

router.get('/', requireAuth, async (req, res) => {
  const userId = (req as any).user.sub as string;
  const { accountId } = req.query as { accountId?: string };
  const where = accountId ? { accountId, userId } : { userId };
  const txns = await prisma.transaction.findMany({ where, orderBy: { date: 'desc' } });
  res.json(txns);
});

router.post('/transfer', requireAuth, async (req, res) => {
  const userId = (req as any).user.sub as string;
  const { fromAccountId, amount, description } = req.body || {};
  const account = await prisma.account.findFirst({ where: { id: fromAccountId, userId } });
  if (!account) return res.status(404).json({ message: 'Account not found' });

  const txn = await prisma.transaction.create({
    data: {
      accountId: account.id,
      userId,
      amount: -Math.abs(Number(amount)),
      type: 'debit',
      description: description || 'Transfer',
    },
  });

  await prisma.account.update({ where: { id: account.id }, data: { balance: account.balance + txn.amount, availableBalance: account.availableBalance + txn.amount } });
  res.json(txn);
});

router.post('/bill', requireAuth, async (req, res) => {
  const userId = (req as any).user.sub as string;
  const { accountId, amount, payeeName, description } = req.body || {};
  const account = await prisma.account.findFirst({ where: { id: accountId, userId } });
  if (!account) return res.status(404).json({ message: 'Account not found' });

  const txn = await prisma.transaction.create({
    data: {
      accountId: account.id,
      userId,
      amount: -Math.abs(Number(amount)),
      type: 'debit',
      description: `Bill Payment - ${payeeName || ''} ${description || ''}`.trim(),
    },
  });

  await prisma.account.update({ where: { id: account.id }, data: { balance: account.balance + txn.amount, availableBalance: account.availableBalance + txn.amount } });
  res.json(txn);
});

export default router;

