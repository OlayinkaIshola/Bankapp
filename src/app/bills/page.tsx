'use client';

import RequireAuth from '@/components/auth/RequireAuth';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { useForm } from 'react-hook-form';
import { createBillPayment } from '@/store/slices/transactionSlice';
import { fetchAccounts } from '@/store/slices/accountSlice';
import { useEffect } from 'react';
import Button from '@/components/ui/Button';
import { addRecurringBill, removeRecurringBill } from '@/store/slices/billSlice';
import Link from 'next/link';

interface BillFormInputs {
  fromAccountId: string;
  payeeName: string;
  accountNumber: string;
  amount: number;
  description: string;
}

export default function BillsPage() {
  const dispatch = useAppDispatch();
  const { accounts } = useAppSelector((s) => s.accounts);
  const { isLoading } = useAppSelector((s) => s.transactions);
  const { recurring } = useAppSelector((s) => s.bills);
  const { register, handleSubmit, reset } = useForm<BillFormInputs>();

  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  const onSubmit = async (data: BillFormInputs) => {
    await dispatch(createBillPayment({ ...data, accountId: data.fromAccountId }));
    alert('Bill payment submitted successfully');
    reset();
  };

  return (
    <RequireAuth>
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Bill Payments</h1>
          <Link href="/payees" className="text-sm text-blue-600 hover:text-blue-700">Manage Payees</Link>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">From Account</label>
            <select {...register('fromAccountId', { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
              <option value="">Select account</option>
              {accounts.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.accountType} ({a.accountNumber})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Payee Name</label>
              <input {...register('payeeName', { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Account Number</label>
              <input {...register('accountNumber', { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Amount</label>
              <input type="number" step="0.01" {...register('amount', { required: true, min: 0.01 })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <input {...register('description')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
            </div>
          </div>

          <Button type="submit" loading={isLoading}>Pay Bill</Button>
        </form>

        {/* Recurring bills */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Recurring Payments</h2>
          <form onSubmit={async (e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);
            const payload = {
              payeeName: String(formData.get('payeeName') || ''),
              amount: Number(formData.get('amount') || 0),
              fromAccountId: String(formData.get('fromAccountId') || ''),
              frequency: String(formData.get('frequency') || 'monthly') as any,
              nextRun: new Date().toISOString(),
            };
            await dispatch(addRecurringBill(payload as any));
            form.reset();
          }} className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <select name="fromAccountId" className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm">
                {accounts.map((a) => <option key={a.id} value={a.id}>{a.accountType} ({a.accountNumber})</option>)}
              </select>
              <input name="payeeName" placeholder="Payee" className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm" />
              <input name="amount" type="number" step="0.01" placeholder="Amount" className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm" />
              <select name="frequency" className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm">
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            <div>
              <Button type="submit" variant="outline" size="sm">Add Recurring</Button>
            </div>
          </form>

          <ul className="mt-4 divide-y divide-gray-200">
            {recurring.map((r) => (
              <li key={r.id} className="py-3 flex items-center justify-between text-sm">
                <div>
                  <p className="font-medium text-gray-900">{r.payeeName}</p>
                  <p className="text-gray-600">${r.amount.toFixed(2)} · {r.frequency} · Next: {new Date(r.nextRun).toLocaleDateString()}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => dispatch(removeRecurringBill(r.id))}>Remove</Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </RequireAuth>
  );
}

