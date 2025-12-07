import { Expose } from 'class-transformer';
import {
  IsString,
  IsEmail, MinLength,
  MaxLength,
  IsDate,
  IsArray,
  IsDateString
} from 'class-validator';
import { Type } from 'class-transformer';

export class PublicPersoonResponseDto {
  @Expose()
  id: number;

  @Expose()
  voornaam: string;

  @Expose()
  achternaam: string;

  @Expose()
  email: string;

  @Expose()
  roles: string[];
}

export class CreatePersoonDto {
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  voornaam: string;

  @IsString()
  @MinLength(2)
  @MaxLength(255)
  achternaam: string;

  @Type(() => Date)
  @IsDate()
  geboorteDatum: Date;


  @IsString()
  telefoon?: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  passwordHash: string;


  @IsArray()
  roles?: string[];
}

export class UpdatePersoonDto {

  @IsString()
  @MinLength(2)
  @MaxLength(255)
  voornaam?: string;


  @IsString()
  @MinLength(2)
  @MaxLength(255)
  achternaam?: string;

  @Type(() => Date)
  @IsDate()
  geboorteDatum?: Date;


  @IsString()
  telefoon?: string;


  @IsString()
  @IsEmail()
  email?: string;

  @IsArray()
  roles?: string[];
}

export class RegisterPersoonRequestDto {
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  voornaam: string;

  @IsString()
  @MinLength(2)
  @MaxLength(255)
  achternaam: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  telefoon: string;

  //   @Type(() => Date)
  // @IsDate()
@IsDateString()
  geboorteDatum: string;

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password: string;
}
export class LoginRequestDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password: string;
}

export class PersoonListResponseDto {
  items: PublicPersoonResponseDto[];
}
