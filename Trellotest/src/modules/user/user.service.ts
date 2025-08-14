import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AvatarUserDto } from './dto/avatar-user.dto';
import { InforUserDto } from './dto/infor-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly UserRepository: UserRepository) {}

  getAvatarUser(userId: number): Promise<AvatarUserDto> {
    return this.UserRepository.getAvatarUser(userId);
  }

  getInforUser(Email: string): Promise<InforUserDto> {
    return this.UserRepository.getInforUser(Email);
  }
}
