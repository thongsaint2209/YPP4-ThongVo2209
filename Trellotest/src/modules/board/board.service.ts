import { Injectable } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { StarredBoardDto } from './dto/starred-board.dto';
import { RecentlyBoardDto } from './dto/recently-board.dto';
import { BoardUserIsOwnerOfWorkspaceDto } from './dto/board-user-is-owner-of-workspace.dto';
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

  getBoardsWhereUserIsMemberOfWorkspace(
    userId: number,
    workspaceId: number,
  ): Promise<RecentlyBoardDto[]> {
    return this.boardRepository.getBoardsWhereUserIsMemberOfWorkspace(
      userId,
      workspaceId,
    );
  }

  getBoardsWhereUserIsOwnerOfWorkspace(
    userId: number,
    workspaceId: number,
  ): Promise<BoardUserIsOwnerOfWorkspaceDto[]> {
    return this.boardRepository.getBoardsWhereUserIsOwnerOfWorkspace(
      userId,
      workspaceId,
    );
  }

  getStagesofBoard(boardId: number): Promise<StageOfBoardDto[]> {
    return this.boardRepository.getStagesofBoard(boardId);
  }
}
