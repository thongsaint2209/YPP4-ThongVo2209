import { ProductRepository } from "../repositories/product-repository";
import { IProduct } from "../model/product";

export class ProductService {
  constructor(private repo: ProductRepository) {}
  async getAll(): Promise<IProduct[]> {
    return this.repo.findAll();
  }
  async getById(id: number): Promise<IProduct | null> {
    return this.repo.findById(id);
  }
  async create(product: IProduct): Promise<IProduct> {
    return this.repo.create(product);
  }
}
