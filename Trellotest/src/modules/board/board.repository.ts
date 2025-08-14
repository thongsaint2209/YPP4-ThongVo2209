import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StarredBoardDto } from './dto/starred-board.dto';
import { Board } from '../../entities/board.entity';
import { RecentlyBoardDto } from './dto/recently-board.dto';
import { BoardUserIsMemberDto } from './dto/board-user-is-member.dto';

@Injectable()
export class BoardRepository {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  async getStarredBoards(userId: number): Promise<StarredBoardDto[]> {
    return await this.boardRepository.query(
      `SELECT
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
       ORDER BY usb.CreatedAt DESC`,
      [userId],
    );
  }

  async getRecentlyBoardsByUser(userId: number): Promise<RecentlyBoardDto[]> {
    const query: RecentlyBoardDto[] = await this.boardRepository.query(
      `
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
      `,
      [userId],
    );

    return query;
  }

  async getBoardsUserIsMember(userId: number): Promise<BoardUserIsMemberDto[]> {
    const query: BoardUserIsMemberDto[] = await this.boardRepository.query(
      `
        SELECT 
              brd.Id AS BoardId, 
              brd.BoardName AS BoardName, 
              brd.BackgroundUrl,
              wsp.WorkspaceName AS WorkspaceName 
        FROM Board brd
        JOIN Members mbr ON mbr.OwnerId = brd.Id
        JOIN OwnerType owt ON owt.Id = mbr.OwnerTypeId
        JOIN Workspace wsp ON brd.WorkspaceId = wsp.Id
        JOIN [User] usr ON mbr.UserId = usr.Id
        WHERE usr.Id = 1 AND owt.OwnerTypeValue = 'BOARD'
        ORDER BY brd.CreatedAt;
      `,
      [userId],
    );

    return query;
  }
}
