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
  KampLidResponseDto,
  KampLeidingResponseDto,
} from './kamp.dto';
import { Public } from '../../auth/decoraters/public.decorater';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Kampen')
@ApiBearerAuth()
@ApiResponse({
  status: 401,
  description: 'Unauthorized - you need to be signed in',
})
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

  @ApiResponse({
    status: 200,
    description: 'Get kamp by ID',
    type: KampResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Kamp not found',
  })
  @Get(':id')
  async getOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<KampResponseDto> {
    return this.kampenService.getKampWithId(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Get leden of a kamp',
    type: KampLidResponseDto,
    isArray: true,
  })
  @ApiResponse({
    status: 404,
    description: 'Kamp not found',
  })
  @Get(':id/leden')
  async getLedenVanKamp(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<KampLidResponseDto[]> {
    return this.kampenService.getLedenVanKamp(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Get leiding of a kamp',
    type: KampLeidingResponseDto,
    isArray: true,
  })
  @ApiResponse({
    status: 404,
    description: 'Kamp not found',
  })
  @Public()
  @Get(':id/leiding')
  async getLeiding(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<KampLeidingResponseDto[]> {
    return this.kampenService.getLeidingVanKamp(id);
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
