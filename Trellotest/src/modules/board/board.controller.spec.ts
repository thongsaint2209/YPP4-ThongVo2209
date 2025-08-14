// board.repository.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from '../../entities/board.entity';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { BoardRepository } from './board.repository';

describe('BoardRepository (SQLite in-memory)', () => {
  let controller: BoardController;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'database.sqlite',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
        }),
        TypeOrmModule.forFeature([Board]),
      ],
      controllers: [BoardController],
      providers: [BoardService, BoardRepository],
    }).compile();

    controller = module.get<BoardController>(BoardController);
  });

  it('should return only active starred boards for user 1', async () => {
    const userId = 1;
    const result = await controller.getStarredBoards(userId);

    expect(result).toBeDefined();
    expect(result).not.toBeNull();
    expect(result).toHaveProperty('BackgroundUrl');
    expect(result).toHaveProperty('BoardId');
    expect(result).toHaveProperty('BoardName');
    expect(result).toHaveProperty('BoardStatus');
    expect(result).toHaveProperty('StarredBoardsStatus');
    expect(result).toHaveProperty('UserId');
  });

  afterAll(async () => {
    await module.close();
  });
});
