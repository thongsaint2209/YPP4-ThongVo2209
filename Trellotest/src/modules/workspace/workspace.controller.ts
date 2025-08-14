// workspaceboard.controller.ts
import { Controller, Get } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { WorkspaceUserIsMemberDto } from './dto/workspace-user-is-member.dto';

@Controller('Workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Get('getWorkspacesUserIsMember')
  getWorkspacesUserIsMember(
    userId: number,
  ): Promise<WorkspaceUserIsMemberDto[]> {
    return this.workspaceService.getWorkspacesUserIsMember(userId);
  }
}
