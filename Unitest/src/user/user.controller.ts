// user.controller.ts
import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('createUser')
  getCreateUser() {
    return this.userService.create;
  }

  @Get('updateUser')
  getUpdateUser() {
    return this.userService.update;
  }
}
