export class Workspace {
  constructor(
    public id: number,
    public workspaceName?: string,
    public workspaceDescription?: string,
    public shortName?: string,
    public website?: string,
    public typeId?: number,
    public createdAt?: Date,
    public createdBy?: number,
    public updatedAt?: Date | null,
    public updatedBy?: number | null,
    public logoUrl?: string,
  ) {}
}
