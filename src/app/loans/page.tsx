'use client';

import RequireAuth from '@/components/auth/RequireAuth';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { applyLoan, fetchLoans } from '@/store/slices/loanSlice';
import { useForm } from 'react-hook-form';
import Button from '@/components/ui/Button';
import { useEffect } from 'react';

export default function LoansManagePage() {
  const dispatch = useAppDispatch();
  const { loans, isLoading } = useAppSelector((s) => s.loans);

  // Load loans from API on mount
  useEffect(() => { dispatch(fetchLoans()); }, [dispatch]);
  const { register, handleSubmit, reset } = useForm<{ loanType: 'personal' | 'home' | 'auto' | 'business'; principalAmount: number; interestRate: number; termMonths: number }>();

  const onSubmit = async (data: any) => {
    await dispatch(applyLoan(data));
    reset();
  };

  return (
    <RequireAuth>
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900">Loans</h1>
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900">Apply for a Loan</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-3">
              <select {...register('loanType', { required: true })} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                <option value="personal">Personal</option>
                <option value="home">Home</option>
                <option value="auto">Auto</option>
                <option value="business">Business</option>
              </select>
              <input type="number" placeholder="Amount" {...register('principalAmount', { required: true, min: 1000 })} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
              <input type="number" step="0.01" placeholder="Interest Rate %" {...register('interestRate', { required: true, min: 0 })} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
              <input type="number" placeholder="Term (months)" {...register('termMonths', { required: true, min: 6 })} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
              <Button type="submit" loading={isLoading}>Apply</Button>
            </form>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900">My Loans</h2>
            <ul className="mt-4 divide-y divide-gray-200">
              {loans.map((l) => (
                <li key={l.id} className="py-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900 capitalize">{l.loanType} Loan</p>
                      <p className="text-xs text-gray-600">Rate: {l.interestRate}% · Term: {l.termMonths} months</p>
                    </div>
                    <div className="text-right text-sm">
                      <p>Outstanding: ${l.outstandingBalance.toLocaleString()}</p>
                      <p className="text-gray-600">Monthly: ${l.monthlyPayment.toFixed(2)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </RequireAuth>
  );
}

