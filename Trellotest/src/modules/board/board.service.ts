import { Injectable } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { StarredBoardDto } from './dto/starred-board.dto';
import { RecentlyBoardDto } from './dto/recently-board.dto';

@Injectable()
export class BoardService {
  constructor(private readonly boardRepository: BoardRepository) {}

  getStarredBoards(userId: number): Promise<StarredBoardDto[] | null> {
    return this.boardRepository.getStarredBoards(userId);
  }

  getRecentlyBoardsByUser(userId: number): Promise<RecentlyBoardDto[]> {
    return this.boardRepository.getRecentlyBoardsByUser(userId);
  }
}
