import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'demo@bank.com' },
    update: {},
    create: {
      email: 'demo@bank.com',
      password: '$2a$10$w0pcj5u2ivNV14wviS0e4u6N8sY9eJj/7tGfBqgq0mJc0T0b8s7lK', // bcrypt for 'demo123'
      firstName: 'John',
      lastName: 'Doe',
      twoFactorEnabled: true,
      accounts: {
        create: [
          { accountType: 'checking', accountNumber: 'CHK-1234', balance: 15420.5, availableBalance: 15420.5 },
          { accountType: 'savings', accountNumber: 'SAV-5678', balance: 45230.75, availableBalance: 45230.75 },
        ],
      },
    },
  });

  console.log('Seeded user', user.email);
}

main().finally(async () => { await prisma.$disconnect(); });
