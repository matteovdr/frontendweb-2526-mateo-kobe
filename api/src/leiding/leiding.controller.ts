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
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Leiding')
@ApiBearerAuth()
@ApiResponse({
  status: 401,
  description: 'Unauthorized - you need to be signed in',
})
@Controller('leiding')
export class LeidingController {
  constructor(private readonly leidingService: LeidingService) {}

  @ApiResponse({
    status: 200,
    description: 'Get all leiding',
    type: LeidingListResponseDto,
  })
  @Public()
  @Get()
  async getAll(): Promise<LeidingListResponseDto> {
    return this.leidingService.getAll();
  }

  @ApiResponse({
    status: 200,
    description: 'Get leiding by ID',
    type: LeidingResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Leiding not found',
  })
  @Get(':id')
  async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<LeidingResponseDto> {
    return this.leidingService.getById(id);
  }

  @ApiResponse({
    status: 201,
    description: 'Create leiding',
    type: LeidingResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateLeidingDto): Promise<LeidingResponseDto> {
    return this.leidingService.create(dto);
  }

  @ApiResponse({
    status: 200,
    description: 'Update leiding',
    type: LeidingResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Leiding not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
  })
  @Patch(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateLeidingDto,
  ): Promise<LeidingResponseDto> {
    return this.leidingService.updateById(id, dto);
  }

  @ApiResponse({
    status: 204,
    description: 'Delete leiding',
  })
  @ApiResponse({
    status: 404,
    description: 'Leiding not found',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.leidingService.deleteById(id);
  }
}
