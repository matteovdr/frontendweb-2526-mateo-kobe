import { Controller, Get } from '@nestjs/common';
import { Public } from '../../auth/decoraters/public.decorater';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @ApiResponse({
    status: 200,
    description: 'Health check endpoint',
    type: String,
  })
  @Public()
  @Get('ping')
  ping(): { pong: boolean } {
    return { pong: true };
  }
}
