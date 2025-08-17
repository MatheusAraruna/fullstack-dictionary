import { Outlet } from 'react-router';
import { useUserStore } from '../../stores/user.store';

export function AppLayout() {
    const { isLoading } = useUserStore();
    if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="mx-auto size-12 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <main className="flex min-h-screen w-full max-w-full flex-col overflow-hidden bg-background">
        <div className="w-full max-w-full overflow-hidden p-8" id="main-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}