import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StarredBoardDto } from './dto/update-board.dto';
import { Board } from '../../entities/board.entity';

@Injectable()
export class BoardRepository {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  async getStarredBoards(userId: number): Promise<StarredBoardDto | null> {
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

    return query.length > 0 ? query[0] : null;
  }
}
