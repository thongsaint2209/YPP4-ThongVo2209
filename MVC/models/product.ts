export interface Product {
  id: number;
  name: string;
  price: number;
}

export class ProductModel {
  private products: Product[] = [];

  getAll(): Product[] {
    return this.products;
  }

  add(product: Product): void {
    this.products.push(product);
  }
}
