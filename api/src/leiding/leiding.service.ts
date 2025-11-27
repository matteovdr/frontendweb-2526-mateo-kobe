import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateLeidingDto,
  UpdateLeidingDto,
  LeidingResponseDto,
  LeidingListResponseDto
} from './leiding.dto';
import {
  type DatabaseProvider,
  InjectDrizzle,
} from '../drizzle/drizzle.provider';
import { eq } from 'drizzle-orm';
import { leiding, persoon } from '../drizzle/schema';

@Injectable()
  export class LeidingService {
    constructor(
      @InjectDrizzle()
      private readonly db: DatabaseProvider,
    ) {}

    async getAll(): Promise<LeidingListResponseDto> {
      const items = await this.db.query.leiding.findMany({
        with: { persoon: true },
      });

      return {
        items: items.map((item) => ({
          id: item.persoon?.id ?? item.persoonId,
          name: `${item.persoon?.voornaam ?? ''} ${item.persoon?.achternaam ?? ''}`.trim(),
          ageGroup: item.ageGroup,
          imageUrl: item.imageUrl,
          description: item.beschrijving,
          isHoofdleiding: false,
        })) as LeidingResponseDto[],
      };
    }

    async getById(id: number): Promise<LeidingResponseDto> {
      const item = await this.db.query.leiding.findFirst({
        with: { persoon: true },
        where: eq(leiding.persoonId, id),
      });

      if (!item) {
        throw new NotFoundException('Geen leiding gevonden met dit ID');
      }

      return {
        id: item.persoon?.id ?? item.persoonId,
        name: item.persoon ? `${item.persoon.voornaam} ${item.persoon.achternaam}` : '',
        ageGroup: item.ageGroup,
        imageUrl: item.imageUrl,
        description: item.beschrijving,
        isHoofdleiding: false,
      } as LeidingResponseDto;
    }

    async updateById(
      id: number,
      dto: UpdateLeidingDto,
    ): Promise<LeidingResponseDto> {
      const { name, ageGroup, imageUrl, description } = dto;

      // Update leiding table columns (map description -> beschrijving)
      await this.db
        .update(leiding)
        .set({
          ageGroup: ageGroup,
          imageUrl: imageUrl,
          beschrijving: description,
        })
        .where(eq(leiding.persoonId, id));

      // If name provided, update the persoon table
      if (name) {
        const [firstName, ...lastParts] = name.split(' ');
        const lastName = lastParts.join(' ') || '';
        await this.db
          .update(persoon)
          .set({ voornaam: firstName ?? '', achternaam: lastName })
          .where(eq(persoon.id, id));
      }

      return this.getById(id);
    }

    async create(dto: CreateLeidingDto): Promise<LeidingResponseDto> {
      const { persoonId, name, ageGroup, imageUrl, description } = dto;

      // If persoonId supplied, validate it exists
      if (persoonId) {
        const person = await this.db.query.persoon.findFirst({ where: eq(persoon.id, persoonId) });
        if (!person) throw new NotFoundException(`Persoon with ID ${persoonId} not found`);
      }

      // For now, require persoonId
      if (!persoonId) {
        throw new NotFoundException('Creating a leiding without a persoonId is not supported yet. Please use an existing persoonId.');
      }

      await this.db.insert(leiding).values({
        persoonId: persoonId,
        ageGroup: ageGroup,
        imageUrl: imageUrl,
        beschrijving: description,
      });

      return this.getById(persoonId);
    }

    async deleteById(id: number): Promise<void> {
    await this.db
      .delete(leiding)
      .where(eq(leiding.persoonId, id));
  }
}