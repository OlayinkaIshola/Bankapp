'use client';

import RequireAuth from '@/components/auth/RequireAuth';
import { useForm } from 'react-hook-form';
import Button from '@/components/ui/Button';

export default function RequestsPage() {
  const { register, handleSubmit, reset } = useForm<{ type: string; details: string }>();

  const onSubmit = (_data: { type: string; details: string }) => {
    alert('Request submitted');
    reset();
  };

  return (
    <RequireAuth>
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900">Service Requests</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Request Type</label>
            <select {...register('type', { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
              <option value="statement">Statement request</option>
              <option value="upgrade">Service upgrade</option>
              <option value="closure">Account closure</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Details</label>
            <textarea rows={4} {...register('details', { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
          </div>
          <Button type="submit">Submit Request</Button>
        </form>
      </div>
    </RequireAuth>
  );
}

