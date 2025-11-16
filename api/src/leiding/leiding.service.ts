import { Injectable, NotFoundException } from '@nestjs/common';
import {
    CreateLeidingDto,
    UpdateLeidingDto,
    LeidingResponseDto,
    LeidingListResponseDto,
} from './leiding.dto';
import {
    type DatabaseProvider,
    InjectDrizzle,
} from  '../drizzle/drizzle.provider';
@Injectable()
import { eq } from 'drizzle-orm';
import { leiding } from '../drizzle/schema';

@Injectable()
export class LeidingService {
  constructor(
    @InjectDrizzle()
    private readonly db: DatabaseProvider,
  ) {}

  async getAll(): Promise<LeidingListResponseDto> {
    const items = await this.db.query.leiding.findMany({
      columns: {
        id: true,
        name: true,
        ageGroup: true,
        imageUrl: true,
        description: true,
      },
    });

    return { items };
  }

  async getById(id: number): Promise<LeidingResponseDto> {
    const item = await this.db.query.leiding.findFirst({
      columns: {
        id: true,
        name: true,
        ageGroup: true,
        imageUrl: true,
        description: true,
      },
      where: eq(leiding.id, id),
    });

    if (!item) {
      throw new NotFoundException('Geen leiding gevonden met dit ID');
    }

    return item;
  }

  async create(dto: CreateLeidingDto): Promise<LeidingResponseDto> {
    const [newLeiding] = await this.db
      .insert(leiding)
      .values({
        ...dto,
      })
      .$returningId();

    return this.getById(newLeiding.id);
  }

  async updateById(
    id: number,
    dto: UpdateLeidingDto,
  ): Promise<LeidingResponseDto> {
    const { name, ageGroup, imageUrl, description } = dto;

    await this.db
      .update(leiding)
      .set({ name, ageGroup, imageUrl, description })
      .where(eq(leiding.id, id));

    return this.getById(id);
  }

  async deleteById(id: number): Promise<void> {
    const [result] = await this.db.delete(leiding).where(eq(leiding.id, id));

    if (result.affectedRows === 0) {
      throw new NotFoundException('Geen leiding gevonden met dit ID');
    }
  }
}
