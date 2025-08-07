// workspaceboard.controller.ts
import { Controller, Get } from '@nestjs/common';
import { DatabaseFunctionService } from './databasefunction.service';

@Controller('databasefunction')
export class DatabaseFunctionController {
  constructor(
    private readonly DatabaseFunctionService: DatabaseFunctionService,
  ) {}

  @Get('join-one')
  getSingleJoinedData() {
    return this.DatabaseFunctionService.join;
  }

  getSingleleftJoinedData() {
    return this.DatabaseFunctionService.leftjoin;
  }
}
