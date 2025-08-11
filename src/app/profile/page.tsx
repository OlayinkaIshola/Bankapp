'use client';

import RequireAuth from '@/components/auth/RequireAuth';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { updateUser } from '@/store/slices/authSlice';
import { useForm } from 'react-hook-form';
import Button from '@/components/ui/Button';

export default function ProfilePage() {
  const { user } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm({
    defaultValues: user || {},
  });

  const onSubmit = (data: any) => {
    dispatch(updateUser(data));
    alert('Profile updated');
  };

  return (
    <RequireAuth>
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" {...register('firstName')} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" {...register('lastName')} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" {...register('email')} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" {...register('phoneNumber')} />
          </div>

          <Button type="submit">Save Changes</Button>
        </form>
      </div>
    </RequireAuth>
  );
}

