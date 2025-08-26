import { IncomingMessage, ServerResponse } from "http";

export class HttpContext {
  req: IncomingMessage;
  res: ServerResponse;
  query: Record<string, string> = {};
  params: Record<string, string> = {};
  body: any = {};

  constructor(req: IncomingMessage, res: ServerResponse) {
    this.req = req;
    this.res = res;

    // parse query string
    const urlParts = req.url?.split("?") || [];
    if (urlParts[1]) {
      urlParts[1].split("&").forEach((pair) => {
        const [key = "", value = ""] = pair.split("=");
        if (key) this.query[key] = decodeURIComponent(value);
      });
    }
  }
}
