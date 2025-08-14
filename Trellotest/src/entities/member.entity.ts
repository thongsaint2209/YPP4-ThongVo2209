export class Member {
  constructor(
    public id: number,
    public userId?: number,
    public rolePermissionId?: number,
    public ownerTypeId?: number,
    public ownerId?: number,
    public invitedBy?: number,
    public joinedAt?: Date,
    public memberStatus?: string,
  ) {}
}
