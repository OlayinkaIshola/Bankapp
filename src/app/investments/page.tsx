'use client';

import RequireAuth from '@/components/auth/RequireAuth';
import { Card, CardContent } from '@/components/ui/Card';

const mockInvestments = [
  { id: '1', name: 'Index Fund (S&P 500)', amount: 12000, returns: 8.5 },
  { id: '2', name: 'Fixed Deposit', amount: 5000, returns: 4.2 },
];

export default function InvestmentsPage() {
  return (
    <RequireAuth>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900">Investments & Savings Plans</h1>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {mockInvestments.map((inv) => (
            <Card key={inv.id}>
              <CardContent>
                <p className="text-sm text-gray-500">{inv.name}</p>
                <p className="mt-1 text-lg font-semibold">Amount: ${inv.amount.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Annual Return: {inv.returns}%</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </RequireAuth>
  );
}

