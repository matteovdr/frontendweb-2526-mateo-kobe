import {
  IsString, IsNotEmpty, IsBoolean
} from 'class-validator';
export class CreateLeidingDto {
  @IsString()
  @IsNotEmpty()
  persoonId: number;

  @IsString()
  @IsNotEmpty()
  voornaam?: string;
  
  @IsString()
  @IsNotEmpty()
  achternaam?: string;
  
  @IsString()
  @IsNotEmpty()
  ageGroup: string;
  
  @IsString()
  imageUrl: string;
  
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  @IsNotEmpty()
  isHoofdleiding?: boolean;
}

export class UpdateLeidingDto {
  @IsString()
  @IsNotEmpty()
  voornaam?: string;
  
  @IsString()
  @IsNotEmpty()
  achternaam?: string;
  
  @IsString()
  @IsNotEmpty()
  ageGroup?: string;
  
  @IsString()
  imageUrl?: string;
  
  @IsString()
  @IsNotEmpty()
  description?: string;
  
  @IsBoolean()
  @IsNotEmpty()
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