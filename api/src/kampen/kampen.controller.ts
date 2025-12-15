import { Body, Controller, Get, Param, Post, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { KampenService } from './kampen.service';
import {
  KampenListResponseDto,
  KampResponseDto,
  createKampRequestDTO
} from './kamp.dto';
import { Public } from 'auth/decoraters/public.decorater';
import { Roles } from 'auth/decoraters/roles.decorator';
@Controller('kampen')
export class KampenController {
  constructor(private readonly kampenService: KampenService) {}

  // GET /kampen
  @Public()
  @Get()
  async getAll(): Promise<KampenListResponseDto> {
    return this.kampenService.getAll();
  }

  // GET /kampen/:id
  @Public()
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<KampResponseDto> {
    return this.kampenService.getKampWithId(id);
  }

  // POST /kampen
  @Roles('hoofdleiding')
  @Post()
  async create(@Body() data: createKampRequestDTO): Promise<KampResponseDto> {
    return this.kampenService.createKamp(data);
  }

  // PUT /kampen/:id
  @Roles('hoofdleiding')
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: createKampRequestDTO,
  ): Promise<KampResponseDto> {
    return this.kampenService.updateKamp(id, data);
  }

  // DELETE /kampen/:id
  @Roles('hoofdleiding')
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.kampenService.deleteKamp(id);
    return { message: `Kamp with ID ${id} deleted successfully` };
  }
}
