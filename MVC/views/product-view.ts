import { Product } from "../models/product";

export class ProductView {
  showProducts(products: Product[]): string {
    return JSON.stringify(products, null, 2);
  }

  showMessage(message: string): string {
    return JSON.stringify({ message });
  }
}
