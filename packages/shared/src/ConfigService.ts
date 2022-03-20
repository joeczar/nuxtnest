import * as env from 'env-var';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(__dirname, '../../../.env') });

export interface EnvConfig {
  CLIENT_PORT: number;
  SERVER_PORT: number;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DATABASE: string;
  PGADMIN_DEFAULT_EMAIL: string;
  PGADMIN_DEFAULT_PASSWORD: string;
  POSTGRES_HOST: string;
  POSTGRES_PORT: number;
  JWT_SECRET: string;
  JWT_EXPIRATION_TIME: string;
  JWT_REFRESH_TOKEN_SECRET: string;
  JWT_REFRESH_TOKEN_EXPIRATION_TIME: string;
}
export class ConfigService {
  constructor(private env: { [k: string]: string | number| undefined }) { }

  public getValue(key: string, throwOnMissing = true): string | number {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }
}

export const baseConfigService = new ConfigService(process.env).ensureValues([
  'CLIENT_PORT',
  'SERVER_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',
  'PGADMIN_DEFAULT_EMAIL',
  'PGADMIN_DEFAULT_PASSWORD',
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'JWT_SECRET',
  'JWT_EXPIRATION_TIME',
  'JWT_REFRESH_TOKEN_SECRET',
  'JWT_REFRESH_TOKEN_EXPIRATION_TIME'
])
