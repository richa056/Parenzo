'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';

export default function GoogleSignInButton() {
  return (
    <button
      onClick={() => signIn('google', { callbackUrl: '/' })}
      className="flex items-center justify-center w-full px-4 py-2 space-x-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
    >
      <Image
        src="/google-logo.png"
        alt="Google Logo"
        width={20}
        height={20}
      />
      <span>Sign in with Google</span>
    </button>
  );
} 