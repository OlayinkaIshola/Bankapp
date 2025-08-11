import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth } from '../middleware/auth';

const prisma = new PrismaClient();
const router = Router();

router.get('/', requireAuth, async (req, res) => {
  const userId = (req as any).user.sub as string;
  const loans = await prisma.loan.findMany({ where: { userId } });
  res.json(loans);
});

router.post('/apply', requireAuth, async (req, res) => {
  const userId = (req as any).user.sub as string;
  const { loanType, principalAmount, interestRate, termMonths } = req.body || {};
  const monthlyPayment = Number(principalAmount) / Number(termMonths);
  const loan = await prisma.loan.create({ data: {
    userId,
    loanType,
    principalAmount: Number(principalAmount),
    outstandingBalance: Number(principalAmount),
    interestRate: Number(interestRate),
    termMonths: Number(termMonths),
    monthlyPayment,
    nextPaymentDate: new Date(),
    status: 'active',
  }});
  res.json(loan);
});

export default router;

