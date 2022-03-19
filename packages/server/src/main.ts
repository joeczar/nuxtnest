import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envConfig } from '@nuxtnest/shared';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(envConfig.serverPort || 4000);
}
bootstrap();