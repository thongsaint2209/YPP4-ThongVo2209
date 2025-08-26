import { HttpContext } from "./HttpContext";

export type Middleware = (
  ctx: HttpContext,
  next: () => Promise<void>
) => Promise<void> | void;

// Example Logging Middleware
export const loggingMiddleware: Middleware = async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.request.method} ${ctx.request.url} - ${ms}ms`);
};
