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
import { AuthDelayInterceptor } from '../../auth/interceptors/authDelay.interceptor';
import { LoginResponseDto } from '../../src/session/session.dto';
import { AuthService } from '../../auth/auth.service';
import { CurrentUser } from '../../auth/decoraters/currentUser.decorator';
import { ParseUserIdPipe } from '../../auth/decoraters/parseUserid.pipe';
import { AuthGuard } from '../../auth/gaurds/auth.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

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

  @ApiResponse({
    status: 200,
    description: 'Get all personen',
    type: PersoonListResponseDto,
  })
  @Get()
  async getAll(): Promise<PersoonListResponseDto> {
    return this.persoonService.getAll();
  }

  // GET /api/personen/me
  @ApiResponse({
    status: 200,
    description: 'Get current ingelogde persoon',
    type: PublicPersoonResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - no valid token provided',
  })
  @Get('me')
  @UseGuards(AuthGuard)
  async getMe(@CurrentUser() personen: any): Promise<PublicPersoonResponseDto> {
    return this.persoonService.getById(personen.id);
  }

  // GET /api/personen/:id
  @ApiResponse({
    status: 200,
    description: 'Get persoon by ID of "me"',
    type: PublicPersoonResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Persoon not found',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @Get(':id')
  @UseGuards(AuthGuard)
  async getById(
    @Param('id', ParseUserIdPipe) id: number | 'me',
    @CurrentUser() user: any,
  ): Promise<PublicPersoonResponseDto> {
    const persoonId = id === 'me' ? user.id : id;
    return this.persoonService.getById(persoonId);
  }

  @ApiResponse({
    status: 201,
    description: 'Create persoon',
    type: PublicPersoonResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() dto: CreatePersoonDto,
  ): Promise<PublicPersoonResponseDto> {
    return this.persoonService.create(dto);
  }

  @ApiResponse({
    status: 200,
    description: 'Update persoon',
    type: PublicPersoonResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Persoon not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
  })
  @Patch(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePersoonDto,
  ): Promise<PublicPersoonResponseDto> {
    return this.persoonService.updateById(id, dto);
  }

  @ApiResponse({
    status: 204,
    description: 'Delete persoon',
  })
  @ApiResponse({
    status: 404,
    description: 'Persoon not found',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return this.persoonService.deleteById(id);
  }

  @ApiResponse({
    status: 201,
    description: 'Register persoon en geef JWT token terug',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
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
