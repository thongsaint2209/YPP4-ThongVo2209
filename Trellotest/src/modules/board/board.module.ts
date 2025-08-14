import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { BoardRepository } from './board.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BoardService])],
  controllers: [BoardController, BoardRepository],
  providers: [BoardService],
  exports: [BoardService],
})
export class BoardModule {}
