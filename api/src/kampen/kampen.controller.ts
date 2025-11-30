import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { KampenService } from './kampen.service';
import {
  KampenListResponseDto,
  KampResponseDto,
  createKampRequestDTO,
  KampLidResponseDto,
  KampLeidingResponseDto, // <- bijvoorbeeld
} from './kamp.dto';

@Controller('kampen')
export class KampenController {
  constructor(private readonly kampenService: KampenService) {}

  // GET /kampen
  @Get()
  async getAll(): Promise<KampenListResponseDto> {
    return this.kampenService.getAll();
  }

  // GET /kampen/:id
  @Get(':id')
  async getOne(@Param('id') id: string): Promise<KampResponseDto> {
    return this.kampenService.getKampWithId(Number(id));
  }


  @Get(':id/leden')
  async getLedenVanKamp(
    @Param('id') id: string,
  ): Promise<KampLidResponseDto[]> {
    return this.kampenService.getLedenVanKamp(Number(id));
  }
  @Get(':id/leiding')
async getLeiding(@Param('id') id: string): Promise<KampLeidingResponseDto[]> {
  return this.kampenService.getLeidingVanKamp(Number(id));
}

  // POST /kampen
  @Post()
  async create(@Body() data: createKampRequestDTO): Promise<KampResponseDto> {
    return this.kampenService.createKamp(data);
  }

  // PUT /kampen/:id
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: createKampRequestDTO,
  ): Promise<KampResponseDto> {
    return this.kampenService.updateKamp(Number(id), data);
  }

  // DELETE /kampen/:id
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    await this.kampenService.deleteKamp(Number(id));
    return { message: `Kamp with ID ${id} deleted successfully` };
  }
}
