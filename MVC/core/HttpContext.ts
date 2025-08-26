import { IncomingMessage, ServerResponse } from "http";

export class HttpContext {
  public readonly request: IncomingMessage;
  public readonly response: ServerResponse;
  public items: Map<string, any> = new Map();

  constructor(req: IncomingMessage, res: ServerResponse) {
    this.request = req;
    this.response = res;
  }
}
