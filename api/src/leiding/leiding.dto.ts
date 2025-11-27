export class CreateLeidingDto {
  persoonId?: number;
  name?: string; // if persoonId not provided user may supply name, but DB requires a persoon entry; for now, prefer persoonId
  ageGroup: string;
  imageUrl: string;
  description: string;
  isHoofdleiding?: boolean;
}

export class UpdateLeidingDto {
  name?: string;
  ageGroup?: string;
  imageUrl?: string;
  description?: string;
  isHoofdleiding?: boolean;
}

export class LeidingResponseDto {
  id: number;
  name: string;
  ageGroup: string;
  imageUrl: string;
  description: string;
  isHoofdleiding?: boolean;
}

export class LeidingListResponseDto {
   items: LeidingResponseDto[];
 }