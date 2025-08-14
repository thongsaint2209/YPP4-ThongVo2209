import { Injectable } from '@nestjs/common';
import { WorkspaceRepository } from './workspace.repository';
import { WorkspaceUserIsMemberDto } from './dto/workspace-user-is-member.dto';

@Injectable()
export class WorkspaceService {
  constructor(private readonly WorkspaceRepository: WorkspaceRepository) {}

  getWorkspacesUserIsMember(
    userId: number,
  ): Promise<WorkspaceUserIsMemberDto[]> {
    return this.WorkspaceRepository.getWorkspacesUserIsMember(userId);
  }
}
