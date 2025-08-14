import { Injectable } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { StarredBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardService {
  constructor(private readonly boardRepository: BoardRepository) {}

  async getStarredBoards(userId: number): Promise<StarredBoardDto | null> {
    return await this.boardRepository.getStarredBoards(userId);
  }
}
