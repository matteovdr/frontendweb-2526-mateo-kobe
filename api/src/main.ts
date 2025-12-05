import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe
} from '@nestjs/common';

import { HttpExceptionFilter } from './lib/http-exception.filter';
import { DrizzleQueryErrorFilter } from './drizzle/drizzle-query-error-filter';
import helmet from 'helmet';
import CustomLogger from './core/customLogger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //
  // GLOBAL PREFIX
  //
  app.setGlobalPrefix('api');

  //
  // VALIDATION PIPE
  //
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
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
  const config = app.get(ConfigService);

  const port = config.get<number>('port') ?? 3000;
  const cors = config.get('cors');
  const log = config.get('log');

  
  // LOGGER
  
  app.useLogger(
    new CustomLogger({
      logLevels: log?.levels ?? ['log', 'error', 'warn'],
    }),
  );

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
  console.log(`🚀 Server running at http://localhost:${port}/api`);
}

bootstrap();
