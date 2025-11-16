export interface DatabaseConfig {
  url: string;
}
export default () => ({
  cors: {
    origins: process.env.CORS_ORIGINS
      ? (JSON.parse(process.env.CORS_ORIGINS) as string[])
      : [],
    maxAge: parseInt(process.env.CORS_MAX_AGE || String(3 * 60 * 60)),
  },
  database: {
    url: process.env.DATABASE_URL,
  },
});

export interface ServerConfig {
  env: string;
  port: number;
  database: DatabaseConfig;
  cors: CorsConfig;
}

export interface CorsConfig {
  origins: string[];
  maxAge: number;
}
