import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  Logger,
} from '@nestjs/common';
import CustomLogger from 'src/core/customLogger';
import { ConfigService } from '@nestjs/config';
import { ServerConfig, CorsConfig } from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
const config = app.get(ConfigService<ServerConfig>);
  const port = config.get<number>('port')!;
  const cors = config.get<CorsConfig>('cors')!;
  app.useLogger(new CustomLogger()); 
  app.enableCors({
    origin: cors.origins,
    maxAge: cors.maxAge,
    credentials: true,
  });

  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 3000, () => {
    new Logger().log('🚀 Server listening on http://127.0.0.1:3000');
  });
}

bootstrap();