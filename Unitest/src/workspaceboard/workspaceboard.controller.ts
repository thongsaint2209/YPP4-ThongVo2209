// workspaceboard.controller.ts
import { Controller, Get } from '@nestjs/common';
import { WorkspaceboardService } from './workspaceboard.service';

@Controller('workspaceboard')
export class WorkspaceboardController {
  constructor(private readonly workspaceboardService: WorkspaceboardService) {}

  @Get('join-one')
  getSingleJoinedData() {
    return this.workspaceboardService.joinBoardWithWorkspace;
  }
}
