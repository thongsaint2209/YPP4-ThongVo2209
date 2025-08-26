// workspaceboard.controller.ts
import { Controller, Get } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { WorkspaceMemberDto } from './dto/workspace-user-is-member.dto';
import { WorkspaceTypeDto } from './dto/workspace-type.dto';

@Controller('Workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Get('getWorkspacesMember')
  getWorkspacesMember(userId: number): Promise<WorkspaceMemberDto[]> {
    return this.workspaceService.getWorkspacesMember(userId);
  }

  @Get('getWorkspacesType')
  getWorkspacesType(): Promise<WorkspaceTypeDto[]> {
    return this.workspaceService.getWorkspacesType();
  }
  @Get('getWorkspaceIsMember')
  getWorkspaceIsMember(userId, workspaceId): Promise<WorkspaceMemberDto[]> {
    return this.workspaceService.getWorkspaceIsMember(userId, workspaceId);
  }
}
