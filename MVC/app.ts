import { createServer } from "http";
import { ProductModel } from "./models/product";
import { ProductView } from "./views/product-view";
import { ProductController } from "./controllers/product-controller";
import { Router } from "./router/router";

// Khởi tạo MVC
const model = new ProductModel();
const view = new ProductView();
const controller = new ProductController(model, view);
const router = new Router();

// Đăng ký route
router.addRoute("GET", "/products", controller.listProducts.bind(controller));
router.addRoute("POST", "/products", controller.addProduct.bind(controller));

// Server
const server = createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  router.handle(req, res);
});

server.listen(4000, () =>
  console.log("Server running at http://localhost:4000")
);
