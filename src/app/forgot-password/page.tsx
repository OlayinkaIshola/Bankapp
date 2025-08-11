'use client';

import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { requestPasswordReset } from '@/store/slices/authSlice';
import Button from '@/components/ui/Button';

export default function ForgotPasswordPage() {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((s) => s.auth);
  const { register, handleSubmit, reset } = useForm<{ email: string }>();

  const onSubmit = async (data: { email: string }) => {
    await dispatch(requestPasswordReset({ email: data.email }));
    alert('If this email exists, a reset link has been sent.');
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg p-6">
        <h1 className="text-xl font-semibold text-gray-900">Forgot Password</h1>
        <p className="mt-2 text-sm text-gray-600">Enter your email to receive a password reset link.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" {...register('email', { required: true })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
          </div>
          <Button type="submit" loading={isLoading}>Send Reset Link</Button>
        </form>
      </div>
    </div>
  );
}
