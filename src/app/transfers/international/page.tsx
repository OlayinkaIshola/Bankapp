'use client';

import RequireAuth from '@/components/auth/RequireAuth';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { useForm } from 'react-hook-form';
import { createTransfer } from '@/store/slices/transactionSlice';
import { fetchAccounts } from '@/store/slices/accountSlice';
import { useEffect } from 'react';
import Button from '@/components/ui/Button';

export default function InternationalTransferPage() {
  const dispatch = useAppDispatch();
  const { accounts } = useAppSelector((s) => s.accounts);
  const { isLoading } = useAppSelector((s) => s.transactions);
  const { register, handleSubmit, reset } = useForm<{ fromAccountId: string; toAccountNumber: string; amount: number; description: string; swift: string; bankName: string }>();

  useEffect(() => { dispatch(fetchAccounts()); }, [dispatch]);

  const onSubmit = async (data: { fromAccountId: string; toAccountNumber: string; amount: number; description: string; swift: string; bankName: string }) => {
    await dispatch(createTransfer({ ...data, transferType: 'international' } as any));
    alert('International transfer submitted');
    reset();
  };

  return (
    <RequireAuth>
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900">International Transfers</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">From</label>
            <select {...register('fromAccountId', { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
              <option value="">Select account</option>
              {accounts.map((a) => (<option key={a.id} value={a.id}>{a.accountType} ({a.accountNumber})</option>))}
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Recipient Account Number/IBAN</label>
              <input {...register('toAccountNumber', { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">SWIFT/BIC</label>
              <input {...register('swift', { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Bank Name</label>
              <input {...register('bankName', { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Amount</label>
              <input type="number" step="0.01" {...register('amount', { required: true, min: 0.01 })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <input {...register('description')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
          </div>
          <Button type="submit" loading={isLoading}>Transfer</Button>
        </form>
      </div>
    </RequireAuth>
  );
}

