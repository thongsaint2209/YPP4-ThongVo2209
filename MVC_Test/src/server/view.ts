import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { ServerResponse } from "http";

export class View {
  static render(res: ServerResponse, template: string, data: any) {
    try {
      const filePath = join(__dirname, "..", "views", `${template}.html`);

      if (!existsSync(filePath)) {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h1>404 - Page Not Found</h1>");
        return;
      }

      // Đọc nội dung file HTML
      let html = readFileSync(filePath, "utf-8");

      // Thay thế tất cả placeholder {{key}}
      html = html.replace(/{{\s*([\w.]+)\s*}}/g, (_, keyPath) => {
        const value = View.getNestedValue(data, keyPath);
        return value !== undefined && value !== null ? String(value) : "";
      });

      // Trả về response
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(html);
    } catch (err) {
      res.writeHead(500, { "Content-Type": "text/html" });
      res.end("<h1>500 - Internal Server Error</h1>");
    }
  }

  private static getNestedValue(obj: any, path: string): any {
    return path.split(".").reduce((acc, key) => {
      if (acc && typeof acc === "object" && key in acc) {
        return acc[key];
      }
      return undefined;
    }, obj);
  }
}
