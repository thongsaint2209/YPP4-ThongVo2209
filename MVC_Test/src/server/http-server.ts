import { createServer } from "http";
import { HttpContext } from "./http-context";
import { Router } from "./router";

export class HttpServer {
  constructor(private router: Router) {}

  listen(port: number) {
    createServer((req, res) => {
      const ctx = new HttpContext(req, res);

      try {
        const handler = this.router.match(ctx);
        if (handler) {
          handler(ctx); // gọi controller trực tiếp
        } else {
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("Not Found");
        }
      } catch (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
        console.error(err);
      }
    }).listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  }
}
