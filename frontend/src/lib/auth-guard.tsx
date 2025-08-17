import type { ReactNode } from 'react';
import { useUserStore } from '../stores/user.store';

interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isLoading } = useUserStore();

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