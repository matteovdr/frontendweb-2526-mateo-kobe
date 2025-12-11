// src/persoon/persoon.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  PublicPersoonResponseDto,
  PersoonListResponseDto,
  CreatePersoonDto,
  UpdatePersoonDto,
} from './persoon.dto';
import {
  type DatabaseProvider,
  InjectDrizzle,
} from '../drizzle/drizzle.provider';
import { eq } from 'drizzle-orm';
import { persoon } from '../drizzle/schema';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PersoonService {
  constructor(
    @InjectDrizzle()
    private readonly db: DatabaseProvider,
  ) {}

  // Alle personen
  async getAll(): Promise<PersoonListResponseDto> {
    const personenList = await this.db.query.persoon.findMany();

    const items = personenList.map((p) => {
      // Zorg dat roles een echte array is (MySQL JSON kan stringified komen)
      if (p.roles && typeof p.roles === 'string') {
        p.roles = JSON.parse(p.roles);
      }
      return plainToInstance(PublicPersoonResponseDto, p, {
        excludeExtraneousValues: true,
      });
    });

    return { items };
  }

  // Eén persoon op id
  async getById(id: number): Promise<PublicPersoonResponseDto> {
    const item = await this.db.query.persoon.findFirst({
      where: eq(persoon.id, id),
    });

    if (!item) {
      throw new NotFoundException('Geen persoon gevonden met dit ID');
    }

    // Zorg dat roles een echte array is (MySQL JSON kan stringified komen)
    if (item.roles && typeof item.roles === 'string') {
      item.roles = JSON.parse(item.roles);
    }

    return plainToInstance(PublicPersoonResponseDto, item, {
      excludeExtraneousValues: true,
    });
  }

  // Aanmaken
  async create(dto: CreatePersoonDto): Promise<PublicPersoonResponseDto> {
    const [result] = await this.db
      .insert(persoon)
      .values({
        voornaam: dto.voornaam,
        achternaam: dto.achternaam,
        geboorteDatum: dto.geboorteDatum,
        telefoon: dto.telefoon,
        email: dto.email,
        passwordHash: dto.passwordHash,
        roles: dto.roles ?? ['leiding'],
      });

    const insertId = (result as any).insertId as number;

    const created = await this.db.query.persoon.findFirst({
      where: eq(persoon.id, insertId),
    });

    if (!created) {
      throw new NotFoundException('Aangemaakte persoon niet gevonden');
    }

    return plainToInstance(PublicPersoonResponseDto, created, {
      excludeExtraneousValues: true,
    });
  }

  // Updaten
  async updateById(
    id: number,
    dto: UpdatePersoonDto,
  ): Promise<PublicPersoonResponseDto> {
    const [result] = await this.db
      .update(persoon)
      .set({
        voornaam: dto.voornaam,
        achternaam: dto.achternaam,
        geboorteDatum: dto.geboorteDatum,
        telefoon: dto.telefoon,
        email: dto.email,
        // roles alleen als je dat in UpdatePersoonDto toelaat
      })
      .where(eq(persoon.id, id));

    if (result.affectedRows === 0) {
      throw new NotFoundException('Geen persoon gevonden met dit ID');
    }

    return this.getById(id);
  }

  // Verwijderen
  async deleteById(id: number): Promise<void> {
    await this.db.delete(persoon).where(eq(persoon.id, id));
  }
}
