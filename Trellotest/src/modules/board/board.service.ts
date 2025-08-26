import { Injectable } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { StarredBoardDto } from './dto/starred-board.dto';
import { RecentlyBoardDto } from './dto/recently-board.dto';
import { BoardUserDto } from './dto/board-user.dto';
import { Workspace } from 'src/entities/workspace.entity';
import { StageOfBoardDto } from './dto/stage-of-board.dto';

@Injectable()
export class BoardService {
  constructor(private readonly boardRepository: BoardRepository) {}

  getStarredBoards(userId: number): Promise<StarredBoardDto[]> {
    return this.boardRepository.getStarredBoards(userId);
  }

  getRecentlyBoardsByUser(userId: number): Promise<RecentlyBoardDto[]> {
    return this.boardRepository.getRecentlyBoardsByUser(userId);
  }

  getBoardsMember(
    userId: number,
    workspaceId: number,
  ): Promise<RecentlyBoardDto[]> {
    return this.boardRepository.getBoardsMember(userId, workspaceId);
  }

  getBoardsOwner(userId: number, workspaceId: number): Promise<BoardUserDto[]> {
    return this.boardRepository.getBoardsOwner(userId, workspaceId);
  }

  getStagesofBoard(boardId: number): Promise<StageOfBoardDto[]> {
    return this.boardRepository.getStagesofBoard(boardId);
  }
}
