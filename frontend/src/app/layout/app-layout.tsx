import { Outlet } from 'react-router';
import { useUserStore } from '@/stores/user.store';
import { Navbar } from './navbar';

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
    <div className='flex flex-col h-screen w-full'>
      <Navbar />
      <main className="overflow-auto bg-background h-full w-full max-w-7xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
}