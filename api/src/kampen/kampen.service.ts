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

  async createKamp(data: createKampRequestDTO): Promise<KampResponseDto> {
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

  async updateKamp(id: number, data: createKampRequestDTO): Promise<KampResponseDto> {
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
}
