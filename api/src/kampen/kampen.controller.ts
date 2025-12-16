import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  ParseIntPipe,
} from '@nestjs/common';
import { KampenService } from './kampen.service';
import {
  KampenListResponseDto,
  KampResponseDto,
  CreateKampRequestDto,
  InschrijvingResponseDto,
} from './kamp.dto';
import { ApiResponse, ApiTags, ApiOperation, ApiParam, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { Public } from 'auth/decoraters/public.decorater';
import { Roles } from 'auth/decoraters/roles.decorator';
import { CurrentUser } from 'auth/decoraters/currentUser.decorator';
import type { AuthUser } from '../../auth/auth.types';

@ApiTags('Kampen')
@ApiBearerAuth()
@ApiResponse({
  status: 401,
  description: 'Unauthorized - you need to be signed in',
})
@Controller('kampen')
export class KampenController {
  constructor(private readonly kampenService: KampenService) {}

  @ApiOperation({
    summary: 'Alle kampen ophalen',
    description: 'Haalt een lijst op van alle beschikbare kampen',
  })
  @ApiResponse({
    status: 200,
    description: 'Get all kampen',
    type: KampenListResponseDto,
  })
  @Public()
  @Get()
  async getAll(@CurrentUser() user?: AuthUser): Promise<KampenListResponseDto> {
    return this.kampenService.getAll(user);
  }

  @ApiOperation({
    summary: 'Kamp ophalen op ID',
    description: 'Haalt de details op van een specifiek kamp',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Unieke ID van het kamp',
  })
  @ApiResponse({
    status: 200,
    description: 'Kamp details',
    type: KampResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Kamp not found',
  })
  @Public()
  @Get(':id')
  async getOne(
    @Param('id', ParseIntPipe) id: number,
    // Maak de user type optioneel
    @CurrentUser() user?: AuthUser, 
  ): Promise<KampResponseDto> {
    return this.kampenService.getKampWithId(id, user);
  }

  @ApiOperation({
    summary: 'Inschrijven voor kamp',
    description: 'Schrijf de huidige gebruiker in voor een kamp',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Unieke ID van het kamp',
  })
  @ApiResponse({
    status: 201,
    description: 'Inschrijving succesvol',
    type: InschrijvingResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Ongeldig verzoek',
  })
  @Roles('lid', 'leiding', 'hoofdleiding')
  @Post(':id/inschrijven')
  async inschrijven(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: AuthUser,
  ): Promise<InschrijvingResponseDto> {
    return this.kampenService.inschrijvenVoorKamp(id, user);
  }

  @ApiOperation({
    summary: 'Uitschrijven voor kamp',
    description: 'Schrijf de huidige gebruiker uit voor een kamp',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Unieke ID van het kamp',
  })
  @ApiResponse({
    status: 204,
    description: 'Uitschrijven succesvol',
  })
  @ApiResponse({
    status: 404,
    description: 'Inschrijving niet gevonden',
  })
  @Roles('lid', 'leiding', 'hoofdleiding')
  @Delete(':id/inschrijven')
  @HttpCode(HttpStatus.NO_CONTENT)
  async uitschrijven(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: AuthUser,
  ): Promise<void> {
    await this.kampenService.uitschrijvenVanKamp(id, user);
  }

  @ApiOperation({
    summary: 'Nieuw kamp aanmaken',
    description: 'Maak een nieuw kamp aan met de opgegeven gegevens',
  })
  @ApiBody({
    description: 'Gegevens voor het nieuwe kamp',
    type: CreateKampRequestDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Kamp succesvol aangemaakt',
    type: KampResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Ongeldige invoergegevens',
  })
  @Roles('hoofdleiding')
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() data: CreateKampRequestDto,
  ): Promise<KampResponseDto> {
    return this.kampenService.createKamp(data);
  }

  @ApiOperation({
    summary: 'Kamp bijwerken',
    description: 'Update de gegevens van een bestaand kamp',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Unieke ID van het kamp',
  })
  @ApiBody({
    description: 'Bijgewerkte gegevens voor het kamp',
    type: CreateKampRequestDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Kamp succesvol bijgewerkt',
    type: KampResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Kamp niet gevonden',
  })
  @ApiResponse({
    status: 400,
    description: 'Ongeldige invoergegevens',
  })
  @Roles('hoofdleiding')
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CreateKampRequestDto,
  ): Promise<KampResponseDto> {
    return this.kampenService.updateKamp(id, data);
  }

  @ApiOperation({
    summary: 'Kamp verwijderen',
    description: 'Verwijder een bestaand kamp',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Unieke ID van het kamp',
  })
  @ApiResponse({
    status: 204,
    description: 'Kamp succesvol verwijderd',
  })
  @ApiResponse({
    status: 404,
    description: 'Kamp niet gevonden',
  })
  @Roles('hoofdleiding')
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    await this.kampenService.deleteKamp(id);
  }
}