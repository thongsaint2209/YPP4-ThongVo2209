import { HttpServer } from "./core/HttpServer";
import { loggingMiddleware } from "./core/Middleware";
import { Router } from "./core/router";
import { HttpContext } from "./core/HttpContext";
import { Ok, NotFound } from "./core/Result";
import { ModelBinder } from "./core/ModelBinder";

// === Mock Data ===
interface Product {
  id: number;
  name: string;
  price: number;
}

const products: Product[] = [
  { id: 1, name: "Laptop", price: 1000 },
  { id: 2, name: "Mouse", price: 25 },
];

// === Create Router ===
const router = new Router();

// GET /products
router.addRoute("GET", "/products", async (ctx: HttpContext) => {
  Ok(products).execute(ctx.response);
});

// GET /products/:id
router.addRoute("GET", /^\/products\/(\d+)$/, async (ctx, params) => {
  const id = Number(params?.[0]);
  const product = products.find((p) => p.id === id);
  if (product) {
    Ok(product).execute(ctx.response);
  } else {
    NotFound().execute(ctx.response);
  }
});

// POST /products
router.addRoute("POST", "/products", async (ctx) => {
  const newProduct = await ModelBinder.bindBody<Product>(ctx.request);
  if (newProduct) {
    newProduct.id = products.length + 1;
    products.push(newProduct);
    Ok(newProduct).execute(ctx.response);
  } else {
    ctx.response.statusCode = 400;
    ctx.response.end(JSON.stringify({ message: "Invalid JSON" }));
  }
});

// === Create HTTP Server ===
const app = new HttpServer();

app.use(loggingMiddleware);

// Routing middleware
app.use(async (ctx, next) => {
  await router.handle(ctx);
});

app.listen(3000);
