import { ApiProperty } from '@nestjs/swagger';

export class CreateKampRequestDto {
  @ApiProperty({
    example: 'Zomerkamp 2025',
    description: 'Naam van het kamp',
  })
  naam: string;

  @ApiProperty({
    example: 'Gent',
    description: 'Stad waar het kamp doorgaat',
  })
  stad: string;

  @ApiProperty({
    example: 'Een week vol activiteiten voor jongeren.',
    description: 'Korte beschrijving van het kamp',
  })
  beschrijving: string;

  @ApiProperty({
    example: '2025-07-15',
    description: 'Startdatum van het kamp',
    type: String,
    format: 'date',
  })
  startDatum: string;

  @ApiProperty({
    example: '2025-07-22',
    description: 'Einddatum van het kamp',
    type: String,
    format: 'date',
  })
  eindDatum: string;
}

export class KampResponseDto extends CreateKampRequestDto {
  @ApiProperty({
    example: 1,
    description: 'Unieke ID van het kamp',
  })
  id: number;

  leden: KampLidResponseDto[];
  leiding: KampLeidingResponseDto[];
}

export class KampListItemDto {
  id: number;
  naam: string;
  stad: string;
  startDatum: string;
  eindDatum: string;
}

export class KampenListResponseDto {
  @ApiProperty({
    description: 'Lijst van kampen',
    type: () => KampListItemDto,
    isArray: true,
  })
  items: KampListItemDto[];
}

export class KampLidResponseDto {
  @ApiProperty({
    example: 1,
    description: 'Unieke ID van het kamp-lid',
  })
  id: number;

  @ApiProperty({
    example: 'Lars',
    description: 'Voornaam van het kamp-lid',
  })
  voornaam: string;

  @ApiProperty({
    example: 'Janssens',
    description: 'Achternaam van het kamp-lid',
  })
  achternaam: string;
}

export class KampLeidingResponseDto {
  @ApiProperty({
    example: 1,
    description: 'Unieke ID van de leiding',
  })
  id: number;

  @ApiProperty({
    example: 'Emma',
    description: 'Voornaam van de leiding',
  })
  voornaam: string;

  @ApiProperty({
    example: 'Vermeulen',
    description: 'Achternaam van de leiding',
  })
  achternaam: string;
}

export class InschrijvingResponseDto {
  id: number;
  kampid: number;
}