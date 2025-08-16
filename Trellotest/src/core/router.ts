import { IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';

type Handler = (
  req: IncomingMessage,
  res: ServerResponse,
  params: any,
) => Promise<void>;

interface RouteDefinition {
  method: string;
  path: string;
  handler: Handler;
}

export class Router {
  private routes: RouteDefinition[] = [];

  register(method: string, path: string, handler: Handler) {
    this.routes.push({ method: method.toUpperCase(), path, handler });
  }

  async handle(req: IncomingMessage, res: ServerResponse) {
    const parsedUrl = parse(req.url || '', true);
    const pathname = parsedUrl.pathname || '';
    const method = req.method?.toUpperCase() || 'GET';

    const route = this.routes.find(
      (r) => r.method === method && r.path === pathname,
    );

    if (!route) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Route not found' }));
      return;
    }

    try {
      await route.handler(req, res, parsedUrl.query);
    } catch (err: any) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
  }
}
