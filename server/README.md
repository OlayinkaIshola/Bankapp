Bankapp Server (Express + Prisma)

Quick start (SQLite):
1) cd server
2) copy .env.example .env (already done in scripts)
3) npx prisma generate
4) npx prisma migrate dev --name init
5) npm run prisma:seed
6) npm run dev

Endpoints (partial):
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/verify-2fa
- GET /api/accounts (auth)
- GET /api/accounts/:id (auth)
- GET /api/transactions?accountId= (auth)
- POST /api/transactions/transfer (auth)
- POST /api/transactions/bill (auth)

Switch to Postgres:
- Change datasource provider in prisma/schema.prisma to postgresql
- Update DATABASE_URL in .env
- Bring up DB (Docker or external), then run migration + seed

