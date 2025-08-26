import { readFileSync } from "fs";
import { join } from "path";
import { HttpContext } from "../server/http-context";
import { ProductService } from "../service/product-service";
import { View, HtmlResult, Ok, NotFound, BadRequest } from "../server/view";

export class ProductController {
  constructor(private service: ProductService) {}

  async getProducts(ctx: HttpContext): Promise<View> {
    const products = await this.service.getAll();
    let template = readFileSync(
      join(__dirname, "../views/products.html"),
      "utf-8"
    );

    const listHtml = products
      .map((p) => `<li>${p.id} - ${p.name} - $${p.price}</li>`)
      .join("");
    template = template.replace("{{products}}", listHtml);

    return new HtmlResult(template);
  }

  async getProductById(ctx: HttpContext): Promise<View> {
    const id = Number(ctx.state.params?.id);
    if (isNaN(id)) return new BadRequest("Invalid id");

    const product = await this.service.getById(id);
    if (!product) return new NotFound("Product not found");

    let template = readFileSync(
      join(__dirname, "../views/product-detail.html"),
      "utf-8"
    );
    template = template
      .replace("{{id}}", String(product.id))
      .replace("{{name}}", product.name)
      .replace("{{price}}", String(product.price));

    return new HtmlResult(template);
  }
}
