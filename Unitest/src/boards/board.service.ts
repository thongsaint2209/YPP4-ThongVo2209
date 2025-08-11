import { Injectable } from '@nestjs/common';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardService {
  private _mockData: Board[] = [];
  private _nextId = 1;

  // Getter / Setter mockData
  get mockData(): Board[] {
    return this._mockData;
  }

  set mockData(data: Board[]) {
    this._mockData = data;
  }

  // Getter / Setter nextId
  get nextId(): number {
    return this._nextId;
  }

  set nextId(id: number) {
    this._nextId = id;
  }

  // CREATE
  create(data: Omit<Board, 'id' | 'createdAt'>): Board {
    const now = new Date();

    const sql = `
      INSERT INTO Boards (BoardName, BoardDescription, WorkspaceId, CreatedAt, CreatedBy, BackgroundUrl, BoardStatus)
      VALUES ('${data.boardName}', '${data.boardDescription}', ${data.workspaceId}, '${now.toISOString()}', ${data.createdBy}, '${data.backgroundUrl}', '${data.boardStatus}')
    `;
    console.log('🟢 SQL EXECUTED:', sql);

    const newBoard = new Board(
      this._nextId++,
      data.boardName,
      data.boardDescription,
      data.workspaceId,
      now,
      data.createdBy,
      data.backgroundUrl,
      data.boardStatus,
      null,
      null,
    );

    this._mockData.push(newBoard);
    return newBoard;
  }

  // READ ALL
  findAll(): Board[] {
    const sql = `SELECT * FROM Boards`;
    console.log('🟢 SQL EXECUTED:', sql);
    return this._mockData;
  }

  // READ BY ID
  getBoardById(id: number): Board | null {
    const sql = `SELECT * FROM Boards WHERE Id = ${id}`;
    console.log('🟢 SQL EXECUTED:', sql);

    return this._mockData.find((b) => b.id === id) ?? null;
  }

  // UPDATE
  update(id: number, data: Partial<Board>): Board | null {
    const now = new Date();

    const index = this._mockData.findIndex((b) => b.id === id);
    if (index === -1) return null;

    const current = this._mockData[index];

    const sql = `
      UPDATE Boards
      SET
        BoardName = '${data.boardName ?? current.boardName}',
        BoardDescription = '${data.boardDescription ?? current.boardDescription}',
        WorkspaceId = ${data.workspaceId ?? current.workspaceId},
        UpdatedAt = '${now.toISOString()}',
        UpdatedBy = ${data.updatedBy ?? current.updatedBy},
        BackgroundUrl = '${data.backgroundUrl ?? current.backgroundUrl}',
        BoardStatus = '${data.boardStatus ?? current.boardStatus}'
      WHERE Id = ${id};
    `;
    console.log('🟢 SQL EXECUTED:', sql);

    const updated = new Board(
      current.id,
      data.boardName ?? current.boardName,
      data.boardDescription ?? current.boardDescription,
      data.workspaceId ?? current.workspaceId,
      current.createdAt,
      current.createdBy,
      data.backgroundUrl ?? current.backgroundUrl,
      data.boardStatus ?? current.boardStatus,
      now,
      data.updatedBy ?? current.updatedBy,
    );

    this._mockData[index] = updated;
    return updated;
  }

  // DELETE
  delete(id: number): boolean {
    const sql = `DELETE FROM Boards WHERE Id = ${id}`;
    console.log('🟢 SQL EXECUTED:', sql);

    const lengthBefore = this._mockData.length;
    this._mockData = this._mockData.filter((b) => b.id !== id);
    return this._mockData.length < lengthBefore;
  }
}
