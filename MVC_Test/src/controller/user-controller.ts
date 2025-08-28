import { HttpContext } from "../server/http-context";
import { UserService } from "../service/user-service";
import { View } from "../server/view";

export class UserController {
  constructor(private userService: UserService) {}

  getUserbyId(ctx: HttpContext) {
    const userId = ctx.query;
    const user = this.userService.getUserbyId(Number(userId));

    const template = "user"; // (user.html)

    // Chỉ gọi 1 lần view.render
    View.render(ctx.res, template, user);
  }
}
