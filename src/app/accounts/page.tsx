'use client';

import Link from 'next/link';
import RequireAuth from '@/components/auth/RequireAuth';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchAccounts } from '@/store/slices/accountSlice';
import { Card, CardContent } from '@/components/ui/Card';
import { formatCurrency } from '@/utils';

export default function AccountsPage() {
  const dispatch = useAppDispatch();
  const { accounts } = useAppSelector((s) => s.accounts);

  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  return (
    <RequireAuth>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900">My Accounts</h1>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {accounts.map((a) => (
            <Card key={a.id}>
              <CardContent>
                <p className="text-sm text-gray-500 capitalize">{a.accountType}</p>
                <p className="mt-1 text-lg font-semibold">{formatCurrency(a.balance)}</p>
                <p className="text-sm text-gray-600">{a.accountNumber}</p>
                <div className="mt-4">
                  <Link href={`/accounts/${a.id}`} className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View details →
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </RequireAuth>
  );
}

