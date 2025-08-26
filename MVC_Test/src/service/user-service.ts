import { UserRepository } from "../repositories/user-repository";
import { IUser } from "../model/user";

export class UserService {
  constructor(private userRepo: UserRepository) {}

  getUser(userId: string, name: string): IUser | undefined {
    return this.userRepo.getInfo(userId, name);
  }
}
