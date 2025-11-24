import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch
} from '@nestjs/common';
import { LeidingService } from './leiding.service';
import {
    UpdateLeidingDto,
    LeidingListResponseDto,
    LeidingResponseDto
} from './leiding.dto';

@Controller('leiding')
export class LeidingController {
  constructor(private readonly leidingService: LeidingService) {}


  @Get()
  async getAll(): Promise<LeidingListResponseDto> {
    return this.leidingService.getAll();
  }

  @Get(':id')
  async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<LeidingResponseDto> {
    return this.leidingService.getById(id);
  }

//   @Post()
//   async create(@Body() dto: CreateLeidingDto): Promise<LeidingResponseDto> {
//     return this.leidingService.create(dto);
//   }

  @Patch(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateLeidingDto,
  ): Promise<LeidingResponseDto> {
    return this.leidingService.updateById(id, dto);
  }

  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.leidingService.deleteById(id);
  }
}
