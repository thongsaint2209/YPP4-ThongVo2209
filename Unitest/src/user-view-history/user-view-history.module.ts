import { Module } from '@nestjs/common';
import { UserViewHistoryService } from './user-view-history.service';
import { UserViewHistoryController } from './user-view-history.controller';

@Module({
  controllers: [UserViewHistoryController],
  providers: [UserViewHistoryService],
})
export class UserViewHistoryModule {}
