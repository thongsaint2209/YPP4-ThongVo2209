// board.router.ts
import { BoardController } from './board.controller';

export interface Request {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  params?: Record<string, any>;
  body?: any;
}

type Handler = (req: Request) => Promise<any>;

interface RouteDef {
  method: string;
  pattern: string;
  handler: Handler;
}

export class Router {
  private routes: RouteDef[] = [];

  constructor(private readonly controller: BoardController) {
    this.addRoute('GET', '/boards/starred/:userId', async (req) =>
      this.controller.getStarredBoards(req.params!.userId),
    );

    this.addRoute('GET', '/boards/recently/:userId', async (req) =>
      this.controller.getRecentlyBoardsByUser(req.params!.userId),
    );

    this.addRoute(
      'GET',
      '/boards/workspace/:workspaceId/member/:userId',
      async (req) =>
        this.controller.getBoardsWhereUserIsMemberOfWorkspace(
          req.params!.userId,
          req.params!.workspaceId,
        ),
    );

    this.addRoute(
      'GET',
      '/boards/workspace/:workspaceId/owner/:userId',
      async (req) =>
        this.controller.getBoardsWhereUserIsOwnerOfWorkspace(
          req.params!.userId,
          req.params!.workspaceId,
        ),
    );

    this.addRoute('GET', '/boards/:boardId/stages', async (req) =>
      this.controller.getStagesofBoard(req.params!.boardId),
    );
  }

  private addRoute(method: string, pattern: string, handler: Handler) {
    this.routes.push({ method, pattern, handler });
  }

  // so sanh tung dong trong routes
  private matchPath(
    pattern: string,
    actual: string,
  ): Record<string, string> | null {
    const pParts = pattern.split('/');
    const aParts = actual.split('/');

    if (pParts.length !== aParts.length) return null;

    const params: Record<string, string> = {};

    for (let i = 0; i < pParts.length; i++) {
      if (pParts[i].startsWith(':')) {
        const key = pParts[i].slice(1);
        params[key] = aParts[i];
      } else if (pParts[i] !== aParts[i]) {
        return null;
      }
    }
    return params;
  }

  async handleRequest(req: Request): Promise<any> {
    for (const route of this.routes) {
      if (route.method === req.method) {
        const params = this.matchPath(route.pattern, req.path);
        if (params) {
          req.params = params;
          return route.handler(req);
        }
      }
    }
    throw new Error(`Route not found: [${req.method}] ${req.path}`);
  }
}
