export class UserStarredBoard {
  constructor(
    public userId: number,
    public boardId: number,
    public createdAt?: Date, // tự động tạo khi insert nếu cần
    public starredBoardsStatus?: number, // 0 = false, 1 = true
  ) {}
}
