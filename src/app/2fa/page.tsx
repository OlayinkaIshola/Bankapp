'use client';

import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { verify2FA } from '@/store/slices/authSlice';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '@/components/ui/Button';

export default function TwoFAPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get('next') || '/dashboard';
  const { isLoading } = useAppSelector((s) => s.auth);
  const { register, handleSubmit } = useForm<{ code: string }>();

  const onSubmit = async (data: { code: string }) => {
    const res = await dispatch(verify2FA({ code: data.code }));
    if (verify2FA.fulfilled.match(res)) {
      router.replace(next);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg p-6">
        <h1 className="text-xl font-semibold text-gray-900">Two-Factor Authentication</h1>
        <p className="mt-2 text-sm text-gray-600">Enter the 6-digit code from your authenticator app. (Demo: 123456)</p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">6-digit code</label>
            <input inputMode="numeric" {...register('code', { required: true })} className="mt-1 tracking-widest text-center block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
          </div>
          <Button type="submit" loading={isLoading}>Verify</Button>
        </form>
      </div>
    </div>
  );
}
