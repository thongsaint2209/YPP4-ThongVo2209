import { IUser } from "../model/user";

export class UserRepository {
  private users: IUser[] = [
    { userId: "1", name: "Alice", age: 25 },
    { userId: "2", name: "Bob", age: 30 },
  ];

  getInfo(
    userId: string,
    name: string
  ): { userId: string; name: string } | undefined {
    if (!userId || !name) return undefined;

    const user = this.users.find((u) => u.userId === userId && u.name === name);
    if (!user) return undefined;

    return { userId: user.userId, name: user.name };
  }
}
