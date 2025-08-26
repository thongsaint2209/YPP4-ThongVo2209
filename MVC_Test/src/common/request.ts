// request.ts
export interface Request {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string; // có thể kèm query string
  params?: Record<string, any>; // path params + query params
  body?: any;
}
