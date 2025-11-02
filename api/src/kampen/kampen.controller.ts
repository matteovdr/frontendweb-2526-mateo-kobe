import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { createKampRequestDTO } from './kamp.dto';
import { KampenListResponseDto } from './kamp.dto';
import { KampenService } from './kampen.service';

@Controller('kampen')
export class KampenController {
  constructor(private readonly KampenService: KampenService) {}
  @Get()
  async getAllKampen(): Promise<KampenListResponseDto> {
    return this.KampenService.getAll();
  }

  @Get(':id')
  getKamp(@Param('id') id: number): string {
    // TODO
    return `this action returns 1 kamp with id: ${id}`;
  }

  @Post()
  createKamp(@Body() createKampDTO: createKampRequestDTO): string {
    // TODO
    return `This action adds a new kamp for ${createKampDTO.naam}`;
  }
}
