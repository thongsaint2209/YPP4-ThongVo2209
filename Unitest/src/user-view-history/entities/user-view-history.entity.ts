export class UserViewHistory {
  constructor(
    public userId: number,
    public ownerId: number,
    public ownerTypeId?: number | null,
    public accessedAt?: Date | null,
  ) {}
}
