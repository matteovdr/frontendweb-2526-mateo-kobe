import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health/health.controller';
import { KampenController } from './kampen/kampen.controller';
import { KampenService } from './kampen/kampen.service';

@Module({
  imports: [],
  controllers: [AppController, HealthController, KampenController],
  providers: [AppService, KampenService],
})
export class AppModule {}
