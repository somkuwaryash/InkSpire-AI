'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  return <>{children}</>;
};

export default ProtectedRoute;