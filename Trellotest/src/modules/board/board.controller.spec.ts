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
  const userId = 1;
  const workspaceId = 1;
  const boardId = 1;

  //Get the all starred boards by the specific user
  it('should return only active starred boards for user 1', async () => {
    const result = await controller.getStarredBoards(userId);

    expect(result).toBeDefined();
    expect(result).not.toBeNull();
    expect(result!.length).toBe(2);
    result!.forEach((board) => {
      expect(board.BoardStatus).toBe('active');
    });
    result!.forEach((board) => {
      expect(board.StarredBoardsStatus).toBe(1);
    });
  });

  // Get 4 recently viewed boards by specific user
  it('should return only active recently boards for user 1', async () => {
    const result = await controller.getRecentlyBoardsByUser(userId);

    expect(result).toBeDefined();
    expect(result).not.toBeNull();
    expect(result!.length).toBe(2);
    result!.forEach((board) => {
      expect(board.BoardStatus).toBe('active');
    });
  });

  // Get all boards that user is member of workspace
  it('should return all boards that user 1 is member of workspace', async () => {
    const result = await controller.getBoardsWhereUserIsMemberOfWorkspace(
      userId,
      workspaceId,
    );

    expect(result).toBeDefined();
    expect(result.length).toBe(2);
  });

  // Get all boards that user is member of workspace that specific user is owner
  it('should return all boards in specific Workspace(id=1) that specific user(id=1) is owner', async () => {
    const result = await controller.getBoardsWhereUserIsOwnerOfWorkspace(
      userId,
      workspaceId,
    );

    expect(result).toBeDefined();
    expect(result.length).toBe(2);
    result.forEach((board) => {
      expect(board.CreatedBy).toBe(userId);
      expect(board.WorkspaceId).toBe(workspaceId);
      expect(board.BoardId).toBeDefined();
      expect(board.BoardName).toBeDefined();
    });
  });

  // Get all list Stage of specific board
  it('should return all list Stage of specific board', async () => {
    const result = await controller.getStagesofBoard(boardId);

    expect(result).toBeDefined();
    expect(result.length).toBe(3);
  });

  afterAll(async () => {
    await module.close();
  });
});
