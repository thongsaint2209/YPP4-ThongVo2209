// board.router.ts
import { BoardController } from './board.controller';

export interface Request {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  params?: Record<string, any>;
  body?: any;
}

type Handler = (req: Request) => Promise<any>;

export class Router {
  private routes: Record<string, Handler> = {};

  constructor(private readonly controller: BoardController) {
    // Khai báo các routes vào dictionary
    this.routes['GET /boards/starred/:userId'] = async (req) =>
      this.controller.getStarredBoards(req.params?.userId);

    this.routes['GET /boards/recently/:userId'] = async (req) =>
      this.controller.getRecentlyBoardsByUser(req.params?.userId);

    this.routes['GET /boards/workspace/:workspaceId/member/:userId'] = async (
      req,
    ) =>
      this.controller.getBoardsWhereUserIsMemberOfWorkspace(
        req.params?.userId,
        req.params?.workspaceId,
      );

    this.routes['GET /boards/workspace/:workspaceId/owner/:userId'] = async (
      req,
    ) =>
      this.controller.getBoardsWhereUserIsOwnerOfWorkspace(
        req.params?.userId,
        req.params?.workspaceId,
      );

    this.routes['GET /boards/:boardId/stages'] = async (req) =>
      this.controller.getStagesofBoard(req.params?.boardId);
  }

  async handleRequest(req: Request): Promise<any> {
    const key = `${req.method} ${req.path}`;
    const handler = this.routes[key];

    if (!handler) {
      throw new Error(`Route not found: [${req.method}] ${req.path}`);
    }

    return handler(req);
  }
}
