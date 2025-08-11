export class Board {
  constructor(
    public id: number,
    public boardName: string,
    public boardDescription: string,
    public workspaceId: number,
    public createdAt?: Date,
    public createdBy?: number,
    public backgroundUrl?: string,
    public boardStatus?: string,
    public updatedAt?: Date | null,
    public updatedBy?: number | null,
  ) {}
}
