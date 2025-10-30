import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health/health.controller';
import { KampenController } from './kampen/kampen.controller';

@Module({
  imports: [],
  controllers: [AppController, HealthController, KampenController],
  providers: [AppService],
})
export class AppModule {}
