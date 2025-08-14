export class User {
  constructor(
    public id: number,
    public username?: string,
    public bio?: string,
    public email?: string,
    public lastActive?: Date,
    public createdAt?: Date,
    public updatedAt?: Date | null,
    public pictureUrl?: string,
  ) {}
}
