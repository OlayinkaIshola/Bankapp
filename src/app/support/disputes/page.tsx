'use client';

import RequireAuth from '@/components/auth/RequireAuth';
import { useForm } from 'react-hook-form';
import Button from '@/components/ui/Button';

export default function DisputesPage() {
  const { register, handleSubmit, reset } = useForm<{ transactionId: string; reason: string; description: string }>();

  const onSubmit = (_data: { transactionId: string; reason: string; description: string }) => {
    alert('Dispute submitted');
    reset();
  };

  return (
    <RequireAuth>
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900">Dispute a Transaction</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Transaction Reference</label>
            <input {...register('transactionId', { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Reason</label>
            <select {...register('reason', { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
              <option value="unauthorized">Unauthorized transaction</option>
              <option value="duplicate">Duplicate charge</option>
              <option value="not_received">Goods/services not received</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea rows={4} {...register('description')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
          </div>
          <Button type="submit">Submit Dispute</Button>
        </form>
      </div>
    </RequireAuth>
  );
}

