import { readFileSync } from "fs";
import { join } from "path";
import { ServerResponse } from "http";

export class View {
  static render(
    res: ServerResponse,
    template: string,
    data: Record<string, string>
  ) {
    const filePath = join(__dirname, "..", "views", `${template}.html`);
    let html = readFileSync(filePath, "utf-8");

    for (const key in data) {
      html = html.replace(new RegExp(`{{${key}}}`, "g"), data[key] ?? "");
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  }
}
