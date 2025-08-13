import { Injectable } from '@nestjs/common';
import { Board } from './entities/board.entity';
import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardService {
  private _mockData: Board[] = [];
  private _nextId = 1;

  // Getter / Setter mockData
  get mockData(): Board[] {
    return this._mockData;
  }

  set mockData(data: Board[]) {
    this._mockData = data;
  }

  // Getter / Setter nextId
  get nextId(): number {
    return this._nextId;
  }

  set nextId(id: number) {
    this._nextId = id;
  }

  constructor(private readonly boardRepository: BoardRepository) {}

  getStarredBoard(userId: number) {
    return this.boardRepository.getStarredBoard(userId);
  }

  create(createBoardDto: CreateBoardDto) {
    return this.boardRepository.create(createBoardDto);
  }
}
