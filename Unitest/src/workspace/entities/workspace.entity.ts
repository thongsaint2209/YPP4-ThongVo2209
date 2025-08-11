export class Workspace {
  constructor(
    public id: number,
    public workspaceName: string,
    public workspaceDescription: string,
    public categoryId?: number | null,
    public createdAt?: Date,
    public createdBy?: number,
    public updatedAt?: Date,
    public updatedBy?: number,
    public logoUrl?: string,
  ) {}
}
