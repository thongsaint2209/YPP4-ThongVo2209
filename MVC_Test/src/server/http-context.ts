import type { IncomingMessage, ServerResponse } from "http";

export class HttpContext {
  request: IncomingMessage;
  response: ServerResponse;
  state: Record<string, any> = {};
  container: Map<string, any>;

  constructor(
    req: IncomingMessage,
    res: ServerResponse,
    container: Map<string, any>
  ) {
    this.request = req;
    this.response = res;
    this.container = container;
  }

  getService<T>(key: string): T {
    return this.container.get(key);
  }

  setService<T>(key: string, instance: T) {
    this.container.set(key, instance);
  }
}
