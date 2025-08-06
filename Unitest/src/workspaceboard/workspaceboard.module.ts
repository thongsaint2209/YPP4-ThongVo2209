import { Module } from '@nestjs/common';
import { WorkspaceboardService } from './workspaceboard.service';
import { WorkspaceboardController } from './workspaceboard.controller';

@Module({
  controllers: [WorkspaceboardController],
  providers: [WorkspaceboardService],
})
export class WorkspaceboardModule {}
