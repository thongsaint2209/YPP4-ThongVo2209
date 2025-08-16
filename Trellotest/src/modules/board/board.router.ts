// router/Router.ts
type RouteHandler = (params: any) => any;

interface Route {
  path: string;
  method: 'GET' | 'POST';
  handler: RouteHandler;
}

export class Router {
  private routes: Route[] = [];

  register(path: string, method: 'GET' | 'POST', handler: RouteHandler) {
    this.routes.push({ path, method, handler });
  }

  // Giả lập request
  handleRequest(path: string, method: 'GET' | 'POST', params?: any) {
    const route = this.routes.find(
      (r) => r.path === path && r.method === method,
    );
    if (!route) throw new Error('Route not found');
    return route.handler(params);
  }
}
