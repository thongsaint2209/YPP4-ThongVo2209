import { Module } from "@nestjs/common";
import { BoardService } from "./board.service";
import { BoardsController } from "./board.controller";

@Module({
  controllers: [BoardsController],
  providers: [BoardService],
})
export class BoardsModule {}
