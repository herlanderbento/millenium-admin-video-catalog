import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { applyGlobalConfig } from './global-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: process.env.NODE_ENV === 'production' ? console : undefined,
  });

  applyGlobalConfig(app);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
