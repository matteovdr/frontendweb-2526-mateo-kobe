import { Controller, Get } from '@nestjs/common';
import { Public } from '../../auth/decoraters/public.decorater';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @ApiOperation({
    summary: 'Gezondheidscontrole',
    description: 'Controleert of de API beschikbaar is',
  })
  @ApiResponse({
    status: 200,
    description: 'API is gezond',
    schema: {
      type: 'object',
      properties: {
        pong: { type: 'boolean', example: true },
      },
    },
  })
  @Public()
  @Get('ping')
  ping(): { pong: boolean } {
    return { pong: true };
  }
}
