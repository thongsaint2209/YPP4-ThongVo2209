import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { ServerResponse } from "http";

export class View {
  static render(
    res: ServerResponse,
    template: string,
    data: Record<string, string>
  ) {
    try {
      const filePath = join(__dirname, "..", "views", `${template}.html`);

      if (!existsSync(filePath)) {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h1>404 - Page Not Found</h1>");
        return;
      }

      // Đọc file HTML
      let html = readFileSync(filePath, "utf-8");

      for (const key in data) {
        html = html.replace(new RegExp(`{{${key}}}`, "g"), data[key] ?? "");
      }

      // Gửi response
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(html);
    } catch (err) {
      // Nếu có lỗi khác (ví dụ permission, corrupted file)
      res.writeHead(500, { "Content-Type": "text/html" });
      res.end("<h1>500 - Internal Server Error</h1>");
    }
  }
}
