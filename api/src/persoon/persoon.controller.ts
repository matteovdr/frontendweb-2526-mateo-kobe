import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import {
  CreatePersoonDto,
  UpdatePersoonDto,
  PersoonListResponseDto,
  PublicPersoonResponseDto,
  RegisterPersoonRequestDto,
} from './persoon.dto';
import { PersoonService } from './persoon.service';
import { Public } from '../../auth/decoraters/public.decorater';
import { Roles } from '../../auth/decoraters/roles.decorator';
import { AuthDelayInterceptor } from '../../auth/interceptors/authDelay.interceptor';
import { LoginResponseDto } from '../../src/session/session.dto';
import { AuthService } from '../../auth/auth.service';
import { CurrentUser } from '../../auth/decoraters/currentUser.decorator';
import { ParseUserIdPipe } from '../../auth/decoraters/parseUserid.pipe';
import { AuthGuard } from '../../auth/gaurds/auth.guard';
import { ApiBearerAuth, ApiResponse, ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('Personen')
@ApiBearerAuth()
@ApiResponse({
  status: 401,
  description: 'Unauthorized - you need to be signed in',
})
@Controller('personen')
export class PersoonController {
  constructor(
    private readonly persoonService: PersoonService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({
    summary: 'Alle personen ophalen',
    description: 'Haalt een lijst op van alle geregistreerde personen',
  })
  @ApiResponse({
    status: 200,
    description: 'Alle personen ophalen',
    type: PersoonListResponseDto,
  })
  @Roles('hoofdleiding')
  @Get()
  async getAll(): Promise<PersoonListResponseDto> {
    return this.persoonService.getAll();
  }

  @ApiOperation({
    summary: 'Huidige gebruiker ophalen',
    description: 'Haalt de gegevens op van de ingelogde gebruiker',
  })
  @ApiResponse({
    status: 200,
    description: 'Huidige gebruiker ophalen',
    type: PublicPersoonResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Niet geauthoriseerd - geen geldige token',
  })
  @Get('me')
  @UseGuards(AuthGuard)
  async getMe(@CurrentUser() personen: any): Promise<PublicPersoonResponseDto> {
    return this.persoonService.getById(personen.id);
  }

  @ApiOperation({
    summary: 'Persoon ophalen op ID',
    description: 'Haalt de details op van een specifieke persoon, of "me" voor huidige gebruiker',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Unieke ID van de persoon of "me" voor huidige gebruiker',
  })
  @ApiResponse({
    status: 200,
    description: 'Persoon details',
    type: PublicPersoonResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Persoon niet gevonden',
  })
  @ApiResponse({
    status: 401,
    description: 'Niet geauthoriseerd',
  })
  @Roles('hoofdleiding')
  @Get(':id')
  @UseGuards(AuthGuard)
  async getById(
    @Param('id', ParseUserIdPipe) id: number | 'me',
    @CurrentUser() user: any,
  ): Promise<PublicPersoonResponseDto> {
    const persoonId = id === 'me' ? user.id : id;
    return this.persoonService.getById(persoonId);
  }

  @ApiOperation({
    summary: 'Nieuwe persoon aanmaken',
    description: 'Maak een nieuwe persoon aan met de opgegeven gegevens',
  })
  @ApiResponse({
    status: 201,
    description: 'Persoon succesvol aangemaakt',
    type: PublicPersoonResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Ongeldige invoergegevens',
  })
  @Roles('hoofdleiding')
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() dto: CreatePersoonDto,
  ): Promise<PublicPersoonResponseDto> {
    return this.persoonService.create(dto);
  }

  @ApiOperation({
    summary: 'Persoon bijwerken',
    description: 'Update de gegevens van een bestaande persoon',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Unieke ID van de persoon',
  })
  @ApiResponse({
    status: 200,
    description: 'Persoon succesvol bijgewerkt',
    type: PublicPersoonResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Persoon niet gevonden',
  })
  @ApiResponse({
    status: 400,
    description: 'Ongeldige invoergegevens',
  })
  @Roles('hoofdleiding')
  @Patch(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePersoonDto,
  ): Promise<PublicPersoonResponseDto> {
    return this.persoonService.updateById(id, dto);
  }

  @ApiOperation({
    summary: 'Persoon verwijderen',
    description: 'Verwijder een bestaande persoon',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Unieke ID van de persoon',
  })
  @ApiResponse({
    status: 204,
    description: 'Persoon succesvol verwijderd',
  })
  @ApiResponse({
    status: 404,
    description: 'Persoon niet gevonden',
  })
  @Roles('hoofdleiding')
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return this.persoonService.deleteById(id);
  }

  @ApiOperation({
    summary: 'Gebruiker registreren',
    description: 'Registreer een nieuwe gebruiker en ontvang een JWT token',
  })
  @ApiResponse({
    status: 201,
    description: 'Registratie succesvol, JWT token ontvangen',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Ongeldige invoergegevens',
  })
  @Public()
  @Post('register')
  @UseInterceptors(AuthDelayInterceptor)
  @HttpCode(HttpStatus.CREATED)
  async registerPersoon(
    @Body() registerDto: RegisterPersoonRequestDto,
  ): Promise<LoginResponseDto> {
    const token = await this.authService.register(registerDto);
    return { token };
  }
}
