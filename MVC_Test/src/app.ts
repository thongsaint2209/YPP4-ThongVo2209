import { HttpServer } from "./server/http-server";
import { Router } from "./server/router";
import { UserController } from "./controller/user-controller";
import { UserService } from "./service/user-service";
import { UserRepository } from "./repositories/user-repository";

// setup DI
const userRepo = new UserRepository();
const userService = new UserService(userRepo);
const userController = new UserController(userService);
const PORT = 3000;

// setup router
const router = new Router();
router.register("GET", "/user/name", (ctx) => userController.getUser(ctx));

// setup server
const server = new HttpServer(router);

server.listen(PORT);
