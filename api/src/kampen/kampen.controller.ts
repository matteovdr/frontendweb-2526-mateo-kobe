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
import { ApiResponse } from '@nestjs/swagger';
import { Public } from 'auth/decoraters/public.decorater';
import { Roles } from 'auth/decoraters/roles.decorator';
import { CurrentUser } from 'auth/decoraters/currentUser.decorator';
import type { AuthUser } from 'auth/auth.types';
@Controller('kampen')
export class KampenController {
  constructor(private readonly kampenService: KampenService) {}

  @ApiResponse({
    status: 200,
    description: 'Get all kampen',
    type: KampenListResponseDto,
  })
  @Public()
  @Get()
  async getAll(): Promise<KampenListResponseDto> {
    return this.kampenService.getAll();
  }

  // GET /kampen/:id
  @Public()
  @Get(':id')
  async getOne(
    @Param('id', ParseIntPipe) id: number,
    // Maak de user type optioneel
    @CurrentUser() user?: AuthUser, 
  ): Promise<KampResponseDto> {
    return this.kampenService.getKampWithId(id, user);
  }

  // POST /kampen/:id/inschrijven
  @Roles('lid', 'leiding', 'hoofdleiding')
  @Post(':id/inschrijven')
  async inschrijven(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: AuthUser,
  ): Promise<InschrijvingResponseDto> {
    return this.kampenService.inschrijvenVoorKamp(id, user);
  }

  @ApiResponse({
    status: 201,
    description: 'Create kamp',
    type: KampResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() data: CreateKampRequestDto,
  ): Promise<KampResponseDto> {
    return this.kampenService.createKamp(data);
  }

  @ApiResponse({
    status: 200,
    description: 'Update kamp',
    type: KampResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Kamp not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
  })
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CreateKampRequestDto,
  ): Promise<KampResponseDto> {
    return this.kampenService.updateKamp(id, data);
  }

  @ApiResponse({
    status: 204,
    description: 'Delete kamp',
  })
  @ApiResponse({
    status: 404,
    description: 'Kamp not found',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    await this.kampenService.deleteKamp(id);
  }
}
