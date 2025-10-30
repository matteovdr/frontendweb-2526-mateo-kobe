import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { createKampRequestDTO } from './kamp.dto';

@Controller('kampen')
export class KampenController {
  @Get()
  getAllKampen(): string {
    // TODO
    return 'this action returns all kampen';
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

// import { Controller, Get } from '@nestjs/common';

// @Controller('health')
// export class HealthController {
//   @Get('ping')
//   ping(): string {
//     return 'pong';
//   }
// }
