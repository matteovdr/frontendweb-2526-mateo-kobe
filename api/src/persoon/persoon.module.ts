import { Module } from '@nestjs/common';
import { DrizzleModule } from '../drizzle/drizzle.module';
import { PersoonController } from './persoon.controller';
import { PersoonService } from './persoon.service';
import { AuthModule } from 'auth/auth.module';

@Module({
  imports: [DrizzleModule,AuthModule],
  controllers: [PersoonController],
  providers: [PersoonService],
  exports: [PersoonService],
})
export class PersoonModule {}
