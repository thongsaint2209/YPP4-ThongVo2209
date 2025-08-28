import { UserRepository } from "../repositories/user-repository";
import { UserDTO } from "../model/user";

export class UserService {
  constructor(private userRepo: UserRepository) {}

  getUserbyId(userId: number): UserDTO | undefined {
    return this.userRepo.getUserbyId(userId);
  }
}
