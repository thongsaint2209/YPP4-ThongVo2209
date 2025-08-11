import { Injectable } from '@nestjs/common';
import { Workspace } from './entities/workspace.entity';

@Injectable()
export class WorkspaceService {
  private _mockData: Workspace[] = [];
  private _nextId = 1;

  // Getter và setter cho mockData
  get mockData(): Workspace[] {
    return this._mockData;
  }

  set mockData(data: Workspace[]) {
    this._mockData = data;
  }

  // Getter và setter cho nextId
  get nextId(): number {
    return this._nextId;
  }

  set nextId(id: number) {
    this._nextId = id;
  }

  // CREATE
  create(data: Omit<Workspace, 'id' | 'createdAt'>): Workspace {
    const now = new Date();

    const sql = `
      INSERT INTO Workspaces (WorkspaceName, WorkspaceDescription, CategoryId, CreatedAt, CreatedBy, LogoUrl)
      VALUES ('${data.workspaceName}', '${data.workspaceDescription}', ${data.categoryId}, '${now.toISOString()}', ${data.createdBy}, '${data.logoUrl}')
    `;
    console.log('🟢 SQL EXECUTED:', sql);

    const newWorkspace = new Workspace(
      this.mockData.length + 1,
      data.workspaceName,
      data.workspaceDescription,
      data.categoryId,
      now,
      data.createdBy,
      undefined,
      undefined,
      data.logoUrl,
    );

    this.mockData.push(newWorkspace);
    return newWorkspace;
  }

  // READ ALL
  findAll(): Workspace[] {
    const sql = `SELECT * FROM Workspaces`;
    console.log('🟢 SQL EXECUTED:', sql);
    return this.mockData;
  }

  // READ BY ID
  getWorkspaceById(id: number): Workspace | null {
    const sql = `SELECT * FROM Workspaces WHERE Id = ${id}`;
    console.log('🟢 SQL EXECUTED:', sql);

    return this.mockData.find((ws) => ws.id === id) ?? null;
  }

  // UPDATE
  update(id: number, data: Partial<Workspace>): Workspace | null {
    const now = new Date();

    const index = this.mockData.findIndex((ws) => ws.id === id);
    if (index === -1) return null;

    const current = this.mockData[index];

    // Giả lập câu lệnh SQL
    const sql = `
    UPDATE Workspaces
    SET 
      WorkspaceName = '${data.workspaceName ?? current.workspaceName}',
      WorkspaceDescription = '${data.workspaceDescription ?? current.workspaceDescription}',
      CategoryId = ${data.categoryId ?? current.categoryId},
      UpdatedAt = '${now.toISOString()}',
      UpdatedBy = ${data.updatedBy ?? current.updatedBy},
      LogoUrl = '${data.logoUrl ?? current.logoUrl}'
    WHERE Id = ${id};
  `;
    console.log('🟢 SQL EXECUTED:', sql);

    // Cập nhật workspace
    const updated = new Workspace(
      current.id,
      data.workspaceName ?? current.workspaceName,
      data.workspaceDescription ?? current.workspaceDescription,
      data.categoryId ?? current.categoryId,
      current.createdAt,
      current.createdBy,
      now,
      data.updatedBy ?? current.updatedBy,
      data.logoUrl ?? current.logoUrl,
    );

    this.mockData[index] = updated;
    return updated;
  }

  getById(id: number): Workspace | null {
    const found = this.mockData.find((ws) => ws.id === id);
    return found || null;
  }

  // DELETE
  delete(id: number): boolean {
    const sql = `DELETE FROM Workspaces WHERE Id = ${id}`;
    console.log('🟢 SQL EXECUTED:', sql);

    const index = this.mockData.findIndex((ws) => ws.id === id);
    if (index !== -1) {
      this.mockData.splice(index, 1);
      return true;
    }
    return false;
  }
}
