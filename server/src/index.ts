import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/auth';
import accountsRoutes from './routes/accounts';
import transactionRoutes from './routes/transactions';
import beneficiaryRoutes from './routes/beneficiaries';
import payeeRoutes from './routes/payees';
import cardRoutes from './routes/cards';
import loanRoutes from './routes/loans';
import notificationRoutes from './routes/notifications';
import preferencesRoutes from './routes/preferences';

const app = express();
const prisma = new PrismaClient();

const PORT = process.env.PORT || 4000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';

app.use(helmet());
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

const authLimiter = rateLimit({ windowMs: 60_000, max: 30 });
app.use('/api/auth', authLimiter);

app.get('/health', (_req, res) => res.json({ ok: true }));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/accounts', accountsRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/beneficiaries', beneficiaryRoutes);
app.use('/api/payees', payeeRoutes);
app.use('/api/cards', cardRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/preferences', preferencesRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

