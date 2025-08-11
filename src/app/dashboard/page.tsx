'use client';

import Link from 'next/link';
import RequireAuth from '@/components/auth/RequireAuth';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchAccounts } from '@/store/slices/accountSlice';
import { fetchRecentTransactions } from '@/store/slices/transactionSlice';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { formatCurrency } from '@/utils';
import { BanknotesIcon, ArrowsRightLeftIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const { accounts } = useAppSelector((s) => s.accounts);
  const { recentTransactions } = useAppSelector((s) => s.transactions);

  useEffect(() => {
    dispatch(fetchAccounts());
    dispatch(fetchRecentTransactions(5));
  }, [dispatch]);

  const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);

  const chartData = recentTransactions.map((t) => ({
    date: new Date(t.date).toLocaleDateString(),
    amount: Math.abs(t.amount),
  })).reverse();

  return (
    <RequireAuth>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>

        {/* Summary Cards */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Balance</p>
                  <p className="mt-1 text-2xl font-semibold">{formatCurrency(totalBalance)}</p>
                </div>
                <div className="h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center">
                  <BanknotesIcon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Accounts</p>
                  <p className="mt-1 text-2xl font-semibold">{accounts.length}</p>
                </div>
                <div className="h-10 w-10 rounded-md bg-green-100 flex items-center justify-center">
                  <DocumentTextIcon className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Recent Activity</p>
                  <p className="mt-1 text-2xl font-semibold">{recentTransactions.length}</p>
                </div>
                <div className="h-10 w-10 rounded-md bg-purple-100 flex items-center justify-center">
                  <ArrowsRightLeftIcon className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex flex-wrap gap-4">
              <Link href="/transfer"><Button>Transfer Money</Button></Link>
              <Link href="/bills"><Button variant="outline">Pay Bills</Button></Link>
              <Link href="/cards"><Button variant="outline">Manage Cards</Button></Link>
            </div>
          </div>
        </div>

        {/* Accounts List and Chart */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardContent>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Spending (Recent)</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <XAxis dataKey="date" hide />
                    <YAxis hide />
                    <Tooltip />
                    <Line type="monotone" dataKey="amount" stroke="#2563eb" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">My Accounts</h2>
              <ul className="space-y-3">
                {accounts.map((a) => (
                  <li key={a.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900 capitalize">{a.accountType}</p>
                      <p className="text-sm text-gray-600">{a.accountNumber}</p>
                    </div>
                    <div className="text-sm font-semibold">{formatCurrency(a.balance)}</div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <div className="mt-6">
          <Card>
            <CardContent>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h2>
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
                    {recentTransactions.map((t) => (
                      <tr key={t.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(t.date).toLocaleDateString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{t.description}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right {t.type === 'debit' ? 'text-red-600' : 'text-green-600'}">
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
      </div>
    </RequireAuth>
  );
}

