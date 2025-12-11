import {
  IsString,
  IsDateString,
  MaxLength,
  MinLength
} from 'class-validator';

export class createKampRequestDTO {
  @IsString()
  @MinLength(1)
  @MaxLength(40)
  naam: string;

  @IsString()
  @MinLength(1)
  @MaxLength(20)
  stad: string;

  @IsDateString()
  startDatum: string;

  @IsDateString()
  eindDatum: string;
  
  @IsString()
  @MinLength(1)
  @MaxLength(1000)
  beschrijving: string;
}

export class KampResponseDto extends createKampRequestDTO {
  @IsString()
  id: number;
}

export class KampenListResponseDto {
  items: KampResponseDto[];
}
export class KampLidResponseDto {
  id: number;
  voornaam: string;
  achternaam: string;
  ageGroup: string;
}
export class KampLeidingResponseDto {
  id: number;
  voornaam: string;
  achternaam: string;
  ageGroup: string;
}
