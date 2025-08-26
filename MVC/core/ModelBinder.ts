import { IncomingMessage } from "http";

export class ModelBinder {
  static async bindBody<T>(req: IncomingMessage): Promise<T | null> {
    return new Promise((resolve, reject) => {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", () => {
        try {
          const parsed = JSON.parse(body);
          resolve(parsed);
        } catch (e) {
          resolve(null);
        }
      });
      req.on("error", (err) => reject(err));
    });
  }

  static bindParams<T>(params: string[], types: (new () => any)[]): any[] {
    return params.map((value, index) => {
      const type = types[index];
      if (type === Number) return Number(value);
      if (type === Boolean) return value === "true";
      return value;
    });
  }
}
