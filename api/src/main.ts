// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import CustomLogger from 'src/core/customLogger';
import { ServerConfig, CorsConfig } from './config/configuration';
import helmet from 'helmet';
import { DrizzleQueryErrorFilter } from './drizzle/drizzle-query-error-filter';
import { HttpExceptionFilter } from './lib/http-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {

  const app = await NestFactory.create(AppModule, {
    logger: process.env.LOG_DISABLED === 'true' ? false : undefined,
  });


  const config = app.get(ConfigService<ServerConfig>);
  const port = config.get<number>('port')!;
  const cors = config.get<CorsConfig>('cors')!;
  const log = config.get<any>('log'); // ← uit je config

  const logger = new CustomLogger();
  logger.setLogLevels(log.levels);
  app.useLogger(logger);


  if (!log?.disabled) {
    
    app.useLogger(
      new CustomLogger({
        logLevels: log.levels,
      }),
    );
  }


  app.enableCors({
    origin: (cors?.origins && cors.origins.length > 0)
      ? cors.origins
      : ['http://localhost:5173'],
    credentials: true,
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  app.setGlobalPrefix('api');


  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // verwijdert de properties die niet in de DTO staan
      forbidNonWhitelisted: true, // gooit fout als er foute properties binnenkomen
      forbidUnknownValues: true, // gooit fout bij onbekende types/waarden
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: (errors: ValidationError[] = []) => {
        const formattedErrors = errors.reduce((acc, err) => {
          acc[err.property] = Object.values(err.constraints || {});
          return acc;
        }, {} as Record<string, string[]>);

        return new BadRequestException({
          details: { body: formattedErrors },
        });
      },
    }),
  );

 
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new DrizzleQueryErrorFilter());

  
  app.use(helmet());

  
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Budget Web Services')
    .setDescription('The Budget API application')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);


  await app.listen(port, '0.0.0.0');
  logger.log(`Server started on http://localhost:${port}/api`);
}

bootstrap();
