import { BoardController } from './board.controller';

export interface Request {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string; // có thể kèm query string
  params?: Record<string, any>; // path params + query params
  body?: any;
}

type Handler = (req: Request) => Promise<any>;

interface RouteDef {
  method: string;
  pattern: string; // base path, không kèm query string
  handler: Handler;
}

export class Router {
  private routes: RouteDef[] = [];

  constructor(private readonly controller: BoardController) {
    // Starred boards
    this.addRoute('GET', '/boards/starred', async (req) => {
      const userId = Number(req.params!.userId);
      return this.controller.getStarredBoards(userId);
    });

    // Recently boards
    this.addRoute('GET', '/boards/recently', async (req) => {
      const userId = Number(req.params!.userId);
      return this.controller.getRecentlyBoardsByUser(userId);
    });

    // Workspace boards (member or owner)
    this.addRoute('GET', '/boards/workspace', async (req) => {
      const userId = Number(req.params!.userId);
      const workspaceId = Number(req.params!.workspaceId);
      const membership = req.params!.membership;

      const membershipMap: Record<
        string,
        (u: number, w: number) => Promise<any>
      > = {
        owner: this.controller.getOwnerBoards.bind(this.controller),
        member: this.controller.getBoardsWhereUserIsMemberOfWorkspace.bind(
          this.controller,
        ),
      };

      const handlerFn = membershipMap[membership];
      if (!handlerFn) throw new Error(`Invalid membership type: ${membership}`);

      return handlerFn(userId, workspaceId);
    });

    // Board stages
    this.addRoute('GET', '/boards/stages', async (req) => {
      const boardId = Number(req.params!.boardId);
      return this.controller.getStagesofBoard(boardId);
    });
  }

  private addRoute(method: string, pattern: string, handler: Handler) {
    this.routes.push({ method, pattern, handler });
  }

  async handleRequest(req: Request): Promise<any> {
    // Tách path base và query string thủ công
    const [pathOnly, queryString] = req.path.split('?');

    // parse query string
    const queryParams: Record<string, string> = {};

    queryString?.split('&').forEach((pair) => {
      const [key, value] = pair.split('=');
      if (key) queryParams[key] = value;
    });

    req.params = queryParams;

    // tìm route theo method + path base
    const route = this.routes.find(
      (r) => r.method === req.method && r.pattern === pathOnly,
    );

    if (!route) {
      throw new Error(`Route not found: [${req.method}] ${req.path}`);
    }

    return route.handler(req);
  }
}
