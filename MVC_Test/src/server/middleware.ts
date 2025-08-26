import { HttpContext } from "./http-context";

export type Middleware = (
  ctx: HttpContext,
  next: () => Promise<void>
) => Promise<void>;

// Logger middleware
export const logger: Middleware = async (ctx, next) => {
  console.log(
    `[${new Date().toISOString()}] ${ctx.request.method} ${ctx.request.url}`
  );
  await next();
};

// JSON body parser
export const jsonBodyParser: Middleware = async (ctx, next) => {
  if (["POST", "PUT", "PATCH"].includes(ctx.request.method!)) {
    let body = "";
    ctx.request.on("data", (chunk) => (body += chunk));
    await new Promise<void>((resolve) => ctx.request.on("end", resolve));
    try {
      ctx.state.body = JSON.parse(body);
    } catch {
      ctx.state.body = {};
    }
  }
  await next();
};
