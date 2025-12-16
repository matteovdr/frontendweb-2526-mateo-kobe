import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { KampResponseDto, KampenListResponseDto, CreateKampRequestDto, InschrijvingResponseDto } from './kamp.dto';
import { InjectDrizzle, type DatabaseProvider } from '../drizzle/drizzle.provider';
import { eq, and } from 'drizzle-orm';
import { kampen } from '../drizzle/schema';
import { lidKamp } from '../drizzle/schema';
import { leidingKamp } from '../drizzle/schema';
@Injectable()
export class KampenService {
  constructor(
    @InjectDrizzle()
    private readonly db: DatabaseProvider,
  ) {}

  async getAll(user?: { id: number; roles: string[] }): Promise<KampenListResponseDto> {
    const items = await this.db.query.kampen.findMany();

    const ingeschrevenKampIds = new Set<number>();

    if (user?.id) {
      if (user.roles.includes('lid')) {
        const inschrijvingenLid = await this.db.query.lidKamp.findMany({
          where: eq(lidKamp.lidId, user.id),
        });
        inschrijvingenLid.forEach((inschrijving) => ingeschrevenKampIds.add(inschrijving.kampId));
      }

      if (user.roles.some((role) => role === 'leiding' || role === 'hoofdleiding')) {
        const inschrijvingenLeiding = await this.db.query.leidingKamp.findMany({
          where: eq(leidingKamp.leidingId, user.id),
        });
        inschrijvingenLeiding.forEach((inschrijving) => ingeschrevenKampIds.add(inschrijving.kampId));
      }
    }

    return {
      items: items.map((item) => ({
        id: item.id,
        naam: item.naam,
        stad: item.stad,
        beschrijving: item.beschrijving,
        startDatum: item.startDatum.toISOString(),
        eindDatum: item.eindDatum.toISOString(),
        isIngeschreven: ingeschrevenKampIds.has(item.id),
      })),
    };
  }

  async getKampWithId(
    id: number,
    user?: { id?: number; roles?: string[] },
  ): Promise<KampResponseDto> {
    const kamp = await this.db.query.kampen.findFirst({
      where: eq(kampen.id, id),
      with: {
        leden: {
          with: {
            lid: {
              with: {
                persoon: true,
              },
            },
          },
        },
        leiding: {
          with: {
            leiding: {
              with: {
                persoon: true,
              },
            },
          },
        },
      },
    });

    if (!kamp) {
      throw new NotFoundException(`Kamp with ID ${id} not found`);
    }
    
    function isLid(user?: any) {
      return user?.roles?.includes('lid');
    }

    function isLeiding(user?: any) {
      return user?.roles?.includes('leiding') || user?.roles?.includes('hoofdleiding');
    }
    const magLeidingZien = isLid(user) || isLeiding(user);
    const magLedenZien = isLeiding(user);

    const isIngeschrevenAlsLid = isLid(user)
      ? kamp.leden.some((lk) => lk.lidId === user?.id)
      : false;
    const isIngeschrevenAlsLeiding = isLeiding(user)
      ? kamp.leiding.some((lk) => lk.leidingId === user?.id)
      : false;
    const isIngeschreven = isIngeschrevenAlsLid || isIngeschrevenAlsLeiding;

    return {
      id: kamp.id,
      naam: kamp.naam,
      stad: kamp.stad,
      beschrijving: kamp.beschrijving,
      startDatum: kamp.startDatum.toISOString(),
      eindDatum: kamp.eindDatum.toISOString(),
      isIngeschreven,

      leiding: magLeidingZien
        ? kamp.leiding.map((lk) => ({
            id: lk.leiding.persoon.id,
            voornaam: lk.leiding.persoon.voornaam,
            achternaam: lk.leiding.persoon.achternaam,
          }))
        : [],

      leden: magLedenZien
        ? kamp.leden.map((lk) => ({
            id: lk.lid.persoon.id,
            voornaam: lk.lid.persoon.voornaam,
            achternaam: lk.lid.persoon.achternaam,
          }))
        : [],
    };
  }

