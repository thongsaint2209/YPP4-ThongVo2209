// workspaceboard.controller.ts
import { Controller, Get } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';

@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspaceboardService: WorkspaceService) {}

  @Get('join-one')
  getSingleJoinedData() {
    return this.workspaceboardService.create;
  }
}
