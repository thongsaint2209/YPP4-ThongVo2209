import { Injectable } from '@nestjs/common';
import { Workspace } from '../workspace/entities/workspace.entity';
import { Board } from '../boards/entities/board.entity';

@Injectable()
export class WorkspaceboardService {
  // Mock workspace data
  private workspaces: Workspace[] = [
    new Workspace(
      1,
      'Frontend Team',
      'Workspace for frontend developers',
      10,
      new Date(),
      1001,
      new Date(),
      2001,
      'https://logo.com/frontend.png',
    ),
    new Workspace(
      2,
      'Backend Team',
      'Workspace for backend developers',
      20,
      new Date(),
      1002,
      new Date(),
      2002,
      'https://logo.com/backend.png',
    ),
  ];

  // Mock board data
  private boards: Board[] = [
    new Board(
      1,
      'Board 1',
      'Description for Board 1',
      new Date(),
      1001,
      'https://bg1.com/image.png',
      1,
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
      1,
      'archived',
      new Date(),
      1002,
    ),
  ];

  // JOIN thủ công giữa boards và workspaces
  joinBoardWithWorkspace(boards: Board[], workspaces: Workspace[]) {
    const result: {
      boardId: number;
      boardName: string;
      workspaceId: number;
      workspaceName: string;
    }[] = [];

    for (let i = 0; i < boards.length; i++) {
      const board = boards[i];

      for (let j = 0; j < workspaces.length; j++) {
        const workspace = workspaces[j];

        if (board.workspaceId === workspace.id) {
          result.push({
            boardId: board.id,
            boardName: board.boardName,
            workspaceId: workspace.id,
            workspaceName: workspace.workspaceName,
          });
        }
      }
    }

    return result;
  }

  joinWorkspaceWithBoards(workspaces: Workspace[], boards: Board[]) {
    const result: {
      workspaceId: number;
      workspaceName: string;
      boardId: number | null;
      boardName: string | null;
    }[] = [];

    for (let i = 0; i < workspaces.length; i++) {
      const workspace = workspaces[i];

      let matched = false;

      for (let j = 0; j < boards.length; j++) {
        const board = boards[j];

        if (board.workspaceId === workspace.id) {
          matched = true;
          result.push({
            workspaceId: workspace.id,
            workspaceName: workspace.workspaceName,
            boardId: board.id,
            boardName: board.boardName,
          });
        }
      }

      // Nếu không có board nào match thì vẫn push ra workspace (LEFT JOIN)
      if (!matched) {
        result.push({
          workspaceId: workspace.id,
          workspaceName: workspace.workspaceName,
          boardId: null,
          boardName: null,
        });
      }
    }

    return result;
  }
}
