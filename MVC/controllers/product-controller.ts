import { ProductModel, Product } from "../models/product";
import { ProductView } from "../views/product-view";
import { IncomingMessage, ServerResponse } from "http";

export class ProductController {
  constructor(private model: ProductModel, private view: ProductView) {}

  listProducts(req: IncomingMessage, res: ServerResponse) {
    const products = this.model.getAll();
    res.end(this.view.showProducts(products));
  }

  addProduct(req: IncomingMessage, res: ServerResponse) {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        const product: Product = JSON.parse(body);
        this.model.add(product);
        res.end(this.view.showMessage("Product added successfully"));
      } catch (err) {
        res.statusCode = 400;
        res.end(this.view.showMessage("Invalid product data"));
      }
    });
  }
}
