import { HttpServer } from "./server/http-server";
import { Router } from "./server/router";
import { logger, jsonBodyParser } from "./server/middleware";
import { ProductRepository } from "./repositories/product-repository";
import { ProductService } from "./service/product-service";
import { ProductController } from "./controller/product-controller";

const router = new Router();
const repo = new ProductRepository();
const service = new ProductService(repo);
const controller = new ProductController(service);
const PORT = 3000;

// Dynamic routes
router.register("GET", "/products", (ctx) => controller.getProducts(ctx));
router.register("GET", "/products/:id", (ctx) =>
  controller.getProductById(ctx)
);

const server = new HttpServer(router);
server.registerService("ProductRepository", repo);
server.registerService("ProductService", service);

server.use(logger);
server.use(jsonBodyParser);

server.listen(PORT);
