export class AvatarMemberDto {
  constructor(
    public userId: number,
    public userPicture: string,
    public ownerTypeValue: string,
    public boardId: number,
  ) {}
}
