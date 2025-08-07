import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseFunctionService } from './databasefunction.service';

describe('DatabaseFunctionService', () => {
  let service: DatabaseFunctionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseFunctionService],
    }).compile();

    service = module.get<DatabaseFunctionService>(DatabaseFunctionService);
  });

  // INNER JOIN test
  describe('join board with workspace', () => {
    it('should return joined pairs of boards and workspaces based on workspaceId', () => {
      const boards = [
        { id: 1, name: 'Board A', workspaceId: 1 },
        { id: 2, name: 'Board B', workspaceId: 1 },
        { id: 3, name: 'Board C', workspaceId: 3 },
      ];

      const workspaces = [
        { id: 1, name: 'Workspace X' },
        { id: 2, name: 'Workspace Y' },
      ];

      const result = service.join(
        boards,
        workspaces,
        (board, workspace) => board.workspaceId === workspace.id,
      );

      expect(result.length).toBe(2);
      expect(result).toEqual([
        [
          { id: 1, name: 'Board A', workspaceId: 1 },
          { id: 1, name: 'Workspace X' },
        ],
        [
          { id: 2, name: 'Board B', workspaceId: 1 },
          { id: 1, name: 'Workspace X' },
        ],
      ]);
    });
  });

  // LEFT JOIN test
  describe('joinBoardWithWorkspaceLeft() - LEFT JOIN', () => {
    it('should return all left items, even when no matching right item is found', () => {
      const boards = [
        { id: 1, name: 'Board A', workspaceId: 1 },
        { id: 2, name: 'Board B', workspaceId: 2 },
        { id: 3, name: 'Board C', workspaceId: 99 }, // không khớp
      ];

      const workspaces = [
        { id: 1, name: 'Workspace X' },
        { id: 2, name: 'Workspace Y' },
        { id: 3, name: 'Workspace Z' },
      ];

      const result = service.leftjoin(
        boards,
        workspaces,
        (board, workspace) => board.workspaceId === workspace.id,
      );
      console.log(result);
      expect(result.length).toBe(3);
      expect(result).toEqual([
        [
          { id: 1, name: 'Board A', workspaceId: 1 },
          { id: 1, name: 'Workspace X' },
        ],
        [
          { id: 2, name: 'Board B', workspaceId: 2 },
          { id: 2, name: 'Workspace Y' },
        ],
        [{ id: 3, name: 'Board C', workspaceId: 99 }, null],
      ]);
    });
  });
});
