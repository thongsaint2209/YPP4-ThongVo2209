import { IncomingMessage, ServerResponse } from "http";

type Handler = (
  req: IncomingMessage,
  res: ServerResponse,
  params?: string[]
) => void;

interface Route {
  method: string;
  path: string | RegExp;
  handler: Handler;
}

export class Router {
  private routes: Route[] = [];

  public addRoute(method: string, path: string | RegExp, handler: Handler) {
    this.routes.push({ method, path, handler });
  }

  public handle(req: IncomingMessage, res: ServerResponse) {
    const url = req.url || "";
    const method = req.method || "";

    const route = this.routes.find((r) => {
      if (r.method !== method) return false;

      if (typeof r.path === "string") return r.path === url;
      if (r.path instanceof RegExp) return r.path.test(url);

      return false;
    });

    if (route) {
      const params =
        route.path instanceof RegExp
          ? url.match(route.path)?.slice(1)
          : undefined;
      return route.handler(req, res, params);
    }

    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Not found" }));
  }
}
