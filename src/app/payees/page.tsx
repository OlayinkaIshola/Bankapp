'use client';

import RequireAuth from '@/components/auth/RequireAuth';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { addPayee, removePayee, fetchPayees } from '@/store/slices/payeeSlice';
import { useForm } from 'react-hook-form';
import Button from '@/components/ui/Button';
import { useEffect } from 'react';

export default function PayeesPage() {
  const dispatch = useAppDispatch();
  const { list, isLoading } = useAppSelector((s) => s.payees);
  const { register, handleSubmit, reset } = useForm<{ name: string; category: string; accountNumber: string }>();

  // Load from API on mount
  useEffect(() => { dispatch(fetchPayees()); }, [dispatch]);

  const onSubmit = async (data: any) => {
    await dispatch(addPayee(data));
    reset();
  };

  return (
    <RequireAuth>
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Payees</h1>
        </div>
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900">Add Payee</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-3">
              <input placeholder="Name" {...register('name', { required: true })} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
              <select {...register('category', { required: true })} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                <option value="utilities">Utilities</option>
                <option value="subscription">Subscription</option>
                <option value="government">Government</option>
                <option value="other">Other</option>
              </select>
              <input placeholder="Account Number" {...register('accountNumber', { required: true })} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
              <Button type="submit" loading={isLoading}>Add</Button>
            </form>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900">Saved Payees</h2>
            <ul className="mt-4 divide-y divide-gray-200">
              {list.map((p) => (
                <li key={p.id} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{p.name}</p>
                    <p className="text-xs text-gray-600">{p.category} · {p.accountNumber}</p>
                  </div>
                  <Button variant="ghost" onClick={() => dispatch(removePayee(p.id))}>Remove</Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </RequireAuth>
  );
}

