import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ServerConfig, CorsConfig } from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService<ServerConfig>);
  const cors = config.get<CorsConfig>('cors')!;
  app.setGlobalPrefix('api');
  console.log(cors);
  app.enableCors({
    origin: cors.origins,
    maxAge: cors.maxAge,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
