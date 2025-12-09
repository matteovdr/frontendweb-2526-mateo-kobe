import { Expose } from 'class-transformer';
import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsDate,
  IsArray,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PublicPersoonResponseDto {
  @Expose()
  @ApiProperty({ example: 1, description: 'Unieke ID van de persoon' })
  id: number;

  @Expose()
  @ApiProperty({ example: 'Jan', description: 'Voornaam van de persoon' })
  voornaam: string;

  @Expose()
  @ApiProperty({ example: 'Peeters', description: 'Achternaam van de persoon' })
  achternaam: string;

  @Expose()
  @ApiProperty({
    example: 'jan.peeters@example.com',
    description: 'E-mailadres van de persoon',
  })
  email: string;

  @Expose()
  @ApiProperty({
    example: ['USER', 'ADMIN'],
    description: 'Rollen van de persoon',
    isArray: true,
    type: String,
  })
  roles: string[];
}

export class CreatePersoonDto {
  @ApiProperty({
    example: 'Jan',
    description: 'Voornaam van de persoon',
    minLength: 2,
    maxLength: 255,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  voornaam: string;

  @ApiProperty({
    example: 'Peeters',
    description: 'Achternaam van de persoon',
    minLength: 2,
    maxLength: 255,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  achternaam: string;

  @ApiProperty({
    example: '1990-01-01',
    description: 'Geboortedatum van de persoon',
    type: String,
    format: 'date',
  })
  @Type(() => Date)
  @IsDate()
  geboorteDatum: Date;

  @ApiProperty({
    example: '+32470123456',
    description: 'Telefoonnummer van de persoon',
    required: false,
  })
  @IsString()
  telefoon?: string;

  @ApiProperty({
    example: 'jan.peeters@example.com',
    description: 'E-mailadres van de persoon',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'SterkPasswoord123!',
    description: 'Wachtwoord (plaintext, wordt gehashed op de server)',
    minLength: 8,
    maxLength: 128,
  })
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  passwordHash: string;

  @ApiProperty({
    example: ['USER'],
    description: 'Optionele rollen voor de persoon',
    required: false,
    isArray: true,
    type: String,
  })
  @IsArray()
  roles?: string[];
}

export class UpdatePersoonDto {
  @ApiProperty({
    example: 'Jan',
    description: 'Voornaam van de persoon',
    required: false,
    minLength: 2,
    maxLength: 255,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  voornaam?: string;

  @ApiProperty({
    example: 'Peeters',
    description: 'Achternaam van de persoon',
    required: false,
    minLength: 2,
    maxLength: 255,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  achternaam?: string;

  @ApiProperty({
    example: '1990-01-01',
    description: 'Geboortedatum van de persoon',
    required: false,
    type: String,
    format: 'date',
  })
  @Type(() => Date)
  @IsDate()
  geboorteDatum?: Date;

  @ApiProperty({
    example: '+32470123456',
    description: 'Telefoonnummer van de persoon',
    required: false,
  })
  @IsString()
  telefoon?: string;

  @ApiProperty({
    example: 'jan.peeters@example.com',
    description: 'E-mailadres van de persoon',
    required: false,
  })
  @IsString()
  @IsEmail()
  email?: string;

  @ApiProperty({
    example: ['USER', 'ADMIN'],
    description: 'Rollen van de persoon',
    required: false,
    isArray: true,
    type: String,
  })
  @IsArray()
  roles?: string[];
}

export class RegisterPersoonRequestDto {
  @ApiProperty({
    example: 'Jan',
    description: 'Voornaam van de persoon',
    minLength: 2,
    maxLength: 255,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  voornaam: string;

  @ApiProperty({
    example: 'Peeters',
    description: 'Achternaam van de persoon',
    minLength: 2,
    maxLength: 255,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  achternaam: string;

  @ApiProperty({
    example: 'jan.peeters@example.com',
    description: 'E-mailadres van de persoon',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '+32470123456',
    description: 'Telefoonnummer van de persoon',
    minLength: 4,
    maxLength: 20,
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  telefoon: string;

  @ApiProperty({
    example: '1990-01-01',
    description: 'Geboortedatum (ISO string)',
    type: String,
    format: 'date',
  })
  @IsDateString()
  geboorteDatum: string;

  @ApiProperty({
    example: 'SterkPasswoord123!',
    description: 'Wachtwoord van de gebruiker',
    minLength: 8,
    maxLength: 128,
  })
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password: string;
}

export class LoginRequestDto {
  @ApiProperty({
    example: 'jan.peeters@example.com',
    description: 'E-mailadres van de gebruiker',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'SterkPasswoord123!',
    description: 'Wachtwoord van de gebruiker',
    minLength: 8,
    maxLength: 128,
  })
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password: string;
}

export class PersoonListResponseDto {
  @ApiProperty({
    description: 'Lijst van personen',
    type: PublicPersoonResponseDto,
    isArray: true,
  })
  items: PublicPersoonResponseDto[];
}
