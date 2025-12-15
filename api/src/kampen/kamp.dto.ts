import {
  IsString,
  IsDateString,
  MaxLength,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

export class createKampRequestDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(40)
  naam: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(20)
  stad: string;

  @IsDateString()
  @IsNotEmpty()
  startDatum: string;

  @IsDateString()
  @IsNotEmpty()
  eindDatum: string;
  
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(1000)
  beschrijving: string;
}

export class KampResponseDto extends createKampRequestDTO {
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
  items: KampListItemDto[];
}

export class KampLidResponseDto {
  id: number;
  voornaam: string;
  achternaam: string;
}
export class KampLeidingResponseDto {
  id: number;
  voornaam: string;
  achternaam: string;
}
