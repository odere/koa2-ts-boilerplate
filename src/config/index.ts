import dotenv from 'dotenv';

export interface Config {
  env?: string;
  host?: string;
  loggerLevel?: string;
  name?: string;
  port?: number;
}

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const config: Config = {
  env: process.env.NODE_ENV || 'production',
  host: process.env.HOST || '127.0.0.1',
  loggerLevel: process.env.LOG_LEVEL || 'debug',
  port: parseInt(process.env.PORT || '3000', 10),
};

export default config;
