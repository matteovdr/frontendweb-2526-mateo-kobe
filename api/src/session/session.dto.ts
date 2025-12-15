import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty({
    example: 'user@email.com',
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

export class LoginResponseDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT token voor authenticatie',
  })
  token: string;
}
