export type AppConfigType = {
  system: {
    env: string;
    port: number;
    timeout: number;
    appDomain: string;
    swagger: {
      enabled: boolean;
    };
  };

  database: {
    url: string;
  };

  redis: {
    host: string;
    port: number;
    password: string;
  };

  security: {
    jwtSecret: string;
    expiresIn: string;
    strictCORS: boolean;
  };
};

export const appConfig = (): AppConfigType => ({
  system: {
    env: process.env.NODE_ENV || 'development',
    port: Number(process.env.PORT) || 3030,
    timeout: Number(process.env.TIMEOUT) || 60000,
    appDomain: process.env.APP_DOMAIN || '*',
    swagger: {
      enabled: process.env.SWAGGER_ENABLED === 'true',
    },
  },

  database: {
    url:
      process.env.DATABASE_URL ||
      'postgresql://user:password@localhost:5432/mydb',
  },

  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD || '',
  },

  security: {
    jwtSecret: process.env.JWT_SECRET || 'secret',
    expiresIn: process.env.EXPIRES_IN || '60d',
    strictCORS: process.env.STRICT_CORS === 'true',
  },
});
