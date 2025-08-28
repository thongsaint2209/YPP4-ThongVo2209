import { UserDTO } from "../model/user";

export class UserRepository {
  private users: UserDTO[] = [
    { userId: 1, name: "Alice", age: 25 },
    { userId: 2, name: "Bob", age: 30 },
  ];

  getUserbyId(userId: number): UserDTO | undefined {
    if (!userId) return undefined;

    return this.users.find((u) => u.userId === userId);
  }
}
