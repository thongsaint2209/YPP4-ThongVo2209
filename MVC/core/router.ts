// app.router.ts
export interface Request {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
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

export class AppRouter {
  private routes: RouteDef[] = [];

  public addRoute(method: string, pattern: string, handler: Handler) {
    this.routes.push({ method, pattern, handler });
  }

  async handleRequest(req: Request): Promise<any> {
    // Tách path base và query string thủ công
    const [pathOnly, queryString] = req.path.split("?");

    // parse query string
    const queryParams: Record<string, string> = {};

    queryString?.split("&").forEach((pair) => {
      const [key, value] = pair.split("=");
      if (key) queryParams[key] = value;
    });

    req.params = queryParams;

    // tìm route theo method + path base
    const route = this.routes.find(
      (r) => r.method === req.method && r.pattern === pathOnly
    );

    if (!route) {
      throw new Error(`Route not found: [${req.method}] ${req.path}`);
    }

    return route.handler(req);
  }
}
