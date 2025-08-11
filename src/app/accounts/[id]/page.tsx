'use client';

import { useParams } from 'next/navigation';
import RequireAuth from '@/components/auth/RequireAuth';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchAccountById } from '@/store/slices/accountSlice';
import { fetchTransactions } from '@/store/slices/transactionSlice';
import { Card, CardContent } from '@/components/ui/Card';
import { formatCurrency } from '@/utils';

export default function AccountDetailsPage() {
  const params = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { selectedAccount } = useAppSelector((s) => s.accounts);
  const { transactions } = useAppSelector((s) => s.transactions);

  useEffect(() => {
    if (params?.id) {
      dispatch(fetchAccountById(params.id));
      dispatch(fetchTransactions(params.id));
    }
  }, [dispatch, params?.id]);

  return (
    <RequireAuth>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {selectedAccount && (
          <>
            <h1 className="text-2xl font-bold text-gray-900 capitalize">{selectedAccount.accountType} Account</h1>
            <p className="text-gray-600">{selectedAccount.accountNumber}</p>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              <Card>
                <CardContent>
                  <p className="text-sm text-gray-500">Current Balance</p>
                  <p className="mt-1 text-xl font-semibold">{formatCurrency(selectedAccount.balance)}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <p className="text-sm text-gray-500">Available</p>
                  <p className="mt-1 text-xl font-semibold">{formatCurrency(selectedAccount.availableBalance)}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="mt-1 text-xl font-semibold capitalize">{selectedAccount.status}</p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6">
              <Card>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Transactions</h2>
                    <a
                      href={`data:text/csv;charset=utf-8,${encodeURIComponent(
                        ['Date,Description,Type,Amount'].concat(
                          transactions.map(t => `${new Date(t.date).toLocaleDateString()},${t.description},${t.type},${Math.abs(t.amount)}`)
                        ).join('\n')
                      )}`}
                      download={`statement-${selectedAccount?.id}.csv`}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Download CSV
                    </a>
                  </div>
                  <div className="overflow-hidden rounded-md border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {transactions.map((t) => (
                          <tr key={t.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(t.date).toLocaleDateString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{t.description}</td>
                            <td className={`px-6 py-4 whitespace-nowrap text-sm text-right ${t.type === 'debit' ? 'text-red-600' : 'text-green-600'}`}>
                              {t.type === 'debit' ? '-' : '+'}{formatCurrency(Math.abs(t.amount))}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </RequireAuth>
  );
}

