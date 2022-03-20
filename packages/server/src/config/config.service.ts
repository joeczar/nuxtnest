import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { TypeOrmModuleOtions } from '@nestjs/passport';
import { ConfigService as BaseConfigService, EnvConfigBase } from '@nuxtnest/shared';
import { resolve } from 'path';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: resolve(__dirname, '../../.env') });

class TypeOrmConfigService extends BaseConfigService {



  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',

      host: this.getValue('POSTGRES_HOST') as string,
      port: this.getValue('POSTGRES_PORT') as number,
      username: this.getValue('POSTGRES_USER') as string,
      password: this.getValue('POSTGRES_PASSWORD') as string,
      database: this.getValue('POSTGRES_DATABASE') as string,

      entities: ['**/*.entity{.ts,.js}'],

      migrationsTableName: 'migration',

      migrations: ['src/migration/*.ts'],

      cli: {
        migrationsDir: 'src/migration',
      },

      ssl: this.isProduction(),
    };
  }
}
const base = process.env as unknown as EnvConfigBase
const configService = new TypeOrmConfigService(base).ensureValues([
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
]);

export { configService };
