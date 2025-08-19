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
        this.controller.getOwnerBoards(
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
    const pParts = pattern.split('/');
    const aParts = actual.split('/');

    if (pParts.length !== aParts.length) return null;

    // lấy tên param và lưu giá trị tương ứng từ đường dẫn thực tế.
    //matchPath('/boards/:boardId/stages', '/boards/1/stages')
    // => { boardId: '1' }
    const params: Record<string, string> = {};

    // Kiểm tra từng segment
    const matched = pParts.every(
      (part, i) =>
        part.startsWith(':')
          ? ((params[part.slice(1)] = aParts[i]), true) // Nếu là param, lưu vào params
          : part === aParts[i], // Nếu là literal, phải khớp
    );

    return matched ? params : null;
  }

  // Method to handle incoming requests
  async handleRequest(req: Request): Promise<any> {
    const route = this.routes.find(
      (r) => r.method === req.method && this.matchPath(r.pattern, req.path),
    );

    if (!route) {
      throw new Error(`Route not found: [${req.method}] ${req.path}`);
    }

    // Chuyển null thành undefined
    req.params = this.matchPath(route.pattern, req.path) ?? undefined;
    return route.handler(req);
  }
}
