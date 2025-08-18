// board.router.ts
import { BoardController } from './board.controller';

export interface Request {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  params?: Record<string, any>; // URL parameters, e.g., { UserId: '1' }
  body?: any; // POST, PUT
}

// Handler type for request processing
type Handler = (req: Request) => Promise<any>;

interface RouteDef {
  method: string;
  pattern: string; // pattern of the route, e.g., '/boards/:boardId/stages'
  handler: Handler; // function to handle the request
}

export class Router {
  private routes: RouteDef[] = [];

  constructor(private readonly controller: BoardController) {
    //register route GET
    this.addRoute('GET', '/boards/starred/:userId', async (req) =>
      this.controller.getStarredBoards(Number(req.params!.userId)),
    );

    this.addRoute('GET', '/boards/recently/:userId', async (req) =>
      this.controller.getRecentlyBoardsByUser(Number(req.params!.userId)),
    );

    this.addRoute(
      'GET',
      '/boards/workspace/:workspaceId/member/:userId',
      async (req) =>
        this.controller.getBoardsWhereUserIsMemberOfWorkspace(
          Number(req.params!.userId),
          Number(req.params!.workspaceId),
        ),
    );

    this.addRoute(
      'GET',
      '/boards/workspace/:workspaceId/owner/:userId',
      async (req) =>
        this.controller.getBoardsWhereUserIsOwnerOfWorkspace(
          Number(req.params!.userId),
          Number(req.params!.workspaceId),
        ),
    );

    this.addRoute('GET', '/boards/:boardId/stages', async (req) =>
      this.controller.getStagesofBoard(Number(req.params!.boardId)),
    );
  }

  // Method to add a new route into routes
  private addRoute(method: string, pattern: string, handler: Handler) {
    this.routes.push({ method, pattern, handler });
  }

  // parse params từ URL
  private matchPath(
    pattern: string,
    actual: string,
  ): Record<string, string> | null {
    // Tách pattern và đường dẫn thực tế ra từng segment (dùng / làm dấu phân cách)
    const pParts = pattern.split('/');
    const aParts = actual.split('/');

    if (pParts.length !== aParts.length) return null;

    const params: Record<string, string> = {};

    //Nếu segment pattern bắt đầu bằng :
    // lấy tên param và lưu giá trị tương ứng từ đường dẫn thực tế.
    //matchPath('/boards/:boardId/stages', '/boards/1/stages')
    // => { boardId: '1' }
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

  // Method to handle incoming requests
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
