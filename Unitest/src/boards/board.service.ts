import { Injectable } from '@nestjs/common';
import { Board } from './entities/board.entity';
import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardService {
  constructor(private readonly boardRepository: BoardRepository) {}

  getStarredBoard(userId: number) {
    return this.boardRepository.getStarredBoard(userId);
  }

  create(createBoardDto: CreateBoardDto) {
    return this.boardRepository.create(createBoardDto);
  }
}
