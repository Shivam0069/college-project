'use client';

import { useAuth } from '@/lib/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const ProtectedRoute = ({ children, requiredRole = 'student' }) => {
  const { isAuthenticated, userRole, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
      return;
    }

    if (!loading && requiredRole === 'admin' && userRole !== 'admin') {
      router.push('/');
      return;
    }

    if (!loading && requiredRole === 'student' && userRole !== 'student') {
      router.push('/');
      return;
    }
  }, [isAuthenticated, userRole, loading, router, requiredRole]);

  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (requiredRole === 'admin' && userRole !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">Access Denied. Admin only.</p>
        </div>
      </div>
    );
  }

  if (requiredRole === 'student' && userRole !== 'student') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">Access Denied. Student only.</p>
        </div>
      </div>
    );
  }

  return children;
};
