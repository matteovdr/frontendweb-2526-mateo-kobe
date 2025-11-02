import { Module } from '@nestjs/common';
import { DrizzleModule } from '../drizzle/drizzle.module';
import { KampenController } from './kampen.controller';
import { KampenService } from './kampen.service';

@Module({
  imports: [DrizzleModule],
  controllers: [KampenController],
  providers: [KampenService],
  exports: [KampenService],
})
export class KampenModule {}
