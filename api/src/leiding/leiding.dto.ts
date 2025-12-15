import { ApiProperty } from '@nestjs/swagger';

export class CreateLeidingDto {
  @ApiProperty({
    example: 1,
    description: 'Optioneel ID van de gekoppelde persoon',
    required: false,
    nullable: true,
  })
  persoonId?: number;

  @ApiProperty({
    example: 'Emma',
    description: 'Voornaam van de leiding',
    required: false,
  })
  voornaam?: string;

  @ApiProperty({
    example: 'Vermeulen',
    description: 'Achternaam van de leiding',
    required: false,
  })
  achternaam?: string;

  @ApiProperty({
    example: '18+',
    description: 'Leeftijdsgroep van de leiding',
  })
  ageGroup: string;

  @ApiProperty({
    example: 'https://example.com/images/leiding-emma.jpg',
    description: 'URL naar de profielfoto van de leiding',
  })
  imageUrl: string;

  @ApiProperty({
    example: 'Ervaren monitor met focus op sportactiviteiten.',
    description: 'Korte beschrijving van de leiding',
  })
  description: string;

  @ApiProperty({
    example: true,
    description: 'Of deze leiding hoofdleiding is',
    required: false,
  })
  isHoofdleiding?: boolean;
}

export class UpdateLeidingDto {
  @ApiProperty({
    example: 'Emma',
    description: 'Voornaam van de leiding',
    required: false,
  })
  voornaam?: string;

  @ApiProperty({
    example: 'Vermeulen',
    description: 'Achternaam van de leiding',
    required: false,
  })
  achternaam?: string;

  @ApiProperty({
    example: '18+',
    description: 'Leeftijdsgroep van de leiding',
    required: false,
  })
  ageGroup?: string;

  @ApiProperty({
    example: 'https://example.com/images/leiding-emma.jpg',
    description: 'URL naar de profielfoto van de leiding',
    required: false,
  })
  imageUrl?: string;

  @ApiProperty({
    example: 'Ervaren monitor met focus op sportactiviteiten.',
    description: 'Korte beschrijving van de leiding',
    required: false,
  })
  description?: string;

  @ApiProperty({
    example: true,
    description: 'Of deze leiding hoofdleiding is',
    required: false,
  })
  isHoofdleiding?: boolean;
}

export class LeidingResponseDto {
  @ApiProperty({
    example: 1,
    description: 'Unieke ID van de leiding',
  })
  id: number;

  @ApiProperty({
    example: 'liam',
    description: 'Voornaam van de leiding',
  })
  voornaam: string;

  @ApiProperty({
    example: 'Van de walle',
    description: 'Achternaam van de leiding',
  })
  achternaam: string;

  @ApiProperty({
    example: '18+',
    description: 'Leeftijdsgroep van de leiding',
  })
  ageGroup: string;

  @ApiProperty({
    example: '/src/images/liam.png',
    description: 'URL naar de profielfoto van de leiding',
  })
  imageUrl: string;

  @ApiProperty({
    example: 'Ervaren monitor met focus op sportactiviteiten.',
    description: 'Korte beschrijving van de leiding',
  })
  description: string;

  @ApiProperty({
    example: true,
    description: 'Of deze leiding hoofdleiding is',
    required: false,
  })
  isHoofdleiding?: boolean;
}

export class LeidingListResponseDto {
  @ApiProperty({
    description: 'Lijst van leiding',
    type: () => LeidingResponseDto,
    isArray: true,
  })
  items: LeidingResponseDto[];
}
