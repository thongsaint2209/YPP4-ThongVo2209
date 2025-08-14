export class StarredBoardDto {
  userId: number;
  boardId: number;
  boardName: string;
  backgroundUrl: string;
  boardStatus: string;
  starredBoardsStatus: boolean;
  createdAt: Date;
}
