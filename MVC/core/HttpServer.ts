import { createServer, IncomingMessage, ServerResponse } from "http";
import { HttpContext } from "./HttpContext";
import { Middleware } from "./Middleware";

export class HttpServer {
  private middlewares: Middleware[] = [];

  use(middleware: Middleware) {
    this.middlewares.push(middleware);
  }

  listen(port: number) {
    const server = createServer(
      async (req: IncomingMessage, res: ServerResponse) => {
        const context = new HttpContext(req, res);

        let index = -1;

        const next = async () => {
          index++;
          if (index < this.middlewares.length) {
            await this.middlewares[index](context, next);
          }
        };

        await next();
      }
    );

    server.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  }
}
