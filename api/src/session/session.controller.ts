import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';
import { LoginRequestDto, LoginResponseDto } from './session.dto';
import { Public } from '../../auth/decoraters/public.decorater';
import { AuthDelayInterceptor } from '../../auth/interceptors/authDelay.interceptor';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('Sessions')
@Controller('sessions')
export class SessionController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'Gebruiker inloggen',
    description: 'Login met e-mailadres en wachtwoord en ontvang een JWT token',
  })
  @ApiResponse({
    status: 200,
    description: 'Login succesvol, JWT token ontvangen',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Ongeldige inloggegevens',
  })
  @ApiResponse({
    status: 400,
    description: 'Ongeldige invoergegevens',
  })
  @Post()
  @Public()
  @UseInterceptors(AuthDelayInterceptor)
  async signIn(@Body() loginDto: LoginRequestDto): Promise<LoginResponseDto> {
    const token = await this.authService.login(loginDto);
    return { token };
  }
}
