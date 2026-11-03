import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateLeidingDto {
  @ApiProperty({ example: 1, description: 'Optioneel ID van de gekoppelde persoon', required: false, nullable: true })
  @IsOptional()
  @IsInt()
  persoonId?: number;

  @ApiProperty({ example: 'Emma', description: 'Voornaam van de leiding', required: false })
  @IsOptional()
  @IsString()
  voornaam?: string;

  @ApiProperty({ example: 'Vermeulen', description: 'Achternaam van de leiding', required: false })
  @IsOptional()
  @IsString()
  achternaam?: string;

  @ApiProperty({ example: '18+', description: 'Leeftijdsgroep van de leiding' })
  @IsString()
  ageGroup: string;

  @ApiProperty({ example: 'https://example.com/images/leiding-emma.jpg', description: 'URL naar de profielfoto van de leiding' })
  @IsString()
  imageUrl: string;

  @ApiProperty({ example: 'Ervaren monitor met focus op sportactiviteiten.', description: 'Korte beschrijving van de leiding' })
  @IsString()
  description: string;

  @ApiProperty({ example: true, description: 'Of deze leiding hoofdleiding is', required: false })
  @IsOptional()
  @IsBoolean()
  isHoofdleiding?: boolean;
}

export class UpdateLeidingDto {
  @ApiProperty({ example: 'Emma', description: 'Voornaam van de leiding', required: false })
  @IsOptional()
  @IsString()
  voornaam?: string;

  @ApiProperty({ example: 'Vermeulen', description: 'Achternaam van de leiding', required: false })
  @IsOptional()
  @IsString()
  achternaam?: string;

  @ApiProperty({ example: '18+', description: 'Leeftijdsgroep van de leiding', required: false })
  @IsOptional()
  @IsString()
  ageGroup?: string;

  @ApiProperty({ example: 'https://example.com/images/leiding-emma.jpg', description: 'URL naar de profielfoto van de leiding', required: false })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({ example: 'Ervaren monitor met focus op sportactiviteiten.', description: 'Korte beschrijving van de leiding', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: true, description: 'Of deze leiding hoofdleiding is', required: false })
  @IsOptional()
  @IsBoolean()
  isHoofdleiding?: boolean;
}

export class LeidingResponseDto {
  @ApiProperty({ example: 1, description: 'Unieke ID van de leiding' })
  id: number;

  @ApiProperty({ example: 'liam', description: 'Voornaam van de leiding' })
  voornaam: string;

  @ApiProperty({ example: 'Van de walle', description: 'Achternaam van de leiding' })
  achternaam: string;

  @ApiProperty({ example: '18+', description: 'Leeftijdsgroep van de leiding' })
  ageGroup: string;

  @ApiProperty({ example: '/src/images/liam.png', description: 'URL naar de profielfoto van de leiding' })
  imageUrl: string;

  @ApiProperty({ example: 'Ervaren monitor met focus op sportactiviteiten.', description: 'Korte beschrijving van de leiding' })
  description: string;

  @ApiProperty({ example: true, description: 'Of deze leiding hoofdleiding is', required: false })
  isHoofdleiding?: boolean;
}

export class LeidingListResponseDto {
  @ApiProperty({ description: 'Lijst van leiding', type: () => LeidingResponseDto, isArray: true })
  items: LeidingResponseDto[];
}
