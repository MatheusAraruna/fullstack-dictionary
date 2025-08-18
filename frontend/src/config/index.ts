interface AppConfig {
  app: {
    name: string;
    version: string;
    environment: 'development' | 'staging' | 'production';
    enableDevtools: boolean;
  };
  api: {
    baseUrl: string;
    timeout: number;
    retryAttempts: number;
  };
  auth: {
    cookie_name: string;
    expiresInDays: number;
  }
}

const config: AppConfig = {
  app: {
    name: import.meta.env.VITE_APP_NAME || 'Boilerplate App',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    environment:
      (import.meta.env.VITE_APP_ENV as AppConfig['app']['environment']) ||
      'development',
    enableDevtools: import.meta.env.VITE_ENABLE_DEVTOOLS === 'true',
  },
  api: {
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3030',
    timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 30000,
    retryAttempts: Number(import.meta.env.VITE_API_RETRY_ATTEMPTS) || 3,
  },
  auth: {
    cookie_name: import.meta.env.VITE_AUTH_COOKIE_NAME || 'auth_token',
    expiresInDays: Number(import.meta.env.VITE_AUTH_EXPIRES_IN_DAYS) || 60
  }
} as const;

export { config, type AppConfig };