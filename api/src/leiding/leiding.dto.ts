export class CreateLeidingDto {
  persoonId?: number;
  voornaam?: string;
  achternaam?: string;
  ageGroup: string;
  imageUrl: string;
  description: string;
  isHoofdleiding?: boolean;
}

export class UpdateLeidingDto {
  voornaam?: string;
  achternaam?: string;
  ageGroup?: string;
  imageUrl?: string;
  description?: string;
  isHoofdleiding?: boolean;
}

export class LeidingResponseDto {
  id: number;
  voornaam: string;
  achternaam: string;
  ageGroup: string;
  imageUrl: string;
  description: string;
  isHoofdleiding?: boolean;
}

export class LeidingListResponseDto {
   items: LeidingResponseDto[];
 }