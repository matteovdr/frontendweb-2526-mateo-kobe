import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, IsDateString } from 'class-validator';

export class CreateKampRequestDto {
  @ApiProperty({
    example: 'Zomerkamp 2025',
    description: 'Naam van het kamp',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  naam: string;

  @ApiProperty({
    example: 'Gent',
    description: 'Stad waar het kamp doorgaat',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  stad: string;

  @ApiProperty({
    example: 'Een week vol activiteiten voor jongeren.',
    description: 'Korte beschrijving van het kamp',
  })
  @IsString()
  @MinLength(10)
  @MaxLength(1000)
  beschrijving: string;

  @ApiProperty({
    example: '2025-07-15',
    description: 'Startdatum van het kamp',
    type: String,
    format: 'date',
  })
  @IsDateString()
  startDatum: string;

  @ApiProperty({
    example: '2025-07-22',
    description: 'Einddatum van het kamp',
    type: String,
    format: 'date',
  })
  @IsDateString()
  eindDatum: string;
}

export class KampResponseDto extends CreateKampRequestDto {
  @ApiProperty({
    example: 1,
    description: 'Unieke ID van het kamp',
  })
  id: number;

  @ApiProperty({
    example: true,
    required: false,
    description: 'Geeft aan of de ingelogde gebruiker is ingeschreven voor dit kamp',
  })
  isIngeschreven?: boolean;

  @ApiProperty({
    description: 'Lijst van leden in dit kamp',
    type: () => KampLidResponseDto,
    isArray: true,
  })
  leden: KampLidResponseDto[];

  @ApiProperty({
    description: 'Lijst van leiding in dit kamp',
    type: () => KampLeidingResponseDto,
    isArray: true,
  })
  leiding: KampLeidingResponseDto[];
}

export class KampListItemDto {
  @ApiProperty({
    example: 1,
    description: 'Unieke ID van het kamp',
  })
  id: number;

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

  @ApiProperty({
    example: false,
    required: false,
    description: 'Geeft aan of de ingelogde gebruiker al is ingeschreven',
  })
  isIngeschreven?: boolean;
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
  @ApiProperty({
    example: 1,
    description: 'Unieke ID van de inschrijving',
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: 'ID van het kamp',
  })
  kampid: number;
}