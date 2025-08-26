import { ServerResponse } from "http";

export interface IActionResult {
  execute(res: ServerResponse): void;
}

export class JsonResult implements IActionResult {
  constructor(private data: any, private status: number = 200) {}

  execute(res: ServerResponse): void {
    res.statusCode = this.status;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(this.data));
  }
}

export class StatusResult implements IActionResult {
  constructor(private status: number, private message?: string) {}

  execute(res: ServerResponse): void {
    res.statusCode = this.status;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: this.message || "" }));
  }
}

// Helpers
export const Ok = (data: any) => new JsonResult(data, 200);
export const NotFound = () => new StatusResult(404, "Not Found");

export const BadRequest = (message = "Bad Request") => ({
  execute: (res: any) => {
    res.statusCode = 400;
    res.end(JSON.stringify({ message }));
  },
});
