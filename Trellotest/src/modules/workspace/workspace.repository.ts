import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkspaceUserIsMemberDto } from './dto/workspace-user-is-member.dto';
import { Workspace } from '../../entities/workspace.entity';
import { WorkspaceTypeDto } from './dto/workspace-type.dto';

@Injectable()
export class WorkspaceRepository {
  constructor(
    @InjectRepository(Workspace)
    private readonly WorkspaceRepository: Repository<Workspace>,
  ) {}

  getWorkspacesWhereUserIsMember(
    userId: number,
  ): Promise<WorkspaceUserIsMemberDto[]> {
    const sql = `
      SELECT 
        wsp.Id WorkspaceId, 
        wsp.WorkspaceName, 
        wsp.LogoUrl
      FROM Workspace wsp
      JOIN Members meb ON meb.OwnerId = wsp.Id
      JOIN OwnerType owt ON owt.Id = meb.OwnerTypeId
      JOIN [User] usr ON usr.Id = meb.UserId
      WHERE owt.OwnerTypeValue = 'WORKSPACE' AND meb.UserId = ?
      ORDER BY wsp.CreatedAt
      `;

    return this.WorkspaceRepository.query(sql, [userId]);
  }

  getWorkspacesType(): Promise<WorkspaceTypeDto[]> {
    const sql = `
      SELECT Id, TypeValue, DisplayValue
      FROM WorkspaceType
      `;

    return this.WorkspaceRepository.query(sql);
  }

  getWorkspaceIsMember(
    userId: number,
    workspaceId: number,
  ): Promise<WorkspaceUserIsMemberDto[]> {
    const sql = `
      SELECT 
        wsp.Id WorkspaceId,
        wsp.WorkspaceName, 
        wsp.LogoUrl
      FROM Workspace wsp
      JOIN Members meb ON meb.OwnerId = wsp.Id
      JOIN OwnerType owt ON owt.Id = meb.OwnerTypeId
      WHERE owt.OwnerTypeValue = 'WORKSPACE' AND meb.UserId = ? AND wsp.Id = ?
      ORDER BY wsp.CreatedAt
      `;

    return this.WorkspaceRepository.query(sql, [userId, workspaceId]);
  }
}
