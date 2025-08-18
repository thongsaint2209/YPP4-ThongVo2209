import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from '../../entities/board.entity';
import { StarredBoardDto } from './dto/starred-board.dto';
import { RecentlyBoardDto } from './dto/recently-board.dto';
import { BoardUserIsOwnerOfWorkspaceDto } from './dto/board-user-is-owner-of-workspace.dto';
import { StageOfBoardDto } from './dto/stage-of-board.dto';
import { CacheService } from '../../common/cache/cache.service';

@Injectable()
export class BoardRepository {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    private readonly cacheService: CacheService, // Assuming CacheService is defined elsewhere
  ) {}

  async getStarredBoards(userId: number): Promise<StarredBoardDto[]> {
    const cacheKey = `starredBoards:${userId}}`;
    const sql = `
    SELECT
      usb.UserId,
      brd.Id AS BoardId,
      brd.BackgroundUrl,
      brd.BoardName,
      brd.BoardStatus,
      usb.StarredBoardsStatus
    FROM UserStarredBoard usb
    JOIN Board brd ON brd.Id = usb.BoardId
    WHERE usb.UserId = ?
      AND brd.BoardStatus = 'active'
    ORDER BY usb.CreatedAt DESC
  `;

    // Truyền callback để query nếu cache hết hạn
    return this.cacheService.queryWithCache(
      cacheKey,
      () => this.boardRepository.query(sql, [userId]), // callback trả về Promise<StarredBoardDto[]>
      300, // TTL 5 phút
    );
  }

  async getRecentlyBoardsByUser(userId: number): Promise<RecentlyBoardDto[]> {
    const cacheKey = `recentlyBoards:${userId}`;
    const sql = `
    SELECT
      brd.Id,
      uvh.UserId,
      brd.BoardName,
      brd.BackgroundUrl,
      uvh.AccessedAt,
      brd.BoardStatus
    FROM UserViewHistory uvh
    JOIN Board brd ON brd.Id = uvh.OwnerId
    JOIN OwnerType owt ON owt.Id = uvh.OwnerTypeId
    WHERE uvh.UserId = ?
      AND owt.OwnerTypeValue = 'BOARD'
      AND brd.BoardStatus = 'active'
    ORDER BY uvh.AccessedAt DESC
    LIMIT 4
  `;
    return this.cacheService.queryWithCache(
      cacheKey,
      () => this.boardRepository.query(sql, [userId]),
      300, // TTL 5 phút
    );
  }

  async getBoardsWhereUserIsMemberOfWorkspace(
    userId: number,
    workspaceId: number,
  ): Promise<RecentlyBoardDto[]> {
    const cacheKey = `boardsMember:${userId}:${workspaceId}`;
    const sql = `
    SELECT
      brd.Id AS BoardId,
      brd.BoardName AS BoardName,
      wsp.WorkspaceName AS WorkspaceName,
      brd.BackgroundUrl
    FROM Board brd
    JOIN Members mbr ON mbr.OwnerId = brd.Id
    JOIN OwnerType owt ON owt.Id = mbr.OwnerTypeId
    JOIN Workspace wsp ON brd.WorkspaceId = wsp.Id
    JOIN Users usr ON mbr.UserId = usr.Id
    WHERE usr.Id = ? AND owt.OwnerTypeValue = 'BOARD' AND wsp.Id = ?
    ORDER BY brd.CreatedAt;
  `;
    return this.cacheService.queryWithCache(
      cacheKey,
      () => this.boardRepository.query(sql, [userId, workspaceId]),
      300,
    );
  }

  async getBoardsWhereUserIsOwnerOfWorkspace(
    userId: number,
    workspaceId: number,
  ): Promise<BoardUserIsOwnerOfWorkspaceDto[]> {
    const cacheKey = `boardsOwner:${userId}:${workspaceId}`;
    const sql = `
    SELECT
      brd.Id BoardId,
      brd.BoardName,
      brd.BackgroundUrl,
      wsp.Id WorkspaceId,
      wsp.WorkspaceName,
      brd.CreatedBy,
      brd.CreatedAt
    FROM Board brd
    JOIN Members meb ON meb.OwnerId = brd.Id
    JOIN Workspace wsp ON wsp.Id = brd.WorkspaceId
    JOIN OwnerType owt ON owt.Id = meb.OwnerTypeId
    WHERE owt.OwnerTypeValue = 'BOARD' AND brd.CreatedBy = meb.UserId AND meb.UserId = ? AND wsp.Id = ?
    ORDER BY brd.CreatedAt
  `;
    return this.cacheService.queryWithCache(
      cacheKey,
      () => this.boardRepository.query(sql, [userId, workspaceId]),
      300,
    );
  }

  async getStagesofBoard(boardId: number): Promise<StageOfBoardDto[]> {
    const cacheKey = `stages:${boardId}`;
    const sql = `
    SELECT
      brd.BoardName,
      stg.Id AS StageId,
      stg.Title AS StageTitle,
      stg.Position,
      clr.ColorName
    FROM Stage stg
    JOIN Board brd ON brd.Id = stg.BoardId
    JOIN Color clr ON clr.Id = stg.ColorId
    WHERE brd.Id = ?
    ORDER BY stg.Position
  `;
    return this.cacheService.queryWithCache(
      cacheKey,
      () => this.boardRepository.query(sql, [boardId]),
      300,
    );
  }
}
