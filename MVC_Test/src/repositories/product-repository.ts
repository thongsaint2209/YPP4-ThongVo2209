import { IProduct } from "../model/product";

export class ProductRepository {
  private products: IProduct[] = [
    { id: 1, name: "Apple", price: 10 },
    { id: 2, name: "Banana", price: 5 },
  ];

  async findAll(): Promise<IProduct[]> {
    return this.products;
  }
  async findById(id: number): Promise<IProduct | null> {
    return this.products.find((p) => p.id === id) || null;
  }
  async create(product: IProduct): Promise<IProduct> {
    this.products.push(product);
    return product;
  }
}
