import { createServer } from "http";
import { HttpContext } from "./http-context";
import { Middleware } from "./middleware";
import { Router } from "./router";

export class HttpServer {
  private middlewares: Middleware[] = [];
  private container: Map<string, any> = new Map();

  constructor(private router: Router) {}

  use(mw: Middleware) {
    this.middlewares.push(mw);
  }
  registerService(key: string, instance: any) {
    this.container.set(key, instance);
  }

  listen(port: number) {
    createServer(async (req, res) => {
      const ctx = new HttpContext(req, res, this.container);
      let idx = -1;
      const runner = async () => {
        idx++;
        // if (idx < this.middlewares.length)
        //   return this.middlewares[idx](ctx, runner);
        const result = await this.router.handle(ctx);
        result.execute(res);
      };
      await runner();
    }).listen(port, () =>
      console.log(`Server running at http://localhost:${port}`)
    );
  }
}
