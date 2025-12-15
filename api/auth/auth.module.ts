// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DrizzleModule } from '../src/drizzle/drizzle.module';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ServerConfig, AuthConfig } from '../src/config/configuration';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory: (configService: ConfigService<ServerConfig>) => {
        const authConfig = configService.get<AuthConfig>('auth')!;

        const jwtOptions = {
          // Opties die zowel voor signen als verifiëren gelden
          audience: authConfig.jwt.audience,
          issuer: authConfig.jwt.issuer,
        };
        return {
          secret: authConfig.jwt.secret,
          
          signOptions: {
            expiresIn: `${authConfig.jwt.expirationInterval}s`,
            ...jwtOptions,
          },
          
          verifyOptions: {
            ...jwtOptions,
          },
        };
      },
    }),
    DrizzleModule, 
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
