import { Injectable, NotFoundException } from '@nestjs/common';
import { KampResponseDto, KampenListResponseDto, createKampRequestDTO } from './kamp.dto';
import { InjectDrizzle, type DatabaseProvider } from '../drizzle/drizzle.provider';
import { eq } from 'drizzle-orm';
import { kampen } from '../drizzle/schema';
@Injectable()
export class KampenService {
  constructor(
    @InjectDrizzle()
    private readonly db: DatabaseProvider,
  ) {}

  async getAll(): Promise<KampenListResponseDto> {
    const items = await this.db.query.kampen.findMany();
    return {
      items: items.map((item) => ({
        id: item.id,
        naam: item.naam,
        stad: item.stad,
        beschrijving: item.beschrijving,
        startDatum: item.startDatum.toISOString(),
        eindDatum: item.eindDatum.toISOString(),
      })),
    };
  }

  async getKampWithId(
    id: number,
    user?: { roles: string[] },
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
      // 🔥🔥 TIJDELIJKE DEBUG LOG 🔥🔥
      console.log(user);
      // 🔥🔥 EINDE LOG 🔥🔥
      return user?.roles?.includes('lid');
    }

    function isLeiding(user?: any) {
      return user?.roles?.includes('leiding') || user?.roles?.includes('hoofdleiding');
    }
    const magLeidingZien = isLid(user) || isLeiding(user);
    const magLedenZien = isLeiding(user);

    return {
      id: kamp.id,
      naam: kamp.naam,
      stad: kamp.stad,
      beschrijving: kamp.beschrijving,
      startDatum: kamp.startDatum.toISOString(),
      eindDatum: kamp.eindDatum.toISOString(),

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

  async createKamp({naam, stad, startDatum, eindDatum, beschrijving}: createKampRequestDTO): Promise<KampResponseDto> {
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

  async updateKamp(id: number, data: createKampRequestDTO): Promise<KampResponseDto> {
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
