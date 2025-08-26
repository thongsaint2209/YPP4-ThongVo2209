import type { HttpContext } from "./http-context.ts";
import { NotFound, View } from "./view";

export type Handler = (ctx: HttpContext) => Promise<View>;

interface Route {
  path: string;
  method: string;
  handler: Handler;
  paramNames: string[];
  regex: RegExp;
}

export class Router {
  private routes: Route[] = [];

  register(method: string, path: string, handler: Handler) {
    const paramNames: string[] = [];
    // Convert :param to regex capture groups
    const regexPath = path.replace(/:([^\/]+)/g, (_, key) => {
      paramNames.push(key);
      return "([^/]+)";
    });
    const regex = new RegExp(`^${regexPath}$`);

    this.routes.push({
      method: method.toUpperCase(),
      path,
      handler,
      paramNames,
      regex,
    });
  }

  async handle(ctx: HttpContext): Promise<View> {
    const { method, url } = ctx.request;
    const route = this.routes.find(
      (r) => r.method === method?.toUpperCase() && r.regex.test(url ?? "")
    );

    if (!route) return new NotFound("Route not found");

    // Extract params
    const matches = route.regex.exec(url!)!;
    ctx.state.params = {};
    route.paramNames.forEach((name, i) => {
      ctx.state.params[name] = matches[i + 1];
    });

    // Call the handler
    return route.handler(ctx);
  }
}
