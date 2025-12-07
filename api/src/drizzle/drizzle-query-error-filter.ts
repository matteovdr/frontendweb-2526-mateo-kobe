import {
    Catch,
    ConflictException,
    NotFoundException,
    BadRequestException,
    ExceptionFilter,
} from '@nestjs/common';
import { DrizzleQueryError } from 'drizzle-orm';

@Catch(DrizzleQueryError)
export class DrizzleQueryErrorFilter implements ExceptionFilter {
  catch(error: DrizzleQueryError) {
    // Geen MYSQL code? Dan is het geen database error
    if (!error.cause || !('code' in error.cause)) {
      throw new Error(error.message || 'Unknown database error');
    }

    const {
      cause: { code, message },
    } = error;

    if (code === 'ER_DUP_ENTRY') {
      if (message.includes('idx_persoon_email_unique')) {
        throw new ConflictException('Er bestaat al een persoon met dit e-mailadres.');
      }

      // extra opties (indien later toegevoegd)
      throw new ConflictException('Dit item bestaat al.');
    }

   
    if (code === 'ER_NO_REFERENCED_ROW_2') {
      // lid → persoonId
      if (message.includes('lid.persoonId')) {
        throw new NotFoundException('Persoon bestaat niet.');
      }

      // leiding → persoonId
      if (message.includes('leiding.persoonId')) {
        throw new NotFoundException('Persoon bestaat niet.');
      }

      // lid_kamp → lidId
      if (message.includes('lid_kamp.lidId')) {
        throw new NotFoundException('Lid bestaat niet.');
      }

      // lid_kamp → kampId
      if (message.includes('lid_kamp.kampId')) {
        throw new NotFoundException('Kamp bestaat niet.');
      }

      // leiding_kamp → leidingId
      if (message.includes('leiding_kamp.leidingId')) {
        throw new NotFoundException('Leiding bestaat niet.');
      }

      // leiding_kamp → kampId
      if (message.includes('leiding_kamp.kampId')) {
        throw new NotFoundException('Kamp bestaat niet.');
      }
    }


    if (code === 'ER_DUP_ENTRY' && message.includes('PRIMARY')) {
      // dit gebeurt als iemand 2x hetzelfde kamp wil toevoegen
      if (message.includes('lid_kamp')) {
        throw new ConflictException('Dit lid is al ingeschreven voor dit kamp.');
      }

      if (message.includes('leiding_kamp')) {
        throw new ConflictException('Deze leiding staat al in dit kamp.');
      }
    }

    throw new BadRequestException(message || 'Database error');
  }
}
