import { Injectable } from '@nestjs/common';
import {
    //   createKampRequestDTO,
    KampenListResponseDto,
    //   KampResponseDto,
} from './kamp.dto';
import {
    InjectDrizzle,
    type DatabaseProvider,
} from '../drizzle/drizzle.provider';
@Injectable()
export class KampenService {
  constructor(
    @InjectDrizzle()
    private readonly db: DatabaseProvider,
  ) {}
  async getAll(): Promise<KampenListResponseDto> {
    const items = await this.db.query.kampen.findMany();

    const formatted = items.map((item) => ({
      id: item.id,
      naam: item.naam,
      locatie: item.stad,
      startDatum: item.startDatum,
      eindDatum: item.eindDatum,
    }));
    return { items: formatted };
  }
}
