import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HealthController } from './health/health.controller';
import { DrizzleModule } from './drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { KampenModule } from './kampen/kampen.module';
import { LeidingModule } from './leiding/leiding.module';
import { PersoonModule } from './persoon/persoon.module';
import { AuthModule } from 'auth/auth.module';
import { SessionModule } from 'src/session/session.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'auth/gaurds/auth.guard';
import { RolesGuard } from 'auth/gaurds/roles.guard';
import { LoggerMiddleware } from './lib/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    DrizzleModule,
    KampenModule,
    LeidingModule,
    PersoonModule,
        AuthModule,
    SessionModule,
    

  ],
  controllers: [HealthController],
  providers: [
    {   provide: APP_GUARD,
       useClass: AuthGuard,
     },
         {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    
    
  ],
})


export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*path');
  }
}

    