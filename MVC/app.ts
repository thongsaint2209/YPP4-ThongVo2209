import { HttpServer } from "./core/http-server";
import { loggingMiddleware } from "./core/middle-ware";
import { Router } from "./core/router";
import { registerProductRoutes } from "./core/router/";
import { config } from "./config";

// === Initialize Server & Router ===
const app = new HttpServer();
const router = new Router();

// === Global Middleware ===
app.use(loggingMiddleware);

// === Register Routes ===
registerProductRoutes(router);

// === Router Middleware ===
app.use(async (ctx) => {
  try {
    await router.handle(ctx);
  } catch (error) {
    console.error(`[ERROR] ${error}`);
    ctx.response.statusCode = 500;
    ctx.response.setHeader("Content-Type", "application/json");
    ctx.response.end(JSON.stringify({ error: "Internal Server Error" }));
  }
});

// === Start Server ===
// Ép kiểu port về number
const port = Number(config.port) || 3000;

app.listen(port);
