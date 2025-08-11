// workspaceboard.controller.ts
import { Controller, Get } from '@nestjs/common';
import { BoardService } from './board.service';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get('createWorkspace')
  getCreateWorkspace() {
    return this.boardService.create;
  }

  @Get('updateWorkspace')
  getUpdateWorkspace() {
    return this.boardService.update;
  }
}
