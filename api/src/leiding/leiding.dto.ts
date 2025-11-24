export class CreateLeidingDto {
  name: string;
  ageGroup: string;
  imageUrl: string;
  description: string;
  isHoofdleiding: boolean;
}

export class UpdateLeidingDto {
  name?: string;
  ageGroup?: string;
  imageUrl?: string;
  description?: string;
  isHoofdleiding: boolean;
}

export class LeidingResponseDto {
  id: number;
  name: string;
  ageGroup: string;
  imageUrl: string;
  description: string;
  isHoofdleiding: boolean;
}

export class LeidingListResponseDto {
   items: LeidingResponseDto[];
 }
