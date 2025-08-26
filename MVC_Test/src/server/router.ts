import { HttpContext } from "./http-context";
import { Request } from "../common/request";

export type Handler = (ctx: HttpContext) => void;

interface Route {
  method: string;
  path: string;
  handler: Handler;
}

export class Router {
  private routes: Route[] = [];

  // đăng ký route
  addRoute(method: string, pattern: string, handler: Handler) {
    this.routes.push({ method, pattern, handler });
  }

  // xử lý request
  async handleRequest(req: Request): Promise<any> {
    // tách path base và query string
    const [pathOnly, queryString] = req.path.split("?");

    // parse query string -> gán vào req.params
    const queryParams: Record<string, string> = {};
    queryString?.split("&").forEach((pair) => {
      const [key, value] = pair.split("=");
      if (key) queryParams[key] = decodeURIComponent(value);
    });

    req.params = { ...(req.params || {}), ...queryParams };

    // tìm route match
    const route = this.routes.find(
      (r) => r.method === req.method && r.pattern === pathOnly
    );

    if (!route) {
      throw new Error(`Route not found: [${req.method}] ${req.path}`);
    }

    // gọi handler
    return route.handler(req);
  }
}
