// workspaceboard.controller.ts
import { Controller, Get } from '@nestjs/common';
import { BoardService } from './board.service';
import { StarredBoardDto } from './dto/starred-board.dto';
import { RecentlyBoardDto } from './dto/reacently-board.dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get('getStarredBoards')
  getStarredBoards(userId: number): Promise<StarredBoardDto[] | null> {
    return this.boardService.getStarredBoards(userId);
  }

  @Get('getRecentlyBoards')
  getRecentlyBoardsByUser(userId: number): Promise<RecentlyBoardDto[]> {
    return this.boardService.getRecentlyBoardsByUser(userId);
  }
}
