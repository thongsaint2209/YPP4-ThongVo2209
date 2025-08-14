import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StarredBoardDto } from './dto/starred-board.dto';
import { Board } from '../../entities/board.entity';
import { RecentlyBoardDto } from './dto/recently-board.dto';

@Injectable()
export class BoardRepository {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  async getStarredBoards(userId: number): Promise<StarredBoardDto[]> {
    const query: StarredBoardDto[] = await this.boardRepository.query(
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

    return query;
  }

  async getRecentlyBoardsByUser(userId: number): Promise<RecentlyBoardDto[]> {
    const query: RecentlyBoardDto[] = await this.boardRepository.query(
      `
      SELECT
          uvh.UserId,
          brd.Id AS BoardId,
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
      `,
      [userId],
    );

    return query;
  }
}
