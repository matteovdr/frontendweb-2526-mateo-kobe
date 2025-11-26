import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  Logger,
} from '@nestjs/common';
import CustomLogger from 'src/core/customLogger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(new CustomLogger()); 
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 3000, () => {
    new Logger().log('🚀 Server listening on http://127.0.0.1:3000');
  });
}

bootstrap();