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
  @IsString()
  @IsNotEmpty()
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
