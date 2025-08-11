// user-view-history.controller.ts
import { Controller, Get } from '@nestjs/common';
import { UserViewHistoryService } from './user-view-history.service';

@Controller('user-view-history')
export class UserViewHistoryController {
  constructor(
    private readonly userViewHistoryService: UserViewHistoryService,
  ) {}

  @Get('create')
  getCreate() {
    return this.userViewHistoryService.create;
  }

  @Get('update')
  getUpdate() {
    return this.userViewHistoryService.update;
  }
}
