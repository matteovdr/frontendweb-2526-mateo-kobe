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
import { LoginResponseDto } from 'src/session/session.dto';
import { AuthService } from 'auth/auth.service';
import { CurrentUser } from 'auth/decoraters/currentUser.decorator';
import { ParseUserIdPipe } from 'auth/decoraters/parseUserid.pipe';
import { AuthGuard } from 'auth/gaurds/auth.guard';


@Controller('personen')
export class PersoonController {
  constructor(private readonly persoonService: PersoonService,
       private readonly authService: AuthService,
  ) {}


  @Get()
  async getAll(): Promise<PersoonListResponseDto> {
    return this.persoonService.getAll();
  }

  // GET /api/personen/me

@Get('me')
@UseGuards(AuthGuard)
async getMe(
  @CurrentUser() personen: any,
): Promise<PublicPersoonResponseDto> {
  return this.persoonService.getById(personen.id);
}

  // GET /api/personen/:id


@Get(':id')
@UseGuards(AuthGuard)
async getById(
  @Param('id', ParseUserIdPipe) id: number | 'me',
  @CurrentUser() user: any,
): Promise<PublicPersoonResponseDto> {
  const persoonId = id === 'me' ? user.id : id;
  return this.persoonService.getById(persoonId);
}


  @Post()
  async create(
    @Body() dto: CreatePersoonDto,
  ): Promise<PublicPersoonResponseDto> {
    return this.persoonService.create(dto);
  }

  @Patch(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePersoonDto,
  ): Promise<PublicPersoonResponseDto> {
    return this.persoonService.updateById(id, dto);
  }

  @Delete(':id')
  async deleteById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return this.persoonService.deleteById(id);
  }
    @Post('register')
  @Public()
  @UseInterceptors(AuthDelayInterceptor)
  async registerPersoon(
    @Body() registerDto: RegisterPersoonRequestDto,
  ): Promise<LoginResponseDto> {
      console.log('registerDto backend:', registerDto);
    const token = await this.authService.register(registerDto);
    return { token };
  }

}
