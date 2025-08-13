import { Injectable } from "@nestjs/common";
import { Board } from "./entities/board.entity";
import { CreateBoardDto } from "./dto/create-board.dto";
import { UpdateBoardDto } from "./dto/update-board.dto";

@Injectable()
export class BoardService {
  private boards: Board[] = [];

  create(createBoardDto: CreateBoardDto): Board {
    const board: Board = {
      id: Date.now().toString(),
      ...createBoardDto,
    };
    this.boards.push(board);
    return board;
  }

  findAll(): Board[] {
    return this.boards;
  }

  findOne(id: string): Board | undefined {
    return this.boards.find((board) => board.id === id);
  }

  update(id: string, updateBoardDto: UpdateBoardDto): Board | undefined {
    const board = this.findOne(id);
    if (board) {
      Object.assign(board, updateBoardDto);
    }
    return board;
  }

  remove(id: string): boolean {
    const index = this.boards.findIndex((board) => board.id === id);
    if (index !== -1) {
      this.boards.splice(index, 1);
      return true;
    }
    return false;
  }
}
