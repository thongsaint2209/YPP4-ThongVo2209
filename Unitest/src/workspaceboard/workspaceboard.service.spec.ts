import { Test, TestingModule } from '@nestjs/testing';
import { WorkspaceboardService } from './workspaceboard.service';
import { Board } from '../boards/entities/board.entity';
import { Workspace } from '../workspace/entities/workspace.entity';

describe('WorkspaceboardService', () => {
  let service: WorkspaceboardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkspaceboardService],
    }).compile();

    service = module.get<WorkspaceboardService>(WorkspaceboardService);
  });

  describe('joinBoardWithWorkspace()', () => {
    it('should return boards joined with their corresponding workspaces', () => {
      // Arrange: mock boards và workspaces
      const workspaces: Workspace[] = [
        new Workspace(
          1,
          'Team 1',
          'Workspace for Team 1',
          10,
          new Date(),
          1001,
          new Date(),
          2001,
          'https://logo.com/team1.png',
        ),
        new Workspace(
          2,
          'Team 2',
          'Workspace for Team 2',
          20,
          new Date(),
          1002,
          new Date(),
          2002,
          'https://logo.com/team2.png',
        ),
        new Workspace(
          3,
          'Team 3',
          'Workspace for Team 3',
          20,
          new Date(),
          1002,
          new Date(),
          2002,
          'https://logo.com/team3.png',
        ),
      ];

      const boards: Board[] = [
        new Board(
          1,
          'Board 1',
          'Description for Board 1',
          new Date(),
          1001,
          'https://bg1.com/image.png',
          1, // WorkspaceId = 1
          'active',
          new Date(),
          1001,
        ),
        new Board(
          2,
          'Board 2',
          'Description for Board 2',
          new Date(),
          1002,
          'https://bg2.com/image.png',
          2, // WorkspaceId = 2
          'archived',
          new Date(),
          1002,
        ),
      ];

      // goi ham join
      const result = service.joinBoardWithWorkspace(boards, workspaces);

      // Assert
      expect(result.length).toBe(2);

      expect(result[0]).toEqual({
        boardId: 1,
        boardName: 'Board 1',
        workspaceId: 1,
        workspaceName: 'Team 1',
      });

      expect(result[1]).toEqual({
        boardId: 2,
        boardName: 'Board 2',
        workspaceId: 2,
        workspaceName: 'Team 2',
      });
    });

    it('should return all workspaces with their boards (LEFT JOIN)', () => {
      const workspaces: Workspace[] = [
        new Workspace(1, 'Team A', '', 1, new Date(), 1),
        new Workspace(2, 'Team B', '', 1, new Date(), 2),
        new Workspace(3, 'Team C', '', 1, new Date(), 3),
      ];

      const boards: Board[] = [
        new Board(
          1,
          'Board A1',
          '',
          new Date(),
          1,
          '',
          1,
          'active',
          new Date(),
          1,
        ),
        new Board(
          2,
          'Board A2',
          '',
          new Date(),
          1,
          '',
          1,
          'active',
          new Date(),
          1,
        ),
        new Board(
          3,
          'Board B1',
          '',
          new Date(),
          2,
          '',
          2,
          'archived',
          new Date(),
          2,
        ),
      ];

      const result = service.leftjoinWorkspaceWithBoards(workspaces, boards);

      expect(result).toEqual([
        {
          workspaceId: 1,
          workspaceName: 'Team A',
          boardId: 1,
          boardName: 'Board A1',
        },
        {
          workspaceId: 1,
          workspaceName: 'Team A',
          boardId: 2,
          boardName: 'Board A2',
        },
        {
          workspaceId: 2,
          workspaceName: 'Team B',
          boardId: 3,
          boardName: 'Board B1',
        },
        {
          workspaceId: 3,
          workspaceName: 'Team C',
          boardId: null,
          boardName: null,
        }, // Không có board nào
      ]);
    });
  });
});
