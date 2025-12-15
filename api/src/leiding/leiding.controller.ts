import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { LeidingService } from './leiding.service';
import {
  CreateLeidingDto,
  UpdateLeidingDto,
  LeidingListResponseDto,
  LeidingResponseDto,
} from './leiding.dto';
import { Public } from '../../auth/decoraters/public.decorater';
import { Roles } from 'auth/decoraters/roles.decorator';
import { ApiBearerAuth, ApiResponse, ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('Leiding')
@ApiBearerAuth()
@ApiResponse({
  status: 401,
  description: 'Unauthorized - you need to be signed in',
})
@Controller('leiding')
export class LeidingController {
  constructor(private readonly leidingService: LeidingService) {}

  @ApiOperation({
    summary: 'Alle leiding ophalen',
    description: 'Haalt een lijst op van alle beschikbare leiding',
  })
  @ApiResponse({
    status: 200,
    description: 'Alle leiding ophalen',
    type: LeidingListResponseDto,
  })
  @Roles('hoofdleiding')
  @Public()
  @Get()
  async getAll(): Promise<LeidingListResponseDto> {
    return this.leidingService.getAll();
  }

  @ApiOperation({
    summary: 'Leiding ophalen op ID',
    description: 'Haalt de details op van een specifieke leidingspersoon',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Unieke ID van de leiding',
  })
  @ApiResponse({
    status: 200,
    description: 'Leiding details',
    type: LeidingResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Leiding niet gevonden',
  })
  @Get(':id')
  async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<LeidingResponseDto> {
    return this.leidingService.getById(id);
  }

  @ApiOperation({
    summary: 'Nieuwe leiding aanmaken',
    description: 'Maak een nieuw leidingspersoon aan met de opgegeven gegevens',
  })
  @ApiResponse({
    status: 201,
    description: 'Leiding succesvol aangemaakt',
    type: LeidingResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Ongeldige invoergegevens',
  })
  @Roles('hoofdleiding')
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateLeidingDto): Promise<LeidingResponseDto> {
    return this.leidingService.create(dto);
  }

  @ApiOperation({
    summary: 'Leiding bijwerken',
    description: 'Update de gegevens van een bestaande leidingspersoon',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Unieke ID van de leiding',
  })
  @ApiResponse({
    status: 200,
    description: 'Leiding succesvol bijgewerkt',
    type: LeidingResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Leiding niet gevonden',
  })
  @ApiResponse({
    status: 400,
    description: 'Ongeldige invoergegevens',
  })
  @Roles('hoofdleiding')
  @Patch(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateLeidingDto,
  ): Promise<LeidingResponseDto> {
    return this.leidingService.updateById(id, dto);
  }

  @ApiOperation({
    summary: 'Leiding verwijderen',
    description: 'Verwijder een bestaande leidingspersoon',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Unieke ID van de leiding',
  })
  @ApiResponse({
    status: 204,
    description: 'Leiding succesvol verwijderd',
  })
  @ApiResponse({
    status: 404,
    description: 'Leiding niet gevonden',
  })
  @Roles('hoofdleiding')
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.leidingService.deleteById(id);
  }
}
