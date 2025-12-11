import { Injectable, NotFoundException } from '@nestjs/common';
import { KampLeidingResponseDto, KampLidResponseDto, KampResponseDto, KampenListResponseDto, CreateKampRequestDto } from './kamp.dto';
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
        startDatum: item.startDatum,
        eindDatum: item.eindDatum,
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
      beschrijving: item.beschrijving,
      startDatum: item.startDatum,
      eindDatum: item.eindDatum,
    };
  }

  async createKamp(data: CreateKampRequestDto): Promise<KampResponseDto> {
    const [insertResult] = await this.db
      .insert(kampen)
      .values({
        naam: data.naam,
        stad: data.stad,
        beschrijving: data.beschrijving,
        startDatum: data.startDatum,
        eindDatum: data.eindDatum,
      })
      .$returningId();

    // insertResult may be an object containing the generated id
    const newId = insertResult?.id ?? (insertResult as any)?.insertId;
    return this.getKampWithId(Number(newId));
}

  async updateKamp(id: number, data: CreateKampRequestDto): Promise<KampResponseDto> {
    await this.db
      .update(kampen)
      .set({
        naam: data.naam,
        stad: data.stad,
        beschrijving: data.beschrijving,
        startDatum: data.startDatum,
        eindDatum: data.eindDatum,
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
