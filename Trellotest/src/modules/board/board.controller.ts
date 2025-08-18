// Boardboard.controller.ts
import { Controller, Get } from '@nestjs/common';
import { BoardService } from './board.service';
import { StarredBoardDto } from './dto/starred-board.dto';
import { RecentlyBoardDto } from './dto/recently-board.dto';
import { BoardUserIsOwnerOfWorkspaceDto } from './dto/board-user-is-owner-of-workspace.dto';
import { StageOfBoardDto } from './dto/stage-of-board.dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get('getStarredBoards')
  getStarredBoards(userId: number): Promise<StarredBoardDto[]> {
    return this.boardService.getStarredBoards(userId);
  }

  @Get('getRecentlyBoards')
  getRecentlyBoardsByUser(userId: number): Promise<RecentlyBoardDto[]> {
    return this.boardService.getRecentlyBoardsByUser(userId);
  }
  @Get('getBoardsUserIsMember')
  getBoardsWhereUserIsMemberOfWorkspace(
    userId: number,
    workspaceId: number,
  ): Promise<RecentlyBoardDto[]> {
    return this.boardService.getBoardsWhereUserIsMemberOfWorkspace(
      userId,
      workspaceId,
    );
  }

  @Get('getBoardsWhereUserIsOwnerOfWorkspace')
  getBoardsWhereUserIsOwnerOfWorkspace(
    userId: number,
    workspaceId: number,
  ): Promise<BoardUserIsOwnerOfWorkspaceDto[]> {
    return this.boardService.getBoardsWhereUserIsOwnerOfWorkspace(
      userId,
      workspaceId,
    );
  }
  @Get('getStagesofBoard')
  getStagesofBoard(boardId: number): Promise<StageOfBoardDto[]> {
    return this.boardService.getStagesofBoard(boardId);
  }
}
