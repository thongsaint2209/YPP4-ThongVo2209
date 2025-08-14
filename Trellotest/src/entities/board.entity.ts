export class Board {
  constructor(
    public id: number,
    public boardName?: string,
    public boardDescription?: string,
    public createdAt?: Date,
    public createdBy?: number,
    public backgroundUrl?: string,
    public workspaceId?: number,
    public boardStatus?: string,
    public updatedAt?: Date | null,
    public updatedBy?: number | null,
    public isTemplate?: boolean,
  ) {}
}
