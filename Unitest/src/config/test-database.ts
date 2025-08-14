import Database from 'sqlite';

export class TestDatabaseHelper {
  private db: ReturnType<typeof Database>; // 👈 Lấy type từ hàm tạo

  constructor() {
    this.db = new Database(':memory:');
  }

  connect(): Promise<void> {
    return Promise.resolve();
  }

  createSchema(): Promise<void> {
    const schema = `
      CREATE TABLE Board (
        Id INTEGER PRIMARY KEY,
        BoardName TEXT,
        BoardDescription TEXT,
        CreatedAt TEXT,
        BackgroundUrl TEXT,
        BoardStatus TEXT,
        WorkspaceId INTEGER
      );

      CREATE TABLE UserStarredBoard (
        UserId INTEGER,
        BoardId INTEGER,
        CreatedAt TEXT,
        StarredBoardsStatus INTEGER
      );

      CREATE TABLE OwnerType (
        Id INTEGER PRIMARY KEY,
        OwnerTypeValue TEXT
      );

      CREATE TABLE UserViewHistory (
        Id INTEGER PRIMARY KEY,
        UserId INTEGER,
        OwnerId INTEGER,
        OwnerTypeId INTEGER,
        AccessedAt TEXT
      );
    `;
    this.db.exec(schema);
    return Promise.resolve();
  }

  seedTestData(): Promise<void> {
    const seed = `
      INSERT INTO Board (Id, BoardName, BoardDescription, CreatedAt, BackgroundUrl, BoardStatus, WorkspaceId) VALUES
        (1, 'Test Board 1', 'Description', datetime('now'), 'url1', 'active', 1),
        (2, 'Inactive Board', 'Description', datetime('now'), 'url2', 'archived', 1);

      INSERT INTO UserStarredBoard (UserId, BoardId, CreatedAt, StarredBoardsStatus) VALUES
        (1, 1, datetime('now'), 1),
        (1, 2, datetime('now'), 1);

      INSERT INTO OwnerType (Id, OwnerTypeValue) VALUES
        (1, 'BOARD'),
        (2, 'WORKSPACE');

      INSERT INTO UserViewHistory (Id, UserId, OwnerId, OwnerTypeId, AccessedAt) VALUES
        (1, 1, 1, 1, datetime('now', '-1 day')),
        (2, 1, 2, 1, datetime('now', '-2 day')),
        (3, 2, 1, 1, datetime('now', '-3 day'));
    `;
    this.db.exec(seed);
    return Promise.resolve();
  }

  getDb(): ReturnType<typeof Database> {
    return this.db;
  }

  close(): Promise<void> {
    this.db.close();
    return Promise.resolve();
  }
}
