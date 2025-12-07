import { Injectable, UnauthorizedException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { persoon } from 'src/drizzle/schema';
import { Role } from './roles';
import * as argon2 from 'argon2';
import { LoginRequestDto, RegisterPersoonRequestDto } from '../src/persoon/persoon.dto';
import { InjectDrizzle, type DatabaseProvider } from 'src/drizzle/drizzle.provider';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthConfig, ServerConfig } from 'src/config/configuration';
import { P } from '../types/persoon';
import { JwtPayload } from '../types/auth';

@Injectable()
export class AuthService {
  constructor(
    @InjectDrizzle()
    private readonly db: DatabaseProvider,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<ServerConfig>,
  ) {}
  
  async hashPassword(password: string): Promise<string> {
    const authConfig = this.configService.get<AuthConfig>('auth')!;

    return argon2.hash(password, {
      type: argon2.argon2id,
      hashLength: authConfig.hashLength,
      timeCost: authConfig.timeCost,
      memoryCost: authConfig.memoryCost,
    });
  }

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return await argon2.verify(hash, password);
  }

  private signJwt(user: P): string {
    return this.jwtService.sign({
      sub: user.id,
      email: user.email,
      roles: user.roles,
    });
  }

  async verifyJwt(token: string): Promise<JwtPayload> {
    const payload = await this.jwtService.verifyAsync<JwtPayload>(token);

    if (!payload) {
      throw new UnauthorizedException('Invalid authentication token');
    }

    return payload;
  }

  async login({ email, password }: LoginRequestDto): Promise<string> {
    const user = await this.db.query.persoon.findFirst({
      where: eq(persoon.email, email),
    });

    if (!user) {
      throw new UnauthorizedException(
        'The given email and password do not match',
      );
    }

    const passwordValid = await this.verifyPassword(
      password,
      user.passwordHash,
    );

    if (!passwordValid) {
      throw new UnauthorizedException(
        'The given email and password do not match',
      );
    }

    return this.signJwt(user);
  }


  async register({
    voornaam,
    achternaam,
    email,
    telefoon,
    geboorteDatum,
    password,
  }: RegisterPersoonRequestDto): Promise<string> {
    const passwordHash = await this.hashPassword(password);

    const [newPersoon] = await this.db
      .insert(persoon)
      .values({
        voornaam,
         achternaam,
        email,
         telefoon,
        geboorteDatum: new Date(geboorteDatum), 
        passwordHash,
        roles: [Role.LID],
      })
      .$returningId();

    const created = await this.db.query.persoon.findFirst({
      where: eq(persoon.id, newPersoon.id),
    });

    return this.signJwt(created as P);
  }
}
