import { HttpContext } from "../server/http-context";
import { UserService } from "../service/user-service";
import { View } from "../server/view";

export class UserController {
  constructor(private userService: UserService) {}

  getUser(ctx: HttpContext) {
    const { userId = "", name = "" } = ctx.query;
    const user = this.userService.getUser(userId, name);

    // Dynamic view name
    const template = "user"; // (user.html)

    // Dynamic data object
    const data = user
      ? { userId: user.userId, name: user.name }
      : { userId: "", name: "Not Found" };

    // Chỉ gọi 1 lần view.render
    View.render(ctx.res, template, data);
  }
}
