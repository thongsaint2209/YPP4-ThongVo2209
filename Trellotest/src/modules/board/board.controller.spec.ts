// board.repository.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from '../../entities/board.entity';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { BoardRepository } from './board.repository';
import { Router } from './board.router';
import { Request } from './board.router';

describe('BoardRepository with Router', () => {
  let controller: BoardController;
  let router: Router;
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
    router = new Router(controller);

    // TODO: có thể seed data test ở đây
  });

  it('should return only active starred boards for user 1', async () => {
    const userId = 1;
    const request: Request = {
      method: 'GET',
      path: `/boards/starred/${userId}`,
    };

    const result = await router.handleRequest(request);

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    result.forEach((board) => {
      expect(board.data.BoardStatus).toBe('active');
      expect(board.data.StarredBoardsStatus).toBe(1);
    });
  });

  // it('should return only active recently boards for user 1', async () => {
  //   const request: Request = {
  //     method: 'GET',
  //     path: '/boards/recently/:userIds',
  //     params: { userId: 1 },
  //     body: {
  //       name: 'Get Board Name',
  //       description: 'Get description',
  //     },
  //   };

  //   const result = await router.Request(request);

  //   expect(result).toBeDefined();
  //   expect(Array.isArray(result)).toBe(true);
  //   result.forEach((board) => {
  //     expect(board.BoardStatus).toBe('active');
  //   });
  // });
});