  async inschrijvenVoorKamp(
    id: number,
    user: { id: number; roles: string[] }
  ): Promise<InschrijvingResponseDto> {
    const kampId = id;
    const userId = user.id;

    if (user.roles.includes('lid')) {
        // Controleer of de inschrijving (lidKamp) al bestaat
        const existingInschrijving = await this.db.query.lidKamp.findFirst({
            where: and(eq(lidKamp.lidId, userId), eq(lidKamp.kampId, kampId)),
        });

        if (existingInschrijving) {
            // Als het al bestaat, gooi een Conflict exception
            throw new ConflictException('U bent al ingeschreven voor dit kamp.');
        }

        // Voeg inschrijving toe
        await this.db.insert(lidKamp).values({
            lidId: userId,
            kampId: kampId,
        });

    } else if (user.roles.includes('leiding') || user.roles.includes('hoofdleiding')) {
        // Controleer of de inschrijving (leidingKamp) al bestaat
        const existingInschrijving = await this.db.query.leidingKamp.findFirst({
            where: and(eq(leidingKamp.leidingId, userId), eq(leidingKamp.kampId, kampId)),
        });

        if (existingInschrijving) {
            throw new ConflictException('U bent al als leiding ingeschreven voor dit kamp.');
        }

        // Voeg inschrijving toe
        await this.db.insert(leidingKamp).values({
            leidingId: userId,
            kampId: kampId,
        });
    } else {
        throw new NotFoundException(`User with ID ${userId} does not have a valid role to inschrijven`);
    }

    // Retourneer DTO
    return {
        id: userId,
        kampid: kampId,
    };
  }

  async uitschrijvenVanKamp(
    id: number,
    user: { id: number; roles: string[] },
  ): Promise<void> {
    const kampId = id;
    const userId = user.id;

    let deleted = 0;

    if (user.roles.includes('lid')) {
      const [result] = await this.db
        .delete(lidKamp)
        .where(and(eq(lidKamp.lidId, userId), eq(lidKamp.kampId, kampId)));

      deleted += (result as any)?.affectedRows ?? 0;
    }

    if (user.roles.includes('leiding') || user.roles.includes('hoofdleiding')) {
      const [result] = await this.db
        .delete(leidingKamp)
        .where(and(eq(leidingKamp.leidingId, userId), eq(leidingKamp.kampId, kampId)));

      deleted += (result as any)?.affectedRows ?? 0;
    }

    if (deleted === 0) {
      throw new NotFoundException('U bent niet ingeschreven voor dit kamp.');
    }
  }

  async createKamp({naam, stad, startDatum, eindDatum, beschrijving}: CreateKampRequestDto): Promise<KampResponseDto> {
    const [nieuwKamp] = await this.db
      .insert(kampen)
      .values({
        naam,
        stad,
        startDatum: new Date(startDatum),
        eindDatum: new Date(eindDatum),
        beschrijving,
      })
      .$returningId();

    return this.getKampWithId(nieuwKamp.id);
}

  async updateKamp(id: number, data: CreateKampRequestDto): Promise<KampResponseDto> {
    await this.db
      .update(kampen)
      .set({
        naam: data.naam,
        stad: data.stad,
        beschrijving: data.beschrijving,
        startDatum: new Date(data.startDatum),
        eindDatum: new Date(data.eindDatum),
      })
      .where(eq(kampen.id, id));

    return this.getKampWithId(id);
  }

  async deleteKamp(id: number): Promise<void> {
    const [result] = await this.db.delete(kampen).where(eq(kampen.id, id));

    // For mysql2 driver the result contains affectedRows
    if ((result as any)?.affectedRows === 0) {
      throw new NotFoundException(`Kamp with ID ${id} not found`);
    }
  }
}
