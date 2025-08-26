import { Injectable } from '@nestjs/common';
import { WorkspaceRepository } from './workspace.repository';
import { WorkspaceMemberDto } from './dto/workspace-user-is-member.dto';
import { WorkspaceTypeDto } from './dto/workspace-type.dto';

@Injectable()
export class WorkspaceService {
  constructor(private readonly WorkspaceRepository: WorkspaceRepository) {}

  getWorkspacesMember(userId: number): Promise<WorkspaceMemberDto[]> {
    return this.WorkspaceRepository.getWorkspacesMember(userId);
  }

  getWorkspacesType(): Promise<WorkspaceTypeDto[]> {
    return this.WorkspaceRepository.getWorkspacesType();
  }

  getWorkspaceIsMember(userId, workspaceId): Promise<WorkspaceMemberDto[]> {
    return this.WorkspaceRepository.getWorkspaceIsMember(userId, workspaceId);
  }
}
