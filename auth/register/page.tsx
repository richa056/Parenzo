'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import RegisterForm from '../../components/auth/RegisterForm';

export default function RegisterPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome to Parenzo</h1>
          <p className="mt-2 text-gray-600">
            Create your account to get started
          </p>
        </div>

        <RegisterForm />

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Button
              variant="link"
              className="p-0"
              onClick={() => router.push('/auth/signin')}
            >
              Sign in
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
} 