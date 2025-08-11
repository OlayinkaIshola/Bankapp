'use client';

import { useForm } from 'react-hook-form';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { confirmPasswordReset } from '@/store/slices/authSlice';
import Button from '@/components/ui/Button';

export default function ResetPasswordPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get('token') || '';
  const { isLoading } = useAppSelector((s) => s.auth);
  const { register, handleSubmit } = useForm<{ password: string; confirm: string }>();

  const onSubmit = async (data: { password: string; confirm: string }) => {
    if (data.password !== data.confirm) {
      alert('Passwords do not match');
      return;
    }
    await dispatch(confirmPasswordReset({ token, newPassword: data.password }));
    alert('Password has been reset. Please sign in.');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg p-6">
        <h1 className="text-xl font-semibold text-gray-900">Reset Password</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input type="password" {...register('password', { required: true, minLength: 8 })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input type="password" {...register('confirm', { required: true, minLength: 8 })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
          </div>
          <Button type="submit" loading={isLoading}>Reset Password</Button>
        </form>
      </div>
    </div>
  );
}
