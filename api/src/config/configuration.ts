// src/config/configuration.ts
export interface DatabaseConfig {
  url: string;
}

export interface CorsConfig {
  origins: string[];
  maxAge: number;
}

export interface JwtConfig {
  expirationInterval: number;
  secret: string;
  audience: string;
  issuer: string;
}

export interface AuthConfig {
  hashLength: number;
  timeCost: number;
  memoryCost: number;
  jwt: JwtConfig;
}

export interface ServerConfig {
  env: string;
  port: number;
  cors: CorsConfig;
  database: DatabaseConfig;
  log: LogConfig;
  auth: AuthConfig;
}

export interface LogConfig {
  levels: LogLevel[];
}

type LogLevel = 'log' | 'error' | 'warn' | 'debug' | 'verbose' | 'fatal';

export default () => ({
  env: process.env.NODE_ENV,
  port: parseInt(process.env.PORT || '9000'),
  cors: {
    origins: process.env.CORS_ORIGINS
      ? (() => {
          try {
            return JSON.parse(process.env.CORS_ORIGINS) as string[];
          } catch {
            // Fallback: treat as comma-separated string
            return process.env.CORS_ORIGINS.split(',').map((o) => o.trim());
          }
        })()
      : [],
    maxAge: parseInt(process.env.CORS_MAX_AGE || String(3 * 60 * 60)),
  },
  database: {
    url: process.env.DATABASE_URL,
  },
  auth: {
    hashLength: parseInt(process.env.AUTH_HASH_LENGTH || '32', 10),
    timeCost: parseInt(process.env.AUTH_HASH_TIME_COST || '6', 10),
    memoryCost: parseInt(process.env.AUTH_HASH_MEMORY_COST || '65536', 10),
    jwt: {
      expirationInterval:
        Number(process.env.AUTH_JWT_EXPIRATION_INTERVAL) || 3600,
      secret: process.env.AUTH_JWT_SECRET || '',
      audience: process.env.AUTH_JWT_AUDIENCE || 'budget.hogent.be',
      issuer: process.env.AUTH_JWT_ISSUER || 'budget.hogent.be',
    },
  },
  log: {
    levels: process.env.LOG_LEVELS
      ? (JSON.parse(process.env.LOG_LEVELS) as LogLevel[])
      : ['log', 'error', 'warn'],
  },
});