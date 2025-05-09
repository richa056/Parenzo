'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { signInWithGoogle } from '@/lib/auth';
import { UserRole } from '@/lib/auth';

export default function SelectRole() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRoleSelect = async (role: UserRole) => {
    try {
      setLoading(true);
      await signInWithGoogle(role);
      router.push('/dashboard');
    } catch (error) {
      console.error('Error selecting role:', error);
      router.push('/auth/error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Select Your Role</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            className="w-full"
            onClick={() => handleRoleSelect('mom')}
            disabled={loading}
          >
            I am a Mom
          </Button>
          <Button
            className="w-full"
            onClick={() => handleRoleSelect('dad')}
            disabled={loading}
          >
            I am a Dad
          </Button>
          <Button
            className="w-full"
            onClick={() => handleRoleSelect('medical_monitor')}
            disabled={loading}
          >
            I am a Medical Monitor
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 