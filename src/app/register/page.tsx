'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { 
  EyeIcon, 
  EyeSlashIcon, 
  LockClosedIcon, 
  EnvelopeIcon,
  UserIcon,
  PhoneIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { registerUser, clearError } from '@/store/slices/authSlice';
import { RegisterForm } from '@/types';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>();

  const password = watch('password');

  const onSubmit = async (data: RegisterForm) => {
    try {
      const result = await dispatch(registerUser(data));
      if (registerUser.fulfilled.match(result)) {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Registration failed:', error);
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
          Open your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in here
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium text-gray-900">Create your account</h3>
            <p className="text-sm text-gray-600">Join thousands of satisfied customers</p>
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
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  type="text"
                  autoComplete="given-name"
                  leftIcon={<UserIcon />}
                  error={errors.firstName?.message}
                  {...register('firstName', {
                    required: 'First name is required',
                    minLength: {
                      value: 2,
                      message: 'First name must be at least 2 characters',
                    },
                  })}
                />

                <Input
                  label="Last Name"
                  type="text"
                  autoComplete="family-name"
                  leftIcon={<UserIcon />}
                  error={errors.lastName?.message}
                  {...register('lastName', {
                    required: 'Last name is required',
                    minLength: {
                      value: 2,
                      message: 'Last name must be at least 2 characters',
                    },
                  })}
                />
              </div>

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

              <Input
                label="Phone Number"
                type="tel"
                autoComplete="tel"
                leftIcon={<PhoneIcon />}
                error={errors.phoneNumber?.message}
                {...register('phoneNumber', {
                  required: 'Phone number is required',
                  pattern: {
                    value: /^\+?1?[-.\s]?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/,
                    message: 'Please enter a valid phone number',
                  },
                })}
              />

              <Input
                label="Date of Birth"
                type="date"
                error={errors.dateOfBirth?.message}
                {...register('dateOfBirth', {
                  required: 'Date of birth is required',
                })}
              />

              <Input
                label="Street Address"
                type="text"
                autoComplete="street-address"
                leftIcon={<MapPinIcon />}
                error={errors.address?.street?.message}
                {...register('address.street', {
                  required: 'Street address is required',
                })}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="City"
                  type="text"
                  autoComplete="address-level2"
                  error={errors.address?.city?.message}
                  {...register('address.city', {
                    required: 'City is required',
                  })}
                />

                <Input
                  label="State"
                  type="text"
                  autoComplete="address-level1"
                  error={errors.address?.state?.message}
                  {...register('address.state', {
                    required: 'State is required',
                  })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="ZIP Code"
                  type="text"
                  autoComplete="postal-code"
                  error={errors.address?.zipCode?.message}
                  {...register('address.zipCode', {
                    required: 'ZIP code is required',
                    pattern: {
                      value: /^\d{5}(-\d{4})?$/,
                      message: 'Please enter a valid ZIP code',
                    },
                  })}
                />

                <Input
                  label="Country"
                  type="text"
                  autoComplete="country"
                  defaultValue="USA"
                  error={errors.address?.country?.message}
                  {...register('address.country', {
                    required: 'Country is required',
                  })}
                />
              </div>

              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
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
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                    message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
                  },
                })}
              />

              <Input
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                autoComplete="new-password"
                leftIcon={<LockClosedIcon />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeSlashIcon /> : <EyeIcon />}
                  </button>
                }
                error={errors.confirmPassword?.message}
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) =>
                    value === password || 'Passwords do not match',
                })}
              />

              <div className="flex items-center">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  {...register('terms', {
                    required: 'You must agree to the terms and conditions',
                  })}
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                  I agree to the{' '}
                  <Link href="/terms" className="text-blue-600 hover:text-blue-500">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {errors.terms && (
                <p className="text-sm text-red-600">{errors.terms.message}</p>
              )}

              <Button
                type="submit"
                className="w-full"
                loading={isLoading}
                disabled={isLoading}
              >
                Create Account
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Your information is protected by bank-level security and encryption.
          </p>
        </div>
      </div>
    </div>
  );
}
