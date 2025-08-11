// workspaceboard.controller.ts
import { Controller, Get } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';

@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Get('createWorkspace')
  getCreateWorkspace() {
    return this.workspaceService.create;
  }

  @Get('updateWorkspace')
  getUpdateWorkspace() {
    return this.workspaceService.update;
  }
}
