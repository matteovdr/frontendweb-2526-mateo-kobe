import {
    Injectable,
    CanActivate,
    ExecutionContext,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { Role } from '../roles';

@Injectable()
export class CheckpersoonAccessGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    if (!request.persoon) {
      throw new UnauthorizedException('You need to be signed in');
    }

    const { id: persoonId, roles } = request.persoon;
    const id = request.params.id;

    if (id !== 'me' && id !== String(persoonId) && !roles.includes(Role.LEIDING)) {
      throw new NotFoundException('No user with this id exists');
    }

    return true;
  }
}
