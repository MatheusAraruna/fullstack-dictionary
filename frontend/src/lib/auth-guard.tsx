import { useEffect, type ReactNode } from 'react';
import { useUserStore } from '@/stores/user.store';
import { isAuthenticated } from '@/utils/token';
import { useNavigate } from 'react-router';

interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const navigate = useNavigate()
  const { isLoading } = useUserStore();
 
  useEffect(() => {
    const isUserAuthenticated = isAuthenticated();
    if (!isUserAuthenticated) {
      navigate('/auth/signin', { replace: true });
    }
  },[navigate])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto size-8 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="mt-2 text-sm text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}