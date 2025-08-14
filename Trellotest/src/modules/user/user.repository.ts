import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { AvatarUserDto } from './dto/avatar-user.dto';
import { InforUserDto } from './dto/infor-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
  ) {}

  getAvatarUser(userId: number): Promise<AvatarUserDto> {
    const sql = `
    SELECT 
      Id, 
      PictureUrl
    FROM Users usr
    WHERE usr.Id = ?`;

    return this.UserRepository.query(sql, [userId]);
  }

  getInforUser(Email: string): Promise<InforUserDto> {
    const sql = `
    SELECT 
      Id, 
      PictureUrl, 
      Email, 
      Username
    FROM Users
    WHERE Email = ?`;

    return this.UserRepository.query(sql, [Email]);
  }
}
