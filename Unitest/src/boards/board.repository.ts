import { CreateBoardDto } from './dto/create-board.dto';
import { StarredBoardDto } from './dto/get-star-board.dto';

// Import default để tạo instance, và import type để dùng type
import Database from 'better-sqlite3';
import type { Database as DatabaseType } from 'better-sqlite3';

export class BoardRepository {
  private db: DatabaseType;

  constructor(db: DatabaseType) {
    this.db = db;
  }

  getStarredBoard(userId: number): StarredBoardDto[] {
    const sql = `
      SELECT
          usb.UserId,
          brd.Id AS BoardId,
          brd.BackgroundUrl,
          brd.BoardName,
          brd.BoardStatus,
          usb.StarredBoardsStatus
      FROM UserStarredBoard usb
      JOIN Board brd ON brd.Id = usb.BoardId
      WHERE usb.UserId = ?
        AND brd.BoardStatus = 'active'
      ORDER BY usb.CreatedAt DESC;
    `;

    const stmt = this.db.prepare(sql);
    const rows = stmt.all(userId) as any[];

    return rows.map((row) => ({
      UserId: row.UserId,
      BoardId: row.BoardId,
      BackgroundUrl: row.BackgroundUrl,
      BoardName: row.BoardName,
      BoardStatus: row.BoardStatus,
      StarredBoardsStatus: row.StarredBoardsStatus,
    }));
  }

  create(board: CreateBoardDto) {
    const sql = `INSERT INTO Boards (Title, WorkspaceName) VALUES (?, ?)`;
    const stmt = this.db.prepare(sql);
    const result = stmt.run(board.title, board.workspaceName);

    return {
      id: result.lastInsertRowid,
      title: board.title,
      workspaceName: board.workspaceName,
    };
  }
}
