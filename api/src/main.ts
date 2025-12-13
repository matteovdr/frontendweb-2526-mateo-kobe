import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe
} from '@nestjs/common';
import CustomLogger from 'src/core/customLogger';
import { ServerConfig, CorsConfig } from './config/configuration';
import helmet from 'helmet';
import { DrizzleQueryErrorFilter } from './drizzle/drizzle-query-error-filter';
import { HttpExceptionFilter } from './lib/http-exception.filter';

async function bootstrap() {
  const logger = new CustomLogger();
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService<ServerConfig>);
  const port = config.get<number>('port')!;
  const cors = config.get<CorsConfig>('cors')!;
  app.useLogger(logger); 
  app.enableCors({
    origin: cors.origins,
    maxAge: cors.maxAge,
    credentials: true,
  });

  app.setGlobalPrefix('api');

  //
  // VALIDATION PIPE
  //
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // verwijdert de properties die niet in de DTO staan
      forbidNonWhitelisted: true, // gooit fout als er foute properties binnenkomen
      forbidUnknownValues: true, // gooit fout bij onbekende types/waarden
      transform: true,
            transformOptions: {
        enableImplicitConversion: true, // converteert ook zonder @Type
      },
      exceptionFactory: (errors: ValidationError[] = []) => {
        const formattedErrors = errors.reduce(
          (acc, err) => {
            acc[err.property] = Object.values(err.constraints || {});
            return acc;
          },
          {} as Record<string, string[]>,
        );

        return new BadRequestException({
          details: { body: formattedErrors },
        });
      },
    }),
  );

  //
  // GLOBAL FILTERS
  //
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new DrizzleQueryErrorFilter());

  //
  // CONFIG SERVICE
  //


  //
  // FIXED CORS (WERKT 100% MET REACT)
  //
app.enableCors({
  origin: ['http://localhost:5173'],
  credentials: true,
  methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
});


  //
  // SECURITY
  //
  app.use(helmet());

  //
  // START SERVER
  //
  await app.listen(port);
  logger.log(`🚀 Server running at http://localhost:${port}/api`);
}

bootstrap();
