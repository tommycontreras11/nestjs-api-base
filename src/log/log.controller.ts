import { Controller, Get, Param } from '@nestjs/common';
import { LogService } from './log.service';
import { ApiTags }
 from '@nestjs/swagger';
 @ApiTags('Logs')
 @Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get()
  findAll() {
    return this.logService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.logService.findOne(+id);
  }
}
