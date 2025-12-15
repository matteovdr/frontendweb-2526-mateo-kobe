import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { IS_PUBLIC_KEY } from '../decoraters/public.decorater';
import { Role } from '../roles';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (token) {
        const payload = await this.authService.verifyJwt(token);
        request.user = {
          id: payload.sub,
          roles: payload.roles as Role[],
          email: payload.email,
        };
      }
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('You need to be signed in');
    }

    try {
      const payload = await this.authService.verifyJwt(token);

      request.user = {
        id: payload.sub,
        roles: payload.roles as Role[],
        email: payload.email,
      };
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token has expired');
      } else {
        throw new UnauthorizedException('Invalid authentication token');
      }
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    // 🔥🔥 TIJDELIJKE DEBUG LOG 🔥🔥
    console.log('Authorization Header:', request.headers.authorization);
    console.log('Extracted Token:', token); 
    // 🔥🔥 EINDE LOG 🔥🔥
    return type === 'Bearer' ? token : undefined;
  }
}
