import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequestWithAuth } from 'next-auth/middleware';

export async function middleware(request: NextRequestWithAuth) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  // If user is not logged in, redirect to sign in
  if (!token && !pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  // If user is logged in and trying to access auth pages, redirect to appropriate dashboard
  if (token && pathname.startsWith('/auth')) {
    const role = token.role as string;
    if (role === 'medical_monitor') {
      return NextResponse.redirect(new URL('/monitor/dashboard', request.url));
    }
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Role-based access control
  if (token) {
    const role = token.role as string;
    
    // Medical monitor specific routes
    if (role === 'medical_monitor') {
      if (!pathname.startsWith('/monitor') && !pathname.startsWith('/forum')) {
        return NextResponse.redirect(new URL('/monitor/dashboard', request.url));
      }
    }
    // Parent (mom/dad) specific routes
    else if (['mom', 'dad'].includes(role)) {
      if (pathname.startsWith('/monitor')) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/monitor/:path*',
    '/auth/:path*',
    '/forum/:path*',
    '/profile',
    '/settings',
  ],
};