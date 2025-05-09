'use client';

import { ReactNode, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { ExtendedSession } from '@/lib/auth';

interface RoleBasedLayoutProps {
  children: ReactNode;
  allowedRoles: ('mom' | 'dad' | 'medical_monitor')[];
}

export default function RoleBasedLayout({ children, allowedRoles }: RoleBasedLayoutProps) {
  const { data: session, status } = useSession() as { data: ExtendedSession | null; status: string };
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/login');
      return;
    }

    if (!allowedRoles.includes(session.user.role)) {
      // Redirect based on role
      switch (session.user.role) {
        case 'mom':
          router.push('/dashboard/mom');
          break;
        case 'dad':
          router.push('/dashboard/dad');
          break;
        case 'medical_monitor':
          router.push('/monitor/dashboard');
          break;
        default:
          router.push('/login');
      }
    }
  }, [session, status, router, allowedRoles]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!session || !allowedRoles.includes(session.user.role)) {
    return null;
  }

  return <>{children}</>;
} 