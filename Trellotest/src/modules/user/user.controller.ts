// UserUser.controller.ts
import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { AvatarUserDto } from './dto/avatar-user.dto';
import { InforUserDto } from './dto/infor-user.dto';

@Controller('User')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get('getAvatarUser')
  getAvatarUser(userId: number): Promise<AvatarUserDto> {
    return this.UserService.getAvatarUser(userId);
  }

  @Get('getInforUser')
  getInforUser(Email: string): Promise<InforUserDto> {
    return this.UserService.getInforUser(Email);
  }
}
