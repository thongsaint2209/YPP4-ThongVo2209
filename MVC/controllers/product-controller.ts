import { HttpContext } from "../core/http-context";
import { Ok, NotFound, BadRequest } from "../core/result";
import { ModelBinder } from "../core/model-binder";

interface Product {
  id: number;
  name: string;
  price: number;
}

// Mock data (sau này thay bằng DB)
const products: Product[] = [
  { id: 1, name: "Laptop", price: 1000 },
  { id: 2, name: "Mouse", price: 25 },
];

export const productController = {
  getAll: async (ctx: HttpContext) => {
    Ok(products).execute(ctx.response);
  },

  getById: async (ctx: HttpContext, params?: string[]) => {
    const id = Number(params?.[0]);
    const product = products.find((p) => p.id === id);
    if (product) Ok(product).execute(ctx.response);
    else NotFound().execute(ctx.response);
  },

  create: async (ctx: HttpContext) => {
    const newProduct = await ModelBinder.bindBody<Product>(ctx.request);
    if (!newProduct) {
      return BadRequest("Invalid JSON").execute(ctx.response);
    }
    newProduct.id = products.length + 1;
    products.push(newProduct);
    Ok(newProduct).execute(ctx.response);
  },
};
