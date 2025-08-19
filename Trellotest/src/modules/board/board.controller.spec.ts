// board.repository.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from '../../entities/board.entity';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { BoardRepository } from './board.repository';
import { Router } from './board.router';
import { Request } from './board.router';
import { CacheService } from '../../common/cache/cache.service';
import { Repository } from 'typeorm';
import { Container } from '../../DI/container';

describe('BoardRepository with Router', () => {
  let controller: BoardController;
  let router: Router;
  let service: BoardService;
  let repository: BoardRepository;
  let module: TestingModule;
  let container: Container;

  beforeEach(async () => {
    // container = new Container();
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
      providers: [BoardService, BoardRepository, CacheService],
    }).compile();

    // repository = module.get<BoardRepository>(BoardRepository);

    // service = new BoardService(repository);

    // controller = new BoardController(service);

    // controller = container.resolve(BoardController);
    controller = module.get<BoardController>(BoardController);
    router = new Router(controller); // DI map
  });

  const userId = 1;
  const workspaceId = 1;
  const starredBoardsStatus = 1;
  const boardStatus = 'active';
  it('should return only active starred boards for user 1', async () => {
    const request: Request = {
      method: 'GET',
      path: `/boards/starred/${userId}`,
    };

    const result = await router.handleRequest(request);

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    result.forEach((board) => {
      expect(board.BoardStatus).toBe(boardStatus);
      expect(board.StarredBoardsStatus).toBe(starredBoardsStatus);
    });
  });

  it('should return only active recently boards for user 1', async () => {
    const request: Request = {
      method: 'GET',
      path: `/boards/recently/${userId}`,
    };

    const result = await router.handleRequest(request);

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    result.forEach((board) => {
      expect(board.BoardStatus).toBe('active');
    });
  });

  it('should return boards where user is member of workspace 1', async () => {
    const request: Request = {
      method: 'GET',
      path: `/boards/workspace/${workspaceId}/member/${userId}`,
    };

    const result = await router.handleRequest(request);

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    result.forEach((board) => {
      expect(board.BoardId).toBeDefined();
      expect(board.BoardName).toBeDefined();
      expect(board.WorkspaceName).toBeDefined();
      expect(board.BackgroundUrl).toBeDefined();
    });
  });

  it('should return boards where user is owner of workspace 1', async () => {
    const request: Request = {
      method: 'GET',
      path: `/boards/workspace/${workspaceId}/owner/${userId}`,
      params: { userId: 1, workspaceId: 1 },
    };

    const result = await router.handleRequest(request);

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    result.forEach((board) => {
      expect(board.BoardId).toBeDefined();
      expect(board.BoardName).toBeDefined();
      expect(board.WorkspaceId).toBeDefined();
      expect(board.WorkspaceName).toBeDefined();
      expect(board.CreatedBy).toBe(1); // giả sử userId = 1
      expect(board.CreatedAt).toBeDefined();
    });
  });

  it('should return stages of board 1', async () => {
    const request: Request = {
      method: 'GET',
      path: `/boards/:boardId/stages`,
      params: { boardId: 1 },
    };

    const result = await router.handleRequest(request);

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    result.forEach((stage) => {
      expect(stage.StageId).toBeDefined();
      expect(stage.StageTitle).toBeDefined();
      expect(stage.Position).toBeDefined();
      expect(stage.ColorName).toBeDefined();
      expect(stage.BoardName).toBeDefined();
    });
  });
});
