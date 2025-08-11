'use client';

import RequireAuth from '@/components/auth/RequireAuth';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { addBeneficiary, removeBeneficiary, fetchBeneficiaries } from '@/store/slices/beneficiarySlice';
import { useForm } from 'react-hook-form';
import Button from '@/components/ui/Button';
import { useEffect } from 'react';

export default function BeneficiariesPage() {
  const dispatch = useAppDispatch();
  const { list, isLoading } = useAppSelector((s) => s.beneficiaries);
  const { register, handleSubmit, reset } = useForm<{ name: string; bank?: string; accountNumber: string; type: 'internal' | 'within_bank' | 'international' }>();

  // Load from API on mount
  useEffect(() => { dispatch(fetchBeneficiaries()); }, [dispatch]);

  const onSubmit = async (data: any) => {
    await dispatch(addBeneficiary(data));
    reset();
  };

  return (
    <RequireAuth>
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Beneficiaries</h1>
        </div>
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900">Add Beneficiary</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-3">
              <input placeholder="Name" {...register('name', { required: true })} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
              <input placeholder="Bank (optional)" {...register('bank')} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
              <input placeholder="Account Number" {...register('accountNumber', { required: true })} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
              <select {...register('type', { required: true })} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                <option value="internal">Internal</option>
                <option value="within_bank">Within Bank</option>
                <option value="international">International</option>
              </select>
              <Button type="submit" loading={isLoading}>Add</Button>
            </form>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900">Saved Beneficiaries</h2>
            <ul className="mt-4 divide-y divide-gray-200">
              {list.map((b) => (
                <li key={b.id} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{b.name}</p>
                    <p className="text-xs text-gray-600">{b.bank || 'Internal'} · {b.accountNumber}</p>
                  </div>
                  <Button variant="ghost" onClick={() => dispatch(removeBeneficiary(b.id))}>Remove</Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </RequireAuth>
  );
}

