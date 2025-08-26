import { HttpContext } from "./HttpContext";

type Handler = (ctx: HttpContext, params?: string[]) => Promise<void> | void;

interface Route {
  method: string;
  path: string | RegExp;
  handler: Handler;
}

export class Router {
  private routes: Route[] = [];

  addRoute(method: string, path: string | RegExp, handler: Handler) {
    this.routes.push({ method: method.toUpperCase(), path, handler });
  }

  async handle(ctx: HttpContext) {
    const method = ctx.request.method || "";
    const url = ctx.request.url || "";

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
      return route.handler(ctx, params);
    }

    ctx.response.statusCode = 404;
    ctx.response.end(JSON.stringify({ error: "Not Found" }));
  }
}
