'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { EyeIcon, EyeSlashIcon, LockClosedIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { loginUser, clearError } from '@/store/slices/authSlice';
import { LoginForm } from '@/types';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    try {
      const result = await dispatch(loginUser(data));
      if (loginUser.fulfilled.match(result)) {
        if (result.payload?.requires2FA) {
          router.push('/2fa');
        } else {
          router.push('/dashboard');
        }
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">B</span>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
            open a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium text-gray-900">Welcome back</h3>
            <p className="text-sm text-gray-600">Please sign in to access your account</p>
          </CardHeader>
          
          <CardContent>
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <div className="flex justify-between items-start">
                  <p className="text-sm text-red-600">{error}</p>
                  <button
                    onClick={handleClearError}
                    className="text-red-400 hover:text-red-600"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Input
                label="Email address"
                type="email"
                autoComplete="email"
                leftIcon={<EnvelopeIcon />}
                error={errors.email?.message}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Please enter a valid email address',
                  },
                })}
              />

              <div>
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  leftIcon={<LockClosedIcon />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                    </button>
                  }
                  error={errors.password?.message}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    {...register('rememberMe')}
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                loading={isLoading}
                disabled={isLoading}
              >
                Sign in
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Demo Credentials</span>
                </div>
              </div>

              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-sm text-blue-800 font-medium mb-2">Try the demo:</p>
                <p className="text-sm text-blue-700">
                  Email: <span className="font-mono">demo@bank.com</span>
                </p>
                <p className="text-sm text-blue-700">
                  Password: <span className="font-mono">demo123</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            By signing in, you agree to our{' '}
            <Link href="/terms" className="text-blue-600 hover:text-blue-500">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
