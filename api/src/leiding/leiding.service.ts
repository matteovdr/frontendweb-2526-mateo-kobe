import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import {
  CreateLeidingDto,
  UpdateLeidingDto,
  LeidingResponseDto,
  LeidingListResponseDto,
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

    const order = ['Sloebers', 'Paggaders', 'Joro\u2019s', 'Knimmers', 'Sjo\u2019ers', '+16'];
    const rank = (g: string) => {
      const i = order.indexOf(g);
      return i === -1 ? order.length : i;
    };
    items.sort(
      (a, b) =>
        rank(a.ageGroup) - rank(b.ageGroup) ||
        (a.persoon?.voornaam ?? '').localeCompare(b.persoon?.voornaam ?? ''),
    );

    return {
      items: items.map((item) => ({
        id: item.persoon?.id ?? item.persoonId,
        voornaam: item.persoon?.voornaam ?? '',
        achternaam: item.persoon?.achternaam ?? '',
        ageGroup: item.ageGroup,
        imageUrl: item.imageUrl,
        description: item.beschrijving,
        isHoofdleiding: item.isHoofdleiding,
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
      voornaam: item.persoon?.voornaam ?? '',
      achternaam: item.persoon?.achternaam ?? '',
      ageGroup: item.ageGroup,
      imageUrl: item.imageUrl,
      description: item.beschrijving,
      isHoofdleiding: item.isHoofdleiding,
    } as LeidingResponseDto;
  }

  async create(dto: CreateLeidingDto): Promise<LeidingResponseDto> {
    const {
      persoonId,
      voornaam,
      achternaam,
      ageGroup,
      imageUrl,
      description,
      isHoofdleiding,
    } = dto;

    let id = persoonId;

    if (id) {
      // Bestaande persoon gebruiken
      const person = await this.db.query.persoon.findFirst({
        where: eq(persoon.id, id),
      });
      if (!person) {
        throw new NotFoundException(`Persoon met ID ${id} niet gevonden`);
      }
    } else {
      // Nieuwe persoon aanmaken uit voornaam en achternaam
      if (!voornaam?.trim() || !achternaam?.trim()) {
        throw new BadRequestException(
          'voornaam en achternaam zijn verplicht (of geef een bestaande persoonId mee)',
        );
      }

      const [result] = await this.db.insert(persoon).values({
        voornaam: voornaam.trim(),
        achternaam: achternaam.trim(),
        geboorteDatum: new Date('2000-01-01'),
        email: `leiding.${randomUUID().slice(0, 8)}@ksa-hillegem.local`,
        passwordHash: `nologin-${randomUUID()}`,
        roles: ['USER'],
      });
      id = Number(result.insertId);
    }

    await this.db.insert(leiding).values({
      persoonId: id,
      ageGroup: ageGroup,
      imageUrl: imageUrl,
      beschrijving: description,
      isHoofdleiding: isHoofdleiding ?? false,
    });

    return this.getById(id);
  }

  async updateById(
    id: number,
    dto: UpdateLeidingDto,
  ): Promise<LeidingResponseDto> {
    await this.getById(id); // gooit 404 als de leiding niet bestaat

    const { ageGroup, imageUrl, description, isHoofdleiding, voornaam, achternaam } = dto;

    const leidingFields: Record<string, unknown> = {};
    if (ageGroup !== undefined) leidingFields.ageGroup = ageGroup;
    if (imageUrl !== undefined) leidingFields.imageUrl = imageUrl;
    if (description !== undefined) leidingFields.beschrijving = description;
    if (isHoofdleiding !== undefined) leidingFields.isHoofdleiding = isHoofdleiding;

    if (Object.keys(leidingFields).length > 0) {
      await this.db
        .update(leiding)
        .set(leidingFields)
        .where(eq(leiding.persoonId, id));
    }

    const persoonFields: Record<string, unknown> = {};
    if (voornaam !== undefined) persoonFields.voornaam = voornaam;
    if (achternaam !== undefined) persoonFields.achternaam = achternaam;

    if (Object.keys(persoonFields).length > 0) {
      await this.db
        .update(persoon)
        .set(persoonFields)
        .where(eq(persoon.id, id));
    }

    return this.getById(id);
  }

  async deleteById(id: number): Promise<void> {
    await this.db.delete(leiding).where(eq(leiding.persoonId, id));
  }
}
