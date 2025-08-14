// workspaceboard.controller.ts
import { Controller, Get } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { WorkspaceUserIsMemberDto } from './dto/workspace-user-is-member.dto';
import { WorkspaceTypeDto } from './dto/workspace-type.dto';

@Controller('Workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Get('getWorkspacesWhereUserIsMember')
  getWorkspacesWhereUserIsMember(
    userId: number,
  ): Promise<WorkspaceUserIsMemberDto[]> {
    return this.workspaceService.getWorkspacesWhereUserIsMember(userId);
  }

  @Get('getWorkspacesType')
  getWorkspacesType(): Promise<WorkspaceTypeDto[]> {
    return this.workspaceService.getWorkspacesType();
  }
  @Get('getWorkspaceIsMember')
  getWorkspaceIsMember(
    userId,
    workspaceId,
  ): Promise<WorkspaceUserIsMemberDto[]> {
    return this.workspaceService.getWorkspaceIsMember(userId, workspaceId);
  }
}
