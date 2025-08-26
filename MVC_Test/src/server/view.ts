import type { ServerResponse } from "http";

// Base View
export abstract class View {
  abstract execute(res: ServerResponse): void;
}

// HTML Result
export class HtmlResult extends View {
  constructor(private html: string, private status: number = 200) {
    super();
  }

  execute(res: ServerResponse) {
    res.writeHead(this.status, { "Content-Type": "text/html; charset=utf-8" });
    res.end(this.html);
  }
}

// Helpers
export class Ok extends HtmlResult {
  constructor(html: string) {
    super(html, 200);
  }
}

export class NotFound extends HtmlResult {
  constructor(msg: string = "Not Found") {
    super(`<h1>404 Not Found</h1><p>${msg}</p>`, 404);
  }
}

export class BadRequest extends HtmlResult {
  constructor(msg: string = "Bad Request") {
    super(`<h1>400 Bad Request</h1><p>${msg}</p>`, 400);
  }
}
