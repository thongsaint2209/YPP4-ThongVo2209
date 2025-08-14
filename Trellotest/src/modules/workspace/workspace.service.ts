import { Injectable } from '@nestjs/common';
import { WorkspaceRepository } from './workspace.repository';
import { WorkspaceUserIsMemberDto } from './dto/workspace-user-is-member.dto';
import { WorkspaceTypeDto } from './dto/workspace-type.dto';

@Injectable()
export class WorkspaceService {
  constructor(private readonly WorkspaceRepository: WorkspaceRepository) {}

  getWorkspacesWhereUserIsMember(
    userId: number,
  ): Promise<WorkspaceUserIsMemberDto[]> {
    return this.WorkspaceRepository.getWorkspacesWhereUserIsMember(userId);
  }

  getWorkspacesType(): Promise<WorkspaceTypeDto[]> {
    return this.WorkspaceRepository.getWorkspacesType();
  }

  getWorkspaceIsMember(
    userId,
    workspaceId,
  ): Promise<WorkspaceUserIsMemberDto[]> {
    return this.WorkspaceRepository.getWorkspaceIsMember(userId, workspaceId);
  }
}
