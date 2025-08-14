import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkspaceUserIsMemberDto } from './dto/workspace-user-is-member.dto';
import { Workspace } from 'src/entities/workspace.entity';

@Injectable()
export class WorkspaceRepository {
  constructor(
    @InjectRepository(Workspace)
    private readonly WorkspaceRepository: Repository<Workspace>,
  ) {}

  async getWorkspacesUserIsMember(
    userId: number,
  ): Promise<WorkspaceUserIsMemberDto[]> {
    const query: WorkspaceUserIsMemberDto[] =
      await this.WorkspaceRepository.query(
        `
      SELECT wsp.Id WorkspaceId, wsp.WorkspaceName, wsp.LogoUrl
      FROM Workspace wsp
      JOIN Members meb ON meb.OwnerId = wsp.Id
      JOIN OwnerType owt ON owt.Id = meb.OwnerTypeId
      JOIN [User] usr ON usr.Id = meb.UserId
      WHERE owt.OwnerTypeValue = 'WORKSPACE' AND meb.UserId = ?
      ORDER BY wsp.CreatedAt;
      `,
        [userId],
      );

    return query;
  }
}
