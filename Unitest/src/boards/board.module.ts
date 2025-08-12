import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { BoardRepository } from './board.repository';

@Module({
  controllers: [BoardController, BoardRepository],
  providers: [BoardService],
})
export class WorkspaceModule {}
