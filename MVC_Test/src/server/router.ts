import { HttpContext } from "./http-context";

export type Handler = (ctx: HttpContext) => void;

export class Router {
  private routes = new Map<string, Handler>();

  private createKey(method: string, path: string): string {
    return `${method.toUpperCase()}:${path}`;
  }

  register(method: string, path: string, handler: Handler) {
    const key = this.createKey(method, path);
    this.routes.set(key, handler);
  }

  match(ctx: HttpContext): Handler | null {
    const method = ctx.req.method?.toUpperCase() || "GET";
    const path = ctx.req.url?.split("?")[0] || "/";
    const key = this.createKey(method, path);
    return this.routes.get(key) || null;
  }
}
