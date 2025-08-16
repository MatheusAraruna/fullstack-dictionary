import { useState } from 'react';

export function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-background p-8 shadow-md">
        <h1 className="text-center text-2xl font-bold text-gray-800">Login</h1>

        <div className="rounded-md bg-amber-50 p-4 text-sm text-amber-700">
          <p className="font-medium">Nota para desenvolvimento</p>
          <p>Sistema de autenticação ainda não implementado.</p>
          <p>Atualmente usando dados mock para fins de desenvolvimento.</p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            {isLoading ? 'Entrando...' : 'Entrar como usuário de teste'}
          </button>
        </div>
      </div>
    </div>
  );
}