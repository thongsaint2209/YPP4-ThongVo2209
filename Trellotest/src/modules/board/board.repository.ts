import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from '../../entities/board.entity';
import { StarredBoardDto } from './dto/starred-board.dto';
import { RecentlyBoardDto } from './dto/recently-board.dto';
import { BoardUserIsMemberDto } from './dto/board-user-is-member.dto';
import { BoardUserIsOwnerOfWorkspaceDto } from './dto/board-user-is-owner-of-workspace.dto';
import { StageOfBoardDto } from './dto/stage-of-board.dto';

export interface ICacheItem<T> {
  data: T;
  expire: number;
}

export interface IResourceWithLinks<T> {
  data: T;
  links: Array<{ rel: string; href: string; method?: string }>;
}

@Injectable()
export class BoardRepository {
  private cache = new Map<string, ICacheItem<any>>();
  private readonly TTL_SECONDS = 300; // 5 phút

  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  // ------------------- Cache helpers -------------------
  private getCache<T>(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;
    if (Date.now() > item.expire) {
      this.cache.delete(key);
      return null;
    }
    return item.data;
  }

  private setCache<T>(key: string, data: T, ttlSeconds?: number) {
    const ttl = ttlSeconds ?? this.TTL_SECONDS;
    this.cache.set(key, {
      data,
      expire: Date.now() + ttl * 1000,
    });
  }

  private async queryWithCache<T>(
    cacheKey: string,
    sql: string,
    params: any[],
  ): Promise<T> {
    const cached = this.getCache<T>(cacheKey);
    if (cached) return cached;

    const result = await this.boardRepository.query(sql, params);
    this.setCache(cacheKey, result);
    return result;
  }

  // ------------------- Public methods -------------------
  async getStarredBoards(
    userId: number,
  ): Promise<IResourceWithLinks<StarredBoardDto>[]> {
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

    const boards = await this.queryWithCache<StarredBoardDto[]>(
      `starredBoards:${userId}`,
      sql,
      [userId],
    );

    const res = boards.map((board) => ({
      data: board,
      links: [
        { rel: 'self', href: `/boards/${board.BoardId}`, method: 'GET' },
        {
          rel: 'unstar',
          href: `/boards/${board.BoardId}/unstar`,
          method: 'POST',
        },
        { rel: 'update', href: `/boards/${board.BoardId}`, method: 'PUT' },
      ],
    }));

    return res;
  }
  async getRecentlyBoardsByUser(userId: number): Promise<RecentlyBoardDto[]> {
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
    return this.queryWithCache<RecentlyBoardDto[]>(
      `recentlyBoards:${userId}`,
      sql,
      [userId],
    );
  }

  async getBoardsWhereUserIsMemberOfWorkspace(
    userId: number,
    workspaceId: number,
  ): Promise<BoardUserIsMemberDto[]> {
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
    return this.queryWithCache<BoardUserIsMemberDto[]>(
      `boardsMember:${userId}:${workspaceId}`,
      sql,
      [userId, workspaceId],
    );
  }

  async getBoardsWhereUserIsOwnerOfWorkspace(
    userId: number,
    workspaceId: number,
  ): Promise<BoardUserIsOwnerOfWorkspaceDto[]> {
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
    return this.queryWithCache<BoardUserIsOwnerOfWorkspaceDto[]>(
      `boardsOwner:${userId}:${workspaceId}`,
      sql,
      [userId, workspaceId],
    );
  }

  async getStagesofBoard(boardId: number): Promise<StageOfBoardDto[]> {
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
    return this.queryWithCache<StageOfBoardDto[]>(`stages:${boardId}`, sql, [
      boardId,
    ]);
  }
}
