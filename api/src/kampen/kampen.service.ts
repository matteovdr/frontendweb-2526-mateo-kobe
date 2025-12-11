import { Injectable, NotFoundException } from '@nestjs/common';
import { KampLeidingResponseDto, KampLidResponseDto, KampResponseDto, KampenListResponseDto, createKampRequestDTO } from './kamp.dto';
import { InjectDrizzle, type DatabaseProvider } from '../drizzle/drizzle.provider';
import { eq } from 'drizzle-orm';
import { kampen, leiding, leidingKamp, lid, lidKamp, persoon } from '../drizzle/schema';

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

  async getKampWithId(id: number): Promise<KampResponseDto> {
    const item = await this.db.query.kampen.findFirst({
      where: eq(kampen.id, id),
    });
    if (!item) throw new NotFoundException(`Kamp with ID ${id} not found`);
    return {
      id: item.id,
      naam: item.naam,
      stad: item.stad,
      startDatum: new Date(item.startDatum).toISOString(),
      eindDatum: new Date(item.eindDatum).toISOString(),
      beschrijving: item.beschrijving,
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


async getLedenVanKamp(kampId: number): Promise<KampLidResponseDto[]> {
  const rows = await this.db
    .select({
      lidId: lid.persoonId,
      voornaam: persoon.voornaam,
      achternaam: persoon.achternaam,
      ageGroup: lid.ageGroup,
    })
    .from(lidKamp)
    .innerJoin(lid, eq(lidKamp.lidId, lid.persoonId))
    .innerJoin(persoon, eq(lid.persoonId, persoon.id))
    .where(eq(lidKamp.kampId, kampId));

  return rows.map((row) => ({
    id: row.lidId,
    voornaam: row.voornaam,
    achternaam: row.achternaam,
    ageGroup: row.ageGroup,
  }));
}
async getLeidingVanKamp(kampId: number): Promise<KampLeidingResponseDto[]> {
  const rows = await this.db
    .select({
      leidingId: leiding.persoonId,
      voornaam: persoon.voornaam,
      achternaam: persoon.achternaam,
      ageGroup: leiding.ageGroup,
    })
    .from(leidingKamp)
    .innerJoin(leiding, eq(leidingKamp.leidingId, leiding.persoonId))
    .innerJoin(persoon, eq(leiding.persoonId, persoon.id))
    .where(eq(leidingKamp.kampId, kampId));

  return rows.map((row) => ({
    id: row.leidingId,
    voornaam: row.voornaam,
    achternaam: row.achternaam,
    ageGroup: row.ageGroup,
  }));
}


}
